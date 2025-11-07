import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGauge,
    faMagnifyingGlass, 
    faBuildingColumns,
    faTriangleExclamation,
    faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";

import {
    faFileLines,
} from "@fortawesome/free-regular-svg-icons";

const navItems = [
    { icon: faGauge, label: "Dashboard" },
    { icon: faBuildingColumns, label: "Services" },
    { icon: faFileLines, label: "Report" },
    { icon: faMagnifyingGlass, label: "Support" },
    { icon: faTriangleExclamation, label: "Complaint" },
    { icon: faCircleExclamation, label: "Check Complaint" },
];

export const Sidebar = () => {
    return (
        <div className="flex flex-col w-20 md:w-24 bg-linear-to-b from-blue-900 to-blue-800 text-white shadow-2xl p-2 h-full">
            <nav className="grow overflow-y-auto py-8"> 
                <ul className="space-y-6">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={`#${item.label.toLowerCase()}`}
                                className="group flex flex-col items-center space-y-1 p-2 text-sm hover:bg-white/20 rounded-lg transition duration-150 ease-in-out cursor-pointer"
                            >
                                
                                <FontAwesomeIcon 
                                    icon={item.icon} 
                                    className="w-25 h-25 md:w-15 md:h-15 transition duration-200 group-hover:scale-130" 
                                />
                                <span className="text-xs text-center">{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Sticky Footer */}
            <div className="mt-auto pt-4">
                <hr className="border-white/50 mb-4" />

                <div className="flex flex-col items-center text-center text-white/70 text-[8px] md:text-[10px]">
                    <p>&copy; Copyright BBPS {new Date().getFullYear()}</p>
                </div>
            </div>
        </div>
    );
};