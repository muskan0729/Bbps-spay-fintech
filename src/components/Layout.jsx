import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useState, useEffect, useRef } from "react";

export const Layout = () => {
    const breakpoint = 768;

    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const onResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                isMobileSidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target)
            ) {
                setIsMobileSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileSidebarOpen]);

    return (
        <div className={isMobile ? "" : "flex flex-col h-screen"}>
            <Header isMobile={isMobile} setIsMobileSidebarOpen={setIsMobileSidebarOpen} />

            <div className={isMobile ? "" : "flex grow overflow-hidden"}>
                <Sidebar
                    isMobile={isMobile}
                    isMobileSidebarOpen={isMobileSidebarOpen}
                    setIsMobileSidebarOpen={setIsMobileSidebarOpen}
                    sidebarRef={sidebarRef}
                />

                <main className="flex-1 bg-gray-100 overflow-y-auto p-3 md:p-6 xl:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
