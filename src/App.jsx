import { Routes, Route } from "react-router-dom"; 
import { Layout } from "./components/Layout";
import { navItems } from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";

const NotFound = () => (
    <div className="text-center p-10">
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
    </div>
);

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route element={<Layout />}>
                {navItems.map((item) => (
                    <Route
                        element={<item.component />}
                        path={item.path.substring(1)}
                    />
                ))}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;