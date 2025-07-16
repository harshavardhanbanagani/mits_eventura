import { api, endpoints } from './api';

export const registrationsService = {
  // Get all registrations with optional filters
  async getRegistrations(filters = {}) {
    try {
      const response = await api.get(endpoints.registrations.list, { params: filters });
      return response;
    } catch (error) {
      // For development, return mock data
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.getMockRegistrations(filters);
      }
      throw error;
    }
  },

  // Create new registration
  async createRegistration(registrationData) {
    try {
      const response = await api.post(endpoints.registrations.create, registrationData);
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockCreateRegistration(registrationData);
      }
      throw error;
    }
  },

  // Get registration by ID
  async getRegistrationById(registrationId) {
    try {
      const response = await api.get(endpoints.registrations.getById(registrationId));
      return response;
    } catch (error) {
      // For development, return mock data
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.getMockRegistrationById(registrationId);
      }
      throw error;
    }
  },

  // Update registration status
  async updateRegistrationStatus(registrationId, status) {
    try {
      const response = await api.patch(endpoints.registrations.updateStatus(registrationId), { status });
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockUpdateRegistrationStatus(registrationId, status);
      }
      throw error;
    }
  },

  // Get registration statistics
  async getRegistrationStats() {
    try {
      const response = await api.get(endpoints.registrations.stats);
      return response;
    } catch (error) {
      // For development, return mock stats
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.getMockRegistrationStats();
      }
      throw error;
    }
  },

  // Export registrations
  async exportRegistrations(format, filters = {}) {
    try {
      const response = await api.get(endpoints.registrations.export, {
        params: { format, ...filters },
        responseType: 'blob',
      });
      
      // Create download link
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `registrations.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      // For development, simulate export
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockExportRegistrations(format, filters);
      }
      throw error;
    }
  },

  // Process payment
  async processPayment(registrationId, paymentData) {
    try {
      const response = await api.post(endpoints.registrations.payment(registrationId), paymentData);
      return response;
    } catch (error) {
      // For development, return mock response
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_API_URL) {
        return this.mockProcessPayment(registrationId, paymentData);
      }
      throw error;
    }
  },

  // Mock data for development
  getMockRegistrations(filters) {
    const mockRegistrations = [
      {
        id: 1,
        eventId: 1,
        eventName: 'Code Quest - Programming Competition',
        participantName: 'John Doe',
        email: 'john.doe@student.edu',
        phone: '+91 9876543210',
        department: 'Computer Science & Engineering',
        year: '3rd Year',
        rollNumber: 'CS20001',
        status: 'confirmed',
        paymentStatus: 'completed',
        teamMembers: [
          { name: 'Jane Smith', rollNumber: 'CS20002' },
          { name: 'Mike Johnson', rollNumber: 'CS20003' },
        ],
        registrationDate: '2025-01-20T10:30:00Z',
        paymentDate: '2025-01-20T10:35:00Z',
        amount: 150,
        transactionId: 'TXN123456789',
      },
      {
        id: 2,
        eventId: 2,
        eventName: 'Circuit Design Challenge',
        participantName: 'Alice Brown',
        email: 'alice.brown@student.edu',
        phone: '+91 9876543211',
        department: 'Electronics & Communication',
        year: '2nd Year',
        rollNumber: 'EC20010',
        status: 'pending',
        paymentStatus: 'pending',
        teamMembers: [
          { name: 'Bob Wilson', rollNumber: 'EC20011' },
        ],
        registrationDate: '2025-01-21T14:20:00Z',
        paymentDate: null,
        amount: 150,
        transactionId: null,
      },
    ];

    // Apply filters
    let filteredRegistrations = mockRegistrations;
    
    if (filters.eventId) {
      filteredRegistrations = filteredRegistrations.filter(reg => 
        reg.eventId.toString() === filters.eventId.toString()
      );
    }
    
    if (filters.status && filters.status !== 'all') {
      filteredRegistrations = filteredRegistrations.filter(reg => reg.status === filters.status);
    }
    
    if (filters.department) {
      filteredRegistrations = filteredRegistrations.filter(reg =>
        reg.department.toLowerCase().includes(filters.department.toLowerCase())
      );
    }
    
    if (filters.search) {
      filteredRegistrations = filteredRegistrations.filter(reg =>
        reg.participantName.toLowerCase().includes(filters.search.toLowerCase()) ||
        reg.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        reg.eventName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    return {
      registrations: filteredRegistrations,
      pagination: {
        page: filters.page || 1,
        limit: filters.limit || 10,
        total: filteredRegistrations.length,
        totalPages: Math.ceil(filteredRegistrations.length / (filters.limit || 10)),
      },
    };
  },

  mockCreateRegistration(registrationData) {
    const newRegistration = {
      id: Date.now(),
      ...registrationData,
      status: 'pending',
      paymentStatus: 'pending',
      registrationDate: new Date().toISOString(),
      paymentDate: null,
      transactionId: null,
    };
    return newRegistration;
  },

  getMockRegistrationById(registrationId) {
    const mockRegistration = {
      id: parseInt(registrationId),
      eventId: 1,
      eventName: 'Code Quest - Programming Competition',
      participantName: 'John Doe',
      email: 'john.doe@student.edu',
      phone: '+91 9876543210',
      department: 'Computer Science & Engineering',
      year: '3rd Year',
      rollNumber: 'CS20001',
      status: 'confirmed',
      paymentStatus: 'completed',
      teamMembers: [
        { name: 'Jane Smith', rollNumber: 'CS20002' },
        { name: 'Mike Johnson', rollNumber: 'CS20003' },
      ],
      customFields: {
        programmingLanguage: 'Python',
        experience: '2',
      },
      registrationDate: '2025-01-20T10:30:00Z',
      paymentDate: '2025-01-20T10:35:00Z',
      amount: 150,
      transactionId: 'TXN123456789',
    };
    return mockRegistration;
  },

  mockUpdateRegistrationStatus(registrationId, status) {
    const updatedRegistration = {
      id: parseInt(registrationId),
      status,
      updatedAt: new Date().toISOString(),
    };
    return updatedRegistration;
  },

  getMockRegistrationStats() {
    return {
      totalRegistrations: 1247,
      pendingPayments: 156,
      confirmedRegistrations: 1091,
      cancelledRegistrations: 45,
      totalRevenue: 248900,
      pendingRevenue: 23400,
      recentRegistrations: [
        {
          id: 101,
          participantName: 'Sarah Connor',
          eventName: 'Web Development Sprint',
          registrationDate: '2025-01-22T09:15:00Z',
          amount: 80,
        },
        {
          id: 102,
          participantName: 'David Miller',
          eventName: 'AI/ML Challenge',
          registrationDate: '2025-01-22T11:30:00Z',
          amount: 150,
        },
      ],
      departmentStats: [
        { department: 'Computer Science & Engineering', count: 420, revenue: 84000 },
        { department: 'Electronics & Communication', count: 320, revenue: 64000 },
        { department: 'Mechanical Engineering', count: 280, revenue: 56000 },
        { department: 'Civil Engineering', count: 150, revenue: 30000 },
        { department: 'Electrical Engineering', count: 77, revenue: 14900 },
      ],
      dailyRegistrations: [
        { date: '2025-01-18', count: 45 },
        { date: '2025-01-19', count: 67 },
        { date: '2025-01-20', count: 89 },
        { date: '2025-01-21', count: 78 },
        { date: '2025-01-22', count: 92 },
      ],
    };
  },

  mockExportRegistrations(format, filters) {
    // Simulate file export
    const mockData = this.getMockRegistrations(filters);
    const dataStr = format === 'json' 
      ? JSON.stringify(mockData.registrations, null, 2)
      : mockData.registrations.map(r => Object.values(r).join(',')).join('\n');
    
    const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `registrations.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true };
  },

  mockProcessPayment(registrationId, paymentData) {
    // Simulate payment processing
    const processedPayment = {
      id: parseInt(registrationId),
      status: 'confirmed',
      paymentStatus: 'completed',
      paymentDate: new Date().toISOString(),
      transactionId: 'TXN' + Date.now(),
      paymentMethod: paymentData.method || 'card',
      amount: paymentData.amount,
    };
    return processedPayment;
  },
};