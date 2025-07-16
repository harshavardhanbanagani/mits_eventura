import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { removeToast } from '../../store/slices/uiSlice';
import Icon from '../AppIcon';

const ToastContainer = () => {
  const { toasts } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onRemove={() => dispatch(removeToast(toast.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const Toast = ({ toast, onRemove }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (toast.autoClose && toast.duration) {
      const timer = setTimeout(() => {
        onRemove();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast, onRemove]);

  const getToastStyles = (type) => {
    const styles = {
      success: {
        bg: 'bg-green-50 border-green-200',
        text: 'text-green-800',
        icon: 'CheckCircle',
        iconColor: 'text-green-500'
      },
      error: {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-800',
        icon: 'XCircle',
        iconColor: 'text-red-500'
      },
      warning: {
        bg: 'bg-yellow-50 border-yellow-200',
        text: 'text-yellow-800',
        icon: 'AlertTriangle',
        iconColor: 'text-yellow-500'
      },
      info: {
        bg: 'bg-blue-50 border-blue-200',
        text: 'text-blue-800',
        icon: 'Info',
        iconColor: 'text-blue-500'
      }
    };

    return styles[type] || styles.info;
  };

  const style = getToastStyles(toast.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`rounded-lg border p-4 shadow-lg backdrop-blur-sm ${style.bg}`}
    >
      <div className="flex items-start space-x-3">
        <Icon 
          name={style.icon} 
          size={20} 
          className={`mt-0.5 flex-shrink-0 ${style.iconColor}`} 
        />
        
        <div className="flex-1 min-w-0">
          {toast.title && (
            <p className={`font-medium ${style.text}`}>
              {toast.title}
            </p>
          )}
          <p className={`text-sm ${style.text} ${toast.title ? 'mt-1' : ''}`}>
            {toast.message}
          </p>
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className={`mt-2 text-sm font-medium underline hover:no-underline ${style.text}`}
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {!toast.persistent && (
          <button
            onClick={onRemove}
            className={`flex-shrink-0 rounded-md p-1 hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 ${style.iconColor}`}
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {toast.progress !== undefined && (
        <div className="mt-3">
          <div className="bg-white bg-opacity-30 rounded-full h-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${toast.progress}%` }}
              className="bg-current h-1 rounded-full"
              style={{ color: style.iconColor.replace('text-', '') }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Hook for easy toast usage
export const useToast = () => {
  const dispatch = useDispatch();

  const showToast = (toast) => {
    dispatch({
      type: 'ui/addToast',
      payload: toast
    });
  };

  const success = (message, options = {}) => {
    showToast({
      type: 'success',
      message,
      ...options
    });
  };

  const error = (message, options = {}) => {
    showToast({
      type: 'error',
      message,
      ...options
    });
  };

  const warning = (message, options = {}) => {
    showToast({
      type: 'warning',
      message,
      ...options
    });
  };

  const info = (message, options = {}) => {
    showToast({
      type: 'info',
      message,
      ...options
    });
  };

  return { success, error, warning, info, showToast };
};

export default ToastContainer;