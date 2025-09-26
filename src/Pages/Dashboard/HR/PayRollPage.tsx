import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  Download, 
  Filter, 
  Search, 
  Eye, 
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertCircle,
  Building2,
  CreditCard,
  Bank,
  Wallet
} from 'lucide-react';

interface EmployeePayroll {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  baseSalary: number;
  overtime: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Pending' | 'Processing' | 'Failed';
  payDate: string;
  paymentMethod: 'Bank Transfer' | 'Direct Deposit' | 'Check';
  bankAccount?: string;
}

const PayrollPage: React.FC = () => {
  const [currentPeriod, setCurrentPeriod] = useState<string>('2024-02');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const payrollData: EmployeePayroll[] = [
    {
      id: 'PY-001',
      employeeId: 'EMP-001',
      name: 'Sarah Johnson',
      department: 'Engineering',
      position: 'Senior Developer',
      baseSalary: 8500,
      overtime: 1200,
      bonuses: 1500,
      deductions: 850,
      netSalary: 10350,
      status: 'Paid',
      payDate: '2024-02-28',
      paymentMethod: 'Direct Deposit',
      bankAccount: '**** 4832'
    },
    {
      id: 'PY-002',
      employeeId: 'EMP-002',
      name: 'Mike Chen',
      department: 'Sales',
      position: 'Sales Manager',
      baseSalary: 7200,
      overtime: 800,
      bonuses: 4200,
      deductions: 650,
      netSalary: 11550,
      status: 'Pending',
      payDate: '2024-02-28',
      paymentMethod: 'Bank Transfer',
      bankAccount: '**** 9176'
    },
    {
      id: 'PY-003',
      employeeId: 'EMP-003',
      name: 'Emma Wilson',
      department: 'Marketing',
      position: 'Marketing Director',
      baseSalary: 7800,
      overtime: 600,
      bonuses: 1800,
      deductions: 720,
      netSalary: 9480,
      status: 'Processing',
      payDate: '2024-02-28',
      paymentMethod: 'Direct Deposit',
      bankAccount: '**** 2541'
    },
    {
      id: 'PY-004',
      employeeId: 'EMP-004',
      name: 'David Rodriguez',
      department: 'HR',
      position: 'HR Manager',
      baseSalary: 6800,
      overtime: 400,
      bonuses: 800,
      deductions: 580,
      netSalary: 7420,
      status: 'Paid',
      payDate: '2024-02-28',
      paymentMethod: 'Direct Deposit',
      bankAccount: '**** 6398'
    },
    {
      id: 'PY-005',
      employeeId: 'EMP-005',
      name: 'Lisa Anderson',
      department: 'Finance',
      position: 'Finance Controller',
      baseSalary: 8200,
      overtime: 700,
      bonuses: 1200,
      deductions: 790,
      netSalary: 9310,
      status: 'Failed',
      payDate: '2024-02-28',
      paymentMethod: 'Bank Transfer',
      bankAccount: '**** 7321'
    }
  ];

  const departments = ['All', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
  const statuses = ['All', 'Paid', 'Pending', 'Processing', 'Failed'];

  const filteredData = payrollData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const payrollStats = {
    totalEmployees: payrollData.length,
    totalPayroll: payrollData.reduce((sum, emp) => sum + emp.netSalary, 0),
    averageSalary: payrollData.reduce((sum, emp) => sum + emp.netSalary, 0) / payrollData.length,
    paidEmployees: payrollData.filter(emp => emp.status === 'Paid').length,
    pendingAmount: payrollData.filter(emp => emp.status === 'Pending').reduce((sum, emp) => sum + emp.netSalary, 0)
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle size={14} className="text-green-500" />;
      case 'Pending':
        return <Clock size={14} className="text-yellow-500" />;
      case 'Processing':
        return <Clock size={14} className="text-blue-500" />;
      case 'Failed':
        return <AlertCircle size={14} className="text-red-500" />;
      default:
        return <Clock size={14} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Direct Deposit':
        return <Bank size={14} className="text-blue-500" />;
      case 'Bank Transfer':
        return <CreditCard size={14} className="text-green-500" />;
      case 'Check':
        return <Wallet size={14} className="text-purple-500" />;
      default:
        return <CreditCard size={14} className="text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Payroll Management</h1>
            <p className="text-gray-600 mt-2">Manage employee payments and payroll processing</p>
          </div>
          <div className="flex items-center gap-3 mt-4 lg:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
              <Download size={16} />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-200">
              <DollarSign size={16} />
              Process Payroll
            </button>
          </div>
        </div>

        {/* Payroll Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200/50 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Payroll</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(payrollStats.totalPayroll)}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <DollarSign size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-green-600 font-medium">+5.2% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/50 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Employees</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{payrollStats.totalEmployees}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Users size={20} className="text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-green-600 font-medium">+2 new hires</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/50 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Salary</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(payrollStats.averageSalary)}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <TrendingUp size={20} className="text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-green-600 font-medium">+3.1% increase</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/50 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(payrollStats.pendingAmount)}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <Clock size={20} className="text-orange-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TrendingDown size={14} className="text-red-500" />
              <span className="text-xs text-red-600 font-medium">3 payments pending</span>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-2xl border border-gray-200/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept} Department</option>
                ))}
              </select>

              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg">
                <Calendar size={16} className="text-gray-400" />
                <input
                  type="month"
                  value={currentPeriod}
                  onChange={(e) => setCurrentPeriod(e.target.value)}
                  className="text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payroll Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Employee</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Department</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Base Salary</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Bonuses</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Deductions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Net Salary</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.employeeId}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{employee.department}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      {formatCurrency(employee.baseSalary)}
                    </td>
                    <td className="py-4 px-4 text-sm text-green-600 font-medium">
                      +{formatCurrency(employee.bonuses)}
                    </td>
                    <td className="py-4 px-4 text-sm text-red-600 font-medium">
                      -{formatCurrency(employee.deductions)}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm font-bold text-gray-900">{formatCurrency(employee.netSalary)}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
                        {getStatusIcon(employee.status)}
                        {employee.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getPaymentMethodIcon(employee.paymentMethod)}
                        {employee.paymentMethod}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                          <Eye size={16} className="text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                          <MoreHorizontal size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <DollarSign size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No payroll records found matching your filters.</p>
            </div>
          )}

          {/* Summary */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {filteredData.length} of {payrollData.length} employees
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                Total: {formatCurrency(filteredData.reduce((sum, emp) => sum + emp.netSalary, 0))}
              </p>
              <p className="text-sm text-gray-600">For {currentPeriod} payroll period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollPage;