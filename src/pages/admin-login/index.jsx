import React from 'react';
import { useAuth } from '../../components/ui/AuthenticationBoundary';
import LoginForm from './components/LoginForm';
import SecurityFeatures from './components/SecurityFeatures';
import InstitutionalBranding from './components/InstitutionalBranding';
import Icon from '../../components/AppIcon';

const AdminLogin = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-pulse">
            <Icon name="Calendar" size={28} color="white" />
          </div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column - Institutional Branding */}
            <div className="lg:order-1 flex justify-center lg:justify-start">
              <InstitutionalBranding />
            </div>

            {/* Center Column - Login Form */}
            <div className="lg:order-2 flex justify-center">
              <LoginForm />
            </div>

            {/* Right Column - Security Features */}
            <div className="lg:order-3 flex justify-center lg:justify-end">
              <SecurityFeatures />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-surface border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Calendar" size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">MITS Fest Manager</p>
                <p className="text-xs text-muted-foreground">Administrative Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()} MITS. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} />
                <span>Secure Platform</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;