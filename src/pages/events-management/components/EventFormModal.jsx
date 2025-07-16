import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventFormModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  event = null, 
  departmentId 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    fee: 0,
    maxParticipants: '',
    rules: '',
    customFields: [],
    status: 'active'
  });

  const [customField, setCustomField] = useState({
    label: '',
    type: 'text',
    required: false
  });

  const [errors, setErrors] = useState({});

  const fieldTypeOptions = [
    { value: 'text', label: 'Text Input' },
    { value: 'email', label: 'Email' },
    { value: 'number', label: 'Number' },
    { value: 'tel', label: 'Phone Number' },
    { value: 'select', label: 'Dropdown' },
    { value: 'textarea', label: 'Text Area' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || '',
        description: event.description || '',
        date: event.date || '',
        time: event.time || '',
        venue: event.venue || '',
        fee: event.fee || 0,
        maxParticipants: event.maxParticipants || '',
        rules: event.rules || '',
        customFields: event.customFields || [],
        status: event.status || 'active'
      });
    } else {
      setFormData({
        name: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        fee: 0,
        maxParticipants: '',
        rules: '',
        customFields: [],
        status: 'active'
      });
    }
    setErrors({});
  }, [event, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addCustomField = () => {
    if (customField.label.trim()) {
      setFormData(prev => ({
        ...prev,
        customFields: [...prev.customFields, { ...customField, id: Date.now() }]
      }));
      setCustomField({
        label: '',
        type: 'text',
        required: false
      });
    }
  };

  const removeCustomField = (fieldId) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.filter(field => field.id !== fieldId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Event time is required';
    }

    if (!formData.venue.trim()) {
      newErrors.venue = 'Event venue is required';
    }

    if (formData.fee < 0) {
      newErrors.fee = 'Fee cannot be negative';
    }

    if (formData.maxParticipants && formData.maxParticipants < 1) {
      newErrors.maxParticipants = 'Maximum participants must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const eventData = {
        ...formData,
        departmentId,
        id: event?.id || Date.now(),
        registrations: event?.registrations || 0,
        createdAt: event?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      onSave(eventData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {event ? 'Edit Event' : 'Add New Event'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Event Name"
                type="text"
                placeholder="Enter event name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
              
              <Select
                label="Status"
                options={statusOptions}
                value={formData.status}
                onChange={(value) => handleInputChange('status', value)}
                required
              />
            </div>

            <Input
              label="Event Description"
              type="text"
              placeholder="Enter event description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              error={errors.description}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Event Date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                error={errors.date}
                required
              />
              
              <Input
                label="Event Time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                error={errors.time}
                required
              />
              
              <Input
                label="Venue"
                type="text"
                placeholder="Enter venue"
                value={formData.venue}
                onChange={(e) => handleInputChange('venue', e.target.value)}
                error={errors.venue}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Registration Fee (₹)"
                type="number"
                placeholder="0"
                value={formData.fee}
                onChange={(e) => handleInputChange('fee', parseInt(e.target.value) || 0)}
                error={errors.fee}
                min="0"
              />
              
              <Input
                label="Maximum Participants"
                type="number"
                placeholder="Leave empty for unlimited"
                value={formData.maxParticipants}
                onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value) || '')}
                error={errors.maxParticipants}
                min="1"
              />
            </div>

            {/* Rules Section */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Event Rules & Guidelines
              </label>
              <textarea
                className="w-full p-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows="4"
                placeholder="Enter event rules and guidelines..."
                value={formData.rules}
                onChange={(e) => handleInputChange('rules', e.target.value)}
              />
            </div>

            {/* Custom Fields Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-foreground">Custom Registration Fields</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCustomField}
                  disabled={!customField.label.trim()}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Field
                </Button>
              </div>

              {/* Add Custom Field Form */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg mb-4">
                <Input
                  label="Field Label"
                  type="text"
                  placeholder="Enter field label"
                  value={customField.label}
                  onChange={(e) => setCustomField(prev => ({ ...prev, label: e.target.value }))}
                />
                
                <Select
                  label="Field Type"
                  options={fieldTypeOptions}
                  value={customField.type}
                  onChange={(value) => setCustomField(prev => ({ ...prev, type: value }))}
                />
                
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="required"
                    checked={customField.required}
                    onChange={(e) => setCustomField(prev => ({ ...prev, required: e.target.checked }))}
                    className="rounded border-border"
                  />
                  <label htmlFor="required" className="text-sm text-foreground">
                    Required field
                  </label>
                </div>
              </div>

              {/* Custom Fields List */}
              {formData.customFields.length > 0 && (
                <div className="space-y-2">
                  {formData.customFields.map((field) => (
                    <div key={field.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="FormInput" size={16} className="text-muted-foreground" />
                        <div>
                          <span className="font-medium text-foreground">{field.label}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({field.type}) {field.required && '(Required)'}
                          </span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCustomField(field.id)}
                        iconName="Trash2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
            >
              {event ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;