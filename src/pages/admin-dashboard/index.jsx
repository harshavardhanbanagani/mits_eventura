import React from 'react';
import AdminNavigation from '../../components/ui/AdminNavigation';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import RegistrationChart from './components/RegistrationChart';
import SystemNotifications from './components/SystemNotifications';
import DashboardTabs from './components/DashboardTabs';

const AdminDashboard = () => {
  const metricsData = [
    {
      title: 'Total Registrations',
      value: '1,247',
      change: '+12.5%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Total Revenue',
      value: '₹2,48,900',
      change: '+8.2%',
      changeType: 'increase',
      icon: 'CreditCard',
      color: 'success'
    },
    {
      title: 'Active Events',
      value: '24',
      change: '+3',
      changeType: 'increase',
      icon: 'Calendar',
      color: 'warning'
    },
    {
      title: 'Completion Rate',
      value: '87.3%',
      change: '+2.1%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'primary'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's what's happening with MITS Fest today.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Main Dashboard Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Charts Section */}
            <RegistrationChart />
            
            {/* Dashboard Tabs */}
            <DashboardTabs />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Activity Feed */}
            <ActivityFeed />
            
            {/* System Notifications */}
            <SystemNotifications />
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-card rounded-lg border border-border p-6 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">98.5%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">2.3s</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning mb-1">15.2GB</div>
              <div className="text-sm text-muted-foreground">Storage Used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;