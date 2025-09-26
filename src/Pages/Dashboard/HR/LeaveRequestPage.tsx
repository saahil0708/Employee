import React, { useState } from 'react';
import { Building2, Users, TrendingUp, MoreHorizontal, Calendar, Clock, User, CheckCircle, XCircle, Filter, ChevronDown } from 'lucide-react';

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: 'Sick' | 'Vacation' | 'Personal' | 'Emergency';
  startDate: string;
  endDate: string;
  duration: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedDate: string;
  manager: string;
}

const LeaveRequestSystem: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 'LR-001',
      employeeName: 'John Smith',
      employeeId: 'EMP-001',
      department: 'Engineering',
      leaveType: 'Vacation',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      duration: 5,
      reason: 'Family vacation',
      status: 'Pending',
      submittedDate: '2024-01-20',
      manager: 'Sarah Johnson'
    },
    {
      id: 'LR-002',
      employeeName: 'Mike Chen',
      employeeId: 'EMP-002',
      department: 'Sales',
      leaveType: 'Sick',
      startDate: '2024-02-10',
      endDate: '2024-02-12',
      duration: 2,
      reason: 'Medical appointment',
      status: 'Approved',
      submittedDate: '2024-01-15',
      manager: 'Mike Chen'
    },
    {
      id: 'LR-003',
      employeeName: 'Emma Wilson',
      employeeId: 'EMP-003',
      department: 'Marketing',
      leaveType: 'Personal',
      startDate: '2024-02-18',
      endDate: '2024-02-22',
      duration: 3,
      reason: 'Personal matters',
      status: 'Rejected',
      submittedDate: '2024-01-18',
      manager: 'Emma Wilson'
    },
    {
      id: 'LR-004',
      employeeName: 'David Rodriguez',
      employeeId: 'EMP-004',
      department: 'HR',
      leaveType: 'Emergency',
      startDate: '2024-02-05',
      endDate: '2024-02-07',
      duration: 2,
      reason: 'Family emergency',
      status: 'Pending',
      submittedDate: '2024-01-25',
      manager: 'David Rodriguez'
    }
  ]);

  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  const departments = ['All', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];

  const filteredRequests = leaveRequests.filter(request => {
    const statusMatch = filter === 'All' || request.status === filter;
    const departmentMatch = selectedDepartment === 'All' || request.department === selectedDepartment;
    return statusMatch && departmentMatch;
  });

  const handleApprove = (requestId: string) => {
    setLeaveRequests(prev => prev.map(request =>
      request.id === requestId ? { ...request, status: 'Approved' } : request
    ));
  };

  const handleReject = (requestId: string) => {
    setLeaveRequests(prev => prev.map(request =>
      request.id === requestId ? { ...request, status: 'Rejected' } : request
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'Rejected':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }
  };

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(r => r.status === 'Pending').length,
    approved: leaveRequests.filter(r => r.status === 'Approved').length,
    rejected: leaveRequests.filter(r => r.status === 'Rejected').length,
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/50 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Leave Request Management</h3>
          <p className="text-sm text-gray-600">Review and manage employee leave requests</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200">
            <Calendar size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Requests</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
          <p className="text-sm text-yellow-600">Pending</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{stats.approved}</p>
          <p className="text-sm text-green-600">Approved</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{stats.rejected}</p>
          <p className="text-sm text-red-600">Rejected</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <div className="relative">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="appearance-none px-3 py-2 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="relative">
          <select 
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="appearance-none px-3 py-2 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept} Department</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Leave Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div key={request.id} className="group p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-3 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User size={18} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{request.employeeName}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{request.department}</span>
                    <span>•</span>
                    <span>{request.employeeId}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(request.status)}
                    {request.status}
                  </div>
                </span>
                {request.status === 'Pending' && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleApprove(request.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(request.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-gray-400" />
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{request.leaveType}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{request.duration} days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Dates:</span>
                <span className="font-medium">{request.startDate} to {request.endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Manager:</span>
                <span className="font-medium">{request.manager}</span>
              </div>
            </div>

            {request.reason && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Reason:</span> {request.reason}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span>Submitted: {request.submittedDate}</span>
              <span>ID: {request.id}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Calendar size={48} className="mx-auto mb-3 text-gray-300" />
          <p>No leave requests found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

// Combined Dashboard Component
const HRDashboard: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <LeaveRequestSystem />
      <DepartmentOverview />
    </div>
  );
};

// Your existing DepartmentOverview component remains the same
const DepartmentOverview: React.FC = () => {
  const departments = [
    { 
      name: 'Engineering', 
      count: 85, 
      percentage: 34, 
      color: 'bg-blue-500',
      growth: '+8%',
      manager: 'Sarah Johnson',
      budget: '$2.1M'
    },
    // ... (rest of your department data)
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/50 p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
      {/* ... (your existing DepartmentOverview JSX) */}
    </div>
  );
};

export { LeaveRequestSystem, HRDashboard };
export default HRDashboard;