import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Filter, 
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Building,
  Clock,
  FileText,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Types
interface DepartmentStats {
  name: string;
  employees: number;
  color: string;
}

interface SalaryData {
  month: string;
  salary: number;
  bonus: number;
  total: number;
}

interface AttendanceTrend {
  month: string;
  present: number;
  absent: number;
  late: number;
  attendanceRate: number;
}

interface ReportData {
  departments: DepartmentStats[];
  salaryExpenditure: SalaryData[];
  attendanceTrends: AttendanceTrend[];
  summary: {
    totalEmployees: number;
    totalDepartments: number;
    monthlySalary: number;
    avgAttendance: number;
  };
}

// Mock data - Replace with actual Supabase queries
const mockReportData: ReportData = {
  departments: [
    { name: 'Engineering', employees: 47, color: '#3b82f6' },
    { name: 'Marketing', employees: 23, color: '#10b981' },
    { name: 'HR', employees: 12, color: '#8b5cf6' },
    { name: 'Finance', employees: 18, color: '#f59e0b' },
    { name: 'Sales', employees: 35, color: '#ef4444' },
    { name: 'Operations', employees: 28, color: '#06b6d4' }
  ],
  salaryExpenditure: [
    { month: 'Jan', salary: 450000, bonus: 25000, total: 475000 },
    { month: 'Feb', salary: 460000, bonus: 28000, total: 488000 },
    { month: 'Mar', salary: 470000, bonus: 30000, total: 500000 },
    { month: 'Apr', salary: 480000, bonus: 32000, total: 512000 },
    { month: 'May', salary: 490000, bonus: 35000, total: 525000 },
    { month: 'Jun', salary: 500000, bonus: 40000, total: 540000 },
    { month: 'Jul', salary: 510000, bonus: 42000, total: 552000 },
    { month: 'Aug', salary: 520000, bonus: 45000, total: 565000 },
    { month: 'Sep', salary: 530000, bonus: 48000, total: 578000 },
    { month: 'Oct', salary: 540000, bonus: 50000, total: 590000 },
    { month: 'Nov', salary: 550000, bonus: 52000, total: 602000 },
    { month: 'Dec', salary: 560000, bonus: 55000, total: 615000 }
  ],
  attendanceTrends: [
    { month: 'Jan', present: 2450, absent: 120, late: 85, attendanceRate: 94.2 },
    { month: 'Feb', present: 2480, absent: 95, late: 78, attendanceRate: 95.1 },
    { month: 'Mar', present: 2520, absent: 80, late: 65, attendanceRate: 96.0 },
    { month: 'Apr', present: 2550, absent: 70, late: 55, attendanceRate: 96.5 },
    { month: 'May', present: 2580, absent: 65, late: 48, attendanceRate: 97.0 },
    { month: 'Jun', present: 2620, absent: 55, late: 42, attendanceRate: 97.5 },
    { month: 'Jul', present: 2650, absent: 45, late: 38, attendanceRate: 98.0 },
    { month: 'Aug', present: 2680, absent: 40, late: 35, attendanceRate: 98.3 },
    { month: 'Sep', present: 2720, absent: 35, late: 30, attendanceRate: 98.6 },
    { month: 'Oct', present: 2750, absent: 30, late: 25, attendanceRate: 98.9 },
    { month: 'Nov', present: 2780, absent: 25, late: 20, attendanceRate: 99.1 },
    { month: 'Dec', present: 2820, absent: 20, late: 15, attendanceRate: 99.4 }
  ],
  summary: {
    totalEmployees: 163,
    totalDepartments: 6,
    monthlySalary: 615000,
    avgAttendance: 97.2
  }
};

