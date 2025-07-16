import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-error/10 text-error'
    };
    return colors[color] || colors.primary;
  };

  const getChangeIcon = (type) => {
    if (type === 'increase') return 'TrendingUp';
    if (type === 'decrease') return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = (type) => {
    if (type === 'increase') return 'text-success';
    if (type === 'decrease') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card hover:shadow-elevated transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <div className={`flex items-center space-x-1 mt-2 ${getChangeColor(changeType)}`}>
              <Icon name={getChangeIcon(changeType)} size={16} />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;