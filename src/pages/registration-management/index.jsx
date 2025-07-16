import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import AdminNavigation from '../../components/ui/AdminNavigation';
import RegistrationFilters from './components/RegistrationFilters';
import RegistrationStats from './components/RegistrationStats';
import RegistrationTable from './components/RegistrationTable';
import RegistrationModal from './components/RegistrationModal';
import ExportModal from './components/ExportModal';
import TablePagination from './components/TablePagination';
import Icon from '../../components/AppIcon';


const RegistrationManagement = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    event: '',
    paymentStatus: '',
    dateFrom: '',
    dateTo: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'registrationDate', direction: 'desc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock registration data
  const mockRegistrations = [
    {
      id: 1,
      registrationId: 'MITS2024001',
      studentName: 'Arjun Sharma',
      email: 'arjun.sharma@student.mits.edu',
      phone: '+91 9876543210',
      department: 'Computer Science & Engineering',
      year: '3rd Year',
      event: 'Tech Quiz Championship',
      teamMembers: [],
      paymentStatus: 'completed',
      paymentAmount: 200,
      registrationDate: '2024-07-10T09:30:00Z',
      lastUpdated: '2024-07-10T09:30:00Z',
      notes: 'Individual participation'
    },
    {
      id: 2,
      registrationId: 'MITS2024002',
      studentName: 'Priya Patel',
      email: 'priya.patel@student.mits.edu',
      phone: '+91 9876543211',
      department: 'Electronics & Communication',
      year: '2nd Year',
      event: 'Coding Contest',
      teamMembers: [
        { name: 'Rahul Kumar', email: 'rahul.kumar@student.mits.edu', department: 'CSE', year: '2nd Year' },
        { name: 'Sneha Gupta', email: 'sneha.gupta@student.mits.edu', department: 'ECE', year: '2nd Year' }
      ],
      paymentStatus: 'pending',
      paymentAmount: 300,
      registrationDate: '2024-07-11T14:15:00Z',
      lastUpdated: '2024-07-11T14:15:00Z',
      notes: 'Team of 3 members'
    },
    {
      id: 3,
      registrationId: 'MITS2024003',
      studentName: 'Vikram Singh',
      email: 'vikram.singh@student.mits.edu',
      phone: '+91 9876543212',
      department: 'Mechanical Engineering',
      year: '4th Year',
      event: 'Project Expo',
      teamMembers: [
        { name: 'Anita Rao', email: 'anita.rao@student.mits.edu', department: 'MECH', year: '4th Year' }
      ],
      paymentStatus: 'completed',
      paymentAmount: 500,
      registrationDate: '2024-07-12T11:45:00Z',
      lastUpdated: '2024-07-12T11:45:00Z',
      notes: 'Final year project showcase'
    },
    {
      id: 4,
      registrationId: 'MITS2024004',
      studentName: 'Kavya Reddy',
      email: 'kavya.reddy@student.mits.edu',
      phone: '+91 9876543213',
      department: 'Information Technology',
      year: '1st Year',
      event: 'Cultural Dance',
      teamMembers: [],
      paymentStatus: 'failed',
      paymentAmount: 150,
      registrationDate: '2024-07-13T16:20:00Z',
      lastUpdated: '2024-07-13T16:20:00Z',
      notes: 'Payment gateway error - needs retry'
    },
    {
      id: 5,
      registrationId: 'MITS2024005',
      studentName: 'Rohit Agarwal',
      email: 'rohit.agarwal@student.mits.edu',
      phone: '+91 9876543214',
      department: 'Civil Engineering',
      year: '3rd Year',
      event: 'Robotics Competition',
      teamMembers: [
        { name: 'Deepak Joshi', email: 'deepak.joshi@student.mits.edu', department: 'CIVIL', year: '3rd Year' },
        { name: 'Meera Shah', email: 'meera.shah@student.mits.edu', department: 'CIVIL', year: '3rd Year' },
        { name: 'Kiran Nair', email: 'kiran.nair@student.mits.edu', department: 'CIVIL', year: '3rd Year' }
      ],
      paymentStatus: 'completed',
      paymentAmount: 400,
      registrationDate: '2024-07-14T10:10:00Z',
      lastUpdated: '2024-07-14T10:10:00Z',
      notes: 'Team of 4 members - robotics project'
    },
    {
      id: 6,
      registrationId: 'MITS2024006',
      studentName: 'Neha Verma',
      email: 'neha.verma@student.mits.edu',
      phone: '+91 9876543215',
      department: 'Electrical & Electronics',
      year: '2nd Year',
      event: 'Paper Presentation',
      teamMembers: [],
      paymentStatus: 'pending',
      paymentAmount: 250,
      registrationDate: '2024-07-15T08:30:00Z',
      lastUpdated: '2024-07-15T08:30:00Z',
      notes: 'Research paper on renewable energy'
    }
  ];

  // Initialize data
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setRegistrations(mockRegistrations);
      setFilteredRegistrations(mockRegistrations);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = registrations.length;
    const completed = registrations.filter(r => r.paymentStatus === 'completed').length;
    const pending = registrations.filter(r => r.paymentStatus === 'pending').length;
    const totalRevenue = registrations
      .filter(r => r.paymentStatus === 'completed')
      .reduce((sum, r) => sum + r.paymentAmount, 0);
    const today = new Date().toDateString();
    const newToday = registrations.filter(r => 
      new Date(r.registrationDate).toDateString() === today
    ).length;

    return {
      totalRegistrations: total,
      completedPayments: completed,
      pendingPayments: pending,
      totalRevenue,
      newRegistrationsToday: newToday
    };
  }, [registrations]);

  // Filter and sort registrations
  useEffect(() => {
    let filtered = [...registrations];

    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(reg =>
        reg.studentName.toLowerCase().includes(searchTerm) ||
        reg.email.toLowerCase().includes(searchTerm) ||
        reg.registrationId.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.department) {
      filtered = filtered.filter(reg => reg.department === filters.department);
    }

    if (filters.event) {
      filtered = filtered.filter(reg => reg.event === filters.event);
    }

    if (filters.paymentStatus) {
      filtered = filtered.filter(reg => reg.paymentStatus === filters.paymentStatus);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(reg => 
        new Date(reg.registrationDate) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(reg => 
        new Date(reg.registrationDate) <= new Date(filters.dateTo)
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'registrationDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredRegistrations(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [registrations, filters, sortConfig]);

  // Pagination
  const paginatedRegistrations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRegistrations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRegistrations, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage);

  // Handlers
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRowSelect = (id, checked) => {
    setSelectedRows(prev =>
      checked ? [...prev, id] : prev.filter(rowId => rowId !== id)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedRows(checked ? paginatedRegistrations.map(r => r.id) : []);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for rows:`, selectedRows);
    // Implement bulk actions here
    setSelectedRows([]);
  };

  const handleRowAction = (action, registration) => {
    setSelectedRegistration(registration);
    setModalMode(action);
    setIsModalOpen(true);
  };

  const handleSaveRegistration = (updatedRegistration) => {
    setRegistrations(prev =>
      prev.map(reg =>
        reg.id === updatedRegistration.id ? updatedRegistration : reg
      )
    );
    setIsModalOpen(false);
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting data with config:', exportConfig);
    // Implement export functionality here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-3">
              <Icon name="Loader2" size={24} className="animate-spin text-primary" />
              <span className="text-muted-foreground">Loading registration data...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Registration Management - MITS Fest Manager</title>
        <meta name="description" content="Manage student registrations, view payment status, and export registration data for MITS college fest events." />
      </Helmet>

      <AdminNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Registration Management</h1>
          <p className="text-muted-foreground">
            View, filter, and manage student registrations for all fest events
          </p>
        </div>

        {/* Statistics */}
        <RegistrationStats stats={stats} />

        {/* Filters */}
        <RegistrationFilters
          onFilterChange={handleFilterChange}
          onExport={() => setIsExportModalOpen(true)}
          totalRegistrations={filteredRegistrations.length}
        />

        {/* Registration Table */}
        <RegistrationTable
          registrations={paginatedRegistrations}
          onSort={handleSort}
          sortConfig={sortConfig}
          onBulkAction={handleBulkAction}
          onRowAction={handleRowAction}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
        />

        {/* Pagination */}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredRegistrations.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />

        {/* Registration Modal */}
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          registration={selectedRegistration}
          onSave={handleSaveRegistration}
          mode={modalMode}
        />

        {/* Export Modal */}
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          onExport={handleExport}
          totalRecords={filteredRegistrations.length}
        />
      </div>
    </div>
  );
};

export default RegistrationManagement;