import React from 'react';
import PublicHeader from '../../components/ui/PublicHeader';
import HeroSection from './components/HeroSection';
import QuickStats from './components/QuickStats';
import DepartmentCard from './components/DepartmentCard';
import SearchSection from './components/SearchSection';
import FloatingActionButton from './components/FloatingActionButton';
import FestFooter from './components/FestFooter';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';



const PublicHomepage = () => {
  // Mock departments data
  const departments = [
    {
      id: 1,
      name: "Computer Science & Engineering",
      eventCount: 12,
      icon: "Code",
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop",
      description: "Explore cutting-edge programming competitions, hackathons, and software development challenges that test your coding prowess and innovation skills.",
      featuredEvent: {
        name: "Code Combat Championship",
        date: "March 15, 2025",
        fee: "₹100"
      },
      events: [
        {
          name: "Code Combat Championship",
          date: "March 15, 2025",
          time: "10:00 AM",
          fee: "₹100",
          teamSize: "Individual",
          description: "Competitive programming contest with algorithmic challenges and real-time problem solving."
        },
        {
          name: "Web Development Sprint",
          date: "March 15, 2025",
          time: "2:00 PM",
          fee: "₹80",
          teamSize: "Individual",
          description: "Create responsive web applications within time constraints using modern frameworks."
        },
        {
          name: "Hackathon 24hrs",
          date: "March 16, 2025",
          time: "9:00 AM",
          fee: "₹200",
          teamSize: "Team (4)",
          description: "24-hour coding marathon to develop innovative solutions for real-world problems."
        },
        {
          name: "AI/ML Challenge",
          date: "March 17, 2025",
          time: "11:00 AM",
          fee: "₹150",
          teamSize: "Team (3)",
          description: "Machine learning competition focusing on data analysis and predictive modeling."
        }
      ]
    },
    {
      id: 2,
      name: "Electronics & Communication",
      eventCount: 10,
      icon: "Zap",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
      description: "Dive into electronics design, circuit building, and communication systems through hands-on competitions and innovative project showcases.",
      featuredEvent: {
        name: "Circuit Design Challenge",
        date: "March 16, 2025",
        fee: "₹150"
      },
      events: [
        {
          name: "Circuit Design Challenge",
          date: "March 16, 2025",
          time: "10:00 AM",
          fee: "₹150",
          teamSize: "Team (2)",
          description: "Design and implement electronic circuits for real-world applications and problems."
        },
        {
          name: "PCB Design Contest",
          date: "March 16, 2025",
          time: "2:00 PM",
          fee: "₹120",
          teamSize: "Individual",
          description: "Create professional PCB layouts using industry-standard design tools and practices."
        },
        {
          name: "Embedded Systems",
          date: "March 17, 2025",
          time: "9:00 AM",
          fee: "₹180",
          teamSize: "Team (3)",
          description: "Develop embedded solutions using microcontrollers and sensor integration."
        }
      ]
    },
    {
      id: 3,
      name: "Mechanical Engineering",
      eventCount: 8,
      icon: "Settings",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      description: "Experience mechanical innovation through robotics, design challenges, and engineering competitions that showcase practical problem-solving skills.",
      featuredEvent: {
        name: "Robo Wars Championship",
        date: "March 17, 2025",
        fee: "₹200"
      },
      events: [
        {
          name: "Robo Wars Championship",
          date: "March 17, 2025",
          time: "10:00 AM",
          fee: "₹200",
          teamSize: "Team (4)",
          description: "Build and battle robots in an arena competition with weight and size constraints."
        },
        {
          name: "CAD Design Contest",
          date: "March 15, 2025",
          time: "11:00 AM",
          fee: "₹100",
          teamSize: "Individual",
          description: "Create detailed 3D models and technical drawings using professional CAD software."
        },
        {
          name: "Bridge Building",
          date: "March 16, 2025",
          time: "3:00 PM",
          fee: "₹150",
          teamSize: "Team (3)",
          description: "Design and construct bridges that can withstand maximum load with minimal materials."
        }
      ]
    },
    {
      id: 4,
      name: "Civil Engineering",
      eventCount: 6,
      icon: "Building",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
      description: "Engage in structural design, construction challenges, and urban planning competitions that reflect real-world civil engineering practices.",
      featuredEvent: {
        name: "Structural Design Challenge",
        date: "March 16, 2025",
        fee: "₹120"
      },
      events: [
        {
          name: "Structural Design Challenge",
          date: "March 16, 2025",
          time: "9:00 AM",
          fee: "₹120",
          teamSize: "Team (3)",
          description: "Design earthquake-resistant structures using engineering principles and materials."
        },
        {
          name: "Survey Competition",
          date: "March 17, 2025",
          time: "8:00 AM",
          fee: "₹100",
          teamSize: "Team (2)",
          description: "Conduct accurate land surveying using traditional and modern surveying instruments."
        }
      ]
    },
    {
      id: 5,
      name: "Electrical Engineering",
      eventCount: 7,
      icon: "Lightbulb",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
      description: "Explore power systems, renewable energy, and electrical innovations through practical competitions and design challenges.",
      featuredEvent: {
        name: "Power Grid Simulation",
        date: "March 15, 2025",
        fee: "₹130"
      },
      events: [
        {
          name: "Power Grid Simulation",
          date: "March 15, 2025",
          time: "1:00 PM",
          fee: "₹130",
          teamSize: "Team (3)",
          description: "Simulate and optimize electrical power distribution systems for efficiency."
        },
        {
          name: "Renewable Energy Design",
          date: "March 16, 2025",
          time: "10:00 AM",
          fee: "₹150",
          teamSize: "Team (4)",
          description: "Design sustainable energy solutions using solar, wind, and other renewable sources."
        }
      ]
    },
    {
      id: 6,
      name: "Information Technology",
      eventCount: 9,
      icon: "Monitor",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
      description: "Participate in database challenges, network security competitions, and IT infrastructure design events that mirror industry requirements.",
      featuredEvent: {
        name: "Database Design Contest",
        date: "March 16, 2025",
        fee: "₹90"
      },
      events: [
        {
          name: "Database Design Contest",
          date: "March 16, 2025",
          time: "11:00 AM",
          fee: "₹90",
          teamSize: "Individual",
          description: "Design efficient database schemas and optimize query performance for large datasets."
        },
        {
          name: "Cybersecurity Challenge",
          date: "March 17, 2025",
          time: "2:00 PM",
          fee: "₹120",
          teamSize: "Team (2)",
          description: "Identify vulnerabilities and implement security measures in simulated environments."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Global Navigation Header */}
      <PublicHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Quick Stats Section */}
      <QuickStats />

      {/* Search Section */}
      <SearchSection />

      {/* Departments Section */}
      <section className="py-16 bg-muted/20" id="departments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Explore Events by Department
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover exciting technical events organized by different engineering departments. Each department offers unique challenges and opportunities to showcase your skills.
            </p>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((department) => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>

          {/* View All Events CTA */}
          <div className="text-center mt-12">
            <div className="bg-surface rounded-xl p-8 border border-border shadow-card">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Ready to Participate?
              </h3>
              <p className="text-muted-foreground mb-6">
                Browse all events, register for competitions, and be part of MITS TechFest 2025.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/event-registration-form">
                  <Button 
                    variant="default" 
                    size="lg" 
                    iconName="Calendar" 
                    iconPosition="left"
                    className="w-full sm:w-auto"
                  >
                    View All Events
                  </Button>
                </a>
                <Button 
                  variant="outline" 
                  size="lg" 
                  iconName="Download" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Download Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about events, registration, or need technical support? Our team is here to help you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-surface rounded-xl p-6 border border-border shadow-card">
                <h3 className="text-xl font-semibold text-foreground mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Phone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <p className="text-muted-foreground">+91 8571-255-555</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="Mail" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-muted-foreground">techfest@mits.edu</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="MapPin" size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-muted-foreground">MITS Campus, Madanapalle<br />Andhra Pradesh - 517325</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden">
              <div className="h-80">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="MITS Campus Location"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=13.5513,78.5026&z=14&output=embed"
                  className="border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Footer */}
      <FestFooter />
    </div>
  );
};

export default PublicHomepage;