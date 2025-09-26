import React from 'react';
import StatsGrid from '../../../Components/HR/Statcard';
import AttendanceChart from '../../../Components/HR/Attendance';
import DepartmentOverview from '../../../Components/HR/Department';
import RecentActivity from '../../../Components/HR/Recent';

import UpcomingEvents from '../../../Components/HR/Upcoming_Events';

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-6 sm:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
                        <p className="text-blue-100 text-sm sm:text-base">Here's what's happening with your team today.</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                            <p className="text-blue-100">Today</p>
                            <p className="font-semibold">{new Date().toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <StatsGrid />

            {/* Attendance Chart */}
            <AttendanceChart />

            {/* Secondary Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Department Overview */}
                <div className="lg:col-span-7">
                    <DepartmentOverview />
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-5">
                    <RecentActivity />
                </div>
            </div>

            {/* Upcoming Events */}
            <UpcomingEvents />
        </div>
    );
};

export default Dashboard;