import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const ExportModal = ({ isOpen, onClose, onExport, totalRecords }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    fields: [
      'registrationId',
      'studentName',
      'email',
      'department',
      'event',
      'paymentStatus',
      'registrationDate'
    ],
    dateRange: 'all'
  });

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated)' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'pdf', label: 'PDF Report' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const availableFields = [
    { id: 'registrationId', label: 'Registration ID', required: true },
    { id: 'studentName', label: 'Student Name', required: true },
    { id: 'email', label: 'Email Address' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'department', label: 'Department' },
    { id: 'year', label: 'Academic Year' },
    { id: 'event', label: 'Event Name' },
    { id: 'teamMembers', label: 'Team Members' },
    { id: 'paymentStatus', label: 'Payment Status' },
    { id: 'paymentAmount', label: 'Payment Amount' },
    { id: 'registrationDate', label: 'Registration Date' },
    { id: 'lastUpdated', label: 'Last Updated' }
  ];

  const handleFieldToggle = (fieldId) => {
    const field = availableFields.find(f => f.id === fieldId);
    if (field?.required) return; // Don't allow toggling required fields

    setExportConfig(prev => ({
      ...prev,
      fields: prev.fields.includes(fieldId)
        ? prev.fields.filter(f => f !== fieldId)
        : [...prev.fields, fieldId]
    }));
  };

  const handleExport = () => {
    onExport(exportConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Export Registration Data</h2>
              <p className="text-sm text-muted-foreground">
                Export {totalRecords} registration records
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Export Format
            </label>
            <Select
              options={formatOptions}
              value={exportConfig.format}
              onChange={(value) => setExportConfig(prev => ({ ...prev, format: value }))}
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date Range
            </label>
            <Select
              options={dateRangeOptions}
              value={exportConfig.dateRange}
              onChange={(value) => setExportConfig(prev => ({ ...prev, dateRange: value }))}
            />
          </div>

          {/* Field Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Select Fields to Export
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-border rounded-lg p-4">
              {availableFields.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={exportConfig.fields.includes(field.id)}
                    onChange={() => handleFieldToggle(field.id)}
                    disabled={field.required}
                  />
                  <label className="text-sm text-foreground flex-1">
                    {field.label}
                    {field.required && (
                      <span className="text-xs text-muted-foreground ml-1">(Required)</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {exportConfig.fields.length} fields selected
            </p>
          </div>

          {/* Export Preview */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Export Preview</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Format: {formatOptions.find(f => f.value === exportConfig.format)?.label}</p>
              <p>Records: {totalRecords} registrations</p>
              <p>Fields: {exportConfig.fields.length} columns</p>
              <p>Estimated file size: ~{Math.ceil(totalRecords * exportConfig.fields.length / 100)}KB</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            disabled={exportConfig.fields.length === 0}
          >
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;