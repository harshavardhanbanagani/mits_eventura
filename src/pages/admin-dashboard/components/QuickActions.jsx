import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'add-event',
      label: 'Add Event',
      description: 'Create new fest event',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/events-management')
    },
    {
      id: 'view-registrations',
      label: 'View Registrations',
      description: 'Manage student registrations',
      icon: 'Users',
      variant: 'outline',
      onClick: () => navigate('/registration-management')
    },
    {
      id: 'generate-certificates',
      label: 'Generate Certificates',
      description: 'Issue completion certificates',
      icon: 'Award',
      variant: 'outline',
      onClick: () => navigate('/registration-management')
    },
    {
      id: 'download-reports',
      label: 'Download Reports',
      description: 'Export registration data',
      icon: 'Download',
      variant: 'outline',
      onClick: () => {
        // Mock download functionality
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,Name,Email,Event,Department\nPriya Sharma,priya@example.com,Code Quest,Computer Science\nRahul Kumar,rahul@example.com,Tech Symposium,Electronics';
        link.download = 'fest-registrations-report.csv';
        link.click();
      }
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
      </div>
      
      <div className="space-y-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            fullWidth
            iconName={action.icon}
            iconPosition="left"
            onClick={action.onClick}
            className="justify-start h-auto p-4"
          >
            <div className="flex flex-col items-start text-left">
              <span className="font-medium">{action.label}</span>
              <span className="text-xs text-muted-foreground mt-1">{action.description}</span>
            </div>
          </Button>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">System Status</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-success font-medium">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;