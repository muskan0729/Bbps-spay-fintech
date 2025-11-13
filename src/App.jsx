import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContactUs from "./pages/ContactUs"; // <-- import your ContactUs page
import { Layout } from './components/Layout';
import { navItems } from "./components/Sidebar";
import { AdminContextProvider } from "./contexts/AdminContext";
import { AddUserPage } from "./pages/AddUserPage";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected routes inside Layout */}
      <Route
        element={
          <AdminContextProvider>
            <Layout />
          </AdminContextProvider>
        }
      >
        {/* Map dynamic navItems */}
        {navItems.map((item) => (
          <Route
            key={item.path}
            path={item.path.substring(1)} // remove leading "/"
            element={<item.component />}
          />
        ))}

        {/* Add ContactUs route manually */}
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="addUser" element={<AddUserPage/>} />
      </Route>
    </Routes>
  );
}

export default App;
