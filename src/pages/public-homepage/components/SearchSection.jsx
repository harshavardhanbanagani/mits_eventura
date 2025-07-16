import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search data
  const mockEvents = [
    {
      id: 1,
      name: "Code Combat",
      department: "Computer Science",
      date: "March 15, 2025",
      fee: "₹100",
      type: "Individual",
      description: "Competitive programming contest with algorithmic challenges"
    },
    {
      id: 2,
      name: "Circuit Design Challenge",
      department: "Electronics",
      date: "March 16, 2025",
      fee: "₹150",
      type: "Team",
      description: "Design and implement electronic circuits for real-world problems"
    },
    {
      id: 3,
      name: "Robo Wars",
      department: "Mechanical",
      date: "March 17, 2025",
      fee: "₹200",
      type: "Team",
      description: "Build and battle robots in an arena competition"
    },
    {
      id: 4,
      name: "Web Development Sprint",
      department: "Computer Science",
      date: "March 15, 2025",
      fee: "₹80",
      type: "Individual",
      description: "Create responsive web applications within time constraints"
    },
    {
      id: 5,
      name: "Innovation Showcase",
      department: "All Departments",
      date: "March 16, 2025",
      fee: "₹50",
      type: "Team",
      description: "Present innovative solutions to current technological challenges"
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      if (query.trim()) {
        const filtered = mockEvents.filter(event =>
          event.name.toLowerCase().includes(query.toLowerCase()) ||
          event.department.toLowerCase().includes(query.toLowerCase()) ||
          event.description.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
      } else {
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 300);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <section className="py-16 bg-background" id="search">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Find Your Perfect Event
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search through our extensive collection of technical events and competitions to find the ones that match your interests and skills.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search events, departments, or keywords..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 pr-12 h-14 text-lg"
            />
            
            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Icon 
                name={isSearching ? "Loader2" : "Search"} 
                size={20} 
                className={`text-muted-foreground ${isSearching ? 'animate-spin' : ''}`} 
              />
            </div>

            {/* Clear Button */}
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                <Icon name="X" size={20} />
              </button>
            )}
          </div>

          {/* Quick Search Suggestions */}
          {!searchQuery && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {['Programming', 'Robotics', 'Web Development', 'Electronics', 'Innovation'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSearch(suggestion)}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full text-sm transition-colors duration-150"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="max-w-4xl mx-auto">
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    Search Results ({searchResults.length})
                  </h3>
                  <Link to="/event-registration-form">
                    <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
                      View All Events
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4">
                  {searchResults.map((event) => (
                    <div
                      key={event.id}
                      className="bg-surface border border-border rounded-lg p-6 hover:shadow-card transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {event.name}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-3">
                            {event.description}
                          </p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-success mb-1">
                            {event.fee}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Entry Fee
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Icon name="Building" size={14} />
                            <span>{event.department}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Calendar" size={14} />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Users" size={14} />
                            <span>{event.type}</span>
                          </div>
                        </div>

                        <Link to="/event-registration-form">
                          <Button variant="default" size="sm" iconName="ArrowRight" iconPosition="right">
                            Register
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No events found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try searching with different keywords or browse all events.
                </p>
                <Link to="/event-registration-form">
                  <Button variant="outline" iconName="Calendar" iconPosition="left">
                    Browse All Events
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;