import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Users,
    Building2,
    Clock,
    DollarSign,
    BarChart3,
    Settings,
    User,
    ChevronLeft,
    ChevronRight,
    Calendar,
    FileText,
    MessageSquare
} from 'lucide-react';

import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('dashboard');

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null, route: '/' },
        { id: 'employees', label: 'All Employees', icon: Users, badge: '247', route: '/employees' },
        { id: 'departments', label: 'Departments', icon: Building2, badge: '12', route: '/departments' },
        { id: 'attendance', label: 'Attendance', icon: Clock, badge: null, route: '/attendance' },
        { id: 'leave', label: 'Leave Requests', icon: Calendar, badge: '8', route: '/leave' },
        { id: 'payroll', label: 'Payroll', icon: DollarSign, badge: null, route: '/payroll' },
        { id: 'documents', label: 'Documents', icon: FileText, badge: null, route: '/documents' },
        // { id: 'communication', label: 'Messages', icon: MessageSquare, badge: '3', route: '/communication' },
        { id: 'reports', label: 'Reports', icon: BarChart3, badge: null, route: '/reports' },
    ];

    const bottomMenuItems = [
        { id: 'settings', label: 'Settings', icon: Settings, badge: null, route: '/settings' },
        { id: 'profile', label: 'My Profile', icon: User, badge: null, route: '/profile' },
    ];

    // Update active item based on current route
    useEffect(() => {
        const allItems = [...menuItems, ...bottomMenuItems];
        const currentItem = allItems.find(item => item.route === location.pathname);
        if (currentItem) {
            setActiveItem(currentItem.id);
        }
    }, [location.pathname]);

    const MenuItem = ({ item, isBottom = false }: { item: any; isBottom?: boolean }) => (
        <Link to={item.route}>
            <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`
        w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 rounded-lg group
        ${activeItem === item.id
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
        ${isCollapsed ? 'justify-center px-3' : ''}
      `}
            >
                <item.icon
                    size={20}
                    className={`
          transition-colors duration-200 flex-shrink-0
          ${activeItem === item.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
        `}
                />
                {!isCollapsed && (
                    <>
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.badge && (
                            <span
                                className={`
                ml-auto px-2 py-0.5 text-xs rounded-full font-medium
                ${activeItem === item.id
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}
              `}
                            >
                                {item.badge}
                            </span>
                        )}
                    </>
                )}
            </button>
        </Link>
    );

    return (
        <div className={`
      fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col z-[100]
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <Users size={18} className="text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-gray-900 text-lg">EmpSync</h1>
                                <p className="text-xs text-gray-500">Employee Management</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={onToggle}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 ml-auto"
                    >
                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-3">
                    {menuItems.map((item) => (
                        <MenuItem key={item.id} item={item} />
                    ))}
                </nav>
            </div>

            {/* Bottom Menu */}
            <div className="border-t border-gray-100 p-3">
                <nav className="space-y-1">
                    {bottomMenuItems.map((item) => (
                        <MenuItem key={item.id} item={item} isBottom />
                    ))}
                </nav>
            </div>

            {/* User Profile Section */}
            {!isCollapsed && (
                <div className="border-t border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">JD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 text-sm truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">HR Manager</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;