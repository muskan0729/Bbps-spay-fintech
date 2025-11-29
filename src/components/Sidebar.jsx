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
import { useCookies } from "react-cookie";
import Dashboard from "../pages/Dashboard";
import { ServicePage } from "../pages/ServicePage";
import Report from "../pages/Report";
import Support from "../pages/Support";
import ComplaintPage from "../pages/ComplaintPage";
import CheckTransactionComplaint from "../pages/CheckTransactionComplaint";
import Users from "../pages/Users";

import { useAuth } from "../contexts/AuthContext";
import Scheme from "../pages/Scheme";

export const navItems = [
    { icon: faGauge, label: "Dashboard", path: "/dashboard", roles: ["admin", "user"], component: Dashboard },
    { icon: faBuildingColumns, label: "Users", path: "/users", roles: ["admin"], component: Users },
    { icon: faBuildingColumns, label: "Services", path: "/services", roles: ["user"], component: ServicePage },
    { icon: faFileLines, label: "Report", path: "/report", roles: ["admin", "user"], component: Report },
    { icon: faMagnifyingGlass, label: "Support", path: "/support", roles: ["user"], component: Support },
    { icon: faTriangleExclamation, label: "Complaint", path: "/complaint", roles: ["admin", "user"], component: ComplaintPage },
    { icon: faCircleExclamation, label: "Check Complaint", path: "/checkcomplaint", roles: ["user"], component: CheckTransactionComplaint },
    { icon: faCircleExclamation, label: "Scheme", path: "/scheme", roles: ["admin"], component: Scheme }
];

export const Sidebar = ({
    isMobile = false,
    isMobileSidebarOpen = false,
    sidebarRef = null,
    setIsMobileSidebarOpen
}) => {
    const [cookie] = useCookies();
    const { user } = useAuth();
    const location = useLocation();

    const role = cookie.role === 1 ? "admin" : "user";
    const filteredNavItems = navItems.filter(item => item.roles.includes(role));

    return (
        <div
            className={
                isMobile
                    ? `fixed inset-0 z-50 bg-black/40 transition-opacity duration-300
                       ${isMobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`
                    : ""
            }
        >
            <div
                ref={sidebarRef}
                className={`
                    flex flex-col bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-xl p-2 h-full
                    transform transition-transform duration-300 ease-in-out

                    ${isMobile
                        ? `w-40 ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`
                        : "w-16 md:w-20 lg:w-24 xl:w-28"
                    }
                `}
            >
                {/* NAVIGATION (No scroll bar) */}
                <nav className="grow overflow-y-hidden py-6">
                    <ul className="space-y-5">
                        {filteredNavItems.map((item, index) => {
                            const isActive = location.pathname === item.path;

                            return (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className={`
                                            group flex flex-col items-center p-2 rounded-lg transition-all
                                            ${isActive ? "bg-white/20" : "hover:bg-white/20"}
                                        `}
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 transition group-hover:scale-125"
                                        />
                                        <span className="text-[10px] md:text-xs text-center mt-1">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* FOOTER */}
                <div className="mt-auto pt-3">
                    <hr className="border-white/40 mb-3" />
                    <p className="text-center text-white/70 text-[9px] md:text-[11px]">
                        © BBPS {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </div>
    );
};
