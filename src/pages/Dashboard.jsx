import React, { useEffect, useState } from "react";
import Admin from "../components/Admin";
import Merchent from "../components/Merchent";
import DashboaedSkeleton from "../components/DashboardSkeleton";
import { useAuth } from "../contexts/AuthContext";
import { useCookies } from "react-cookie";
import { useGet } from "../hooks/useGet";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [cookie, setCookie] = useCookies();
  const [isAdmin,setIsAdmin]=useState(false);
  const navigate=useNavigate()
  // const { data ,refetch} = useGet("/get-billers/Mobile");
  useEffect(() => {

    if(!(cookie.token) || !(cookie.role))
    {
      alert("Stay Away ");
      navigate("/");
      return
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // console.log(data);
    // refetch()

    
  }, []);

; // ✅ Role check

  return (
    <>{loading ? <DashboaedSkeleton /> : isAdmin ? <Admin /> : <Merchent />}</>
  );
};

export default Dashboard;
