import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fetchNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification,
  setRealTimeConnection 
} from '../../store/slices/notificationsSlice';
import { notificationsService } from '../../services/notificationsService';
import Icon from '../AppIcon';
import Button from './Button';
import { formatDistanceToNow } from 'date-fns';

const NotificationCenter = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { 
    notifications, 
    unreadCount, 
    isLoading, 
    filters, 
    pagination,
    realTimeConnected 
  } = useSelector(state => state.notifications);
  const { user } = useSelector(state => state.auth);

  const [activeFilter, setActiveFilter] = useState('all');
  const [webSocket, setWebSocket] = useState(null);

  // Initialize real-time connection
  useEffect(() => {
    if (user && isOpen) {
      const ws = notificationsService.initializeWebSocket(user.id);
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'notification') {
          dispatch({ type: 'notifications/addNotification', payload: data.data });
        }
      };

      ws.onopen = () => {
        dispatch(setRealTimeConnection(true));
      };

      ws.onclose = () => {
        dispatch(setRealTimeConnection(false));
      };

      setWebSocket(ws);

      return () => {
        ws.close();
        setWebSocket(null);
      };
    }
  }, [user, isOpen, dispatch]);

  // Fetch notifications when component opens
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications({ 
        ...filters, 
        type: activeFilter === 'all' ? undefined : activeFilter 
      }));
    }
  }, [isOpen, activeFilter, dispatch, filters]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const getNotificationIcon = (type) => {
    const icons = {
      registration: 'UserPlus',
      payment: 'CreditCard',
      event: 'Calendar',
      system: 'Settings',
      alert: 'AlertTriangle',
    };
    return icons[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-red-500 bg-red-50';
    
    const colors = {
      registration: 'text-blue-500 bg-blue-50',
      payment: 'text-green-500 bg-green-50',
      event: 'text-purple-500 bg-purple-50',
      system: 'text-gray-500 bg-gray-50',
      alert: 'text-orange-500 bg-orange-50',
    };
    return colors[type] || 'text-gray-500 bg-gray-50';
  };

  const filterOptions = [
    { key: 'all', label: 'All', count: notifications.length },
    { key: 'registration', label: 'Registrations', count: notifications.filter(n => n.type === 'registration').length },
    { key: 'payment', label: 'Payments', count: notifications.filter(n => n.type === 'payment').length },
    { key: 'event', label: 'Events', count: notifications.filter(n => n.type === 'event').length },
    { key: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-hidden"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
        >
          {/* Header */}
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Notifications
                </h2>
                {unreadCount > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {unreadCount} new
                  </span>
                )}
                {realTimeConnected && (
                  <div className="flex items-center space-x-1 text-xs text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Live</span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Action Buttons */}
            {unreadCount > 0 && (
              <div className="mt-3 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="CheckCheck"
                  onClick={handleMarkAllAsRead}
                >
                  Mark all read
                </Button>
              </div>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-2">
            <div className="flex space-x-1 overflow-x-auto">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => handleFilterChange(option.key)}
                  className={`flex-shrink-0 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeFilter === option.key
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  {option.label}
                  {option.count > 0 && (
                    <span className={`ml-1 ${
                      activeFilter === option.key ? 'text-white' : 'text-gray-400'
                    }`}>
                      ({option.count})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-500">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center">
                <Icon name="Bell" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-500">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        getNotificationColor(notification.type, notification.priority)
                      }`}>
                        <Icon 
                          name={getNotificationIcon(notification.type)} 
                          size={16} 
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </p>
                          </div>

                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded"
                                title="Mark as read"
                              >
                                <Icon name="Check" size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(notification.id)}
                              className="p-1 text-gray-400 hover:text-red-600 rounded"
                              title="Delete"
                            >
                              <Icon name="Trash2" size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Additional data display */}
                        {notification.data && (
                          <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                            {notification.type === 'registration' && notification.data.eventName && (
                              <p><strong>Event:</strong> {notification.data.eventName}</p>
                            )}
                            {notification.type === 'payment' && notification.data.amount && (
                              <p><strong>Amount:</strong> ₹{notification.data.amount}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Load More */}
            {pagination.hasMore && (
              <div className="p-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => dispatch(fetchNotifications({ 
                    page: pagination.page + 1,
                    type: activeFilter === 'all' ? undefined : activeFilter 
                  }))}
                  className="w-full"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NotificationCenter;