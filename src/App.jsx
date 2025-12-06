import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContactUs from "./pages/ContactUs";
import { Layout } from "./components/Layout";
import { navItems } from "./components/Sidebar";
import AddUserPage from "./pages/AddUserPage";
import { CookiesProvider } from "react-cookie";
import { SchemeContextProvider } from "./contexts/SchemeContext";
import UpdateUser from "./pages/UpdateUser";
import RedirectGuard from "./components/RedirectGuard";

function App() {
  return (
    <SchemeContextProvider>
      <CookiesProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected Layout Wrapper */}
          <Route
            element={
              <RedirectGuard>
                <Layout />
              </RedirectGuard>
            }
          >
            {/* Dynamic sidebar routes */}
            {navItems.map((item) => (
              <Route
                key={item.path}
                path={item.path.substring(1)}
                element={<item.component />}
              />
            ))}

            {/* Manual protected routes */}
            <Route
              path="contact-us"
              element={
                <RedirectGuard>
                  <ContactUs />
                </RedirectGuard>
              }
            />

            <Route
              path="addUser"
              element={
                <RedirectGuard requiredRole={1}>
                  <AddUserPage />
                </RedirectGuard>
              }
            />

            <Route
              path="updateUser"
              element={
                <RedirectGuard requiredRole={1}>
                  <UpdateUser />
                </RedirectGuard>
              }
            />
          </Route>
        </Routes>
      </CookiesProvider>
    </SchemeContextProvider>
  );
}

export default App;
