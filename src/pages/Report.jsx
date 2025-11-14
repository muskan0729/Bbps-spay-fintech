import React from "react";
import MerchantReport from "./MerchantReport";
import AdminReport from "./AdminReport";
import { useAuth } from "../contexts/AuthContext";

const Report = () => {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin"; // check role from AuthContext

  return (
    <>
      {isAdmin ? <AdminReport /> : <MerchantReport />}
    </>
  );
};

export default Report;
