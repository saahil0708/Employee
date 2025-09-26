import React from 'react';
import { Clock, User, Calendar, FileText } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'leave',
      icon: Calendar,
      user: 'Sarah Johnson',
      action: 'submitted a leave request',
      time: '2 hours ago',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 2,
      type: 'employee',
      icon: User,
      user: 'Mike Chen',
      action: 'updated profile information',
      time: '4 hours ago',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      type: 'document',
      icon: FileText,
      user: 'Emma Wilson',
      action: 'uploaded employment contract',
      time: '6 hours ago',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      type: 'attendance',
      icon: Clock,
      user: 'David Rodriguez',
      action: 'clocked in late',
      time: '8 hours ago',
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 5,
      type: 'employee',
      icon: User,
      user: 'Lisa Anderson',
      action: 'completed onboarding',
      time: '1 day ago',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
              <activity.icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;