import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminNavigation = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationTabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin-dashboard',
      icon: 'BarChart3',
      description: 'Overview and analytics'
    },
    {
      id: 'events',
      label: 'Events',
      path: '/events-management',
      icon: 'Calendar',
      description: 'Manage fest events'
    },
    {
      id: 'registrations',
      label: 'Registrations',
      path: '/registration-management',
      icon: 'Users',
      description: 'Student registrations'
    }
  ];

  // Update active tab based on current route
  useEffect(() => {
    const currentTab = navigationTabs.find(tab => tab.path === location.pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-surface border-b border-border shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/admin-dashboard" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-150"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-foreground">MITS Admin</span>
                <span className="text-sm text-muted-foreground -mt-1">Fest Management</span>
              </div>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="User" size={16} />
              <span>Administrator</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
            >
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
            />
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden lg:flex border-t border-border">
          <nav className="flex space-x-8" role="tablist">
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`flex items-center space-x-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors duration-150 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`${tab.id}-panel`}
              >
                <Icon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-surface border-t border-border">
              {/* Mobile Navigation Tabs */}
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left transition-colors duration-150 ${
                    activeTab === tab.id
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab.icon} size={20} />
                  <div className="flex flex-col">
                    <span className="font-medium">{tab.label}</span>
                    <span className="text-xs text-muted-foreground">{tab.description}</span>
                  </div>
                </button>
              ))}
              
              {/* Mobile User Info and Logout */}
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground">
                  <Icon name="User" size={18} />
                  <span>Administrator</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left text-error hover:bg-error/10 transition-colors duration-150"
                >
                  <Icon name="LogOut" size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavigation;