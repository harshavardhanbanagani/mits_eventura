import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventsService from '../../services/eventsService'

// Initial state
const initialState = {
  events: [],
  currentEvent: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    status: '',
    dateRange: null,
    search: '',
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0,
    hasMore: false,
  },
}

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await eventsService.getEvents(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events')
    }
  }
)

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await eventsService.getEventById(eventId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event')
    }
  }
)

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await eventsService.createEvent(eventData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create event')
    }
  }
)

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ eventId, eventData }, { rejectWithValue }) => {
    try {
      const response = await eventsService.updateEvent(eventId, eventData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update event')
    }
  }
)

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      await eventsService.deleteEvent(eventId)
      return eventId
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete event')
    }
  }
)

// Events slice
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        status: '',
        dateRange: null,
        search: '',
      }
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload
    },
    clearCurrentEvent: (state) => {
      state.currentEvent = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload.events || []
        state.pagination = action.payload.pagination || state.pagination
        state.error = null
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.events = []
      })
      
      // Fetch Event by ID
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false
        state.currentEvent = action.payload.event
        state.error = null
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.currentEvent = null
      })
      
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false
        state.events.unshift(action.payload.event)
        state.error = null
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Update Event
      .addCase(updateEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false
        const index = state.events.findIndex(event => event._id === action.payload.event._id)
        if (index !== -1) {
          state.events[index] = action.payload.event
        }
        if (state.currentEvent && state.currentEvent._id === action.payload.event._id) {
          state.currentEvent = action.payload.event
        }
        state.error = null
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Delete Event
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false
        state.events = state.events.filter(event => event._id !== action.payload)
        if (state.currentEvent && state.currentEvent._id === action.payload) {
          state.currentEvent = null
        }
        state.error = null
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { 
  clearError, 
  setFilters, 
  clearFilters, 
  setCurrentEvent, 
  clearCurrentEvent 
} = eventsSlice.actions

export default eventsSlice.reducer