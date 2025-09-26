import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Bell, 
  Lock, 
  Users, 
  Mail, 
  Calendar,
  FileText,
  Shield,
  Database,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';

// Types
interface CompanySettings {
  companyName: string;
  companyEmail: string;
  phone: string;
  address: string;
  timezone: string;
  dateFormat: string;
  currency: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  newEmployeeAlerts: boolean;
  leaveRequestAlerts: boolean;
  payrollAlerts: boolean;
  attendanceAlerts: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
}

interface UserRole {
  id: string;
  name: string;
  permissions: string[];
  users: number;
}

interface AuditLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  ipAddress: string;
}

// Mock data
const mockCompanySettings: CompanySettings = {
  companyName: 'TechCorp Inc.',
  companyEmail: 'hr@techcorp.com',
  phone: '+1 (555) 123-4567',
  address: '123 Business Ave, Suite 100, San Francisco, CA 94105',
  timezone: 'America/Los_Angeles',
  dateFormat: 'MM/DD/YYYY',
  currency: 'USD'
};

const mockNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  newEmployeeAlerts: true,
  leaveRequestAlerts: true,
  payrollAlerts: false,
  attendanceAlerts: true
};

const mockSecuritySettings: SecuritySettings = {
  twoFactorAuth: true,
  sessionTimeout: 60,
  passwordExpiry: 90,
  loginAttempts: 5
};

