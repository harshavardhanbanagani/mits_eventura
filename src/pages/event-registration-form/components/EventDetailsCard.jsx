import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EventDetailsCard = ({ event }) => {
  if (!event) return null;

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
        {/* Event Image */}
        <div className="w-full lg:w-48 h-48 lg:h-32 rounded-lg overflow-hidden mb-4 lg:mb-0 flex-shrink-0">
          <Image
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">{event.name}</h2>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                <Icon name="Building" size={16} />
                <span>{event.department}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              <Icon name="IndianRupee" size={14} />
              <span>₹{event.fees}</span>
            </div>
          </div>

          {/* Event Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-foreground">{event.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-foreground">{event.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-foreground">{event.venue}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-foreground">{event.teamSize}</span>
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          {/* Event Rules */}
          {event.rules && event.rules.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Rules & Guidelines</h3>
              <ul className="space-y-1">
                {event.rules.map((rule, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;