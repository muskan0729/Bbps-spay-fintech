import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useState, useEffect, useRef } from "react";

export const Layout = () => {
    const breakpoint = 768;
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < breakpoint);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleSidebarClickOutside = (e) => {
            // If the sidebar is open and the click is outside of the ref
            if (isMobileSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsMobileSidebarOpen(false);
            }
        };
        if (isMobileSidebarOpen) {
            document.addEventListener("mousedown", handleSidebarClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleSidebarClickOutside);
        };
    }, [isMobileSidebarOpen]);
    return (
        <div className={isMobile ? "" : "flex flex-col h-screen"}>
            <Header isMobile={isMobile} setIsMobileSidebarOpen={setIsMobileSidebarOpen} />
            <div className={isMobile ? "" : "flex grow overflow-hidden"}>
                <Sidebar isMobile={isMobile}  setIsMobileSidebarOpen={setIsMobileSidebarOpen} isMobileSidebarOpen={isMobileSidebarOpen} sidebarRef={sidebarRef} />
                <main className="flex-1 p-8 overflow-y-auto bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};