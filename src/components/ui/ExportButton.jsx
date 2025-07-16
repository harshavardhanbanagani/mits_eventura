import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Icon from '../AppIcon';
import { useToast } from './ToastContainer';

const ExportButton = ({
  onExport,
  formats = ['csv', 'excel', 'pdf', 'json'],
  filters = {},
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportingFormat, setExportingFormat] = useState(null);
  const { exportLoading } = useSelector(state => state.registrations);
  const { showToast } = useToast();

  const formatIcons = {
    csv: 'FileText',
    excel: 'FileSpreadsheet',
    pdf: 'FileText',
    json: 'Code',
  };

  const formatLabels = {
    csv: 'CSV File',
    excel: 'Excel File',
    pdf: 'PDF Report',
    json: 'JSON Data',
  };

  const handleExport = async (format) => {
    setExportingFormat(format);
    setIsOpen(false);
    
    try {
      await onExport(format, filters);
      showToast({
        type: 'success',
        title: 'Export Successful',
        message: `Data exported to ${formatLabels[format]} successfully.`,
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Export Failed',
        message: error.message || 'Failed to export data. Please try again.',
      });
    } finally {
      setExportingFormat(null);
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Button
        variant="outline"
        iconName="Download"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || exportLoading}
        loading={exportLoading}
      >
        {exportingFormat ? `Exporting ${formatLabels[exportingFormat]}...` : 'Export'}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20"
            >
              <div className="py-2">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  Export Format
                </div>
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => handleExport(format)}
                    disabled={exportingFormat === format}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 disabled:opacity-50"
                  >
                    <Icon 
                      name={formatIcons[format]} 
                      size={16} 
                      className="text-gray-400" 
                    />
                    <span className="flex-1">{formatLabels[format]}</span>
                    {exportingFormat === format && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export const BulkExportButton = ({
  selectedItems = [],
  onBulkExport,
  formats = ['csv', 'excel', 'pdf'],
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportingFormat, setExportingFormat] = useState(null);
  const { showToast } = useToast();

  const formatIcons = {
    csv: 'FileText',
    excel: 'FileSpreadsheet', 
    pdf: 'FileText',
    json: 'Code',
  };

  const formatLabels = {
    csv: 'CSV File',
    excel: 'Excel File',
    pdf: 'PDF Report',
    json: 'JSON Data',
  };

  const handleBulkExport = async (format) => {
    setExportingFormat(format);
    setIsOpen(false);
    
    try {
      await onBulkExport(format, selectedItems);
      showToast({
        type: 'success',
        title: 'Bulk Export Successful',
        message: `${selectedItems.length} items exported to ${formatLabels[format]} successfully.`,
      });
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Bulk Export Failed',
        message: error.message || 'Failed to export selected items. Please try again.',
      });
    } finally {
      setExportingFormat(null);
    }
  };

  const isDisabled = disabled || selectedItems.length === 0;

  return (
    <div className={`relative inline-block ${className}`}>
      <Button
        variant="outline"
        iconName="Download"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDisabled}
        loading={exportingFormat !== null}
      >
        Export Selected ({selectedItems.length})
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20"
            >
              <div className="py-2">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  Export {selectedItems.length} Selected
                </div>
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => handleBulkExport(format)}
                    disabled={exportingFormat === format}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 disabled:opacity-50"
                  >
                    <Icon 
                      name={formatIcons[format]} 
                      size={16} 
                      className="text-gray-400" 
                    />
                    <span className="flex-1">{formatLabels[format]}</span>
                    {exportingFormat === format && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportButton;