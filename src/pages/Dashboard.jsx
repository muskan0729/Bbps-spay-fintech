import React, { useEffect, useState } from "react";
import Admin from "../components/Admin";
import Merchent from "../components/Merchent";
import DashboaedSkeleton from "../components/DashboardSkeleton";
import { useAuth } from "../contexts/AuthContext";
import { useCookies } from "react-cookie";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();   
  const [cookie,setCookie,removeCooie]=useCookies("token");
 
  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    console.log(cookie.token);
    
  }, []);

  const isAdmin = user?.role === "admin";   // ✅ Role check

  return (
    <>
      {loading ? (
        <DashboaedSkeleton />
      ) : (
        isAdmin ? <Admin /> : <Merchent />
      )}
    </>
  );
};

export default Dashboard;
