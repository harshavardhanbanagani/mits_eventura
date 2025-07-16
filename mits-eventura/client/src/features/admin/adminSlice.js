import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminService from '../../services/adminService'

// Initial state
const initialState = {
  users: [],
  events: [],
  registrations: [],
  analytics: {
    totalUsers: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    recentActivity: [],
    monthlyStats: [],
  },
  loading: false,
  error: null,
}

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getDashboardStats()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats')
    }
  }
)

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllUsers(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users')
    }
  }
)

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateUserRole(userId, role)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user role')
    }
  }
)

export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      await adminService.deleteUser(userId)
      return userId
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete user')
    }
  }
)

export const fetchSystemLogs = createAsyncThunk(
  'admin/fetchSystemLogs',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await adminService.getSystemLogs(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch system logs')
    }
  }
)

// Admin slice
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false
        state.analytics = action.payload.analytics || state.analytics
        state.error = null
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users || []
        state.error = null
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.users = []
      })
      
      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false
        const index = state.users.findIndex(user => user._id === action.payload.user._id)
        if (index !== -1) {
          state.users[index] = action.payload.user
        }
        state.error = null
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter(user => user._id !== action.payload)
        state.error = null
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Fetch System Logs
      .addCase(fetchSystemLogs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSystemLogs.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
      })
      .addCase(fetchSystemLogs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, setLoading } = adminSlice.actions
export default adminSlice.reducer