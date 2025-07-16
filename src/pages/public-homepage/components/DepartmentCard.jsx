import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DepartmentCard = ({ department }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden">
      {/* Department Header */}
      <div className="relative">
        <Image
          src={department.image}
          alt={`${department.name} department events`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Department Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{department.name}</h3>
              <p className="text-white/80 text-sm">{department.eventCount} Events Available</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
              <Icon name={department.icon} size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Department Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {department.description}
        </p>

        {/* Featured Event Preview */}
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">{department.featuredEvent.name}</h4>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span>{department.featuredEvent.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-success font-medium">
              <Icon name="IndianRupee" size={14} />
              <span>{department.featuredEvent.fee}</span>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpansion}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="w-full mb-4"
        >
          {isExpanded ? 'Hide Events' : `View All ${department.eventCount} Events`}
        </Button>

        {/* Expanded Events List */}
        {isExpanded && (
          <div className="space-y-3 animate-slide-up">
            {department.events.map((event, index) => (
              <div key={index} className="border border-border rounded-lg p-3 hover:bg-muted/30 transition-colors duration-150">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-foreground">{event.name}</h5>
                  <div className="flex items-center space-x-1 text-success text-sm font-medium">
                    <Icon name="IndianRupee" size={12} />
                    <span>{event.fee}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={12} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={12} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={12} />
                    <span>{event.teamSize}</span>
                  </div>
                </div>

                {event.description && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {event.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <Link to="/event-registration-form" className="block mt-4">
          <Button 
            variant="default" 
            size="sm" 
            iconName="ArrowRight" 
            iconPosition="right"
            className="w-full"
          >
            Register for Events
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DepartmentCard;