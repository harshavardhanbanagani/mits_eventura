import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const RegistrationModal = ({ isOpen, onClose, registration, onSave, mode = 'view' }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    event: '',
    teamMembers: [],
    paymentStatus: 'pending',
    paymentAmount: 0,
    notes: ''
  });

  const [isEditing, setIsEditing] = useState(mode === 'edit');

  useEffect(() => {
    if (registration) {
      setFormData({
        studentName: registration.studentName || '',
        email: registration.email || '',
        phone: registration.phone || '',
        department: registration.department || '',
        year: registration.year || '',
        event: registration.event || '',
        teamMembers: registration.teamMembers || [],
        paymentStatus: registration.paymentStatus || 'pending',
        paymentAmount: registration.paymentAmount || 0,
        notes: registration.notes || ''
      });
    }
  }, [registration]);

  const departmentOptions = [
    { value: 'cse', label: 'Computer Science & Engineering' },
    { value: 'ece', label: 'Electronics & Communication' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'eee', label: 'Electrical & Electronics' },
    { value: 'it', label: 'Information Technology' }
  ];

  const yearOptions = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' }
  ];

  const paymentStatusOptions = [
    { value: 'completed', label: 'Payment Completed' },
    { value: 'pending', label: 'Payment Pending' },
    { value: 'failed', label: 'Payment Failed' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave({ ...registration, ...formData });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen || !registration) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Registration Details
              </h2>
              <p className="text-sm text-muted-foreground">
                ID: {registration.registrationId}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconPosition="left"
              >
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                Student Information
              </h3>
              
              <Input
                label="Student Name"
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                disabled={!isEditing}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
              />

              <Select
                label="Department"
                options={departmentOptions}
                value={formData.department}
                onChange={(value) => handleInputChange('department', value)}
                disabled={!isEditing}
                required
              />

              <Select
                label="Academic Year"
                options={yearOptions}
                value={formData.year}
                onChange={(value) => handleInputChange('year', value)}
                disabled={!isEditing}
                required
              />
            </div>

            {/* Event & Payment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                Event & Payment
              </h3>

              <Input
                label="Event Name"
                value={formData.event}
                onChange={(e) => handleInputChange('event', e.target.value)}
                disabled={!isEditing}
                required
              />

              <Select
                label="Payment Status"
                options={paymentStatusOptions}
                value={formData.paymentStatus}
                onChange={(value) => handleInputChange('paymentStatus', value)}
                disabled={!isEditing}
              />

              <Input
                label="Payment Amount"
                type="number"
                value={formData.paymentAmount}
                onChange={(e) => handleInputChange('paymentAmount', parseFloat(e.target.value) || 0)}
                disabled={!isEditing}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Registration Timeline
                </label>
                <div className="bg-muted/30 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registered:</span>
                    <span className="text-foreground">{formatDate(registration.registrationDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="text-foreground">{formatDate(registration.lastUpdated || registration.registrationDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          {formData.teamMembers.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-foreground border-b border-border pb-2 mb-4">
                Team Members
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-sm text-muted-foreground">{member.department} - {member.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Add any additional notes..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              iconPosition="left"
            >
              Send Email
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Award"
              iconPosition="left"
            >
              Generate Certificate
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              {isEditing ? 'Cancel' : 'Close'}
            </Button>
            {isEditing && (
              <Button
                onClick={handleSave}
                iconName="Save"
                iconPosition="left"
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;