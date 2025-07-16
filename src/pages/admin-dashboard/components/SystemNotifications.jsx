import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Payment Gateway Alert',
      message: 'UPI QR code expires in 2 days. Please update payment settings.',
      timestamp: '1 hour ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'info',
      title: 'Registration Milestone',
      message: 'Congratulations! You have reached 500 total registrations.',
      timestamp: '3 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily data backup completed successfully at 2:00 AM.',
      timestamp: '6 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'error',
      title: 'Certificate Template Error',
      message: 'Unable to generate certificate for registration ID: REG001234.',
      timestamp: '1 day ago',
      read: false,
      priority: 'high'
    }
  ]);

  const getNotificationIcon = (type) => {
    const icons = {
      warning: 'AlertTriangle',
      info: 'Info',
      success: 'CheckCircle',
      error: 'XCircle'
    };
    return icons[type] || 'Bell';
  };

  const getNotificationColor = (type) => {
    const colors = {
      warning: 'text-warning',
      info: 'text-primary',
      success: 'text-success',
      error: 'text-error'
    };
    return colors[type] || 'text-muted-foreground';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'bg-error/10 text-error',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-success/10 text-success'
    };
    return badges[priority] || badges.low;
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">System Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Icon name="Bell" size={20} className="text-muted-foreground" />
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-lg border transition-colors duration-150 ${
                notification.read 
                  ? 'bg-muted/30 border-border' : 'bg-background border-border shadow-subtle'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                  <Icon name={getNotificationIcon(notification.type)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notification.title}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadge(notification.priority)}`}>
                      {notification.priority}
                    </span>
                  </div>
                  
                  <p className={`text-sm ${notification.read ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                    <div className="flex items-center space-x-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => dismissNotification(notification.id)}
                        iconName="X"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => setNotifications([])}
          >
            Clear All Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default SystemNotifications;