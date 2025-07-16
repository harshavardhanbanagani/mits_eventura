import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import registrationsService from '../../services/registrationsService'

// Initial state
const initialState = {
  registrations: [],
  currentRegistration: null,
  loading: false,
  error: null,
  stats: {
    totalRegistrations: 0,
    pendingRegistrations: 0,
    confirmedRegistrations: 0,
    cancelledRegistrations: 0,
  },
}

// Async thunks
export const registerForEvent = createAsyncThunk(
  'registrations/registerForEvent',
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await registrationsService.registerForEvent(registrationData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const fetchUserRegistrations = createAsyncThunk(
  'registrations/fetchUserRegistrations',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await registrationsService.getUserRegistrations(userId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch registrations')
    }
  }
)

export const fetchEventRegistrations = createAsyncThunk(
  'registrations/fetchEventRegistrations',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await registrationsService.getEventRegistrations(eventId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event registrations')
    }
  }
)

export const updateRegistrationStatus = createAsyncThunk(
  'registrations/updateRegistrationStatus',
  async ({ registrationId, status }, { rejectWithValue }) => {
    try {
      const response = await registrationsService.updateRegistrationStatus(registrationId, status)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update registration status')
    }
  }
)

export const cancelRegistration = createAsyncThunk(
  'registrations/cancelRegistration',
  async (registrationId, { rejectWithValue }) => {
    try {
      const response = await registrationsService.cancelRegistration(registrationId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel registration')
    }
  }
)

// Registrations slice
const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentRegistration: (state, action) => {
      state.currentRegistration = action.payload
    },
    clearCurrentRegistration: (state) => {
      state.currentRegistration = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Register for Event
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false
        state.registrations.unshift(action.payload.registration)
        state.error = null
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Fetch User Registrations
      .addCase(fetchUserRegistrations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserRegistrations.fulfilled, (state, action) => {
        state.loading = false
        state.registrations = action.payload.registrations || []
        state.stats = action.payload.stats || state.stats
        state.error = null
      })
      .addCase(fetchUserRegistrations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.registrations = []
      })
      
      // Fetch Event Registrations
      .addCase(fetchEventRegistrations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEventRegistrations.fulfilled, (state, action) => {
        state.loading = false
        state.registrations = action.payload.registrations || []
        state.stats = action.payload.stats || state.stats
        state.error = null
      })
      .addCase(fetchEventRegistrations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.registrations = []
      })
      
      // Update Registration Status
      .addCase(updateRegistrationStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateRegistrationStatus.fulfilled, (state, action) => {
        state.loading = false
        const index = state.registrations.findIndex(reg => reg._id === action.payload.registration._id)
        if (index !== -1) {
          state.registrations[index] = action.payload.registration
        }
        state.error = null
      })
      .addCase(updateRegistrationStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Cancel Registration
      .addCase(cancelRegistration.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(cancelRegistration.fulfilled, (state, action) => {
        state.loading = false
        const index = state.registrations.findIndex(reg => reg._id === action.payload.registration._id)
        if (index !== -1) {
          state.registrations[index] = action.payload.registration
        }
        state.error = null
      })
      .addCase(cancelRegistration.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { 
  clearError, 
  setCurrentRegistration, 
  clearCurrentRegistration 
} = registrationsSlice.actions

export default registrationsSlice.reducer