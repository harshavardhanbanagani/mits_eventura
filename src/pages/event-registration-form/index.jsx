import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PublicHeader from '../../components/ui/PublicHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import EventDetailsCard from './components/EventDetailsCard';
import RegistrationForm from './components/RegistrationForm';
import PaymentSection from './components/PaymentSection';
import StepIndicator from './components/StepIndicator';
import Icon from '../../components/AppIcon';

const EventRegistrationForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    rollNumber: '',
    teamMembers: []
  });

  // Mock event data - in real app, this would come from API based on event ID
  const mockEvent = {
    id: searchParams.get('eventId') || '1',
    name: 'Code Quest - Programming Competition',
    department: 'Computer Science & Engineering',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
    date: '25th July 2025',
    time: '10:00 AM - 4:00 PM',
    venue: 'Computer Lab - Block A',
    fees: 150,
    teamSize: 'Individual or Team (Max 3)',
    isTeamEvent: true,
    maxTeamSize: 3,
    description: `Join the ultimate programming challenge where coding meets creativity! Code Quest is designed to test your problem-solving skills, algorithmic thinking, and programming expertise across multiple rounds of exciting challenges.

Participants will face a series of coding problems ranging from basic algorithms to complex data structures. The competition includes debugging challenges, optimization tasks, and innovative problem-solving scenarios.`,
    rules: [
      'Participants can compete individually or in teams of maximum 3 members',
      'All team members must be from the same institution',
      'Laptops and programming environments will be provided',
      'Internet access will be restricted during the competition',
      'Plagiarism or unfair means will lead to immediate disqualification',
      'Decision of judges will be final and binding',
      'Participants must carry valid college ID cards',
      'Registration fee is non-refundable'
    ],
    customFields: [
      {
        name: 'programmingLanguage',
        label: 'Preferred Programming Language',
        type: 'text',
        placeholder: 'e.g., Python, Java, C++',
        required: true
      },
      {
        name: 'experience',
        label: 'Programming Experience (in years)',
        type: 'number',
        placeholder: 'Enter years of experience',
        required: false
      }
    ]
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/public-homepage', icon: 'Home' },
    { label: 'Events', path: '/public-homepage#events', icon: 'Calendar' },
    { label: mockEvent.department, path: null, icon: 'Building' },
    { label: mockEvent.name, path: null, icon: 'Trophy' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handlePaymentComplete = (paymentData) => {
    const registrationData = {
      ...formData,
      ...paymentData,
      eventId: mockEvent.id,
      eventName: mockEvent.name,
      registrationDate: new Date().toISOString()
    };
    
    setFormData(registrationData);
    
    // In real app, save to backend
    console.log('Registration completed:', registrationData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <EventDetailsCard event={mockEvent} />
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-150"
              >
                <span>Start Registration</span>
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <RegistrationForm
            event={mockEvent}
            formData={formData}
            onFormChange={handleFormChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <PaymentSection
            event={mockEvent}
            formData={formData}
            onPaymentComplete={handlePaymentComplete}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  // Redirect if no event ID is provided
  useEffect(() => {
    if (!searchParams.get('eventId')) {
      navigate('/public-homepage');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail 
            items={breadcrumbItems}
            currentStep={currentStep}
            totalSteps={3}
            showProgress={true}
          />
          
          <StepIndicator currentStep={currentStep} totalSteps={3} />
          
          <div className="pb-8">
            {renderStepContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventRegistrationForm;