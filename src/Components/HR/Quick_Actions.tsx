import React from 'react';
import { UserPlus, Calendar, FileText, Send, Clock, DollarSign, Award, Users } from 'lucide-react';

const QuickActions: React.FC = () => {
    const actions = [
        {
            id: 1,
            title: 'Add Employee',
            description: 'Onboard new team member',
            icon: UserPlus,
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            id: 2,
            title: 'Schedule Meeting',
            description: 'Plan team discussion',
            icon: Calendar,
            color: 'from-green-500 to-green-600',
            hoverColor: 'hover:from-green-600 hover:to-green-700',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        {
            id: 3,
            title: 'Generate Report',
            description: 'Create monthly summary',
            icon: FileText,
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600'
        },
        {
            id: 4,
            title: 'Send Announcement',
            description: 'Broadcast to all staff',
            icon: Send,
            color: 'from-orange-500 to-orange-600',
            hoverColor: 'hover:from-orange-600 hover:to-orange-700',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-600'
        },
        {
            id: 5,
            title: 'Review Attendance',
            description: 'Check time records',
            icon: Clock,
            color: 'from-red-500 to-red-600',
            hoverColor: 'hover:from-red-600 hover:to-red-700',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600'
        },
        {
            id: 6,
            title: 'Process Payroll',
            description: 'Run salary calculations',
            icon: DollarSign,
            color: 'from-teal-500 to-teal-600',
            hoverColor: 'hover:from-teal-600 hover:to-teal-700',
            bgColor: 'bg-teal-50',
            textColor: 'text-teal-600'
        },
        {
            id: 7,
            title: 'Performance Review',
            description: 'Evaluate employee performance',
            icon: Award,
            color: 'from-indigo-500 to-indigo-600',
            hoverColor: 'hover:from-indigo-600 hover:to-indigo-700',
            bgColor: 'bg-indigo-50',
            textColor: 'text-indigo-600'
        },
        {
            id: 8,
            title: 'Team Analytics',
            description: 'View team insights',
            icon: Users,
            color: 'from-pink-500 to-pink-600',
            hoverColor: 'hover:from-pink-600 hover:to-pink-700',
            bgColor: 'bg-pink-50',
            textColor: 'text-pink-600'
        }
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-200/50 p-4 sm:p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Quick Actions</h3>
                    <p className="text-sm text-gray-600">Frequently used HR operations</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-all duration-200">
                    Customize Actions
                </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {actions.map((action) => (
                    <button
                        key={action.id}
                        className="group p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-200 text-left transform hover:scale-105"
                    >
                        <div className="flex flex-col items-center text-center gap-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${action.color} ${action.hoverColor} rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg group-hover:shadow-xl`}>
                                <action.icon size={20} className="text-white" />
                            </div>
                            <div>
                                <h4 className={`font-semibold text-sm ${action.textColor} group-hover:text-gray-900 transition-colors mb-1`}>
                                    {action.title}
                                </h4>
                                <p className="text-xs text-gray-500 leading-relaxed">{action.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-center">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                        <UserPlus size={16} />
                        Add Custom Action
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickActions;