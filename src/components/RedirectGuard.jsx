import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const RedirectGuard = ({ children, requiredRole = null }) => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token", "role"]); // FIXED

  useEffect(() => {
    const token = cookie.token;
    const role = cookie.role;

    // No token or role → redirect to home
    if (!token || !role) {
      alert("login first"); //pop up
      navigate("/");
      return;
    }

    // Optional: role-based redirect
    if (requiredRole !== null && Number(role) !== Number(requiredRole)) {
      navigate("/");
      return;
    }
  }, [cookie, navigate, requiredRole]);

  return children;
};

export default RedirectGuard;
