import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex grow overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-8 overflow-y-auto bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};