import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Registrations',
      value: stats.totalRegistrations,
      icon: 'Users',
      color: 'text-primary bg-primary/10',
      change: `+${stats.newRegistrationsToday} today`
    },
    {
      title: 'Payment Completed',
      value: stats.completedPayments,
      icon: 'CheckCircle',
      color: 'text-success bg-success/10',
      change: `${((stats.completedPayments / stats.totalRegistrations) * 100).toFixed(1)}% completion rate`
    },
    {
      title: 'Pending Payments',
      value: stats.pendingPayments,
      icon: 'Clock',
      color: 'text-warning bg-warning/10',
      change: `${((stats.pendingPayments / stats.totalRegistrations) * 100).toFixed(1)}% pending`
    },
    {
      title: 'Total Revenue',
      value: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(stats.totalRevenue),
      icon: 'IndianRupee',
      color: 'text-accent bg-accent/10',
      change: `Avg ₹${Math.round(stats.totalRevenue / stats.totalRegistrations)} per registration`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-surface border border-border rounded-lg p-6 hover:shadow-card transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <Icon name={stat.icon} size={24} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{stat.change}</p>
        </div>
      ))}
    </div>
  );
};

export default RegistrationStats;