import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = () => {
  const stats = [
    {
      id: 1,
      label: "Total Events",
      value: "50+",
      icon: "Calendar",
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Across all departments"
    },
    {
      id: 2,
      label: "Prize Pool",
      value: "₹2,00,000",
      icon: "Trophy",
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Total rewards"
    },
    {
      id: 3,
      label: "Participants",
      value: "1000+",
      icon: "Users",
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Expected registrations"
    },
    {
      id: 4,
      label: "Departments",
      value: "8",
      icon: "Building",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Engineering branches"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            MITS TechFest 2025 at a Glance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join the biggest technical festival of MITS with exciting events, competitions, and opportunities to showcase your skills.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-surface rounded-xl p-6 border border-border shadow-card hover:shadow-elevated transition-all duration-300 group"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={stat.icon} size={24} className={stat.color} />
              </div>

              {/* Value */}
              <div className="mb-2">
                <h3 className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>

              {/* Progress Indicator */}
              <div className="mt-4 w-full bg-muted rounded-full h-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-1000 ${
                    stat.color.replace('text-', 'bg-')
                  }`}
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-surface px-6 py-3 rounded-full border border-border shadow-subtle">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Registration closes on <span className="font-semibold text-foreground">March 10, 2025</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStats;