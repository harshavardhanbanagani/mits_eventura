import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const quickActions = [
    {
      id: 1,
      label: 'Register Now',
      path: '/event-registration-form',
      icon: 'Calendar',
      color: 'bg-primary hover:bg-primary/90 text-white'
    },
    {
      id: 2,
      label: 'Download Brochure',
      path: '#',
      icon: 'Download',
      color: 'bg-accent hover:bg-accent/90 text-white'
    },
    {
      id: 3,
      label: 'Contact Us',
      path: '#contact',
      icon: 'Phone',
      color: 'bg-success hover:bg-success/90 text-white'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Actions Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
          {quickActions.map((action) => (
            <div key={action.id} className="flex items-center space-x-3">
              <div className="bg-surface px-3 py-2 rounded-lg shadow-elevated border border-border">
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {action.label}
                </span>
              </div>
              
              {action.path.startsWith('#') ? (
                <button
                  onClick={() => {
                    const element = document.querySelector(action.path);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsExpanded(false);
                  }}
                  className={`w-12 h-12 rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 ${action.color}`}
                >
                  <Icon name={action.icon} size={20} />
                </button>
              ) : (
                <Link
                  to={action.path}
                  className={`w-12 h-12 rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 ${action.color}`}
                  onClick={() => setIsExpanded(false)}
                >
                  <Icon name={action.icon} size={20} />
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <div className="flex flex-col space-y-3">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-muted hover:bg-muted/80 text-muted-foreground rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <Icon name="ArrowUp" size={20} />
        </button>

        {/* Main Action Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
          aria-label="Quick actions menu"
        >
          <Icon name={isExpanded ? "X" : "Plus"} size={24} />
        </button>
      </div>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;