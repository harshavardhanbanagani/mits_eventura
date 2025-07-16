import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsBar = ({ 
  selectedCount, 
  onActivate, 
  onDeactivate, 
  onDelete, 
  onExport, 
  onClearSelection 
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-surface border border-border rounded-lg shadow-elevated p-4 animate-slide-up">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-foreground">
              {selectedCount} event{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="h-6 w-px bg-border" />

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onActivate}
              iconName="Play"
              iconPosition="left"
            >
              Activate
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onDeactivate}
              iconName="Pause"
              iconPosition="left"
            >
              Deactivate
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              iconName="Trash2"
              iconPosition="left"
            >
              Delete
            </Button>

            <div className="h-6 w-px bg-border" />

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;