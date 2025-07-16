import React, { useState, useEffect } from 'react';
import AdminNavigation from '../../components/ui/AdminNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import DepartmentPanel from './components/DepartmentPanel';
import EventsTable from './components/EventsTable';
import EventFormModal from './components/EventFormModal';
import BulkActionsBar from './components/BulkActionsBar';
import ExportModal from './components/ExportModal';


const EventsManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState(new Set());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Mock data initialization
  useEffect(() => {
    const mockDepartments = [
      {
        id: 1,
        name: 'Computer Science & Engineering',
        eventCount: 8,
        activeEvents: 6,
        totalRegistrations: 245,
        revenue: 18500
      },
      {
        id: 2,
        name: 'Electronics & Communication',
        eventCount: 6,
        activeEvents: 4,
        totalRegistrations: 189,
        revenue: 14200
      },
      {
        id: 3,
        name: 'Mechanical Engineering',
        eventCount: 5,
        activeEvents: 5,
        totalRegistrations: 156,
        revenue: 11800
      },
      {
        id: 4,
        name: 'Civil Engineering',
        eventCount: 4,
        activeEvents: 3,
        totalRegistrations: 98,
        revenue: 7350
      },
      {
        id: 5,
        name: 'Electrical Engineering',
        eventCount: 3,
        activeEvents: 2,
        totalRegistrations: 67,
        revenue: 5025
      }
    ];

    const mockEvents = [
      {
        id: 1,
        departmentId: 1,
        name: 'Code Sprint Championship',
        description: 'Competitive programming contest with algorithmic challenges and time-bound problem solving',
        date: '2025-07-25',
        time: '10:00',
        venue: 'Computer Lab A',
        fee: 150,
        maxParticipants: 100,
        registrations: 78,
        status: 'active',
        rules: `1. Individual participation only\n2. Duration: 3 hours\n3. Languages allowed: C, C++, Java, Python\n4. No external resources permitted\n5. Plagiarism will lead to disqualification`,
        customFields: [
          { id: 1, label: 'Programming Experience', type: 'select', required: true },
          { id: 2, label: 'Preferred Language', type: 'select', required: true }
        ]
      },
      {
        id: 2,
        departmentId: 1,
        name: 'Web Development Workshop',
        description: 'Hands-on workshop covering modern web technologies including React, Node.js, and database integration',
        date: '2025-07-28',
        time: '14:00',
        venue: 'Seminar Hall 1',
        fee: 200,
        maxParticipants: 50,
        registrations: 42,
        status: 'active',
        rules: `1. Bring your own laptop\n2. Basic HTML/CSS knowledge required\n3. Duration: 6 hours (2 days)\n4. Certificate provided\n5. Project submission mandatory`,
        customFields: [
          { id: 3, label: 'Laptop Specifications', type: 'textarea', required: true },
          { id: 4, label: 'Previous Web Experience', type: 'text', required: false }
        ]
      },
      {
        id: 3,
        departmentId: 1,
        name: 'AI/ML Hackathon',
        description: 'Build innovative AI solutions for real-world problems using machine learning and deep learning techniques',
        date: '2025-08-02',
        time: '09:00',
        venue: 'Innovation Lab',
        fee: 300,
        maxParticipants: 80,
        registrations: 65,
        status: 'active',
        rules: `1. Team size: 2-4 members\n2. Duration: 24 hours\n3. Datasets will be provided\n4. Use any ML framework\n5. Final presentation required`,
        customFields: [
          { id: 5, label: 'Team Members', type: 'textarea', required: true },
          { id: 6, label: 'ML Framework Preference', type: 'select', required: false }
        ]
      },
      {
        id: 4,
        departmentId: 2,
        name: 'Circuit Design Competition',
        description: 'Design and simulate electronic circuits for given specifications using industry-standard tools',
        date: '2025-07-30',
        time: '11:00',
        venue: 'Electronics Lab B',
        fee: 100,
        maxParticipants: 60,
        registrations: 45,
        status: 'active',
        rules: `1. Individual or team (max 2)\n2. Use Multisim or similar tools\n3. Duration: 4 hours\n4. Circuit simulation required\n5. Report submission mandatory`,
        customFields: [
          { id: 7, label: 'Software Proficiency', type: 'select', required: true }
        ]
      },
      {
        id: 5,
        departmentId: 2,
        name: 'IoT Innovation Challenge',
        description: 'Create Internet of Things solutions for smart city applications using sensors and microcontrollers',
        date: '2025-08-05',
        time: '10:30',
        venue: 'IoT Lab',
        fee: 250,
        maxParticipants: 40,
        registrations: 32,
        status: 'active',
        rules: `1. Team size: 3-5 members\n2. Hardware provided\n3. Duration: 8 hours\n4. Working prototype required\n5. Presentation and demo`,
        customFields: [
          { id: 8, label: 'Team Leader Contact', type: 'tel', required: true },
          { id: 9, label: 'Previous IoT Experience', type: 'textarea', required: false }
        ]
      }
    ];

    setDepartments(mockDepartments);
    setEvents(mockEvents);
    setSelectedDepartment(mockDepartments[0]);
  }, []);

  const breadcrumbItems = [
    { label: 'Admin Dashboard', path: '/admin-dashboard', icon: 'BarChart3' },
    { label: 'Events Management', path: null, icon: 'Calendar' }
  ];

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setSelectedEvents(new Set());
  };

  const handleAddDepartment = (name) => {
    const newDepartment = {
      id: Date.now(),
      name,
      eventCount: 0,
      activeEvents: 0,
      totalRegistrations: 0,
      revenue: 0
    };
    setDepartments(prev => [...prev, newDepartment]);
  };

  const handleEditDepartment = (deptId, newName) => {
    setDepartments(prev => prev.map(dept => 
      dept.id === deptId ? { ...dept, name: newName } : dept
    ));
  };

  const handleDeleteDepartment = (deptId) => {
    setDepartments(prev => prev.filter(dept => dept.id !== deptId));
    setEvents(prev => prev.filter(event => event.departmentId !== deptId));
    if (selectedDepartment?.id === deptId) {
      setSelectedDepartment(null);
    }
  };

  const handleAddEvent = (departmentId) => {
    setEditingEvent(null);
    setShowEventModal(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowEventModal(true);
  };

  const handleSaveEvent = (eventData) => {
    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? eventData : event
      ));
    } else {
      setEvents(prev => [...prev, eventData]);
      // Update department stats
      setDepartments(prev => prev.map(dept => 
        dept.id === eventData.departmentId 
          ? { ...dept, eventCount: dept.eventCount + 1, activeEvents: dept.activeEvents + (eventData.status === 'active' ? 1 : 0) }
          : dept
      ));
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      const event = events.find(e => e.id === eventId);
      setEvents(prev => prev.filter(e => e.id !== eventId));
      
      // Update department stats
      if (event) {
        setDepartments(prev => prev.map(dept => 
          dept.id === event.departmentId 
            ? { 
                ...dept, 
                eventCount: dept.eventCount - 1,
                activeEvents: dept.activeEvents - (event.status === 'active' ? 1 : 0),
                totalRegistrations: dept.totalRegistrations - event.registrations,
                revenue: dept.revenue - (event.fee * event.registrations)
              }
            : dept
        ));
      }
    }
  };

  const handleDuplicateEvent = (event) => {
    const duplicatedEvent = {
      ...event,
      id: Date.now(),
      name: `${event.name} (Copy)`,
      registrations: 0,
      status: 'inactive',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setEvents(prev => [...prev, duplicatedEvent]);
    
    // Update department stats
    setDepartments(prev => prev.map(dept => 
      dept.id === event.departmentId 
        ? { ...dept, eventCount: dept.eventCount + 1 }
        : dept
    ));
  };

  const handleViewRegistrations = (event) => {
    // Navigate to registration management with event filter
    window.location.href = `/registration-management?eventId=${event.id}`;
  };

  const handleBulkAction = (action, eventIds) => {
    switch (action) {
      case 'activate':
        setEvents(prev => prev.map(event => 
          eventIds.includes(event.id) ? { ...event, status: 'active' } : event
        ));
        break;
      case 'deactivate':
        setEvents(prev => prev.map(event => 
          eventIds.includes(event.id) ? { ...event, status: 'inactive' } : event
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${eventIds.length} event(s)?`)) {
          setEvents(prev => prev.filter(event => !eventIds.includes(event.id)));
        }
        break;
      case 'export':
        setShowExportModal(true);
        break;
    }
    setSelectedEvents(new Set());
  };

  const handleExport = (exportConfig) => {
    // Mock export functionality
    const { scope, format, fields } = exportConfig;
    
    let dataToExport = [];
    
    switch (scope) {
      case 'selected':
        dataToExport = events.filter(event => selectedEvents.has(event.id));
        break;
      case 'all':
        dataToExport = events;
        break;
      case 'active':
        dataToExport = events.filter(event => event.status === 'active');
        break;
      case 'inactive':
        dataToExport = events.filter(event => event.status === 'inactive');
        break;
    }

    // Simulate file download
    const fileName = `events_export_${new Date().toISOString().split('T')[0]}.${format}`;
    console.log(`Exporting ${dataToExport.length} events to ${fileName} with fields:`, fields);
    
    // In a real application, this would generate and download the actual file
    alert(`Export completed! ${dataToExport.length} events exported to ${fileName}`);
  };

  const filteredEvents = selectedDepartment 
    ? events.filter(event => event.departmentId === selectedDepartment.id)
    : [];

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BreadcrumbTrail items={breadcrumbItems} />
        
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Events Management</h1>
              <p className="text-muted-foreground">
                Manage departments and events for MITS Fest {new Date().getFullYear()}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">{departments.length}</span> departments • 
                <span className="font-medium ml-1">{events.length}</span> events
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Department Panel */}
          <div className="lg:col-span-4">
            <DepartmentPanel
              departments={departments}
              selectedDepartment={selectedDepartment}
              onDepartmentSelect={handleDepartmentSelect}
              onAddDepartment={handleAddDepartment}
              onEditDepartment={handleEditDepartment}
              onDeleteDepartment={handleDeleteDepartment}
            />
          </div>

          {/* Events Table */}
          <div className="lg:col-span-8">
            <EventsTable
              events={filteredEvents}
              selectedDepartment={selectedDepartment}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
              onDuplicateEvent={handleDuplicateEvent}
              onViewRegistrations={handleViewRegistrations}
              onBulkAction={handleBulkAction}
            />
          </div>
        </div>
      </div>

      {/* Event Form Modal */}
      <EventFormModal
        isOpen={showEventModal}
        onClose={() => {
          setShowEventModal(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        event={editingEvent}
        departmentId={selectedDepartment?.id}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
        selectedEvents={Array.from(selectedEvents)}
        allEvents={events}
      />

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedEvents.size}
        onActivate={() => handleBulkAction('activate', Array.from(selectedEvents))}
        onDeactivate={() => handleBulkAction('deactivate', Array.from(selectedEvents))}
        onDelete={() => handleBulkAction('delete', Array.from(selectedEvents))}
        onExport={() => setShowExportModal(true)}
        onClearSelection={() => setSelectedEvents(new Set())}
      />
    </div>
  );
};

export default EventsManagement;