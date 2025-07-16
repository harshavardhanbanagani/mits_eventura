import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DepartmentPanel = ({ 
  departments, 
  selectedDepartment, 
  onDepartmentSelect, 
  onAddDepartment, 
  onEditDepartment, 
  onDeleteDepartment 
}) => {
  const [expandedDepartments, setExpandedDepartments] = useState(new Set());
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editName, setEditName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState('');

  const toggleExpanded = (deptId) => {
    const newExpanded = new Set(expandedDepartments);
    if (newExpanded.has(deptId)) {
      newExpanded.delete(deptId);
    } else {
      newExpanded.add(deptId);
    }
    setExpandedDepartments(newExpanded);
  };

  const startEdit = (department) => {
    setEditingDepartment(department.id);
    setEditName(department.name);
  };

  const saveEdit = () => {
    if (editName.trim()) {
      onEditDepartment(editingDepartment, editName.trim());
      setEditingDepartment(null);
      setEditName('');
    }
  };

  const cancelEdit = () => {
    setEditingDepartment(null);
    setEditName('');
  };

  const handleAddDepartment = () => {
    if (newDepartmentName.trim()) {
      onAddDepartment(newDepartmentName.trim());
      setNewDepartmentName('');
      setShowAddForm(false);
    }
  };

  const handleDeleteDepartment = (deptId) => {
    if (window.confirm('Are you sure you want to delete this department? This will also delete all associated events.')) {
      onDeleteDepartment(deptId);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Departments</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddForm(true)}
            iconName="Plus"
            iconPosition="left"
          >
            Add Department
          </Button>
        </div>
      </div>

      {/* Add Department Form */}
      {showAddForm && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="space-y-3">
            <Input
              label="Department Name"
              type="text"
              placeholder="Enter department name"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              required
            />
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleAddDepartment}
                disabled={!newDepartmentName.trim()}
              >
                Add
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowAddForm(false);
                  setNewDepartmentName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Department List */}
      <div className="p-2 max-h-96 overflow-y-auto">
        {departments.map((department) => (
          <div key={department.id} className="mb-1">
            <div
              className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors duration-150 ${
                selectedDepartment?.id === department.id
                  ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
              }`}
              onClick={() => onDepartmentSelect(department)}
            >
              <div className="flex items-center space-x-2 flex-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded(department.id);
                  }}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Icon
                    name={expandedDepartments.has(department.id) ? "ChevronDown" : "ChevronRight"}
                    size={16}
                  />
                </button>
                
                {editingDepartment === department.id ? (
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveEdit();
                      }}
                      iconName="Check"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelEdit();
                      }}
                      iconName="X"
                    />
                  </div>
                ) : (
                  <>
                    <Icon name="Building" size={16} />
                    <span className="font-medium">{department.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({department.eventCount} events)
                    </span>
                  </>
                )}
              </div>

              {editingDepartment !== department.id && (
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(department);
                    }}
                    iconName="Edit2"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDepartment(department.id);
                    }}
                    iconName="Trash2"
                  />
                </div>
              )}
            </div>

            {/* Department Details */}
            {expandedDepartments.has(department.id) && (
              <div className="ml-8 mt-2 p-3 bg-muted/30 rounded-md">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Events:</span>
                    <span className="font-medium">{department.eventCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Events:</span>
                    <span className="font-medium text-success">{department.activeEvents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Registrations:</span>
                    <span className="font-medium">{department.totalRegistrations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-medium text-primary">₹{department.revenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPanel;