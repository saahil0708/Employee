import React, { useState, useEffect } from 'react';
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  User,
  Calendar,
  FileText,
  DollarSign,
  Building,
  Filter,
  CheckCheck,
  Trash2,
  Settings,
  Search,
  MoreVertical,
  Eye,
  EyeOff,
  Mail,
  MessageSquare
} from 'lucide-react';

// Types
interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  category: 'attendance' | 'leave' | 'payroll' | 'system' | 'employee' | 'document';
  actionUrl?: string;
  sender?: string;
  priority: 'low' | 'medium' | 'high';
}

// Mock data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Leave Request Approved',
    message: 'Your leave request for January 20-25, 2024 has been approved.',
    timestamp: '2024-01-15T10:30:00',
    isRead: false,
    category: 'leave',
    priority: 'medium'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Payroll Processing',
    message: 'Payroll for December 2023 is being processed. Please verify your bank details.',
    timestamp: '2024-01-15T09:15:00',
    isRead: false,
    category: 'payroll',
    priority: 'high',
    sender: 'Finance Department'
  },
  {
    id: '3',
    type: 'info',
    title: 'New Employee Onboarded',
    message: 'Sarah Johnson has joined the Marketing department today.',
    timestamp: '2024-01-15T08:45:00',
    isRead: true,
    category: 'employee',
    priority: 'low',
    sender: 'HR System'
  },
  {
    id: '4',
    type: 'error',
    title: 'Attendance Irregularity',
    message: 'Unusual attendance pattern detected for employee ID TC-2023-045.',
    timestamp: '2024-01-14T16:20:00',
    isRead: true,
    category: 'attendance',
    priority: 'high'
  },
  {
    id: '5',
    type: 'success',
    title: 'Document Approved',
    message: 'Your uploaded ID proof has been verified and approved.',
    timestamp: '2024-01-14T14:10:00',
    isRead: true,
    category: 'document',
    priority: 'medium'
  },
  {
    id: '6',
    type: 'info',
    title: 'System Maintenance',
    message: 'Scheduled maintenance this weekend. System may be unavailable for 2 hours.',
    timestamp: '2024-01-14T11:00:00',
    isRead: true,
    category: 'system',
    priority: 'low',
    sender: 'IT Department'
  },
  {
    id: '7',
    type: 'warning',
    title: 'Leave Balance Low',
    message: 'You have only 2 days of leave remaining for this year.',
    timestamp: '2024-01-13T15:30:00',
    isRead: true,
    category: 'leave',
    priority: 'medium'
  },
  {
    id: '8',
    type: 'success',
    title: 'Payroll Processed',
    message: 'December 2023 payroll has been successfully processed.',
    timestamp: '2024-01-13T12:00:00',
    isRead: true,
    category: 'payroll',
    priority: 'medium',
    sender: 'Finance Team'
  }
];

const categories = [
  { id: 'all', name: 'All Notifications', icon: <Bell size={16} />, count: mockNotifications.length },
  { id: 'attendance', name: 'Attendance', icon: <Clock size={16} />, count: mockNotifications.filter(n => n.category === 'attendance').length },
  { id: 'leave', name: 'Leave', icon: <Calendar size={16} />, count: mockNotifications.filter(n => n.category === 'leave').length },
  { id: 'payroll', name: 'Payroll', icon: <DollarSign size={16} />, count: mockNotifications.filter(n => n.category === 'payroll').length },
  { id: 'employee', name: 'Employee', icon: <User size={16} />, count: mockNotifications.filter(n => n.category === 'employee').length },
  { id: 'document', name: 'Documents', icon: <FileText size={16} />, count: mockNotifications.filter(n => n.category === 'document').length },
  { id: 'system', name: 'System', icon: <Building size={16} />, count: mockNotifications.filter(n => n.category === 'system').length }
];

const priorityOptions = [
  { id: 'all', name: 'All Priorities' },
  { id: 'high', name: 'High Priority' },
  { id: 'medium', name: 'Medium Priority' },
  { id: 'low', name: 'Low Priority' }
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sound: false,
    leaveAlerts: true,
    payrollAlerts: true,
    attendanceAlerts: true,
    systemAlerts: false
  });

  // Filter notifications based on selections
  useEffect(() => {
    let filtered = notifications;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(notification => notification.category === selectedCategory);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(notification => notification.priority === selectedPriority);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(notification => 
        selectedStatus === 'unread' ? !notification.isRead : notification.isRead
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.sender?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [notifications, selectedCategory, selectedPriority, selectedStatus, searchTerm]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    const styles = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getCategoryIcon = (category: Notification['category']) => {
    switch (category) {
      case 'attendance':
        return <Clock size={14} className="text-blue-500" />;
      case 'leave':
        return <Calendar size={14} className="text-green-500" />;
      case 'payroll':
        return <DollarSign size={14} className="text-purple-500" />;
      case 'employee':
        return <User size={14} className="text-orange-500" />;
      case 'document':
        return <FileText size={14} className="text-red-500" />;
      case 'system':
        return <Building size={14} className="text-gray-500" />;
      default:
        return <Bell size={14} className="text-gray-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => (
    <div className={`p-4 border-l-4 ${
      notification.isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-500'
    } border rounded-lg hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-1">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold ${notification.isRead ? 'text-gray-900' : 'text-gray-900'}`}>
                {notification.title}
              </h3>
              {getPriorityBadge(notification.priority)}
            </div>
            <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                {getCategoryIcon(notification.category)}
                <span className="capitalize">{notification.category}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{formatTimestamp(notification.timestamp)}</span>
              </div>
              {notification.sender && (
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{notification.sender}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 ml-2">
          {!notification.isRead && (
            <button
              onClick={() => markAsRead(notification.id)}
              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Mark as read"
            >
              <CheckCircle size={14} />
            </button>
          )}
          <button
            onClick={() => deleteNotification(notification.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete notification"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with important alerts and messages</p>
            </div>
            <div className="flex gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCheck size={16} />
                  Mark All as Read
                </button>
              )}
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Settings size={16} />
                Settings
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Bell size={20} className="text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <Bell size={20} className="text-red-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => n.priority === 'high').length}
                  </p>
                </div>
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <AlertCircle size={20} className="text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {notifications.filter(n => {
                      const notificationDate = new Date(n.timestamp);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return notificationDate >= weekAgo;
                    }).length}
                  </p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <Clock size={20} className="text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div className="lg:col-span-2 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications by title, message, or sender..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorityOptions.map(priority => (
                <option key={priority.id} value={priority.id}>{priority.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setSelectedStatus('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === 'unread'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setSelectedStatus('read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedStatus === 'read'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* List Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedStatus === 'unread' ? 'Unread Notifications' : 
               selectedStatus === 'read' ? 'Read Notifications' : 'All Notifications'}
            </h2>
            {filteredNotifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Notifications */}
          <div className="divide-y divide-gray-200">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="text-center py-12">
                <Bell size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later for new notifications.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Notification Channels */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Notification Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, email: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-600">Browser push notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.push}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, push: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Sound Alerts</p>
                      <p className="text-sm text-gray-600">Play sound for new notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.sound}
                        onChange={(e) => setNotificationSettings({ ...notificationSettings, sound: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Notification Types */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Notification Types</h4>
                <div className="space-y-3">
                  {[
                    { key: 'leaveAlerts', label: 'Leave Requests', description: 'Leave approvals and rejections' },
                    { key: 'payrollAlerts', label: 'Payroll Updates', description: 'Payroll processing and updates' },
                    { key: 'attendanceAlerts', label: 'Attendance Alerts', description: 'Attendance irregularities and reports' },
                    { key: 'systemAlerts', label: 'System Notifications', description: 'System maintenance and updates' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                          onChange={(e) => setNotificationSettings({ 
                            ...notificationSettings, 
                            [item.key]: e.target.checked 
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;