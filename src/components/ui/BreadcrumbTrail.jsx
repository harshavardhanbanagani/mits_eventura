import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ 
  items = [], 
  currentStep = null, 
  totalSteps = null,
  showProgress = false 
}) => {
  // Default breadcrumb items if none provided
  const defaultItems = [
    { label: 'Home', path: '/public-homepage', icon: 'Home' },
    { label: 'Events', path: '/event-registration-form', icon: 'Calendar' }
  ];

  const breadcrumbItems = items.length > 0 ? items : defaultItems;

  return (
    <nav 
      className="flex items-center space-x-2 text-sm text-muted-foreground py-4"
      aria-label="Breadcrumb"
    >
      <div className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground/60" 
              />
            )}
            
            {item.path ? (
              <Link
                to={item.path}
                className="flex items-center space-x-1 hover:text-foreground transition-colors duration-150"
              >
                {item.icon && (
                  <Icon name={item.icon} size={14} />
                )}
                <span>{item.label}</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-1 text-foreground font-medium">
                {item.icon && (
                  <Icon name={item.icon} size={14} />
                )}
                <span>{item.label}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progress Indicator */}
      {showProgress && currentStep && totalSteps && (
        <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs font-medium">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default BreadcrumbTrail;