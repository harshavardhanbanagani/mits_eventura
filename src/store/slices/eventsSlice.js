import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { eventsService } from '../../services/eventsService';

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await eventsService.getEvents(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventsService.getEventById(eventId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await eventsService.createEvent(eventData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create event');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await eventsService.updateEvent(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update event');
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      await eventsService.deleteEvent(eventId);
      return eventId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete event');
    }
  }
);

export const fetchEventsByDepartment = createAsyncThunk(
  'events/fetchEventsByDepartment',
  async (department, { rejectWithValue }) => {
    try {
      const response = await eventsService.getEventsByDepartment(department);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch department events');
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    currentEvent: null,
    departmentEvents: {},
    isLoading: false,
    error: null,
    filters: {
      department: '',
      dateRange: null,
      status: 'all',
      search: '',
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    stats: {
      totalEvents: 0,
      activeEvents: 0,
      completedEvents: 0,
      totalRegistrations: 0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    updateEventStatus: (state, action) => {
      const { eventId, status } = action.payload;
      const event = state.events.find(e => e.id === eventId);
      if (event) {
        event.status = status;
      }
    },
    updateEventRegistrationCount: (state, action) => {
      const { eventId, count } = action.payload;
      const event = state.events.find(e => e.id === eventId);
      if (event) {
        event.registrationCount = count;
      }
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch events
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload.events;
        state.pagination = action.payload.pagination;
        state.stats = action.payload.stats;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create event
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
        state.stats.totalEvents += 1;
        state.stats.activeEvents += 1;
      })
      // Update event
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        if (state.currentEvent?.id === action.payload.id) {
          state.currentEvent = action.payload;
        }
      })
      // Delete event
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(e => e.id !== action.payload);
        state.stats.totalEvents -= 1;
      })
      // Fetch events by department
      .addCase(fetchEventsByDepartment.fulfilled, (state, action) => {
        const { department, events } = action.payload;
        state.departmentEvents[department] = events;
      });
  },
});

export const {
  clearError,
  setFilters,
  clearCurrentEvent,
  updateEventStatus,
  updateEventRegistrationCount,
  setPagination,
} = eventsSlice.actions;

export default eventsSlice.reducer;