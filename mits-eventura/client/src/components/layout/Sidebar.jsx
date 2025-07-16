import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Award, 
  Settings, 
  BarChart3,
  FileText,
  Bell
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)

  const isActive = (path) => location.pathname.startsWith(path)

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      roles: ['student', 'organizer', 'admin']
    },
    {
      label: 'Events',
      icon: Calendar,
      path: '/events',
      roles: ['student', 'organizer', 'admin']
    },
    {
      label: 'Certificates',
      icon: Award,
      path: '/certificates',
      roles: ['student', 'organizer', 'admin']
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      path: '/analytics',
      roles: ['organizer', 'admin']
    },
    {
      label: 'Users',
      icon: Users,
      path: '/admin/users',
      roles: ['admin']
    },
    {
      label: 'Reports',
      icon: FileText,
      path: '/admin/reports',
      roles: ['admin']
    },
    {
      label: 'Notifications',
      icon: Bell,
      path: '/notifications',
      roles: ['student', 'organizer', 'admin']
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/settings',
      roles: ['student', 'organizer', 'admin']
    }
  ]

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || 'student')
  )

  // Only show sidebar on dashboard and admin pages
  if (!location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/admin')) {
    return null
  }

  return (
    <aside className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-6">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ME</span>
            </div>
            <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h2>
          </div>
          
          <nav className="flex-1 px-2 space-y-1">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`}
                >
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      active 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'
                    }`}
                  />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
        
        {/* User Info at Bottom */}
        <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role || 'Student'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar