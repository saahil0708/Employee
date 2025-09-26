import React from 'react';
import { Building2, Users, TrendingUp, MoreHorizontal } from 'lucide-react';

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
        { 
            name: 'Sales', 
            count: 42, 
            percentage: 17, 
            color: 'bg-green-500',
            growth: '+12%',
            manager: 'Mike Chen',
            budget: '$1.8M'
        },
        { 
            name: 'Marketing', 
            count: 28, 
            percentage: 11, 
            color: 'bg-purple-500',
            growth: '+5%',
            manager: 'Emma Wilson',
            budget: '$950K'
        },
        { 
            name: 'HR', 
            count: 15, 
            percentage: 6, 
            color: 'bg-orange-500',
            growth: '+2%',
            manager: 'David Rodriguez',
            budget: '$720K'
        },
        { 
            name: 'Finance', 
            count: 22, 
            percentage: 9, 
            color: 'bg-red-500',
            growth: '+3%',
            manager: 'Lisa Anderson',
            budget: '$1.2M'
        },
        { 
            name: 'Operations', 
            count: 35, 
            percentage: 14, 
            color: 'bg-teal-500',
            growth: '+15%',
            manager: 'James Wilson',
            budget: '$1.5M'
        }
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-200/50 p-4 sm:p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Department Overview</h3>
                    <p className="text-sm text-gray-600">Employee distribution across departments</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200">
                    <Building2 size={16} />
                    View All Departments
                </button>
            </div>

            {/* Department List */}
            <div className="space-y-4 mb-6">
                {departments.map((dept, index) => (
                    <div key={index} className="group p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 ${dept.color} rounded-xl flex items-center justify-center shadow-md`}>
                                    <Building2 size={18} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                                    <p className="text-sm text-gray-600">{dept.manager}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">{dept.count}</p>
                                    <p className="text-xs text-green-600 font-medium">{dept.growth}</p>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded-lg transition-all duration-200">
                                    <MoreHorizontal size={16} className="text-gray-400" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                                <div 
                                    className={`${dept.color} h-full rounded-full transition-all duration-1000 ease-out`}
                                    style={{ width: `${dept.percentage}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-600">{dept.percentage}%</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>Budget: {dept.budget}</span>
                            <span>{dept.count} employees</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">247</p>
                    <p className="text-sm text-gray-600">Total Employees</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">6</p>
                    <p className="text-sm text-gray-600">Departments</p>
                </div>
                <div className="text-center col-span-2 sm:col-span-1">
                    <p className="text-2xl font-bold text-green-600">+7.8%</p>
                    <p className="text-sm text-gray-600">Growth Rate</p>
                </div>
            </div>
        </div>
    );
};

export default DepartmentOverview;