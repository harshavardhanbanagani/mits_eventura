import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const InstitutionalBranding = () => {
  const institutionStats = [
    {
      icon: 'Users',
      label: 'Active Students',
      value: '2,500+',
      color: 'text-primary'
    },
    {
      icon: 'BookOpen',
      label: 'Departments',
      value: '12',
      color: 'text-success'
    },
    {
      icon: 'Calendar',
      label: 'Annual Events',
      value: '50+',
      color: 'text-accent'
    },
    {
      icon: 'Award',
      label: 'Years of Excellence',
      value: '25+',
      color: 'text-secondary'
    }
  ];

  const quickLinks = [
    {
      label: 'Public Homepage',
      path: '/public-homepage',
      icon: 'Home',
      description: 'View public fest information'
    },
    {
      label: 'Event Registration',
      path: '/event-registration-form',
      icon: 'Calendar',
      description: 'Student registration portal'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0">
      <div className="bg-surface rounded-lg shadow-card border border-border overflow-hidden">
        {/* Header with Logo */}
        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={32} color="white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">MITS</h2>
              <p className="text-white/90 text-sm">Fest Management System</p>
            </div>
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Comprehensive digital platform for organizing and managing college department fest events with streamlined administration.
          </p>
        </div>

        {/* Institution Stats */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Institution Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            {institutionStats.map((stat, index) => (
              <div key={index} className="text-center p-3 rounded-md bg-muted/30">
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <Icon name={stat.icon} size={16} className={stat.color} />
                  </div>
                </div>
                <div className="text-lg font-semibold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Access</h3>
          <div className="space-y-3">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors duration-150 group"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-150">
                  <Icon name={link.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                    {link.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {link.description}
                  </div>
                </div>
                <Icon name="ExternalLink" size={14} className="text-muted-foreground group-hover:text-primary transition-colors duration-150" />
              </Link>
            ))}
          </div>
        </div>

        {/* Campus Image */}
        <div className="p-6">
          <div className="relative overflow-hidden rounded-md">
            <Image
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop"
              alt="MITS Campus View"
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <p className="text-sm font-medium">MITS Campus</p>
              <p className="text-xs opacity-90">Excellence in Education</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} MITS</span>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={12} />
              <span>Secure Login</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalBranding;