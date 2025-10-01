import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Login from '../Auth/Login';
import HRDashboard from '../Pages/Dashboard/HR/Index';
import EmployeesPage from '../Pages/Dashboard/HR/Employee';
import Department from '../Pages/Dashboard/HR/Department';
import AttendancePage from '../Pages/Dashboard/HR/Attendance';
import { LeaveRequestSystem } from '../Pages/Dashboard/HR/LeaveRequestPage';
import PayRollPage from '../Pages/Dashboard/HR/PayRollPage';
import ReportsPage from '../Pages/Dashboard/HR/Reports';
import SettingsPage from '../Pages/Dashboard/HR/Settings';
import DocumentsPage from '../Pages/Dashboard/HR/Documents';
import ProfilePage from '../Pages/Dashboard/HR/Profile';
import NotificationsPage from '../Pages/Dashboard/HR/Notifications';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

const router = createBrowserRouter([
    {
        path: "/auth/login",
        element: <Login />
    },
    {
        path: "/",
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        children: [
            {
                path: "/",
                element: <HRDashboard />
            },
            {
                path: "/employees",
                element: <EmployeesPage />
            },
            {
                path: "/add-employee",
                element: <div className="p-6">Add Employee Page - Coming Soon</div>
            },
            {
                path: "/departments",
                element: <Department />
            },
            {
                path: "/attendance",
                element: <AttendancePage />
            },
            {
                path: "/leave",
                element: <LeaveRequestSystem />
            },
            {
                path: "/payroll",
                element: <PayRollPage />
            },
            {
                path: "/performance",
                element: <div className="p-6">Performance Page - Coming Soon</div>
            },
            {
                path: "/documents",
                element: <DocumentsPage />
            },
            {
                path: "/recognition",
                element: <div className="p-6">Recognition Page - Coming Soon</div>
            },
            {
                path: "/messages",
                element: <div className="p-6">Messages Page - Coming Soon</div>
            },
            {
                path: "/reports",
                element: <ReportsPage />
            },
            {
                path: "/settings",
                element: <SettingsPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/notifications",
                element: <NotificationsPage />
            },
            {
                path: "*",
                element: <div className="p-6">Page Not Found</div>
            }
        ]
    }
]);

export default router;