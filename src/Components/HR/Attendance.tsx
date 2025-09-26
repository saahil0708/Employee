import React from 'react';
import { TrendingUp, TrendingDown, Users, Clock, Calendar } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface AttendanceData {
  day: string;
  present: number;
  absent: number;
  late: number;
  total: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const AttendanceChart: React.FC = () => {
  const attendanceData: AttendanceData[] = [
    { day: 'Mon', present: 235, absent: 12, late: 8, total: 255 },
    { day: 'Tue', present: 242, absent: 5, late: 6, total: 253 },
    { day: 'Wed', present: 238, absent: 9, late: 4, total: 251 },
    { day: 'Thu', present: 245, absent: 2, late: 3, total: 250 },
    { day: 'Fri', present: 240, absent: 7, late: 5, total: 252 },
    { day: 'Sat', present: 180, absent: 67, late: 2, total: 249 },
    { day: 'Sun', present: 165, absent: 82, late: 1, total: 248 }
  ];

  const todayStats = { present: 232, absent: 15, late: 8, total: 255 };
  const attendanceRate = ((todayStats.present / todayStats.total) * 100).toFixed(1);

  const pieData: PieData[] = [
    { name: 'Present', value: todayStats.present, color: '#10b981' },
    { name: 'Absent', value: todayStats.absent, color: '#ef4444' },
    { name: 'Late', value: todayStats.late, color: '#f59e0b' }
  ];

  const weeklyTrendData = attendanceData.map(day => ({
    day: day.day,
    rate: ((day.present / day.total) * 100).toFixed(1)
  }));

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const dayData = attendanceData.find(d => d.day === label);
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm mb-1" style={{ color: entry.color }}>
              {entry.name}: {entry.value} ({dayData ? ((entry.value / dayData.total) * 100).toFixed(1) : '0'}%)
            </p>
          ))}
          {dayData && (
            <p className="text-sm font-medium text-gray-700 mt-2">
              Total: {dayData.total} employees
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const PieTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {payload[0].value} employees ({(payload[0].payload.percent * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Weekly Attendance</h3>
          </div>
          <p className="text-gray-600 text-sm">Employee attendance overview for this week</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Present</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Absent</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Late</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Stacked Bar Chart */}
        <div className="lg:col-span-2 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Daily Attendance Breakdown</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="present" name="Present" stackId="a" fill="#10b981" radius={[2, 2, 0, 0]} />
              <Bar dataKey="late" name="Late" stackId="a" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              <Bar dataKey="absent" name="Absent" stackId="a" fill="#ef4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Today's Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200 mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Trend</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weeklyTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
            <XAxis dataKey="day" />
            <YAxis domain={[60, 100]} />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Attendance Rate']}
              labelFormatter={(label) => `Day: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#2563eb' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users size={20} className="text-green-600" />
            </div>
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Present Today</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{todayStats.present}</p>
          <p className="text-xs text-green-600 flex items-center gap-1">
            <TrendingUp size={12} />
            +5 vs yesterday • {((todayStats.present / todayStats.total) * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-5 border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <Users size={20} className="text-red-600" />
            </div>
            <TrendingDown size={16} className="text-red-600" />
          </div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Absent Today</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{todayStats.absent}</p>
          <p className="text-xs text-red-600 flex items-center gap-1">
            <TrendingDown size={12} />
            -2 vs yesterday • {((todayStats.absent / todayStats.total) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <TrendingUp size={16} className="text-yellow-600" />
          </div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Late Today</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{todayStats.late}</p>
          <p className="text-xs text-yellow-600 flex items-center gap-1">
            <TrendingUp size={12} />
            +3 vs yesterday • {((todayStats.late / todayStats.total) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <TrendingUp size={12} className="text-white" />
            </div>
          </div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Attendance Rate</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{attendanceRate}%</p>
          <p className="text-xs text-blue-600 flex items-center gap-1">
            <TrendingUp size={12} />
            +1.2% this week • Above target
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Total Present This Week: <strong className="text-gray-900">{attendanceData.reduce((sum, day) => sum + day.present, 0)}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Weekly Average: <strong className="text-gray-900">{((attendanceData.reduce((sum, day) => sum + (day.present / day.total), 0) / 7) * 100).toFixed(1)}%</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Best Day: <strong className="text-gray-900">Thu (98.0%)</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;