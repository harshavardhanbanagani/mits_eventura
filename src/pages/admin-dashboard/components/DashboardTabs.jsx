import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'BarChart3',
      description: 'Dashboard summary and key metrics'
    },
    {
      id: 'events',
      label: 'Events',
      icon: 'Calendar',
      description: 'Manage fest events and activities',
      route: '/events-management'
    },
    {
      id: 'registrations',
      label: 'Registrations',
      icon: 'Users',
      description: 'View and manage student registrations',
      route: '/registration-management'
    },
    {
      id: 'certificates',
      label: 'Certificates',
      icon: 'Award',
      description: 'Generate and manage certificates'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      description: 'System configuration and preferences'
    }
  ];

  const handleTabClick = (tab) => {
    if (tab.route) {
      navigate(tab.route);
    } else {
      setActiveTab(tab.id);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg border border-border p-6 shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Performance</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Registration Rate</span>
                    <span className="text-sm font-medium text-foreground">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Payment Success</span>
                    <span className="text-sm font-medium text-foreground">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Certificate Issued</span>
                    <span className="text-sm font-medium text-foreground">76%</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6 shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={20} className="text-success" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Upcoming Events</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Code Quest Finals</p>
                      <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Tech Symposium</p>
                      <p className="text-xs text-muted-foreground">July 18, 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Robotics Workshop</p>
                      <p className="text-xs text-muted-foreground">July 20, 9:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6 shadow-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Alerts</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-error rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Payment Gateway</p>
                      <p className="text-xs text-muted-foreground">QR code expires in 2 days</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Storage Space</p>
                      <p className="text-xs text-muted-foreground">85% of quota used</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'certificates':
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6 shadow-card">
              <h4 className="text-lg font-semibold text-foreground mb-4">Certificate Management</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Certificates Generated</p>
                      <p className="text-sm text-muted-foreground">Total issued this month</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">234</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Pending Certificates</p>
                      <p className="text-sm text-muted-foreground">Awaiting generation</p>
                    </div>
                    <span className="text-2xl font-bold text-warning">12</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button
                    variant="default"
                    fullWidth
                    iconName="Award"
                    iconPosition="left"
                  >
                    Generate Certificates
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Upload Template
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download Batch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6 shadow-card">
              <h4 className="text-lg font-semibold text-foreground mb-4">System Settings</h4>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-medium text-foreground">Payment Configuration</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm text-foreground">UPI Payment</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-success rounded-full" />
                          <span className="text-sm text-success">Active</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" fullWidth>
                        Update QR Code
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h5 className="font-medium text-foreground">Email Configuration</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm text-foreground">SMTP Server</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-success rounded-full" />
                          <span className="text-sm text-success">Connected</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" fullWidth>
                        Test Email
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h5 className="font-medium text-foreground mb-3">Data Management</h5>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" iconName="Download">
                      Export Data
                    </Button>
                    <Button variant="outline" size="sm" iconName="Upload">
                      Import Data
                    </Button>
                    <Button variant="outline" size="sm" iconName="RefreshCw">
                      Backup Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex items-center space-x-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              <Icon name={tab.icon} size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default DashboardTabs;