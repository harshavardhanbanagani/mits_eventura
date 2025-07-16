import axios from 'axios';

// API Base Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/admin-login';
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access forbidden');
    } else if (error.response?.status >= 500) {
      // Server error
      console.error('Server error:', error.response.data?.message);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    validate: '/auth/validate',
    refresh: '/auth/refresh',
  },
  // Events
  events: {
    list: '/events',
    create: '/events',
    getById: (id) => `/events/${id}`,
    update: (id) => `/events/${id}`,
    delete: (id) => `/events/${id}`,
    byDepartment: (dept) => `/events/department/${dept}`,
    stats: '/events/stats',
  },
  // Registrations
  registrations: {
    list: '/registrations',
    create: '/registrations',
    getById: (id) => `/registrations/${id}`,
    updateStatus: (id) => `/registrations/${id}/status`,
    stats: '/registrations/stats',
    export: '/registrations/export',
    payment: (id) => `/registrations/${id}/payment`,
  },
  // Notifications
  notifications: {
    list: '/notifications',
    markRead: (id) => `/notifications/${id}/read`,
    markAllRead: '/notifications/read-all',
    delete: (id) => `/notifications/${id}`,
    subscribe: '/notifications/subscribe',
    settings: '/notifications/settings',
  },
  // Admin
  admin: {
    dashboard: '/admin/dashboard',
    users: '/admin/users',
    reports: '/admin/reports',
    settings: '/admin/settings',
  },
  // Payments
  payments: {
    process: '/payments/process',
    verify: '/payments/verify',
    refund: '/payments/refund',
    history: '/payments/history',
  },
};

// Helper functions for common API patterns
export const apiHelpers = {
  // Generic CRUD operations
  get: (url, params = {}) => api.get(url, { params }),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  patch: (url, data) => api.patch(url, data),
  delete: (url) => api.delete(url),

  // File upload
  upload: (url, formData, onProgress) => {
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: onProgress,
    });
  },

  // Download file
  download: async (url, filename, params = {}) => {
    const response = await api.get(url, {
      params,
      responseType: 'blob',
    });
    
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  },
};

export default api;