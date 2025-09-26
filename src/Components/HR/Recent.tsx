import React from 'react';
import { Clock, User, Calendar, FileText, Award, AlertCircle, CheckCircle } from 'lucide-react';

const RecentActivity: React.FC = () => {
    const activities = [
        {
            id: 1,
            type: 'leave',
            icon: Calendar,
            user: 'Sarah Johnson',
            action: 'submitted a leave request for vacation',
            time: '2 hours ago',
            color: 'bg-orange-100 text-orange-600',
            status: 'pending'
        },
        {
            id: 2,
            type: 'employee',
            icon: User,
            user: 'Mike Chen',
            action: 'updated profile information and contact details',
            time: '4 hours ago',
            color: 'bg-blue-100 text-blue-600',
            status: 'completed'
        },
        {
            id: 3,
            type: 'document',
            icon: FileText,
            user: 'Emma Wilson',
            action: 'uploaded employment contract and tax forms',
            time: '6 hours ago',
            color: 'bg-green-100 text-green-600',
            status: 'completed'
        },
        {
            id: 4,
            type: 'attendance',
            icon: Clock,
            user: 'David Rodriguez',
            action: 'clocked in late due to traffic',
            time: '8 hours ago',
            color: 'bg-red-100 text-red-600',
            status: 'noted'
        },
        {
            id: 5,
            type: 'performance',
            icon: Award,
            user: 'Lisa Anderson',
            action: 'completed quarterly performance review',
            time: '1 day ago',
            color: 'bg-purple-100 text-purple-600',
            status: 'completed'
        },
        {
            id: 6,
            type: 'employee',
            icon: User,
            user: 'James Wilson',
            action: 'completed onboarding process successfully',
            time: '2 days ago',
            color: 'bg-teal-100 text-teal-600',
            status: 'completed'
        }
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle size={14} className="text-green-500" />;
            case 'pending':
                return <AlertCircle size={14} className="text-orange-500" />;
            default:
                return <Clock size={14} className="text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'pending':
                return 'bg-orange-50 text-orange-700 border-orange-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200/50 p-4 sm:p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Recent Activity</h3>
                    <p className="text-sm text-gray-600">Latest updates and employee actions</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-all duration-200">
                    View All Activity
                </button>
            </div>
            
            <div className="space-y-4">
                {activities.map((activity) => (
                    <div key={activity.id} className="group p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200">
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.color} flex-shrink-0`}>
                                <activity.icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <p className="text-sm text-gray-900 leading-relaxed">
                                        <span className="font-semibold">{activity.user}</span> {activity.action}
                                    </p>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(activity.status)} flex-shrink-0`}>
                                        {getStatusIcon(activity.status)}
                                        <span className="capitalize">{activity.status}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <Clock size={12} />
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Showing 6 of 24 activities</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">Load more</button>
                </div>
            </div>
        </div>
    );
};

export default RecentActivity;