import React, { useEffect, useState } from "react";
import Admin from "../components/Admin";
import Merchent from "../components/Merchent";
import DashboaedSkeleton from "../components/DashboardSkeleton";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();   

  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
