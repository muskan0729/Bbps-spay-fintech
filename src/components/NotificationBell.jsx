import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

// Mock API call function using async/await
const fetchNotificationsFromAPI = async () => {
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    // Simulate data structure
    // return []; // Uncomment this to test the "absent/invisible" state
    return [
        { id: 1, message: "New user registration." },
        { id: 2, message: "Report generation complete." },
        { id: 3, message: "High-priority ticket received." },
        { id: 4, message: "Database backup successful." }
    ];
};


export const NotificationBell = ({ notifications: propNotifications = [] }) => {
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [data, setData] = useState(propNotifications);
    const [isLoading, setIsLoading] = useState(true); // Start as loading
    const [fetchError, setFetchError] = useState(null);
    
    const containerRef = useRef(null);
    const count = data.length;

    const toggleToast = () => {
        setIsToastVisible(prev => !prev);
    };

    // 1. Data Fetching Logic using async/await
    const loadNotifications = useCallback(async () => {
        if (propNotifications.length > 0) {
            setData(propNotifications);
            setIsLoading(false);
            return;
        }

        try {
            const result = await fetchNotificationsFromAPI(); // Using async/await directly
            setData(result);
        } catch (err) {
            console.error("Failed to load notifications:", err);
            setFetchError("Could not load notifications.");
            setData([]); // Ensure data is empty on failure to prevent accidental render
        } finally {
            setIsLoading(false);
        }
    }, [propNotifications]);

    // Fetch data on component mount
    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    // 2. Outside Click Handling (Closing the toast)
    useEffect(() => {
        function handleClickOutside(event) {
            if (isToastVisible && containerRef.current && !containerRef.current.contains(event.target)) {
                setIsToastVisible(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isToastVisible]);

    // 3. Conditional Rendering (The main fix)
    // If loading, or if load finished AND count is zero, return null (invisible)
    if (isLoading || (count === 0 && !fetchError)) {
        return null;
    }

    const renderToastContent = () => {
        if (fetchError) {
            return <div className="text-center text-red-500 py-4 text-sm">{fetchError}</div>;
        }
        
        return (
            <ul className="max-h-60 overflow-y-auto">
                {data.map((n) => (
                    <li key={n.id} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b last:border-b-0 cursor-pointer">
                        {n.message}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="relative inline-block px-1" ref={containerRef}>
            
            {/* Notification Button (Visible because count > 0 or fetchError occurred) */}
            <button 
                onClick={toggleToast}
                className="text-white hover:bg-white/10 rounded-full transition duration-150 relative focus:outline-none"
                aria-label={`View ${count} notifications`}
            >
                <FontAwesomeIcon icon={faBell} className="h-6 w-6 text-blue-900" />
                
                {/* Pill is based purely on the successful count */}
                {count > 0 && (
                    <span 
                        className="absolute italic top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-[10px] font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full"
                        aria-live="polite" 
                    >
                        {count > 9 ? '9+' : count}
                    </span>
                )}
            </button>

            {isToastVisible && (
                <div 
                    className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl overflow-hidden z-50 ring-1 ring-black ring-opacity-5"
                    role="alert"
                >
                    <div className="py-2">
                        <p className="text-gray-900 font-semibold px-4 py-2 border-b">
                            {fetchError ? 'Error' : `Notifications (${count})`}
                        </p>
                        
                        {renderToastContent()}
                    </div>
                </div>
            )}
        </div>
    );
};