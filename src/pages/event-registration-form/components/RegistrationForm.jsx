import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ event, formData, onFormChange, onNext, onPrevious }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [errors, setErrors] = useState({});

  const departmentOptions = [
    { value: 'cse', label: 'Computer Science & Engineering' },
    { value: 'ece', label: 'Electronics & Communication Engineering' },
    { value: 'eee', label: 'Electrical & Electronics Engineering' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'it', label: 'Information Technology' },
    { value: 'chem', label: 'Chemical Engineering' },
    { value: 'bio', label: 'Biotechnology' }
  ];

  const yearOptions = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
    onFormChange({ ...formData, teamMembers: updatedMembers });
  };

  const addTeamMember = () => {
    const newMember = {
      name: '',
      email: '',
      department: '',
      year: '',
      rollNumber: ''
    };
    const updatedMembers = [...teamMembers, newMember];
    setTeamMembers(updatedMembers);
    onFormChange({ ...formData, teamMembers: updatedMembers });
  };

  const removeTeamMember = (index) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
    onFormChange({ ...formData, teamMembers: updatedMembers });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.rollNumber?.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';

    // Validate team members if it's a team event
    if (event.isTeamEvent && teamMembers.length === 0) {
      newErrors.teamMembers = 'At least one team member is required for team events';
    }

    teamMembers.forEach((member, index) => {
      if (!member.name?.trim()) newErrors[`teamMember${index}Name`] = 'Team member name is required';
      if (!member.email?.trim()) newErrors[`teamMember${index}Email`] = 'Team member email is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="User" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Registration Details</h2>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-md font-medium text-foreground mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              required
            />
            <Input
              label="Roll Number"
              type="text"
              placeholder="Enter your roll number"
              value={formData.rollNumber || ''}
              onChange={(e) => handleInputChange('rollNumber', e.target.value)}
              error={errors.rollNumber}
              required
            />
          </div>
        </div>

        {/* Academic Information */}
        <div>
          <h3 className="text-md font-medium text-foreground mb-4">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Department"
              placeholder="Select your department"
              options={departmentOptions}
              value={formData.department || ''}
              onChange={(value) => handleInputChange('department', value)}
              error={errors.department}
              required
            />
            <Select
              label="Year of Study"
              placeholder="Select your year"
              options={yearOptions}
              value={formData.year || ''}
              onChange={(value) => handleInputChange('year', value)}
              error={errors.year}
              required
            />
          </div>
        </div>

        {/* Event-specific fields */}
        {event.customFields && event.customFields.length > 0 && (
          <div>
            <h3 className="text-md font-medium text-foreground mb-4">Event Specific Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.customFields.map((field, index) => (
                <Input
                  key={index}
                  label={field.label}
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  required={field.required}
                />
              ))}
            </div>
          </div>
        )}

        {/* Team Members Section */}
        {event.isTeamEvent && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-foreground">Team Members</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={addTeamMember}
                iconName="Plus"
                iconPosition="left"
                disabled={teamMembers.length >= (event.maxTeamSize - 1)}
              >
                Add Member
              </Button>
            </div>

            {errors.teamMembers && (
              <p className="text-sm text-error mb-4">{errors.teamMembers}</p>
            )}

            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="border border-border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-foreground">Team Member {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTeamMember(index)}
                      iconName="Trash2"
                      className="text-error hover:text-error"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      label="Name"
                      type="text"
                      placeholder="Enter team member name"
                      value={member.name || ''}
                      onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                      error={errors[`teamMember${index}Name`]}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Enter team member email"
                      value={member.email || ''}
                      onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                      error={errors[`teamMember${index}Email`]}
                      required
                    />
                    <Select
                      label="Department"
                      placeholder="Select department"
                      options={departmentOptions}
                      value={member.department || ''}
                      onChange={(value) => handleTeamMemberChange(index, 'department', value)}
                    />
                    <Select
                      label="Year"
                      placeholder="Select year"
                      options={yearOptions}
                      value={member.year || ''}
                      onChange={(value) => handleTeamMemberChange(index, 'year', value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onPrevious}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;