const mockUserRoles: UserRole[] = [
  {
    id: '1',
    name: 'HR Admin',
    permissions: ['all_access'],
    users: 3
  },
  {
    id: '2',
    name: 'Department Manager',
    permissions: ['view_employees', 'approve_leave', 'view_reports'],
    users: 12
  },
  {
    id: '3',
    name: 'Employee',
    permissions: ['view_profile', 'request_leave'],
    users: 148
  }
];

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    user: 'john.doe@techcorp.com',
    action: 'Login',
    timestamp: '2024-01-15 09:30:25',
    ipAddress: '192.168.1.100'
  },
  {
    id: '2',
    user: 'sarah.wilson@techcorp.com',
    action: 'Updated employee profile',
    timestamp: '2024-01-15 10:15:42',
    ipAddress: '192.168.1.101'
  },
  {
    id: '3',
    user: 'mike.chen@techcorp.com',
    action: 'Generated payroll report',
    timestamp: '2024-01-15 11:20:15',
    ipAddress: '192.168.1.102'
  },
  {
    id: '4',
    user: 'admin@techcorp.com',
    action: 'Changed security settings',
    timestamp: '2024-01-15 14:45:33',
    ipAddress: '192.168.1.103'
  }
];

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'company' | 'notifications' | 'security' | 'roles' | 'backup' | 'audit'>('company');
  const [companySettings, setCompanySettings] = useState<CompanySettings>(mockCompanySettings);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(mockNotificationSettings);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings);
  const [userRoles, setUserRoles] = useState<UserRole[]>(mockUserRoles);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Singapore'
  ];

  const dateFormats = [
    'MM/DD/YYYY',
    'DD/MM/YYYY',
    'YYYY-MM-DD',
    'MM-DD-YYYY'
  ];

  const currencies = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'CAD',
    'AUD'
  ];

  const permissionsList = [
    'view_employees',
    'edit_employees',
    'delete_employees',
    'view_departments',
    'manage_departments',
    'approve_leave',
    'view_reports',
    'generate_reports',
    'manage_payroll',
    'system_settings'
  ];

  const handleSaveSettings = async () => {
    setIsLoading(true);
    setSaveStatus('saving');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = () => {
    // Simulate backup process
    alert('Backup process started. You will receive an email when completed.');
  };

  const handleExportData = () => {
    // Simulate data export
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      companySettings,
      notificationSettings,
      securitySettings
    }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "hr_settings_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const TabButton: React.FC<{ tab: typeof activeTab; icon: React.ReactNode; label: string }> = ({ tab, icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
        activeTab === tab
          ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  const SaveStatusIndicator = () => {
    if (saveStatus === 'idle') return null;

    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
        saveStatus === 'saving' ? 'bg-blue-50 text-blue-600' :
        saveStatus === 'success' ? 'bg-green-50 text-green-600' :
        'bg-red-50 text-red-600'
      }`}>
        {saveStatus === 'saving' && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>}
        {saveStatus === 'success' && <CheckCircle size={16} />}
        {saveStatus === 'error' && <XCircle size={16} />}
        <span className="text-sm font-medium">
          {saveStatus === 'saving' && 'Saving changes...'}
          {saveStatus === 'success' && 'Settings saved successfully!'}
          {saveStatus === 'error' && 'Error saving settings'}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your HR system configuration and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <nav className="space-y-1">
                <TabButton tab="company" icon={<Users size={18} />} label="Company Info" />
                <TabButton tab="notifications" icon={<Bell size={18} />} label="Notifications" />
                <TabButton tab="security" icon={<Shield size={18} />} label="Security" />
                <TabButton tab="roles" icon={<Lock size={18} />} label="User Roles" />
                <TabButton tab="backup" icon={<Database size={18} />} label="Backup & Export" />
                <TabButton tab="audit" icon={<FileText size={18} />} label="Audit Logs" />
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Company Settings */}
            {activeTab === 'company' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
                  <p className="text-sm text-gray-600">Update your company details and preferences</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={companySettings.companyName}
                        onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
                      <input
                        type="email"
                        value={companySettings.companyEmail}
                        onChange={(e) => setCompanySettings({ ...companySettings, companyEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={companySettings.phone}
                        onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                      <select
                        value={companySettings.timezone}
                        onChange={(e) => setCompanySettings({ ...companySettings, timezone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {timezones.map(tz => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                      <select
                        value={companySettings.dateFormat}
                        onChange={(e) => setCompanySettings({ ...companySettings, dateFormat: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {dateFormats.map(format => (
                          <option key={format} value={format}>{format}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        value={companySettings.currency}
                        onChange={(e) => setCompanySettings({ ...companySettings, currency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {currencies.map(currency => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                    <textarea
                      value={companySettings.address}
                      onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Notification Preferences</h2>
                  <p className="text-sm text-gray-600">Configure how you receive alerts and notifications</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Push Notifications</h3>
                        <p className="text-sm text-gray-600">Receive browser push notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.pushNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">New Employee Alerts</h3>
                          <p className="text-sm text-gray-600">When new employees are added</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.newEmployeeAlerts}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, newEmployeeAlerts: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Leave Request Alerts</h3>
                          <p className="text-sm text-gray-600">When employees request time off</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.leaveRequestAlerts}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, leaveRequestAlerts: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Payroll Alerts</h3>
                          <p className="text-sm text-gray-600">Payroll processing notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.payrollAlerts}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, payrollAlerts: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Attendance Alerts</h3>
                          <p className="text-sm text-gray-600">Unusual attendance patterns</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.attendanceAlerts}
                            onChange={(e) => setNotificationSettings({ ...notificationSettings, attendanceAlerts: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-sm text-gray-600">Configure system security and access controls</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Require 2FA for all users</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Session Timeout</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">After</span>
                        <select
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={30}>30 minutes</option>
                          <option value={60}>60 minutes</option>
                          <option value={120}>2 hours</option>
                          <option value={240}>4 hours</option>
                        </select>
                        <span className="text-sm text-gray-600">of inactivity</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-3">Password Policy</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Password Expiry</label>
                          <select
                            value={securitySettings.passwordExpiry}
                            onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value={30}>30 days</option>
                            <option value={60}>60 days</option>
                            <option value={90}>90 days</option>
                            <option value={180}>180 days</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Max Login Attempts</label>
                          <select
                            value={securitySettings.loginAttempts}
                            onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttempts: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value={3}>3 attempts</option>
                            <option value={5}>5 attempts</option>
                            <option value={10}>10 attempts</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Roles */}
            {activeTab === 'roles' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">User Roles & Permissions</h2>
                      <p className="text-sm text-gray-600">Manage access levels and permissions</p>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus size={16} />
                      Add Role
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {userRoles.map(role => (
                      <div key={role.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{role.name}</h3>
                          <p className="text-sm text-gray-600">
                            {role.permissions.length} permissions • {role.users} users
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {role.permissions.slice(0, 3).map(permission => (
                              <span key={permission} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                {permission.replace('_', ' ')}
                              </span>
                            ))}
                            {role.permissions.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                +{role.permissions.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Backup & Export */}
            {activeTab === 'backup' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Backup & Export</h2>
                  <p className="text-sm text-gray-600">Manage data backups and exports</p>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Database size={24} className="text-blue-600" />
                        <h3 className="font-semibold text-blue-900">System Backup</h3>
                      </div>
                      <p className="text-sm text-blue-700 mb-4">
                        Create a complete backup of all HR data including employees, departments, and settings.
                      </p>
                      <button
                        onClick={handleBackup}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Create Backup
                      </button>
                    </div>
                    
                    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3 mb-4">
                        <Download size={24} className="text-green-600" />
                        <h3 className="font-semibold text-green-900">Export Data</h3>
                      </div>
                      <p className="text-sm text-green-700 mb-4">
                        Export your settings and configuration data for migration or external use.
                      </p>
                      <button
                        onClick={handleExportData}
                        className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Export Settings
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">Last Backup</h3>
                    <p className="text-sm text-gray-600">January 14, 2024 at 02:00 AM</p>
                    <p className="text-xs text-gray-500 mt-1">Next automatic backup: January 21, 2024</p>
                  </div>
                </div>
              </div>
            )}

            {/* Audit Logs */}
            {activeTab === 'audit' && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Audit Logs</h2>
                  <p className="text-sm text-gray-600">System activity and access logs</p>
                </div>
                
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-sm font-medium text-gray-600">User</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">Action</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">Timestamp</th>
                          <th className="text-left py-3 text-sm font-medium text-gray-600">IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auditLogs.map(log => (
                          <tr key={log.id} className="border-b border-gray-100 last:border-0">
                            <td className="py-3 text-sm text-gray-900">{log.user}</td>
                            <td className="py-3 text-sm text-gray-900">{log.action}</td>
                            <td className="py-3 text-sm text-gray-600">{log.timestamp}</td>
                            <td className="py-3 text-sm text-gray-600">{log.ipAddress}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        {activeTab !== 'audit' && (
          <div className="fixed bottom-6 right-6 flex items-center gap-4">
            <SaveStatusIndicator />
            <button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;