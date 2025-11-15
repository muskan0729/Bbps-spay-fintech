import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContactUs from "./pages/ContactUs";
import { Layout } from './components/Layout';
import { navItems } from "./components/Sidebar";
import { AddUserPage } from "./pages/AddUserPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected page wrapper */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {navItems.map((item) => (
          <Route
            key={item.path}
            path={item.path.substring(1)}
            element={<item.component />}
          />
        ))}

        {/* Manual routes */}
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="addUser" element={<AddUserPage />} />
      </Route>
    </Routes>
    </CookiesProvider>
  );
}

export default App;
