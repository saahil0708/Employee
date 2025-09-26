import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Users, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Download,
  User,
  TrendingUp,
  BarChart3,
  Watch,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronUp,
  PieChart,
  Activity,
  Target,
  Zap,
  TrendingDown
} from 'lucide-react';

// Types
interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day' | 'holiday';
  hoursWorked: number;
  department: string;
  position: string;
  notes?: string;
}

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
  attendance?: AttendanceRecord[];
}

interface AttendanceStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  attendanceRate: number;
  averageHours: number;
  totalHoursThisWeek: number;
  productivityScore: number;
}

// Enhanced mock data with more comprehensive records
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Developer',
    department: 'Engineering',
    hireDate: '2023-01-15',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    attendance: [
      { id: '1', employeeId: '1', employeeName: 'John Doe', date: '2024-01-15', checkIn: '08:55', checkOut: '17:05', status: 'present', hoursWorked: 8.2, department: 'Engineering', position: 'Senior Developer' },
      { id: '2', employeeId: '1', employeeName: 'John Doe', date: '2024-01-14', checkIn: '09:05', checkOut: '17:10', status: 'late', hoursWorked: 8.1, department: 'Engineering', position: 'Senior Developer' },
      { id: '3', employeeId: '1', employeeName: 'John Doe', date: '2024-01-13', checkIn: '08:50', checkOut: '17:00', status: 'present', hoursWorked: 8.2, department: 'Engineering', position: 'Senior Developer' },
      { id: '4', employeeId: '1', employeeName: 'John Doe', date: '2024-01-12', checkIn: '09:00', checkOut: '17:00', status: 'present', hoursWorked: 8.0, department: 'Engineering', position: 'Senior Developer' },
      { id: '5', employeeId: '1', employeeName: 'John Doe', date: '2024-01-11', checkIn: '08:45', checkOut: '16:30', status: 'half-day', hoursWorked: 7.8, department: 'Engineering', position: 'Senior Developer', notes: 'Doctor appointment' },
      { id: '6', employeeId: '1', employeeName: 'John Doe', date: '2024-01-10', checkIn: '08:55', checkOut: '17:10', status: 'present', hoursWorked: 8.3, department: 'Engineering', position: 'Senior Developer' },
      { id: '7', employeeId: '1', employeeName: 'John Doe', date: '2024-01-09', checkIn: '09:10', checkOut: '17:00', status: 'late', hoursWorked: 7.8, department: 'Engineering', position: 'Senior Developer' },
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    phone: '+1 (555) 987-6543',
    position: 'Marketing Manager',
    department: 'Marketing',
    hireDate: '2022-08-20',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    attendance: [
      { id: '8', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-15', checkIn: '09:15', checkOut: '17:00', status: 'late', hoursWorked: 7.8, department: 'Marketing', position: 'Marketing Manager' },
      { id: '9', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-14', checkIn: '09:00', checkOut: '17:30', status: 'present', hoursWorked: 8.5, department: 'Marketing', position: 'Marketing Manager' },
      { id: '10', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-13', checkIn: '09:00', checkOut: '17:00', status: 'present', hoursWorked: 8.0, department: 'Marketing', position: 'Marketing Manager' },
      { id: '11', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-12', checkIn: '-', checkOut: '-', status: 'absent', hoursWorked: 0, department: 'Marketing', position: 'Marketing Manager', notes: 'Sick leave' },
      { id: '12', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-11', checkIn: '08:50', checkOut: '17:10', status: 'present', hoursWorked: 8.3, department: 'Marketing', position: 'Marketing Manager' },
      { id: '13', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-10', checkIn: '08:55', checkOut: '17:05', status: 'present', hoursWorked: 8.2, department: 'Marketing', position: 'Marketing Manager' },
      { id: '14', employeeId: '2', employeeName: 'Jane Smith', date: '2024-01-09', checkIn: '09:00', checkOut: '16:45', status: 'half-day', hoursWorked: 7.8, department: 'Marketing', position: 'Marketing Manager' },
    ]
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    phone: '+1 (555) 456-7890',
    position: 'HR Specialist',
    department: 'Human Resources',
    hireDate: '2023-03-10',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    attendance: [
      { id: '15', employeeId: '3', employeeName: 'Mike Johnson', date: '2024-01-15', checkIn: '08:45', checkOut: '17:30', status: 'present', hoursWorked: 8.8, department: 'Human Resources', position: 'HR Specialist' },
      { id: '16', employeeId: '3', employeeName: 'Mike Johnson', date: '2024-01-14', checkIn: '08:40', checkOut: '17:20', status: 'present', hoursWorked: 8.7, department: 'Human Resources', position: 'HR Specialist' },
      { id: '17', employeeId: '3', employeeName: 'Mike Johnson', date: '2024-01-13', checkIn: '08:50', checkOut: '17:15', status: 'present', hoursWorked: 8.4, department: 'Human Resources', position: 'HR Specialist' },
      { id: '18', employeeId: '3', employeeName: 'Mike Johnson', date: '2024-01-12', checkIn: '08:55', checkOut: '17:05', status: 'present', hoursWorked: 8.2, department: 'Human Resources', position: 'HR Specialist' },
      { id: '19', employeeId: '3', employeeName: 'Mike Johnson', date: '2024-01-11', checkIn: '09:00', checkOut: '17:00', status: 'present', hoursWorked: 8.0, department: 'Human Resources', position: 'HR Specialist' },
      { id: '20', employeeId: '3', employeeName: 'Mike Johnson', date: '2024-01-10', checkIn: '08:45', checkOut: '17:25', status: 'present', hoursWorked: 8.7, department: 'Human Resources', position: 'HR Specialist' },
      { id: '21', employeeId: '3', employeeName: 'Mike Johnson', date: '2024-01-09', checkIn: '08:50', checkOut: '17:10', status: 'present', hoursWorked: 8.3, department: 'Human Resources', position: 'HR Specialist' },
    ]
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    phone: '+1 (555) 234-5678',
    position: 'Sales Executive',
    department: 'Sales',
    hireDate: '2023-02-01',
    status: 'active',
    attendance: [
      { id: '22', employeeId: '4', employeeName: 'Sarah Wilson', date: '2024-01-15', checkIn: '09:00', checkOut: '16:00', status: 'half-day', hoursWorked: 7.0, department: 'Sales', position: 'Sales Executive', notes: 'Field visit' },
      { id: '23', employeeId: '4', employeeName: 'Sarah Wilson', date: '2024-01-14', checkIn: '08:50', checkOut: '17:15', status: 'present', hoursWorked: 8.4, department: 'Sales', position: 'Sales Executive' },
      { id: '24', employeeId: '4', employeeName: 'Sarah Wilson', date: '2024-01-13', checkIn: '09:10', checkOut: '17:05', status: 'late', hoursWorked: 7.9, department: 'Sales', position: 'Sales Executive' },
      { id: '25', employeeId: '4', employeeName: 'Sarah Wilson', date: '2024-01-12', checkIn: '08:45', checkOut: '17:20', status: 'present', hoursWorked: 8.6, department: 'Sales', position: 'Sales Executive' },
      { id: '26', employeeId: '4', employeeName: 'Sarah Wilson', date: '2024-01-11', checkIn: '09:00', checkOut: '17:00', status: 'present', hoursWorked: 8.0, department: 'Sales', position: 'Sales Executive' },
      { id: '27', employeeId: '4', employeeName: 'Sarah Wilson', date: '2024-01-10', checkIn: '08:55', checkOut: '17:05', status: 'present', hoursWorked: 8.2, department: 'Sales', position: 'Sales Executive' },
      { id: '28', employeeId: '4', employeeName: 'Sarah Wilson', date: '2024-01-09', checkIn: '09:20', checkOut: '17:00', status: 'late', hoursWorked: 7.7, department: 'Sales', position: 'Sales Executive' },
    ]
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@company.com',
    phone: '+1 (555) 345-6789',
    position: 'Finance Analyst',
    department: 'Finance',
    hireDate: '2023-04-15',
    status: 'active',
    attendance: [
      { id: '29', employeeId: '5', employeeName: 'David Brown', date: '2024-01-15', checkIn: '-', checkOut: '-', status: 'absent', hoursWorked: 0, department: 'Finance', position: 'Finance Analyst', notes: 'Vacation' },
      { id: '30', employeeId: '5', employeeName: 'David Brown', date: '2024-01-14', checkIn: '08:55', checkOut: '17:10', status: 'present', hoursWorked: 8.3, department: 'Finance', position: 'Finance Analyst' },
      { id: '31', employeeId: '5', employeeName: 'David Brown', date: '2024-01-13', checkIn: '08:50', checkOut: '17:05', status: 'present', hoursWorked: 8.3, department: 'Finance', position: 'Finance Analyst' },
      { id: '32', employeeId: '5', employeeName: 'David Brown', date: '2024-01-12', checkIn: '09:00', checkOut: '17:00', status: 'present', hoursWorked: 8.0, department: 'Finance', position: 'Finance Analyst' },
      { id: '33', employeeId: '5', employeeName: 'David Brown', date: '2024-01-11', checkIn: '08:45', checkOut: '17:15', status: 'present', hoursWorked: 8.5, department: 'Finance', position: 'Finance Analyst' },
      { id: '34', employeeId: '5', employeeName: 'David Brown', date: '2024-01-10', checkIn: '09:05', checkOut: '17:00', status: 'late', hoursWorked: 7.9, department: 'Finance', position: 'Finance Analyst' },
      { id: '35', employeeId: '5', employeeName: 'David Brown', date: '2024-01-09', checkIn: '08:55', checkOut: '17:10', status: 'present', hoursWorked: 8.3, department: 'Finance', position: 'Finance Analyst' },
    ]
  }
];

const AttendancePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'employee'>('overview');
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter'>('week');

  // Calculate comprehensive stats
  const calculateStats = (): AttendanceStats => {
    const allRecords = employees.flatMap(emp => emp.attendance || []);
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = allRecords.filter(record => record.date === today);
    
    const presentToday = todayRecords.filter(record => record.status === 'present').length;
    const absentToday = todayRecords.filter(record => record.status === 'absent').length;
    const lateToday = todayRecords.filter(record => record.status === 'late').length;
    const totalToday = todayRecords.length;
    const attendanceRate = totalToday > 0 ? (presentToday / totalToday) * 100 : 0;
    const averageHours = allRecords.length > 0 ? allRecords.reduce((sum, record) => sum + record.hoursWorked, 0) / allRecords.length : 0;
    
    // Last 7 days records for weekly total
    const lastWeekRecords = allRecords.slice(-35); // Approximate last week
    const totalHoursThisWeek = lastWeekRecords.reduce((sum, record) => sum + record.hoursWorked, 0);
    
    // Productivity score based on attendance consistency and hours
    const productivityScore = Math.min(100, attendanceRate + (averageHours / 10) * 10);

    return {
      totalEmployees: employees.length,
      presentToday,
      absentToday,
      lateToday,
      attendanceRate,
      averageHours,
      totalHoursThisWeek,
      productivityScore
    };
  };

  const stats = calculateStats();

  // Filter employees
  useEffect(() => {
    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(employee => employee.department === selectedDepartment);
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, selectedDepartment, employees]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'absent':
        return <XCircle size={16} className="text-red-600" />;
      case 'late':
        return <AlertCircle size={16} className="text-orange-600" />;
      case 'half-day':
        return <Clock size={16} className="text-blue-600" />;
      case 'holiday':
        return <Calendar size={16} className="text-purple-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-orange-100 text-orange-800';
      case 'half-day':
        return 'bg-blue-100 text-blue-800';
      case 'holiday':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (time: string) => {
    if (time === '-') return '-';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const openEmployeeRecords = (employee: Employee) => {
    setSelectedEmployee(employee);
    setViewMode('employee');
  };

  const departments = Array.from(new Set(employees.map(emp => emp.department)));

  // Enhanced Chart Components
  const AttendancePieChart: React.FC<{ records: AttendanceRecord[]; title: string; size?: 'small' | 'large' }> = ({ records, title, size = 'large' }) => {
    const statusCounts = records.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const data = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      percentage: (count / records.length) * 100
    }));

    const colors = {
      present: '#10b981',
      absent: '#ef4444',
      late: '#f59e0b',
      'half-day': '#3b82f6',
      holiday: '#8b5cf6'
    };

    const chartSize = size === 'small' ? 80 : 120;
    const strokeWidth = size === 'small' ? 10 : 15;

    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-4 ${size === 'large' ? 'p-6' : 'p-4'}`}>
        <h3 className="font-semibold text-gray-900 mb-3 text-sm">{title}</h3>
        <div className="flex items-center">
          <div className={`relative ${size === 'small' ? 'w-20 h-20' : 'w-32 h-32'}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {data.reduce((acc, item, index) => {
                const startAngle = acc;
                const endAngle = startAngle + (item.percentage / 100) * 360;
                const largeArcFlag = item.percentage > 50 ? 1 : 0;
                
                const x1 = 50 + 40 * Math.cos(Math.PI * startAngle / 180);
                const y1 = 50 + 40 * Math.sin(Math.PI * startAngle / 180);
                const x2 = 50 + 40 * Math.cos(Math.PI * endAngle / 180);
                const y2 = 50 + 40 * Math.sin(Math.PI * endAngle / 180);

                const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                
                return (
                  <g key={item.status}>
                    <path d={path} fill={colors[item.status as keyof typeof colors]} />
                  </g>
                );
              }, 0)}
            </svg>
            {size === 'large' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{records.length}</span>
              </div>
            )}
          </div>
          <div className={`flex-1 ml-4 space-y-1 ${size === 'small' ? 'space-y-1' : 'space-y-2'}`}>
            {data.map(item => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: colors[item.status as keyof typeof colors] }}
                  />
                  <span className={`capitalize ${size === 'small' ? 'text-xs' : 'text-sm'}`}>{item.status}</span>
                </div>
                <span className={`font-medium ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
                  {size === 'small' ? item.count : `${item.count} (${item.percentage.toFixed(0)}%)`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const HoursTrendChart: React.FC<{ records: AttendanceRecord[]; title: string; height?: number }> = ({ records, title, height = 160 }) => {
    const last7Records = records.slice(-7).reverse();
    const maxHours = Math.max(...last7Records.map(r => r.hoursWorked), 10);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
        <div className={`flex items-end gap-2`} style={{ height: `${height}px` }}>
          {last7Records.map((record, index) => (
            <div key={record.id} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-700 relative group"
                style={{ height: `${(record.hoursWorked / maxHours) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {record.hoursWorked}h
                </div>
              </div>
              <span className="text-xs mt-2 text-gray-600">
                {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DepartmentComparisonChart: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    const departmentStats = departments.map(dept => {
      const deptEmployees = employees.filter(emp => emp.department === dept);
      const deptRecords = deptEmployees.flatMap(emp => emp.attendance || []);
      const presentCount = deptRecords.filter(r => r.status === 'present').length;
      const attendanceRate = deptRecords.length > 0 ? (presentCount / deptRecords.length) * 100 : 0;
      
      return {
        department: dept,
        attendanceRate,
        employeeCount: deptEmployees.length,
        totalRecords: deptRecords.length
      };
    });

    const maxRate = Math.max(...departmentStats.map(d => d.attendanceRate));

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Department Performance</h3>
        <div className="space-y-3">
          {departmentStats.map((dept, index) => (
            <div key={dept.department} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 w-32 truncate">{dept.department}</span>
              <div className="flex-1 mx-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(dept.attendanceRate / maxRate) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-bold text-gray-900 w-12 text-right">{dept.attendanceRate.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProductivityGauge: React.FC<{ score: number; title: string }> = ({ score, title }) => {
    const percentage = Math.min(100, Math.max(0, score));
    const color = percentage >= 80 ? 'from-green-400 to-green-600' : 
                 percentage >= 60 ? 'from-yellow-400 to-yellow-600' : 'from-red-400 to-red-600';

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
        <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full bg-gray-200 relative">
            <div 
              className={`w-full h-full rounded-full bg-gradient-to-r ${color} absolute clip-half`}
              style={{ clipPath: `inset(0 0 0 50%)` }}
            />
            <div 
              className="w-full h-full rounded-full absolute"
              style={{
                transform: `rotate(${percentage * 1.8}deg)`,
                clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)`
              }}
            >
              <div className={`w-full h-full rounded-full bg-gradient-to-r ${color}`} />
            </div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{percentage.toFixed(0)}%</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3">Productivity Score</p>
      </div>
    );
  };

  const WeeklyAttendanceChart: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = days.map(day => {
      // Simulate data for each day
      const present = Math.floor(Math.random() * employees.length * 0.8) + employees.length * 0.2;
      const total = employees.length;
      return { day, present, total, rate: (present / total) * 100 };
    });

    const maxRate = Math.max(...weekData.map(d => d.rate));

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Weekly Attendance Trend</h3>
        <div className="flex items-end justify-between h-40">
          {weekData.map((day, index) => (
            <div key={day.day} className="flex flex-col items-center flex-1">
              <div className="flex flex-col justify-end h-32 w-full max-w-16">
                <div 
                  className="bg-gradient-to-t from-blue-500 to-blue-600 rounded-t transition-all duration-300 relative group"
                  style={{ height: `${(day.rate / maxRate) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.rate.toFixed(0)}% ({day.present}/{day.total})
                  </div>
                </div>
              </div>
              <span className="text-xs mt-2 text-gray-600">{day.day}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
    const recentRecords = employee.attendance?.slice(-5) || [];
    const presentCount = employee.attendance?.filter(r => r.status === 'present').length || 0;
    const totalCount = employee.attendance?.length || 0;
    const attendanceRate = totalCount > 0 ? (presentCount / totalCount) * 100 : 0;
    const avgHours = employee.attendance?.reduce((sum, r) => sum + r.hoursWorked, 0) / totalCount || 0;

    // Calculate productivity score for employee
    const productivityScore = Math.min(100, attendanceRate + (avgHours / 10) * 10);

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {employee.avatar ? (
              <img src={employee.avatar} alt={employee.name} className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{employee.name}</h3>
              <p className="text-sm text-gray-600">{employee.position} • {employee.department}</p>
            </div>
          </div>
          <button 
            onClick={() => openEmployeeRecords(employee)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-blue-600"
          >
            <BarChart3 size={16} />
          </button>
        </div>
        
        {/* Mini charts row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{attendanceRate.toFixed(0)}%</div>
            <div className="text-xs text-gray-600">Attendance</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-gray-900">{avgHours.toFixed(1)}h</div>
            <div className="text-xs text-gray-600">Avg. Hours</div>
          </div>
        </div>

        {/* Productivity gauge mini */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Productivity</span>
            <span>{productivityScore.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                productivityScore >= 80 ? 'bg-green-500' :
                productivityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${productivityScore}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Recent Attendance:</p>
          {recentRecords.map(record => (
            <div key={record.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{new Date(record.date).toLocaleDateString()}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900">
                  {formatTime(record.checkIn)} - {formatTime(record.checkOut)}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(record.status)}`}>
                  {getStatusIcon(record.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {viewMode === 'overview' ? 'Attendance Analytics' : `${selectedEmployee?.name}'s Attendance`}
            </h1>
            <p className="text-gray-600">
              {viewMode === 'overview' ? 'Comprehensive attendance analytics and insights' : 'Detailed individual attendance analysis'}
            </p>
          </div>
          
          <div className="flex gap-3">
            {viewMode === 'employee' && (
              <button
                onClick={() => setViewMode('overview')}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200"
              >
                ← Back to Overview
              </button>
            )}
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors duration-200">
              <Download size={20} />
              Export Report
            </button>
          </div>
        </div>

        {/* Enhanced Stats Overview with Mini Charts */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-600 h-1 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.attendanceRate.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp size={20} className="text-green-600" />
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-green-600 h-1 rounded-full" 
                style={{ width: `${stats.attendanceRate}%` }} 
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Hours/Day</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageHours.toFixed(1)}h</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Clock size={20} className="text-orange-600" />
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-orange-600 h-1 rounded-full" 
                style={{ width: `${(stats.averageHours / 10) * 100}%` }} 
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Productivity</p>
                <p className="text-2xl font-bold text-gray-900">{stats.productivityScore.toFixed(0)}%</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Zap size={20} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-purple-600 h-1 rounded-full" 
                style={{ width: `${stats.productivityScore}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        {viewMode === 'overview' && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees by name, department, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <div className="relative">
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="w-full appearance-none px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="relative">
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value as any)}
                      className="w-full appearance-none px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {viewMode === 'overview' ? (
        <div className="space-y-6">
          {/* Top Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AttendancePieChart 
              records={employees.flatMap(emp => emp.attendance || [])} 
              title="Overall Attendance Distribution"
              size="large"
            />
            <WeeklyAttendanceChart employees={employees} />
            <ProductivityGauge score={stats.productivityScore} title="Team Productivity" />
          </div>

          {/* Middle Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DepartmentComparisonChart employees={employees} />
            <HoursTrendChart 
              records={employees.flatMap(emp => emp.attendance || [])} 
              title="Weekly Hours Trend"
              height={200}
            />
          </div>

          {/* Employee Cards Grid */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Employee Attendance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEmployees.map(employee => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        selectedEmployee && (
          <div className="space-y-6">
            {/* Employee Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                {selectedEmployee.avatar ? (
                  <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-16 h-16 rounded-full" />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                  <p className="text-gray-600">{selectedEmployee.position} • {selectedEmployee.department}</p>
                  <p className="text-sm text-gray-500">Email: {selectedEmployee.email} • Phone: {selectedEmployee.phone}</p>
                </div>
                <ProductivityGauge 
                  score={Math.min(100, 
                    (selectedEmployee.attendance?.filter(r => r.status === 'present').length || 0) / 
                    (selectedEmployee.attendance?.length || 1) * 100 + 
                    ((selectedEmployee.attendance?.reduce((sum, r) => sum + r.hoursWorked, 0) || 0) / 
                    (selectedEmployee.attendance?.length || 1) / 10) * 10
                  )} 
                  title="Productivity Score"
                />
              </div>
            </div>

            {/* Employee Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AttendancePieChart 
                records={selectedEmployee.attendance || []} 
                title="Personal Attendance Distribution"
                size="large"
              />
              <HoursTrendChart 
                records={selectedEmployee.attendance || []} 
                title="Personal Hours Trend"
                height={200}
              />
            </div>

            {/* Detailed Records */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Detailed Attendance Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In/Out</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {(selectedEmployee.attendance || []).map(record => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatTime(record.checkIn)} - {formatTime(record.checkOut)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.hoursWorked > 0 ? `${record.hoursWorked.toFixed(1)}h` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {getStatusIcon(record.status)}
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{record.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AttendancePage;