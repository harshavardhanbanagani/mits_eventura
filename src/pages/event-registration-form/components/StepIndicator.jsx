import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Event Details', icon: 'Info' },
    { id: 2, title: 'Registration', icon: 'User' },
    { id: 3, title: 'Payment', icon: 'CreditCard' }
  ];

  return (
    <div className="bg-surface border-b border-border px-4 py-4 mb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                    currentStep === step.id
                      ? 'bg-primary border-primary text-primary-foreground'
                      : currentStep > step.id
                      ? 'bg-success border-success text-success-foreground'
                      : 'bg-muted border-border text-muted-foreground'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Icon name="Check" size={18} />
                  ) : (
                    <Icon name={step.icon} size={18} />
                  )}
                </div>
                <div className="hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground">Step {step.id} of {totalSteps}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-0.5 transition-colors duration-200 ${
                      currentStep > step.id ? 'bg-success' : 'bg-border'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Step Info */}
        <div className="sm:hidden mt-3 text-center">
          <p className="text-sm font-medium text-foreground">
            {steps.find(step => step.id === currentStep)?.title}
          </p>
          <p className="text-xs text-muted-foreground">Step {currentStep} of {totalSteps}</p>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;