import React, { useEffect, useState } from "react";
import Admin from "../components/Admin";
import Merchent from "../components/Merchent";
import DashboaedSkeleton from "../components/DashboardSkeleton";
import { useAuth } from "../contexts/AuthContext";
import { useCookies } from "react-cookie";
import { useGet } from "../hooks/useGet";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  // const [cookie, setCookie, removeCooie] = useCookies("token");
  // const { data ,refetch} = useGet("/get-billers/Mobile");
  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // console.log(data);
    // refetch()

    
  }, []);

  const isAdmin = user?.role === "admin"; // ✅ Role check

  return (
    <>{loading ? <DashboaedSkeleton /> : isAdmin ? <Admin /> : <Merchent />}</>
  );
};

export default Dashboard;
