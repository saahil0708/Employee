import React, { useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  Settings,
  HelpCircle,
  ChevronDown,
  User,
  LogOut,
  UserCircle,
  Moon,
  Sun,
  Globe,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onAddEmployee?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddEmployee }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New Leave Request',
      message: 'Sarah Johnson submitted a leave request for next week',
      time: '5 min ago',
      unread: true,
      type: 'leave'
    },
    {
      id: 2,
      title: 'Employee Birthday',
      message: 'Mike Chen\'s birthday is tomorrow',
      time: '1 hour ago',
      unread: true,
      type: 'birthday'
    },
    {
      id: 3,
      title: 'Payroll Reminder',
      message: 'Monthly payroll processing due in 3 days',
      time: '2 hours ago',
      unread: false,
      type: 'payroll'
    },
    {
      id: 4,
      title: 'New Employee',
      message: 'Alex Wilson completed onboarding',
      time: '1 day ago',
      unread: false,
      type: 'employee'
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="bg-white border-b border-gray-200 px-3 sm:px-6 py-4 relative z-50">
      <div className="flex items-center justify-between gap-2">
        {/* Left Section - Title and Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-6 min-w-0">
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Dashboard</h1>
            <div className="hidden sm:flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">Employee Management</span>
              <span className="text-gray-300">/</span>
              <span className="text-sm text-blue-600 font-medium">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
          <div className="relative w-full">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees, departments..."
              className="w-full pl-12 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 text-sm"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden lg:block">
              <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded border">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Right Section - Actions and Profile */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Search button for mobile */}
          <button className="md:hidden p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <Search size={20} />
          </button>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Messages */}
            <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <MessageSquare size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            </button>

            {/* Help */}
            <button className="hidden lg:block p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <HelpCircle size={20} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hidden lg:block p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Mark all read
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${notification.unread ? 'border-blue-500 bg-blue-50/30' : 'border-transparent'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'leave' ? 'bg-orange-500' :
                            notification.type === 'birthday' ? 'bg-pink-500' :
                              notification.type === 'payroll' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-100">
                  <Link to="/notifications">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-xs sm:text-sm">JD</span>
              </div>
              <div className="hidden lg:block text-left">
                <p className="font-medium text-gray-900 text-sm">John Doe</p>
                <p className="text-xs text-gray-500">HR Manager</p>
              </div>
              <ChevronDown size={16} className={`hidden sm:block text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''
                }`} />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-500">john.doe@company.com</p>
                      <p className="text-xs text-gray-400">HR Manager</p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                    <UserCircle size={18} />
                    <Link to="/profile">
                      <span className="text-sm">My Profile</span>
                    </Link>
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                    <Settings size={18} />
                    <Link to="/settings">
                      <span className="text-sm">Account Settings</span>
                    </Link>
                  </button>
                  {/* <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
                    <Globe size={18} />
                    <span className="text-sm">Language & Region</span>
                  </button> */}
                </div>

                <div className="border-t border-gray-100 py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-red-600">
                    <LogOut size={18} />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside handlers */}
      {(showProfileMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowProfileMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;