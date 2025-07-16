import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RegistrationFilters = ({ onFilterChange, onExport, totalRegistrations }) => {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    event: '',
    paymentStatus: '',
    dateFrom: '',
    dateTo: ''
  });

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'cse', label: 'Computer Science & Engineering' },
    { value: 'ece', label: 'Electronics & Communication' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'eee', label: 'Electrical & Electronics' },
    { value: 'it', label: 'Information Technology' }
  ];

  const eventOptions = [
    { value: '', label: 'All Events' },
    { value: 'tech-quiz', label: 'Tech Quiz Championship' },
    { value: 'coding-contest', label: 'Coding Contest' },
    { value: 'project-expo', label: 'Project Expo' },
    { value: 'robotics', label: 'Robotics Competition' },
    { value: 'paper-presentation', label: 'Paper Presentation' },
    { value: 'cultural-dance', label: 'Cultural Dance' },
    { value: 'music-competition', label: 'Music Competition' },
    { value: 'debate', label: 'Debate Competition' }
  ];

  const paymentStatusOptions = [
    { value: '', label: 'All Payment Status' },
    { value: 'completed', label: 'Payment Completed' },
    { value: 'pending', label: 'Payment Pending' },
    { value: 'failed', label: 'Payment Failed' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      department: '',
      event: '',
      paymentStatus: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filter Registrations</h3>
          <span className="text-sm text-muted-foreground">
            ({totalRegistrations} total registrations)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
          >
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Search Input */}
        <div className="xl:col-span-2">
          <Input
            type="search"
            placeholder="Search by name, email, or registration ID..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Department Filter */}
        <Select
          options={departmentOptions}
          value={filters.department}
          onChange={(value) => handleFilterChange('department', value)}
          placeholder="Select Department"
        />

        {/* Event Filter */}
        <Select
          options={eventOptions}
          value={filters.event}
          onChange={(value) => handleFilterChange('event', value)}
          placeholder="Select Event"
        />

        {/* Payment Status Filter */}
        <Select
          options={paymentStatusOptions}
          value={filters.paymentStatus}
          onChange={(value) => handleFilterChange('paymentStatus', value)}
          placeholder="Payment Status"
        />

        {/* Date Range */}
        <div className="flex space-x-2">
          <Input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            placeholder="From Date"
            className="flex-1"
          />
          <Input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            placeholder="To Date"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationFilters;