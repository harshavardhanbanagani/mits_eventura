import { api, endpoints } from './api';

export const notificationsService = {
  // Get all notifications with optional filters
  async getNotifications(params = {}) {
    try {
      const response = await api.get(endpoints.notifications.list, { params });
      return response;
    } catch (error) {
      // For development, return mock data
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.getMockNotifications(params);
      }
      throw error;
    }
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const response = await api.patch(endpoints.notifications.markRead(notificationId));
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockMarkAsRead(notificationId);
      }
      throw error;
    }
  },

  // Mark all notifications as read
  async markAllAsRead() {
    try {
      const response = await api.patch(endpoints.notifications.markAllRead);
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockMarkAllAsRead();
      }
      throw error;
    }
  },

  // Delete notification
  async deleteNotification(notificationId) {
    try {
      const response = await api.delete(endpoints.notifications.delete(notificationId));
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return { success: true };
      }
      throw error;
    }
  },

  // Subscribe to push notifications
  async subscribe(subscriptionData) {
    try {
      const response = await api.post(endpoints.notifications.subscribe, subscriptionData);
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockSubscribe(subscriptionData);
      }
      throw error;
    }
  },

  // Update notification settings
  async updateSettings(settings) {
    try {
      const response = await api.put(endpoints.notifications.settings, settings);
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockUpdateSettings(settings);
      }
      throw error;
    }
  },

  // Mock data for development
  getMockNotifications(params) {
    const mockNotifications = [
      {
        id: 1,
        type: 'registration',
        title: 'New Registration',
        message: 'John Doe registered for Code Quest - Programming Competition',
        data: {
          registrationId: 123,
          eventName: 'Code Quest - Programming Competition',
          participantName: 'John Doe',
        },
        read: false,
        timestamp: Date.now() - 300000, // 5 minutes ago
        priority: 'normal',
        category: 'registration_updates',
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'Payment of ₹150 received for registration #123',
        data: {
          registrationId: 123,
          amount: 150,
          transactionId: 'TXN123456789',
        },
        read: false,
        timestamp: Date.now() - 600000, // 10 minutes ago
        priority: 'normal',
        category: 'registration_updates',
      },
      {
        id: 3,
        type: 'event',
        title: 'Event Deadline Approaching',
        message: 'Registration deadline for Circuit Design Challenge is in 2 days',
        data: {
          eventId: 2,
          eventName: 'Circuit Design Challenge',
          deadline: '2025-03-14',
        },
        read: true,
        timestamp: Date.now() - 3600000, // 1 hour ago
        priority: 'high',
        category: 'event_reminders',
      },
      {
        id: 4,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance on Jan 25, 2025 from 2:00 AM to 4:00 AM',
        data: {
          maintenanceStart: '2025-01-25T02:00:00Z',
          maintenanceEnd: '2025-01-25T04:00:00Z',
        },
        read: true,
        timestamp: Date.now() - 7200000, // 2 hours ago
        priority: 'high',
        category: 'admin_alerts',
      },
      {
        id: 5,
        type: 'registration',
        title: 'Registration Cancelled',
        message: 'Registration #124 has been cancelled and refund processed',
        data: {
          registrationId: 124,
          refundAmount: 150,
          reason: 'User requested cancellation',
        },
        read: false,
        timestamp: Date.now() - 10800000, // 3 hours ago
        priority: 'normal',
        category: 'registration_updates',
      },
    ];

    // Apply filters
    let filteredNotifications = mockNotifications;
    
    if (params.type && params.type !== 'all') {
      filteredNotifications = filteredNotifications.filter(n => n.type === params.type);
    }
    
    if (params.read && params.read !== 'all') {
      const isRead = params.read === 'read';
      filteredNotifications = filteredNotifications.filter(n => n.read === isRead);
    }
    
    // Sort by timestamp (newest first)
    filteredNotifications.sort((a, b) => b.timestamp - a.timestamp);
    
    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);
    
    const unreadCount = mockNotifications.filter(n => !n.read).length;

    return {
      notifications: paginatedNotifications,
      pagination: {
        page,
        limit,
        total: filteredNotifications.length,
        totalPages: Math.ceil(filteredNotifications.length / limit),
        hasMore: endIndex < filteredNotifications.length,
      },
      unreadCount,
    };
  },

  mockMarkAsRead(notificationId) {
    return {
      id: parseInt(notificationId),
      read: true,
      readAt: new Date().toISOString(),
    };
  },

  mockMarkAllAsRead() {
    return {
      success: true,
      markedCount: 3, // Number of notifications marked as read
    };
  },

  mockSubscribe(subscriptionData) {
    return {
      success: true,
      settings: {
        email: subscriptionData.email || true,
        push: subscriptionData.push || false,
        inApp: subscriptionData.inApp || true,
        eventReminders: subscriptionData.eventReminders || true,
        registrationUpdates: subscriptionData.registrationUpdates || true,
        adminAlerts: subscriptionData.adminAlerts || true,
      },
    };
  },

  mockUpdateSettings(settings) {
    return {
      success: true,
      settings,
    };
  },

  // Real-time notification helpers
  initializeWebSocket(userId) {
    if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_WS_URL) {
      // Mock WebSocket for development
      return this.mockWebSocket();
    }

    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001/ws';
    const ws = new WebSocket(`${wsUrl}?userId=${userId}`);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
    
    return ws;
  },

  mockWebSocket() {
    // Mock WebSocket for development
    const mockWs = {
      onopen: null,
      onmessage: null,
      onerror: null,
      onclose: null,
      send: (data) => console.log('Mock WS send:', data),
      close: () => console.log('Mock WS closed'),
    };

    // Simulate connection
    setTimeout(() => {
      if (mockWs.onopen) mockWs.onopen();
    }, 100);

    // Simulate periodic notifications
    setInterval(() => {
      if (mockWs.onmessage) {
        const mockNotification = {
          type: 'notification',
          data: {
            id: Date.now(),
            type: 'registration',
            title: 'New Registration',
            message: `Mock user registered for event at ${new Date().toLocaleTimeString()}`,
            timestamp: Date.now(),
            read: false,
          },
        };
        mockWs.onmessage({ data: JSON.stringify(mockNotification) });
      }
    }, 30000); // Every 30 seconds

    return mockWs;
  },
};