const ReportsPage: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData>(mockReportData);
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-12-31'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeChart, setActiveChart] = useState<'bar' | 'pie'>('bar');

  // Simulate data fetching
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReportData(mockReportData);
      setIsLoading(false);
    };

    fetchReportData();
  }, [dateRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const exportToCSV = () => {
    // Simulate CSV export
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Report Type,Data\n"
      + "Total Employees," + reportData.summary.totalEmployees + "\n"
      + "Total Departments," + reportData.summary.totalDepartments + "\n"
      + "Monthly Salary," + reportData.summary.monthlySalary + "\n"
      + "Average Attendance," + reportData.summary.avgAttendance + "%";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hr_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    // Simulate PDF export
    alert('PDF export functionality would be implemented here with a library like jsPDF');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('Salary') ? formatCurrency(entry.value) : entry.value}
              {entry.name === 'Attendance Rate' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const DepartmentChart = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Employees per Department</h3>
          <p className="text-sm text-gray-600">Distribution of employees across departments</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveChart('bar')}
            className={`p-2 rounded-lg transition-colors ${
              activeChart === 'bar' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <BarChart3 size={16} />
          </button>
          <button
            onClick={() => setActiveChart('pie')}
            className={`p-2 rounded-lg transition-colors ${
              activeChart === 'pie' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <PieChartIcon size={16} />
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        {activeChart === 'bar' ? (
          <BarChart data={reportData.departments}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="employees" name="Employees" radius={[4, 4, 0, 0]}>
              {reportData.departments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={reportData.departments}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="employees"
            >
              {reportData.departments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} employees`, 'Count']} />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );

  const SalaryExpenditureChart = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Salary Expenditure</h3>
        <p className="text-sm text-gray-600">Monthly salary and bonus payments</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={reportData.salaryExpenditure}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={value => formatCurrency(value).replace('$', '$')} />
          <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
          <Legend />
          <Area type="monotone" dataKey="total" name="Total" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
          <Area type="monotone" dataKey="salary" name="Base Salary" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
          <Area type="monotone" dataKey="bonus" name="Bonus" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  const AttendanceTrendChart = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Attendance Trends</h3>
        <p className="text-sm text-gray-600">Monthly attendance rates and patterns</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={reportData.attendanceTrends}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" domain={[90, 100]} />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'Attendance Rate') return [`${value}%`, name];
              return [value, name];
            }}
          />
          <Legend />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="present" 
            name="Present" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="absent" 
            name="Absent" 
            stroke="#ef4444" 
            strokeWidth={2}
            dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
          />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="late" 
            name="Late" 
            stroke="#f59e0b" 
            strokeWidth={2}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="attendanceRate" 
            name="Attendance Rate" 
            stroke="#3b82f6" 
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">HR Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive insights and analytics for HR management</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText size={16} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <Calendar size={20} className="text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Date Range</p>
              <p className="text-gray-900">2024 Full Year</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <Users size={20} className="text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-gray-900">{reportData.summary.totalEmployees}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <DollarSign size={20} className="text-orange-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Monthly Salary</p>
              <p className="text-gray-900">{formatCurrency(reportData.summary.monthlySalary)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <Users size={20} className="text-blue-600" />
            <TrendingUp size={16} className="text-blue-600" />
          </div>
          <p className="text-sm font-medium text-blue-800 mb-1">Total Employees</p>
          <p className="text-2xl font-bold text-blue-900">{reportData.summary.totalEmployees}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <Building size={20} className="text-green-600" />
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-sm font-medium text-green-800 mb-1">Departments</p>
          <p className="text-2xl font-bold text-green-900">{reportData.summary.totalDepartments}</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={20} className="text-orange-600" />
            <TrendingUp size={16} className="text-orange-600" />
          </div>
          <p className="text-sm font-medium text-orange-800 mb-1">Monthly Salary</p>
          <p className="text-2xl font-bold text-orange-900">{formatCurrency(reportData.summary.monthlySalary)}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <Clock size={20} className="text-purple-600" />
            <TrendingUp size={16} className="text-purple-600" />
          </div>
          <p className="text-sm font-medium text-purple-800 mb-1">Avg. Attendance</p>
          <p className="text-2xl font-bold text-purple-900">{reportData.summary.avgAttendance}%</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <DepartmentChart />
        <SalaryExpenditureChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AttendanceTrendChart />
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Department Summary Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Department</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-600">Employees</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-600">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {reportData.departments.map((dept, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 text-sm text-gray-900">{dept.name}</td>
                    <td className="py-3 text-sm text-gray-900 text-right">{dept.employees}</td>
                    <td className="py-3 text-sm text-gray-600 text-right">
                      {((dept.employees / reportData.summary.totalEmployees) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Salary Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Summary (Last 6 Months)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Month</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-600">Base Salary</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-600">Bonus</th>
                  <th className="text-right py-3 text-sm font-medium text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {reportData.salaryExpenditure.slice(-6).map((month, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 text-sm text-gray-900">{month.month}</td>
                    <td className="py-3 text-sm text-gray-900 text-right">{formatCurrency(month.salary)}</td>
                    <td className="py-3 text-sm text-gray-900 text-right">{formatCurrency(month.bonus)}</td>
                    <td className="py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(month.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;