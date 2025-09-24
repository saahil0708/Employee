import { useState } from "react";
import Sidebar from "../Components/Global/Sidebar";
import Navbar from "../Components/Global/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleAddEmployee = () => {
        // Add employee logic here
        console.log("Add employee clicked");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar isCollapsed={isCollapsed} onToggle={handleToggle} />
            <div className={`transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                <Navbar onAddEmployee={handleAddEmployee} />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}