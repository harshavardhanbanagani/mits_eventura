import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'registration',
      title: 'New Registration',
      description: 'Priya Sharma registered for Code Quest',
      timestamp: '2 minutes ago',
      icon: 'UserPlus',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      description: 'Rahul Kumar paid ₹200 for Tech Symposium',
      timestamp: '5 minutes ago',
      icon: 'CreditCard',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'certificate',
      title: 'Certificate Generated',
      description: 'Certificate issued for Anjali Patel - Web Design',
      timestamp: '12 minutes ago',
      icon: 'Award',
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'event',
      title: 'Event Updated',
      description: 'Robotics Challenge details modified',
      timestamp: '18 minutes ago',
      icon: 'Edit',
      color: 'text-muted-foreground'
    },
    {
      id: 5,
      type: 'registration',
      title: 'Team Registration',
      description: 'Team "Code Warriors" registered for Hackathon',
      timestamp: '25 minutes ago',
      icon: 'Users',
      color: 'text-success'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors duration-150">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${activity.color}`}>
              <Icon name={activity.icon} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;