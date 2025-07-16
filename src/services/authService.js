import { api, endpoints } from './api';

export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await api.post(endpoints.auth.login, credentials);
      return response;
    } catch (error) {
      // For development, return mock data if API is not available
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockLogin(credentials);
      }
      throw error;
    }
  },

  // Logout user
  async logout() {
    try {
      await api.post(endpoints.auth.logout);
    } catch (error) {
      // Even if logout fails on server, we should clear local state
      console.warn('Logout request failed:', error.message);
    }
  },

  // Validate token
  async validateToken(token) {
    try {
      const response = await api.get(endpoints.auth.validate, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response;
    } catch (error) {
      // For development, return mock validation
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockValidateToken(token);
      }
      throw error;
    }
  },

  // Refresh token
  async refreshToken() {
    try {
      const response = await api.post(endpoints.auth.refresh);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Mock functions for development
  mockLogin(credentials) {
    const { email, password } = credentials;
    
    // Simple mock validation
    if (email === 'admin@mits.edu' && password === 'admin123') {
      const mockUser = {
        id: 1,
        email: 'admin@mits.edu',
        name: 'Admin User',
        role: 'admin',
        permissions: ['read', 'write', 'delete'],
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      return {
        user: mockUser,
        token: mockToken,
        expiresAt: expiresAt.toISOString(),
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  mockValidateToken(token) {
    if (token && token.startsWith('mock-jwt-token-')) {
      const mockUser = {
        id: 1,
        email: 'admin@mits.edu',
        name: 'Admin User',
        role: 'admin',
        permissions: ['read', 'write', 'delete'],
      };
      
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      return {
        user: mockUser,
        expiresAt: expiresAt.toISOString(),
      };
    } else {
      throw new Error('Invalid token');
    }
  },

  // Password utilities
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};