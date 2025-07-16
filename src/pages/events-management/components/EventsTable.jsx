import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventsTable = ({ 
  events, 
  selectedDepartment, 
  onAddEvent, 
  onEditEvent, 
  onDeleteEvent, 
  onDuplicateEvent, 
  onViewRegistrations,
  onBulkAction 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedEvents, setSelectedEvents] = useState(new Set());
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFeeRange, setFilterFeeRange] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'completed', label: 'Completed' }
  ];

  const feeRangeOptions = [
    { value: 'all', label: 'All Fees' },
    { value: 'free', label: 'Free Events' },
    { value: 'low', label: '₹1 - ₹100' },
    { value: 'medium', label: '₹101 - ₹500' },
    { value: 'high', label: '₹500+' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;
    
    const matchesFee = filterFeeRange === 'all' || 
                      (filterFeeRange === 'free' && event.fee === 0) ||
                      (filterFeeRange === 'low' && event.fee >= 1 && event.fee <= 100) ||
                      (filterFeeRange === 'medium' && event.fee >= 101 && event.fee <= 500) ||
                      (filterFeeRange === 'high' && event.fee > 500);
    
    return matchesSearch && matchesStatus && matchesFee;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectEvent = (eventId) => {
    const newSelected = new Set(selectedEvents);
    if (newSelected.has(eventId)) {
      newSelected.delete(eventId);
    } else {
      newSelected.add(eventId);
    }
    setSelectedEvents(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedEvents.size === sortedEvents.length) {
      setSelectedEvents(new Set());
    } else {
      setSelectedEvents(new Set(sortedEvents.map(event => event.id)));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedEvents.size > 0) {
      onBulkAction(action, Array.from(selectedEvents));
      setSelectedEvents(new Set());
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'text-success', bg: 'bg-success/10', label: 'Active' },
      inactive: { color: 'text-warning', bg: 'bg-warning/10', label: 'Inactive' },
      completed: { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Completed' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}>
        {config.label}
      </span>
    );
  };

  if (!selectedDepartment) {
    return (
      <div className="bg-surface border border-border rounded-lg h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="Building" size={48} className="text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Select a Department</h3>
            <p className="text-muted-foreground">Choose a department from the left panel to view and manage events</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {selectedDepartment.name} Events
            </h3>
            <p className="text-sm text-muted-foreground">
              {sortedEvents.length} events found
            </p>
          </div>
          <Button
            variant="default"
            onClick={() => onAddEvent(selectedDepartment.id)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Event
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Filter by status"
          />
          <Select
            options={feeRangeOptions}
            value={filterFeeRange}
            onChange={setFilterFeeRange}
            placeholder="Filter by fee"
          />
          <div className="flex space-x-2">
            {selectedEvents.size > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                  iconName="Play"
                >
                  Activate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('deactivate')}
                  iconName="Pause"
                >
                  Deactivate
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  iconName="Trash2"
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-muted/30 sticky top-0">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedEvents.size === sortedEvents.length && sortedEvents.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-foreground">Event Name</span>
                  <Icon 
                    name={sortField === 'name' && sortDirection === 'desc' ? "ChevronDown" : "ChevronUp"} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-foreground">Date</span>
                  <Icon 
                    name={sortField === 'date' && sortDirection === 'desc' ? "ChevronDown" : "ChevronUp"} 
                    size={16} 
                  />
                </div>
              </th>
              <th 
                className="p-3 text-left cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('fee')}
              >
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-foreground">Fee</span>
                  <Icon 
                    name={sortField === 'fee' && sortDirection === 'desc' ? "ChevronDown" : "ChevronUp"} 
                    size={16} 
                  />
                </div>
              </th>
              <th className="p-3 text-left">
                <span className="font-medium text-foreground">Registrations</span>
              </th>
              <th className="p-3 text-left">
                <span className="font-medium text-foreground">Status</span>
              </th>
              <th className="p-3 text-left">
                <span className="font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedEvents.map((event) => (
              <tr key={event.id} className="border-b border-border hover:bg-muted/30">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedEvents.has(event.id)}
                    onChange={() => handleSelectEvent(event.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div>
                    <div className="font-medium text-foreground">{event.name}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-xs">
                      {event.description}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <div className="text-sm">
                    <div className="font-medium text-foreground">
                      {new Date(event.date).toLocaleDateString('en-IN')}
                    </div>
                    <div className="text-muted-foreground">
                      {event.time}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="font-medium text-foreground">
                    {event.fee === 0 ? 'Free' : `₹${event.fee.toLocaleString('en-IN')}`}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-sm">
                    <div className="font-medium text-foreground">{event.registrations}</div>
                    <div className="text-muted-foreground">
                      Max: {event.maxParticipants || 'Unlimited'}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  {getStatusBadge(event.status)}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditEvent(event)}
                      iconName="Edit2"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDuplicateEvent(event)}
                      iconName="Copy"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewRegistrations(event)}
                      iconName="Users"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteEvent(event.id)}
                      iconName="Trash2"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedEvents.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Events Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== 'all' || filterFeeRange !== 'all' ?'No events match your current filters' :'This department has no events yet'
              }
            </p>
            <Button
              variant="default"
              onClick={() => onAddEvent(selectedDepartment.id)}
              iconName="Plus"
              iconPosition="left"
            >
              Add First Event
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsTable;