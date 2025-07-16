import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const [securityStatus, setSecurityStatus] = useState({
    sslEnabled: true,
    sessionTimeout: 30,
    lastUpdated: new Date().toLocaleDateString('en-IN')
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encryption',
      description: 'All data transmitted is encrypted using industry-standard SSL/TLS protocols',
      status: securityStatus.sslEnabled ? 'Active' : 'Inactive',
      statusColor: securityStatus.sslEnabled ? 'text-success' : 'text-error'
    },
    {
      icon: 'Clock',
      title: 'Session Management',
      description: `Automatic logout after ${securityStatus.sessionTimeout} minutes of inactivity`,
      status: 'Configured',
      statusColor: 'text-primary'
    },
    {
      icon: 'Eye',
      title: 'Activity Monitoring',
      description: 'All admin actions are logged and monitored for security purposes',
      status: 'Enabled',
      statusColor: 'text-success'
    },
    {
      icon: 'Lock',
      title: 'Access Control',
      description: 'Role-based permissions ensure appropriate access levels',
      status: 'Protected',
      statusColor: 'text-primary'
    }
  ];

  return (
    <div className="hidden lg:block w-full max-w-md">
      <div className="bg-surface rounded-lg shadow-card border border-border p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="ShieldCheck" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security Status</h3>
            <p className="text-sm text-muted-foreground">System protection overview</p>
          </div>
        </div>

        {/* Current Time */}
        <div className="bg-muted/50 rounded-md p-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Time</span>
            <span className="text-sm font-medium text-foreground">
              {currentTime.toLocaleTimeString('en-IN', { 
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-muted-foreground">Date</span>
            <span className="text-sm font-medium text-foreground">
              {currentTime.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Security Features */}
        <div className="space-y-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/30 transition-colors duration-150">
              <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={feature.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
                  <span className={`text-xs font-medium ${feature.statusColor}`}>
                    {feature.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Last Security Update */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>Last security update: {securityStatus.lastUpdated}</span>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={14} className="text-warning" />
            <span className="text-xs font-medium text-warning-foreground">Security Alert</span>
          </div>
          <p className="text-xs text-warning-foreground/80">
            Report suspicious activity immediately to{' '}
            <a href="mailto:security@mits.edu" className="underline hover:no-underline">
              security@mits.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;