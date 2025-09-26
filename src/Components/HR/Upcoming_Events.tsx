import React from 'react';
import { Calendar, Clock, Users, MapPin, Video, Coffee, Briefcase } from 'lucide-react';

const UpcomingEvents: React.FC = () => {
    const events = [
        {
            id: 1,
            title: 'Team Building Workshop',
            date: 'Today',
            time: '2:00 PM',
            attendees: 24,
            location: 'Conference Room A',
            type: 'workshop',
            color: 'border-l-blue-500 bg-blue-50/50',
            icon: Users,
            iconColor: 'text-blue-600'
        },
        {
            id: 2,
            title: 'Performance Reviews Due',
            date: 'Tomorrow',
            time: '11:59 PM',
            attendees: 8,
            location: 'HR Department',
            type: 'deadline',
            color: 'border-l-red-500 bg-red-50/50',
            icon: Briefcase,
            iconColor: 'text-red-600'
        },
        {
            id: 3,
            title: 'New Employee Orientation',
            date: 'Dec 28',
            time: '9:00 AM',
            attendees: 3,
            location: 'Training Room',
            type: 'orientation',
            color: 'border-l-green-500 bg-green-50/50',
            icon: Users,
            iconColor: 'text-green-600'
        },
        {
            id: 4,
            title: 'Monthly All-Hands Meeting',
            date: 'Dec 30',
            time: '3:00 PM',
            attendees: 247,
            location: 'Main Auditorium',
            type: 'meeting',
            color: 'border-l-purple-500 bg-purple-50/50',
            icon: Video,
            iconColor: 'text-purple-600'
        },
        {
            id: 5,
            title: 'Coffee Chat with CEO',
            date: 'Jan 2',
            time: '10:00 AM',
            attendees: 15,
            location: 'Executive Lounge',
            type: 'social',
            color: 'border-l-orange-500 bg-orange-50/50',
            icon: Coffee,
            iconColor: 'text-orange-600'
        }
    ];

    const getEventTypeLabel = (type: string) => {
        const labels = {
            workshop: 'Workshop',
            deadline: 'Deadline',
            orientation: 'Orientation',
            meeting: 'Meeting',
            social: 'Social'
        };
        return labels[type as keyof typeof labels] || type;
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200/50 p-4 sm:p-6 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Upcoming Events</h3>
                    <p className="text-sm text-gray-600">Important dates and meetings</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200">
                    <Calendar size={16} />
                    View Calendar
                </button>
            </div>
            
            <div className="space-y-4">
                {events.map((event) => (
                    <div key={event.id} className={`group p-4 border-l-4 ${event.color} rounded-r-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer`}>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${event.color.replace('border-l-', 'bg-').replace('/50', '/20')} flex-shrink-0`}>
                                    <event.icon size={18} className='text-white' />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
                                        <span className={`px-2 py-1 text-xs text-white font-medium rounded-lg ${event.iconColor.replace('text-', 'text-')} ${event.color.replace('border-l-', 'bg-').replace('/50', '/20')}`}>
                                            {getEventTypeLabel(event.type)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            <span className="truncate">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} />
                                            <span className="truncate">{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users size={12} />
                                            <span className="truncate">{event.attendees} people</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next 5 events</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View all events</button>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents;