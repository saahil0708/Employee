import React from 'react';
import { Users, Clock, Calendar, TrendingUp, Building2, AlertCircle, DollarSign, Award } from 'lucide-react';

const StatsGrid: React.FC = () => {
    const stats = [
        {
            title: 'Total Employees',
            value: '247',
            change: '+12 this month',
            changeType: 'increase' as const,
            icon: Users,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            title: 'Attendance Rate',
            value: '94.2%',
            change: '+2.1% vs last week',
            changeType: 'increase' as const,
            icon: Clock,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        // {
        //     title: 'Pending Requests',
        //     value: '8',
        //     change: '-3 from yesterday',
        //     changeType: 'decrease' as const,
        //     icon: Calendar,
        //     color: 'from-orange-500 to-orange-600',
        //     bgColor: 'bg-orange-50',
        //     textColor: 'text-orange-600'
        // },
        {
            title: 'Active Departments',
            value: '12',
            change: 'No change',
            changeType: 'neutral' as const,
            icon: Building2,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600'
        },
        {
            title: 'Monthly Payroll',
            value: '$284K',
            change: '+5.2% vs last month',
            changeType: 'increase' as const,
            icon: DollarSign,
            color: 'from-teal-500 to-teal-600',
            bgColor: 'bg-teal-50',
            textColor: 'text-teal-600'
        },
        // {
        //     title: 'Performance Score',
        //     value: '8.7/10',
        //     change: '+0.3 improvement',
        //     changeType: 'increase' as const,
        //     icon: Award,
        //     color: 'from-indigo-500 to-indigo-600',
        //     bgColor: 'bg-indigo-50',
        //     textColor: 'text-indigo-600'
        // }
    ];

    const getChangeIcon = (type: string) => {
        switch (type) {
            case 'increase': return '↗';
            case 'decrease': return '↘';
            default: return '→';
        }
    };

    const getChangeColor = (type: string) => {
        switch (type) {
            case 'increase': return 'text-green-600 bg-green-50';
            case 'decrease': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200/50 p-4 sm:p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                            <stat.icon size={24} className="text-white" />
                        </div>
                        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getChangeColor(stat.changeType)}`}>
                            {getChangeIcon(stat.changeType)} {stat.change}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;