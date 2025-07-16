import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ 
  isOpen, 
  onClose, 
  onExport, 
  selectedEvents = [], 
  allEvents = [] 
}) => {
  const [exportScope, setExportScope] = useState('selected');
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportFields, setExportFields] = useState({
    name: true,
    description: true,
    date: true,
    time: true,
    venue: true,
    fee: true,
    registrations: true,
    status: true,
    department: true
  });

  const scopeOptions = [
    { value: 'selected', label: `Selected Events (${selectedEvents.length})` },
    { value: 'all', label: `All Events (${allEvents.length})` },
    { value: 'active', label: 'Active Events Only' },
    { value: 'inactive', label: 'Inactive Events Only' }
  ];

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated)' },
    { value: 'xlsx', label: 'Excel Spreadsheet' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' }
  ];

  const availableFields = [
    { key: 'name', label: 'Event Name' },
    { key: 'description', label: 'Description' },
    { key: 'date', label: 'Event Date' },
    { key: 'time', label: 'Event Time' },
    { key: 'venue', label: 'Venue' },
    { key: 'fee', label: 'Registration Fee' },
    { key: 'registrations', label: 'Registration Count' },
    { key: 'status', label: 'Status' },
    { key: 'department', label: 'Department' }
  ];

  const handleFieldToggle = (fieldKey) => {
    setExportFields(prev => ({
      ...prev,
      [fieldKey]: !prev[fieldKey]
    }));
  };

  const handleSelectAllFields = () => {
    const allSelected = Object.values(exportFields).every(value => value);
    const newState = {};
    availableFields.forEach(field => {
      newState[field.key] = !allSelected;
    });
    setExportFields(newState);
  };

  const handleExport = () => {
    const selectedFields = Object.keys(exportFields).filter(key => exportFields[key]);
    
    if (selectedFields.length === 0) {
      alert('Please select at least one field to export');
      return;
    }

    onExport({
      scope: exportScope,
      format: exportFormat,
      fields: selectedFields,
      selectedEvents,
      allEvents
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Download" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Export Events</h2>
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
          {/* Export Scope */}
          <div>
            <Select
              label="Export Scope"
              description="Choose which events to export"
              options={scopeOptions}
              value={exportScope}
              onChange={setExportScope}
            />
          </div>

          {/* Export Format */}
          <div>
            <Select
              label="Export Format"
              description="Choose the file format for export"
              options={formatOptions}
              value={exportFormat}
              onChange={setExportFormat}
            />
          </div>

          {/* Field Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">
                Select Fields to Export
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAllFields}
                iconName={Object.values(exportFields).every(v => v) ? "Square" : "CheckSquare"}
                iconPosition="left"
              >
                {Object.values(exportFields).every(v => v) ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 p-4 bg-muted/30 rounded-lg">
              {availableFields.map((field) => (
                <Checkbox
                  key={field.key}
                  label={field.label}
                  checked={exportFields[field.key]}
                  onChange={() => handleFieldToggle(field.key)}
                />
              ))}
            </div>
          </div>

          {/* Export Summary */}
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Export Summary</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <strong>Scope:</strong> {scopeOptions.find(opt => opt.value === exportScope)?.label}
                  </p>
                  <p>
                    <strong>Format:</strong> {formatOptions.find(opt => opt.value === exportFormat)?.label}
                  </p>
                  <p>
                    <strong>Fields:</strong> {Object.values(exportFields).filter(v => v).length} selected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
          >
            Export Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;