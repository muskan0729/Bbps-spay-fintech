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
import { useAdmin } from "../contexts/AdminContext";

import Users from "../pages/Users";

export const navItems = [
    {
        icon: faGauge,
        label: "Dashboard",
        path: "/dashboard",
        isAdmin: true,
        isUser: true,
        component: Dashboard,
    },
    {
        icon: faBuildingColumns,
        label: "Users",
        path: "/users",
        isAdmin: true,
        isUser: false,
        component: Users,
    },
    {
        icon: faBuildingColumns,
        label: "Services",
        path: "/services",
        isAdmin: false,
        isUser: true,
        component: ServicePage,
    },
    {
        icon: faFileLines,
        label: "Report",
        path: "/report",
        isAdmin: true,
        isUser: true,
        component: Report,
    },
    {
        icon: faMagnifyingGlass,
        label: "Support",
        path: "/support",
        isAdmin: false,
        isUser: true,
        component: Support,
    },
    {
        icon: faTriangleExclamation,
        label: "Complaint",
        path: "/complaint",
        isAdmin: true,
        isUser: true,
        component: ComplaintPage,
    },
    {
        icon: faCircleExclamation,
        label: "Check Complaint",
        path: "/checkcomplaint",
        isAdmin: false,
        isUser: true,
        component: CheckTransactionComplaint,
    },
];

export const Sidebar = () => {
    const { isAdmin } = useAdmin();
    const location = useLocation();

    const filterFn = isAdmin ? (item) => item.isAdmin : (item) => item.isUser;

    return (
        <div className="flex flex-col w-20 md:w-24 bg-linear-to-b from-blue-900 to-blue-800 text-white shadow-2xl p-2 h-full">
            <nav className="grow overflow-y-auto py-8">
                <ul className="space-y-6">
                    {navItems.filter(filterFn).map((item, index) => {
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
