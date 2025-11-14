import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGauge,
    faMagnifyingGlass,
    faBuildingColumns,
    faTriangleExclamation,
    faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { Link, useLocation } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import { ServicePage } from "../pages/ServicePage";
import Report from "../pages/Report";
import Support from "../pages/Support";
import ComplaintPage from "../pages/ComplaintPage";
import CheckTransactionComplaint from "../pages/CheckTransactionComplaint";

import Users from "../pages/Users";

import { useAuth } from "../contexts/AuthContext";   // ✅ NEW

// -------------------- NAV ITEMS --------------------
export const navItems = [
    {
        icon: faGauge,
        label: "Dashboard",
        path: "/dashboard",
        roles: ["admin", "user"],   // ✅ Replaced isAdmin/isUser
        component: Dashboard,
    },
    {
        icon: faBuildingColumns,
        label: "Users",
        path: "/users",
        roles: ["admin"],           // Only admin
        component: Users,
    },
    {
        icon: faBuildingColumns,
        label: "Services",
        path: "/services",
        roles: ["user"],            // Only normal user
        component: ServicePage,
    },
    {
        icon: faFileLines,
        label: "Report",
        path: "/report",
        roles: ["admin", "user"],
        component: Report,
    },
    {
        icon: faMagnifyingGlass,
        label: "Support",
        path: "/support",
        roles: ["user"],
        component: Support,
    },
    {
        icon: faTriangleExclamation,
        label: "Complaint",
        path: "/complaint",
        roles: ["admin", "user"],
        component: ComplaintPage,
    },
    {
        icon: faCircleExclamation,
        label: "Check Complaint",
        path: "/checkcomplaint",
        roles: ["user"],
        component: CheckTransactionComplaint,
    },
];

// -------------------- SIDEBAR --------------------
export const Sidebar = () => {
    const { user } = useAuth();       // ✅ Get logged-in user
    const location = useLocation();

    const role = user?.role || "user";    // default

    const visibleItems = navItems.filter(item =>
        item.roles.includes(role)          // role check
    );

    return (
        <div className="flex flex-col w-20 md:w-24 bg-linear-to-b from-blue-900 to-blue-800 text-white shadow-2xl p-2 h-full">
            <nav className="grow overflow-y-auto py-8">
                <ul className="space-y-6">
                    {visibleItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className={`group flex flex-col items-center space-y-1 p-2 text-sm rounded-lg transition duration-150 ease-in-out cursor-pointer
                                        ${isActive ? "bg-white/20" : "hover:bg-white/20"}`}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="w-25 h-25 md:w-15 md:h-15 transition duration-200 group-hover:scale-130"
                                    />
                                    <span className="text-xs text-center">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            
            <div className="mt-auto pt-4">
                <hr className="border-white/50 mb-4" />
                <div className="flex flex-col items-center text-center text-white/70 text-[8px] md:text-[10px]">
                    <p>&copy; Copyright BBPS {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    );
};
