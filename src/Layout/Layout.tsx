import { useState } from "react";
import Sidebar from "../Components/Global/Sidebar";
import Navbar from "../Components/Global/Navbar";
import { Outlet } from "react-router-dom";
import { LoadingProvider, useLoading } from "../Context/LoadingContext";
import ProgressLoader from "../Utils/ProgressLoader";
import { useNavigationLoader } from "../Hooks/useNavigationLoader";

const LayoutContent = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { isLoading } = useLoading();
    
    // This hook will handle navigation loading
    useNavigationLoader();

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleAddEmployee = () => {
        // Add employee logic here
        console.log("Add employee clicked");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ProgressLoader isLoading={isLoading} />
            <Sidebar isCollapsed={isCollapsed} onToggle={handleToggle} />
            <div className={`transition-all duration-300 ease-out will-change-transform transform-gpu ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                <Navbar onAddEmployee={handleAddEmployee} />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default function Layout() {
    return (
        <LoadingProvider>
            <LayoutContent />
        </LoadingProvider>
    );
}