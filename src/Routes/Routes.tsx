import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import HRDashboard from '../Pages/Dashboard/HR/Index';
import EmployeesPage from '../Pages/Dashboard/HR/Employee';
import Department from '../Pages/Dashboard/HR/Department';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
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
                element: <div className="p-6">Attendance Page - Coming Soon</div>
            },
            {
                path: "/leave",
                element: <div className="p-6">Leave Requests Page - Coming Soon</div>
            },
            {
                path: "/payroll",
                element: <div className="p-6">Payroll Page - Coming Soon</div>
            },
            {
                path: "/performance",
                element: <div className="p-6">Performance Page - Coming Soon</div>
            },
            {
                path: "/documents",
                element: <div className="p-6">Documents Page - Coming Soon</div>
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
                element: <div className="p-6">Reports Page - Coming Soon</div>
            },
            {
                path: "/settings",
                element: <div className="p-6">Settings Page - Coming Soon</div>
            },
            {
                path: "/profile",
                element: <div className="p-6">Profile Page - Coming Soon</div>
            },
            {
                path: "*",
                element: <div className="p-6">Page Not Found</div>
            }
        ]
    }
]);

export default router;