import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { fetchRegistrationStats } from '../../store/slices/registrationsSlice';
import { fetchEvents } from '../../store/slices/eventsSlice';
import Icon from '../AppIcon';
import Button from './Button';
import { LoadingSkeleton } from './LoadingOverlay';

const AnalyticsDashboard = ({ timeRange = '7d', className = '' }) => {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector(state => state.registrations);
  const { events } = useSelector(state => state.events);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState(timeRange);

  useEffect(() => {
    dispatch(fetchRegistrationStats());
    dispatch(fetchEvents());
  }, [dispatch, dateRange]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'registrations', label: 'Registrations', icon: 'Users' },
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { id: 'events', label: 'Events', icon: 'Calendar' },
  ];

  const timeRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
  ];

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // Mock data - in real app, this would come from API
  const registrationTrends = stats.dailyRegistrations || [
    { date: '2025-01-18', count: 45, revenue: 6750 },
    { date: '2025-01-19', count: 67, revenue: 10050 },
    { date: '2025-01-20', count: 89, revenue: 13350 },
    { date: '2025-01-21', count: 78, revenue: 11700 },
    { date: '2025-01-22', count: 92, revenue: 13800 },
  ];

  const departmentData = stats.departmentStats || [
    { name: 'CSE', value: 420, revenue: 84000 },
    { name: 'ECE', value: 320, revenue: 64000 },
    { name: 'ME', value: 280, revenue: 56000 },
    { name: 'CE', value: 150, revenue: 30000 },
    { name: 'EE', value: 77, revenue: 14900 },
  ];

  const eventTypeData = [
    { name: 'Technical', value: 60, color: colors[0] },
    { name: 'Cultural', value: 25, color: colors[1] },
    { name: 'Sports', value: 10, color: colors[2] },
    { name: 'Workshops', value: 5, color: colors[3] },
  ];

  const MetricCard = ({ title, value, change, icon, color = 'primary' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={`text-${color}-600`} />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center">
          <Icon 
            name={change.startsWith('+') ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            className={change.startsWith('+') ? 'text-green-500' : 'text-red-500'} 
          />
          <span className={`text-sm font-medium ml-1 ${
            change.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last period</span>
        </div>
      )}
    </motion.div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Registrations"
          value={stats.totalRegistrations?.toLocaleString() || '1,247'}
          change="+12.5%"
          icon="Users"
          color="blue"
        />
        <MetricCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue || 248900).toLocaleString()}`}
          change="+8.2%"
          icon="DollarSign"
          color="green"
        />
        <MetricCard
          title="Active Events"
          value={events.filter(e => e.status === 'active').length || 24}
          change="+3"
          icon="Calendar"
          color="yellow"
        />
        <MetricCard
          title="Conversion Rate"
          value="87.3%"
          change="+2.1%"
          icon="TrendingUp"
          color="purple"
        />
      </div>

      {/* Registration Trends */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={registrationTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke={colors[0]} 
              fill={colors[0]} 
              fillOpacity={0.3}
              name="Registrations"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Registrations</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={eventTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderRegistrations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Analytics</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={registrationTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke={colors[0]} 
              strokeWidth={3}
              name="Daily Registrations"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Confirmed</span>
              <span className="font-semibold">{stats.confirmedRegistrations || 1091}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending</span>
              <span className="font-semibold">{stats.pendingPayments || 156}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cancelled</span>
              <span className="font-semibold">{stats.cancelledRegistrations || 45}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {(stats.recentRegistrations || []).map((registration, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{registration.participantName}</p>
                  <p className="text-xs text-gray-500">{registration.eventName}</p>
                </div>
                <span className="text-sm text-gray-500">
                  ₹{registration.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={registrationTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke={colors[1]} 
              fill={colors[1]} 
              fillOpacity={0.3}
              name="Daily Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-wise Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
            <Bar dataKey="revenue" fill={colors[1]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Event</th>
                <th className="text-left py-2">Department</th>
                <th className="text-left py-2">Registrations</th>
                <th className="text-left py-2">Revenue</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 10).map((event, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 font-medium">{event.name}</td>
                  <td className="py-2 text-gray-600">{event.department}</td>
                  <td className="py-2">{event.registrationCount || 0}</td>
                  <td className="py-2">₹{((event.registrationCount || 0) * (event.fees || 0)).toLocaleString()}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.status === 'active' ? 'bg-green-100 text-green-800' :
                      event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'registrations': return renderRegistrations();
      case 'revenue': return renderRevenue();
      case 'events': return renderEvents();
      default: return renderOverview();
    }
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <LoadingSkeleton lines={4} />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <Button iconName="Download">Export Report</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;