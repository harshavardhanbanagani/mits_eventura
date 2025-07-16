import { api, endpoints } from './api';

export const eventsService = {
  // Get all events with optional filters
  async getEvents(filters = {}) {
    try {
      const response = await api.get(endpoints.events.list, { params: filters });
      return response;
    } catch (error) {
      // For development, return mock data
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.getMockEvents(filters);
      }
      throw error;
    }
  },

  // Get event by ID
  async getEventById(eventId) {
    try {
      const response = await api.get(endpoints.events.getById(eventId));
      return response;
    } catch (error) {
      // For development, return mock data
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.getMockEventById(eventId);
      }
      throw error;
    }
  },

  // Create new event
  async createEvent(eventData) {
    try {
      const response = await api.post(endpoints.events.create, eventData);
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockCreateEvent(eventData);
      }
      throw error;
    }
  },

  // Update existing event
  async updateEvent(eventId, eventData) {
    try {
      const response = await api.put(endpoints.events.update(eventId), eventData);
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockUpdateEvent(eventId, eventData);
      }
      throw error;
    }
  },

  // Delete event
  async deleteEvent(eventId) {
    try {
      const response = await api.delete(endpoints.events.delete(eventId));
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return { success: true };
      }
      throw error;
    }
  },

  // Get events by department
  async getEventsByDepartment(department) {
    try {
      const response = await api.get(endpoints.events.byDepartment(department));
      return response;
    } catch (error) {
      // For development, return mock data
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.getMockEventsByDepartment(department);
      }
      throw error;
    }
  },

  // Get event statistics
  async getEventStats() {
    try {
      const response = await api.get(endpoints.events.stats);
      return response;
    } catch (error) {
      // For development, return mock stats
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.getMockEventStats();
      }
      throw error;
    }
  },

  // Mock data for development
  getMockEvents(filters) {
    const mockEvents = [
      {
        id: 1,
        name: 'Code Quest - Programming Competition',
        department: 'Computer Science & Engineering',
        description: 'Ultimate programming challenge with algorithmic problems',
        date: '2025-03-15',
        time: '10:00 AM',
        venue: 'Computer Lab - Block A',
        fees: 150,
        maxParticipants: 100,
        registrationCount: 75,
        status: 'active',
        teamSize: 'Individual or Team (Max 3)',
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
        createdAt: '2025-01-15T00:00:00Z',
        updatedAt: '2025-01-20T00:00:00Z',
      },
      {
        id: 2,
        name: 'Circuit Design Challenge',
        department: 'Electronics & Communication',
        description: 'Design and implement electronic circuits',
        date: '2025-03-16',
        time: '10:00 AM',
        venue: 'Electronics Lab - Block B',
        fees: 150,
        maxParticipants: 50,
        registrationCount: 32,
        status: 'active',
        teamSize: 'Team (2)',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
        createdAt: '2025-01-16T00:00:00Z',
        updatedAt: '2025-01-21T00:00:00Z',
      },
    ];

    // Apply filters
    let filteredEvents = mockEvents;
    
    if (filters.department) {
      filteredEvents = filteredEvents.filter(event => 
        event.department.toLowerCase().includes(filters.department.toLowerCase())
      );
    }
    
    if (filters.status && filters.status !== 'all') {
      filteredEvents = filteredEvents.filter(event => event.status === filters.status);
    }
    
    if (filters.search) {
      filteredEvents = filteredEvents.filter(event =>
        event.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    return {
      events: filteredEvents,
      pagination: {
        page: filters.page || 1,
        limit: filters.limit || 10,
        total: filteredEvents.length,
        totalPages: Math.ceil(filteredEvents.length / (filters.limit || 10)),
      },
      stats: {
        totalEvents: mockEvents.length,
        activeEvents: mockEvents.filter(e => e.status === 'active').length,
        completedEvents: mockEvents.filter(e => e.status === 'completed').length,
        totalRegistrations: mockEvents.reduce((sum, e) => sum + e.registrationCount, 0),
      },
    };
  },

  getMockEventById(eventId) {
    const mockEvent = {
      id: parseInt(eventId),
      name: 'Code Quest - Programming Competition',
      department: 'Computer Science & Engineering',
      description: 'Ultimate programming challenge with algorithmic problems and real-time problem solving.',
      longDescription: `Join the ultimate programming challenge where coding meets creativity! Code Quest is designed to test your problem-solving skills, algorithmic thinking, and programming expertise across multiple rounds of exciting challenges.

Participants will face a series of coding problems ranging from basic algorithms to complex data structures. The competition includes debugging challenges, optimization tasks, and innovative problem-solving scenarios.`,
      date: '2025-03-15',
      time: '10:00 AM - 4:00 PM',
      venue: 'Computer Lab - Block A',
      fees: 150,
      maxParticipants: 100,
      registrationCount: 75,
      status: 'active',
      teamSize: 'Individual or Team (Max 3)',
      isTeamEvent: true,
      maxTeamSize: 3,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      rules: [
        'Participants can compete individually or in teams of maximum 3 members',
        'All team members must be from the same institution',
        'Laptops and programming environments will be provided',
        'Internet access will be restricted during the competition',
        'Plagiarism or unfair means will lead to immediate disqualification',
        'Decision of judges will be final and binding',
      ],
      customFields: [
        {
          name: 'programmingLanguage',
          label: 'Preferred Programming Language',
          type: 'text',
          required: true,
        },
        {
          name: 'experience',
          label: 'Programming Experience (in years)',
          type: 'number',
          required: false,
        },
      ],
      createdAt: '2025-01-15T00:00:00Z',
      updatedAt: '2025-01-20T00:00:00Z',
    };

    return mockEvent;
  },

  mockCreateEvent(eventData) {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      registrationCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newEvent;
  },

  mockUpdateEvent(eventId, eventData) {
    const updatedEvent = {
      id: parseInt(eventId),
      ...eventData,
      updatedAt: new Date().toISOString(),
    };
    return updatedEvent;
  },

  getMockEventsByDepartment(department) {
    const departmentEvents = this.getMockEvents({ department });
    return {
      department,
      events: departmentEvents.events,
    };
  },

  getMockEventStats() {
    return {
      totalEvents: 24,
      activeEvents: 18,
      completedEvents: 6,
      upcomingEvents: 12,
      totalRegistrations: 1247,
      averageRegistrations: 52,
      totalRevenue: 248900,
      departmentBreakdown: [
        { department: 'Computer Science & Engineering', eventCount: 8, registrations: 320 },
        { department: 'Electronics & Communication', eventCount: 6, registrations: 240 },
        { department: 'Mechanical Engineering', eventCount: 5, registrations: 200 },
        { department: 'Civil Engineering', eventCount: 3, registrations: 150 },
        { department: 'Electrical Engineering', eventCount: 2, registrations: 337 },
      ],
    };
  },
};