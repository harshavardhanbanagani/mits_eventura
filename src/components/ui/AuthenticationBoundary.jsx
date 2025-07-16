import React, { useState, useEffect, createContext, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

// Authentication Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('adminToken');
      const userData = localStorage.getItem('adminUser');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // Simulate API call - replace with actual authentication
      if (credentials.email === 'admin@mits.edu' && credentials.password === 'admin123') {
        const token = 'mock-jwt-token-' + Date.now();
        const userData = {
          id: 1,
          email: credentials.email,
          name: 'Administrator',
          role: 'admin'
        };

        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        
        setIsAuthenticated(true);
        setUser(userData);
        
        return { success: true };
      } else {
        return { 
          success: false, 
          error: 'Invalid credentials. Use admin@mits.edu / admin123' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
export const ProtectedRoute = ({ children, redirectTo = '/admin-login' }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

// Public Route Component (redirects authenticated users)
export const PublicRoute = ({ children, redirectTo = '/admin-dashboard' }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-pulse">
          <Icon name="Calendar" size={28} color="white" />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div className="w-full h-full bg-primary animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground">Loading MITS Fest Manager...</p>
        </div>
      </div>
    </div>
  );
};

// Main Authentication Boundary Component
const AuthenticationBoundary = ({ children, requireAuth = false, redirectTo }) => {
  if (requireAuth) {
    return (
      <ProtectedRoute redirectTo={redirectTo}>
        {children}
      </ProtectedRoute>
    );
  }

  return (
    <PublicRoute redirectTo={redirectTo}>
      {children}
    </PublicRoute>
  );
};

export default AuthenticationBoundary;