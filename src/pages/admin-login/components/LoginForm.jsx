import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationBoundary';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin-dashboard';

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const result = await login({
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        // Handle remember me functionality
        if (formData.rememberMe) {
          localStorage.setItem('rememberAdmin', 'true');
        }
        
        navigate(from, { replace: true });
      } else {
        setLoginAttempts(prev => prev + 1);
        setErrors({ 
          general: result.error || 'Invalid credentials. Please try again.' 
        });
      }
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      setErrors({ 
        general: 'Login failed. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset functionality would be implemented here.\nFor demo: Use admin@mits.edu / admin123');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface rounded-lg shadow-card border border-border p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Admin Login
          </h1>
          <p className="text-muted-foreground">
            Sign in to access the MITS Fest management dashboard
          </p>
        </div>

        {/* Login Attempts Warning */}
        {loginAttempts >= 3 && (
          <div className="bg-warning/10 border border-warning/20 rounded-md p-3 mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <p className="text-sm text-warning-foreground">
                Multiple failed attempts detected. Please verify your credentials.
              </p>
            </div>
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="bg-error/10 border border-error/20 rounded-md p-3 mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <p className="text-sm text-error-foreground">{errors.general}</p>
            </div>
          </div>
        )}

        {/* Demo Credentials Info */}
        <div className="bg-primary/10 border border-primary/20 rounded-md p-3 mb-6">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm">
              <p className="text-primary-foreground font-medium mb-1">Demo Credentials:</p>
              <p className="text-primary-foreground/80">Email: admin@mits.edu</p>
              <p className="text-primary-foreground/80">Password: admin123</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your admin email"
              error={errors.email}
              required
              disabled={isLoading}
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              error={errors.password}
              required
              disabled={isLoading}
              className="w-full pr-12"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150"
              disabled={isLoading}
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-colors duration-150"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName="LogIn"
            iconPosition="left"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Contact{' '}
            <a 
              href="mailto:support@mits.edu" 
              className="text-primary hover:text-primary/80 transition-colors duration-150"
            >
              IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;