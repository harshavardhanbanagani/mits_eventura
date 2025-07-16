import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const festDetails = {
    name: "MITS TechFest 2025",
    tagline: "Innovation • Technology • Excellence",
    dates: {
      start: "March 15, 2025",
      end: "March 17, 2025"
    },
    venue: "MITS Campus, Madanapalle",
    highlights: [
      "50+ Technical Events",
      "₹2,00,000+ Prize Pool",
      "Industry Expert Sessions",
      "Innovation Showcase"
    ]
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Icon name="Calendar" size={16} />
              <span>Registration Open</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {festDetails.name}
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                {festDetails.tagline}
              </p>
            </div>

            {/* Event Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Event Dates</p>
                  <p className="font-semibold text-foreground">{festDetails.dates.start}</p>
                  <p className="text-sm text-muted-foreground">to {festDetails.dates.end}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg border border-border">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Venue</p>
                  <p className="font-semibold text-foreground">MITS Campus</p>
                  <p className="text-sm text-muted-foreground">Madanapalle</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {festDetails.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-muted-foreground">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/event-registration-form">
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="Calendar" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Register Now
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                iconName="Download" 
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Download Brochure
              </Button>
            </div>
          </div>

          {/* Visual Section */}
          <div className="relative">
            <div className="relative bg-surface rounded-2xl p-8 shadow-elevated border border-border">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
                alt="MITS TechFest 2025 - Students participating in technical events"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-xs text-muted-foreground">Events</p>
                </div>
                <div className="text-center p-3 bg-accent/5 rounded-lg">
                  <p className="text-2xl font-bold text-accent">₹2L+</p>
                  <p className="text-xs text-muted-foreground">Prizes</p>
                </div>
                <div className="text-center p-3 bg-success/5 rounded-lg">
                  <p className="text-2xl font-bold text-success">1000+</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Trophy" size={32} className="text-primary" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Zap" size={24} className="text-accent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;