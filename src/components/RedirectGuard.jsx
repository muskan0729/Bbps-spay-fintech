import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const NonePage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center text-xl font-bold">
      ❌ Unauthorized Access — Redirecting to Login...
    </div>
  );
};

const RedirectGuard = ({ children, requiredRole = null }) => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token", "role"]);
  const [showNone, setShowNone] = useState(false);

  useEffect(() => {
    const token = cookie.token;
    const role = cookie.role;

    // Invalid or missing login → show NonePage then redirect
    if (!token || !role) {
      setShowNone(true);
      setTimeout(() => navigate("/"), 1500);
      return;
    }

    // Role Check
    if (requiredRole !== null && Number(role) !== Number(requiredRole)) {
      setShowNone(true);
      setTimeout(() => navigate("/"), 1500);
      return;
    }

    setShowNone(false);
  }, [cookie, requiredRole, navigate]);

  // Unauthorized → show message
  if (showNone) return <NonePage />;

  // Authorized → show children
  return children;
};

export default RedirectGuard;
