import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { notificationsService } from '../../services/notificationsService';

// Async thunks
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await notificationsService.getNotifications(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await notificationsService.markAsRead(notificationId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark as read');
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationsService.markAllAsRead();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark all as read');
    }
  }
);

export const deleteNotification = createAsyncThunk(
  'notifications/deleteNotification',
  async (notificationId, { rejectWithValue }) => {
    try {
      await notificationsService.deleteNotification(notificationId);
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete notification');
    }
  }
);

export const subscribeToNotifications = createAsyncThunk(
  'notifications/subscribeToNotifications',
  async (subscriptionData, { rejectWithValue }) => {
    try {
      const response = await notificationsService.subscribe(subscriptionData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to subscribe');
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,
    realTimeConnected: false,
    settings: {
      email: true,
      push: false,
      inApp: true,
      eventReminders: true,
      registrationUpdates: true,
      adminAlerts: true,
    },
    filters: {
      type: 'all',
      read: 'all',
      dateRange: null,
    },
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      hasMore: true,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    addNotification: (state, action) => {
      const notification = {
        ...action.payload,
        id: action.payload.id || Date.now() + Math.random(),
        timestamp: action.payload.timestamp || Date.now(),
        read: false,
      };
      state.notifications.unshift(notification);
      state.unreadCount += 1;
    },
    updateNotificationSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setRealTimeConnection: (state, action) => {
      state.realTimeConnected = action.payload;
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    updateNotificationLocal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.notifications.findIndex(n => n.id === id);
      if (index !== -1) {
        state.notifications[index] = { ...state.notifications[index], ...updates };
        if (updates.read === true && !state.notifications[index].read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
    },
    incrementUnreadCount: (state) => {
      state.unreadCount += 1;
    },
    resetUnreadCount: (state) => {
      state.unreadCount = 0;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        const { notifications, pagination, unreadCount } = action.payload;
        
        if (pagination.page === 1) {
          state.notifications = notifications;
        } else {
          state.notifications.push(...notifications);
        }
        
        state.pagination = pagination;
        state.unreadCount = unreadCount || 0;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notificationId = action.payload.id;
        const index = state.notifications.findIndex(n => n.id === notificationId);
        if (index !== -1 && !state.notifications[index].read) {
          state.notifications[index].read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach(notification => {
          notification.read = true;
        });
        state.unreadCount = 0;
      })
      // Delete notification
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const notificationId = action.payload;
        const index = state.notifications.findIndex(n => n.id === notificationId);
        if (index !== -1) {
          if (!state.notifications[index].read) {
            state.unreadCount = Math.max(0, state.unreadCount - 1);
          }
          state.notifications.splice(index, 1);
        }
      })
      // Subscribe to notifications
      .addCase(subscribeToNotifications.fulfilled, (state, action) => {
        state.settings = { ...state.settings, ...action.payload.settings };
      });
  },
});

export const {
  clearError,
  addNotification,
  updateNotificationSettings,
  setFilters,
  setRealTimeConnection,
  clearAllNotifications,
  updateNotificationLocal,
  incrementUnreadCount,
  resetUnreadCount,
  setPagination,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;