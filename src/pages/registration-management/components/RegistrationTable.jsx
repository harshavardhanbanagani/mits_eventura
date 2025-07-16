import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationTable = ({ 
  registrations, 
  onSort, 
  sortConfig, 
  onBulkAction, 
  onRowAction,
  selectedRows,
  onRowSelect,
  onSelectAll 
}) => {
  const [rowDensity, setRowDensity] = useState('default'); // compact, default, comfortable

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'text-success bg-success/10', icon: 'CheckCircle', label: 'Completed' },
      pending: { color: 'text-warning bg-warning/10', icon: 'Clock', label: 'Pending' },
      failed: { color: 'text-error bg-error/10', icon: 'XCircle', label: 'Failed' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{config.label}</span>
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const rowPaddingClass = {
    compact: 'py-2',
    default: 'py-3',
    comfortable: 'py-4'
  }[rowDensity];

  const allSelected = selectedRows.length === registrations.length && registrations.length > 0;
  const someSelected = selectedRows.length > 0 && selectedRows.length < registrations.length;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Table Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Registration Records</h3>
          {selectedRows.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedRows.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('email')}
                iconName="Mail"
                iconPosition="left"
              >
                Send Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('certificate')}
                iconName="Award"
                iconPosition="left"
              >
                Generate Certificates
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Row density:</span>
          <select
            value={rowDensity}
            onChange={(e) => setRowDensity(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1 bg-surface"
          >
            <option value="compact">Compact</option>
            <option value="default">Default</option>
            <option value="comfortable">Comfortable</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              {[
                { key: 'registrationId', label: 'Registration ID' },
                { key: 'studentName', label: 'Student Name' },
                { key: 'email', label: 'Email' },
                { key: 'department', label: 'Department' },
                { key: 'event', label: 'Event' },
                { key: 'paymentStatus', label: 'Payment' },
                { key: 'registrationDate', label: 'Date' },
                { key: 'actions', label: 'Actions', sortable: false }
              ].map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-muted-foreground ${
                    column.sortable !== false ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                  onClick={() => column.sortable !== false && onSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable !== false && (
                      <Icon name={getSortIcon(column.key)} size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {registrations.map((registration) => (
              <tr
                key={registration.id}
                className={`hover:bg-muted/30 transition-colors ${rowPaddingClass}`}
              >
                <td className="px-4">
                  <Checkbox
                    checked={selectedRows.includes(registration.id)}
                    onChange={(e) => onRowSelect(registration.id, e.target.checked)}
                  />
                </td>
                <td className="px-4 font-mono text-sm text-primary">
                  {registration.registrationId}
                </td>
                <td className="px-4 font-medium text-foreground">
                  {registration.studentName}
                </td>
                <td className="px-4 text-sm text-muted-foreground">
                  {registration.email}
                </td>
                <td className="px-4 text-sm">
                  {registration.department}
                </td>
                <td className="px-4 text-sm">
                  {registration.event}
                </td>
                <td className="px-4">
                  {getPaymentStatusBadge(registration.paymentStatus)}
                </td>
                <td className="px-4 text-sm text-muted-foreground">
                  {formatDate(registration.registrationDate)}
                </td>
                <td className="px-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRowAction('view', registration)}
                      iconName="Eye"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRowAction('edit', registration)}
                      iconName="Edit"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRowAction('certificate', registration)}
                      iconName="Award"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden divide-y divide-border">
        {registrations.map((registration) => (
          <div key={registration.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedRows.includes(registration.id)}
                  onChange={(e) => onRowSelect(registration.id, e.target.checked)}
                />
                <div>
                  <h4 className="font-medium text-foreground">{registration.studentName}</h4>
                  <p className="text-sm text-muted-foreground">{registration.email}</p>
                </div>
              </div>
              {getPaymentStatusBadge(registration.paymentStatus)}
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <span className="text-muted-foreground">Registration ID:</span>
                <p className="font-mono text-primary">{registration.registrationId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Department:</span>
                <p className="text-foreground">{registration.department}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Event:</span>
                <p className="text-foreground">{registration.event}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <p className="text-foreground">{formatDate(registration.registrationDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRowAction('view', registration)}
                iconName="Eye"
                iconPosition="left"
              >
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRowAction('edit', registration)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRowAction('certificate', registration)}
                iconName="Award"
                iconPosition="left"
              >
                Certificate
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {registrations.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No registrations found</h3>
          <p className="text-muted-foreground">
            No registration records match your current filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default RegistrationTable;