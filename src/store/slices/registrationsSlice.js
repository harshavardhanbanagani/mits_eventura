import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registrationsService } from '../../services/registrationsService';

// Async thunks
export const fetchRegistrations = createAsyncThunk(
  'registrations/fetchRegistrations',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await registrationsService.getRegistrations(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch registrations');
    }
  }
);

export const createRegistration = createAsyncThunk(
  'registrations/createRegistration',
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await registrationsService.createRegistration(registrationData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create registration');
    }
  }
);

export const updateRegistrationStatus = createAsyncThunk(
  'registrations/updateRegistrationStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await registrationsService.updateRegistrationStatus(id, status);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update registration status');
    }
  }
);

export const fetchRegistrationStats = createAsyncThunk(
  'registrations/fetchRegistrationStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await registrationsService.getRegistrationStats();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const exportRegistrations = createAsyncThunk(
  'registrations/exportRegistrations',
  async ({ format, filters }, { rejectWithValue }) => {
    try {
      const response = await registrationsService.exportRegistrations(format, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to export registrations');
    }
  }
);

export const processPayment = createAsyncThunk(
  'registrations/processPayment',
  async ({ registrationId, paymentData }, { rejectWithValue }) => {
    try {
      const response = await registrationsService.processPayment(registrationId, paymentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Payment processing failed');
    }
  }
);

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: {
    registrations: [],
    currentRegistration: null,
    isLoading: false,
    error: null,
    filters: {
      eventId: '',
      status: 'all',
      department: '',
      dateRange: null,
      search: '',
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    stats: {
      totalRegistrations: 0,
      pendingPayments: 0,
      confirmedRegistrations: 0,
      totalRevenue: 0,
      recentRegistrations: [],
    },
    exportLoading: false,
    paymentLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentRegistration: (state) => {
      state.currentRegistration = null;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    updateRegistrationLocal: (state, action) => {
      const index = state.registrations.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.registrations[index] = { ...state.registrations[index], ...action.payload };
      }
    },
    addRegistrationToStats: (state) => {
      state.stats.totalRegistrations += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch registrations
      .addCase(fetchRegistrations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrations = action.payload.registrations;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create registration
      .addCase(createRegistration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrations.unshift(action.payload);
        state.currentRegistration = action.payload;
        state.stats.totalRegistrations += 1;
      })
      .addCase(createRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update registration status
      .addCase(updateRegistrationStatus.fulfilled, (state, action) => {
        const index = state.registrations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.registrations[index] = action.payload;
        }
        if (state.currentRegistration?.id === action.payload.id) {
          state.currentRegistration = action.payload;
        }
      })
      // Fetch stats
      .addCase(fetchRegistrationStats.fulfilled, (state, action) => {
        state.stats = { ...state.stats, ...action.payload };
      })
      // Export registrations
      .addCase(exportRegistrations.pending, (state) => {
        state.exportLoading = true;
      })
      .addCase(exportRegistrations.fulfilled, (state) => {
        state.exportLoading = false;
      })
      .addCase(exportRegistrations.rejected, (state, action) => {
        state.exportLoading = false;
        state.error = action.payload;
      })
      // Process payment
      .addCase(processPayment.pending, (state) => {
        state.paymentLoading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        const index = state.registrations.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.registrations[index] = action.payload;
        }
        if (state.currentRegistration?.id === action.payload.id) {
          state.currentRegistration = action.payload;
        }
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setFilters,
  clearCurrentRegistration,
  setPagination,
  updateRegistrationLocal,
  addRegistrationToStats,
} = registrationsSlice.actions;

export default registrationsSlice.reducer;