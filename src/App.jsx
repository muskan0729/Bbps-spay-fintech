import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import AdminReport from './pages/AdminReport'; 
import Dashboard from "./pages/Dashboard";
import ComplaintPage from "./pages/ComplaintPage";
import MerchantReport from "./pages/MerchantReport";
import Support from "./pages/Support";
import LoginPage from "./pages/LoginPage";
import { Routes,Route } from "react-router-dom";
import {Layout} from './components/Layout';
import { navItems } from "./components/Sidebar";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
		        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route element={<Layout />}>
                {navItems.map((item) => (
                    <Route
                        element={<item.component />}
                        path={item.path.substring(1)}
                    />
                ))}
                {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
        </Routes>
			      {/* Render the AdminReport component */}
      <AdminReport />
      	   <ComplaintPage />
	   <MerchantReport />
	   <Support />
		</>
	);
}

export default App;