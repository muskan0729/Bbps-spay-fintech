import React, { useEffect, useState } from "react";
import Admin from "../components/Admin";
import Merchent from "../components/Merchent";
import DashboaedSkeleton from "../components/DashboardSkeleton";
import {useAdmin} from "../contexts/AdminContext"

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const data = [
    { id: 1, name: "Akash Kumar", email: "akash.kumar@gmail.com" },
    { id: 2, name: "Priya Sharma", email: "priya.sharma@outlook.com" },
    { id: 3, name: "Rohit Patel", email: "rohit.patel@yahoo.com" },
    { id: 4, name: "Neha Verma", email: "neha.verma@live.com" },
    { id: 5, name: "Sahil Mehta", email: "sahil.mehta@gmail.com" },
    { id: 6, name: "Kanak Singh", email: "kanak.singh@company.com" },
    { id: 7, name: "Ritika Das", email: "ritika.das@sample.com" },
    { id: 8, name: "Vikram Nair", email: "vikram.nair@corp.net" },
    { id: 9, name: "Anjali Gupta", email: "anjali.gupta@domain.org" },
    { id: 10, name: "Deepak Rao", email: "deepak.rao@techmail.io" },
  ];
const {isAdmin ,setIsAdmin}=useAdmin();

  // const [isAdmin, setIsAdmin] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      console.log(isAdmin);
    }, 2000);
  }, []);
  return (
    <>
      {loading ? <DashboaedSkeleton /> : (isAdmin ? (<Admin />) : <Merchent />)}
    </>
  );
};

export default Dashboard;
