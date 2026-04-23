import React, { useEffect, useState } from "react";
import MerchantReport from "./MerchantReport";
import AdminReport from "./AdminReport";
import { useAuth } from "../contexts/AuthContext";
import { useCookies } from "react-cookie";
import DashboardSkeleton from "../components/DashboardSkeleton";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState();
  const [cookie] = useCookies();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.token || !cookie.role) {
      navigate("/"); // Redirect to home/login
      return; // Prevent further execution
    }

    setIsAdmin(cookie.role === 1);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <DashboardSkeleton />
      ) : isAdmin ? (
        <AdminReport />
      ) : (
        <MerchantReport />
      )}
    </>
  );
};

export default Report;
