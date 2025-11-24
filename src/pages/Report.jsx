import React, { useEffect, useState } from "react";
import MerchantReport from "./MerchantReport";
import AdminReport from "./AdminReport";
import { useAuth } from "../contexts/AuthContext";
import { useCookies } from "react-cookie";
import DashboardSkeleton from "../components/DashboardSkeleton";
const Report = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState();
  const [cookie] = useCookies();
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    if (!(cookie.token) || !(cookie.role)) {
      alert("Stay Away ");
      navigate("/");
      return
    }
    (cookie.role === 1) ? setIsAdmin(true) : setIsAdmin(false);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? <DashboardSkeleton /> : (isAdmin ? <AdminReport /> : <MerchantReport />)}
    </>
  );
};

export default Report;
