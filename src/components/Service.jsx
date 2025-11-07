import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserTie, faWifi, faTv, faPeopleGroup, faCreditCard,
    faSatelliteDish, faCarCrash, faGraduationCap, faBolt,
    faChargingStation, faRoad, faFire, faBuilding, faShieldHalved,
    faPhone, faMoneyBillWave, faGasPump, faMobileScreenButton, faRetweet,
    faCity, faLandmark, faMoneyCheckDollar, faTrain, faPlug,
    faDroplet, faHandHoldingDollar, faRotate, faIndianRupeeSign, faHouse,
    faUser, faFileInvoice, faReceipt, faTimes // faTimes for the close button
} from "@fortawesome/free-solid-svg-icons";

// --- Services List ---
const servicesList = [
    { icon: faUserTie, label: "Agent Collection" },
    { icon: faWifi, label: "Broadband Postpaid" },
    { icon: faTv, label: "Cable TV" },
    { icon: faPeopleGroup, label: "Clubs and Associations" },
    { icon: faCreditCard, label: "Credit Card" },
    { icon: faHandHoldingDollar, label: "Donation" },
    { icon: faSatelliteDish, label: "DTH" },
    { icon: faCarCrash, label: "eChallan" },
    { icon: faGraduationCap, label: "Education Fees" },
    { icon: faBolt, label: "Electricity" },
    { icon: faChargingStation, label: "EV Recharge" },
    { icon: faRoad, label: "Fastag" },
    { icon: faFire, label: "Gas" },
    { icon: faBuilding, label: "Housing Society" },
    { icon: faShieldHalved, label: "Insurance" },
    { icon: faPhone, label: "Landline Postpaid" },
    { icon: faMoneyBillWave, label: "Loan Repayment" },
    { icon: faGasPump, label: "LPG Gas" },
    { icon: faReceipt, label: "Mobile Postpaid" },
    { icon: faMobileScreenButton, label: "Mobile Prepaid" },
    { icon: faLandmark, label: "Municipal Services" },
    { icon: faFileInvoice, label: "Municipal Taxes" },
    { icon: faUser, label: "National Pension System" },
    { icon: faTrain, label: "NCMC Recharge" },
    { icon: faPlug, label: "Prepaid Meter" },
    { icon: faIndianRupeeSign, label: "Recurring Deposit" },
    { icon: faHouse, label: "Rental" },
    { icon: faRotate, label: "Subscription" },
    { icon: faDroplet, label: "Water" },
];

// --- 1. ServiceIcon Component (Original Styling Restored) ---
export const ServiceIcon = ({ item, onServiceClick }) => {
    return (
        <li className="flex flex-col items-center p-2">
            <button
                onClick={() => onServiceClick(item)}
                // 🚨 RESTORED ORIGINAL STYLING: w-10 h-10 and text-lg
                // Using bg-gradient-to-br as it was in the previous file for the blue colors
                className="bg-linear-to-br from-blue-900 to-blue-500 text-white w-10 h-10 rounded-full flex flex-col items-center justify-center shadow-lg transition duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label={item.label}
            >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
            </button>

            <span className="mt-2 text-xs font-medium text-center leading-tight">
                {item.label}
            </span>
        </li>
    );
};


// --- 2. BillerSelectionModal Component (Modal logic in the same file) ---
const BillerSelectionModal = ({ service, closeModal }) => {
    const modalContentRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const selectedBiller = ''; 

    // Trigger the "fly-in" animation on mount
    useEffect(() => {
        setTimeout(() => setIsAnimating(true), 10);
    }, []);

    // Handle outside click logic
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
                closeModal();
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeModal]);

    // Define dynamic classes for the fly-in animation
    const animationClasses = isAnimating
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-[-100px] opacity-0'; 

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300"
        >
            <div 
                ref={modalContentRef} 
                className={`bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4 transform transition-all duration-300 ease-out ${animationClasses}`}
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Modal Header: Gradient Background & Close Button */}
                <div className="flex justify-between items-center p-4 rounded-t-lg bg-linear-to-br from-blue-700 to-cyan-400 text-white">
                    <div className="flex items-center">
                        {/* Placeholder for "Bharat Connect" logo/text */}
                        <span className="text-lg font-bold mr-2">Bharat Connect</span> 
                        <span className="text-lg font-semibold">Select {service.label} Biller</span>
                    </div>
                    
                    <button 
                        onClick={closeModal}
                        className="p-1 rounded-full hover:bg-white/20 transition-colors"
                        aria-label="Close"
                    >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                    </button>
                </div>

                {/* Modal Body: Dropdown */}
                <div className="p-6">
                    <label htmlFor="biller-select" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Biller
                    </label>
                    <select
                        id="biller-select"
                        value={selectedBiller}
                        onChange={(e) => console.log('Biller selected:', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    >
                        <option value="">Select Biller</option>
                        <option value="Tata Play DTH">Tata Play DTH</option>
                    </select>
                </div>

                {/* Modal Footer: Buttons */}
                <div className="p-4 flex justify-end gap-3 border-t border-gray-100">
                    <button 
                        onClick={closeModal}
                        className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                        Close
                    </button>
                    <button 
                        onClick={() => console.log('Next button clicked')}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- 3. ServiceGrid Component (Main Renderer) ---
export const ServiceGrid = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const handleButtonClick = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    return (
        <>
            {/* Keeping the grid layout responsive */}
            <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-4 gap-x-2 p-4 w-full">
                {servicesList.map((item, index) => {
                    return (
                        <ServiceIcon 
                            key={index} 
                            item={item} 
                            onServiceClick={handleButtonClick}
                        />
                    );
                })}
            </ul>

            {/* Render the custom modal when open */}
            {isModalOpen && selectedService && (
                <BillerSelectionModal 
                    service={selectedService} 
                    closeModal={closeModal} 
                />
            )}
        </>
    );
};