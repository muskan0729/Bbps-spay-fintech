import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Layout } from './components/Layout';
import { navItems } from "./components/Sidebar";
import { AdminContextProvider } from "./contexts/AdminContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        element={
          <AdminContextProvider>
            <Layout />
          </AdminContextProvider>
        }
      >
        {navItems.map((item) => (
          <Route
            key={item.path}
            path={item.path.substring(1)}
            element={<item.component />}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
