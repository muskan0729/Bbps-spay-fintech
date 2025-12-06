import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import { FaRegCopy } from "react-icons/fa";

import Service1 from "../images/logo.png";
import Service2 from "../images/placeholder.jpeg";
import Service3 from "../images/placeholder.jpeg";
import Service4 from "../images/placeholder.jpeg";
import { useCookies } from "react-cookie";
import { useGet } from "../hooks/useGet";

const Merchent = () => {
   


  const navigate = useNavigate();
  const [cookie] = useCookies();
  const userId = cookie.user.id;

const { data: merchantsData } = useGet(`/reports/user/${userId}`);

console.log("Merchants Data:", merchantsData);


  const handelServiceClick = () => {
    navigate("/services");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };
  const renderStatusLabel = (status) => {
  const normalized = status?.toLowerCase(); // normalize
  
  const base =
    "inline-block px-3 py-1 text-sm font-semibold rounded-full shadow-sm w-20 text-center";
  
  const styles = {
    success: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    initiated: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`${base} ${styles[normalized] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
};


 const tData =
  merchantsData?.data?.map((item) => ({
    id: item.id,
    user_name: item.user_name,
    request_id: item.spay_txn_id || "-",
    category: item.product_type,
    mobile_no: item.mobile,
    respAmount: item.amount,
    txnStatus: item.status,
    responseReason: item.description,
    payout_opening_balance: item.payout_opening_balance,
    payout_closing_balance: item.payout_closing_balance,
    payment_mode: item.payment_mode,
    created_at: item.created_at,
  })) || [];


  const tColumns = [
    { label: "ID", key: "id" },
    { label: "User Name", key: "user_name" },
    { label: "Request ID", key: "request_id" },
    { label: "Category", key: "category" },
    { label: "Mobile Number", key: "mobile_no" },
    { label: "Amount", key: "respAmount" },
   {
    label: "Status",
    key: "txnStatus",
    render: (item) => renderStatusLabel(item.txnStatus),
  },

    { label: "Date", key: "created_at" },

    // {label:"NONE",key:"trikj"}
  ];
console.log(cookie.user);

  return (
    <span>
      <section className="flex flex-col md:flex-row bg-gray-50 p-6 rounded-lg shadow-md gap-6">

        {/* Account Details */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-xl shadow-sm border border-blue-200 
        hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Virtual Account
          </h3>

          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            ₹{cookie.user.merchant_bbps_wallet}
          </h2>

          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-sm text-gray-600">
              Account No: 54654XFDERRDSR
            </span>
            <button
              onClick={() => handleCopy("54654XFDERRDSR")}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaRegCopy className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-600">IFSC: HJFHH86868</span>
            <button
              onClick={() => handleCopy("HJFHH86868")}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FaRegCopy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-shrink-0 w-full md:w-1/3 bg-white rounded-2xl shadow-md overflow-hidden border border-blue-200 hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">
          <div className="text-white text-center py-5 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-[35%]">
            <h2 className="text-lg font-semibold mb-1">
              Welcome, {cookie.user.name}
            </h2>
            <p className="text-sm opacity-90">Your personalized dashboard</p>
          </div>

          <div className="p-6 bg-gray-50 flex flex-col justify-center">
            <p className="mb-2">
              <span className="font-semibold text-gray-800">User Name:</span>{" "}
              <span className="text-gray-700">{cookie.user.name}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-800">Email:</span>{" "}
              <span className="text-gray-700">{cookie.user.email}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-800">Entity Type:</span>{" "}
              <span className="text-gray-700">Proprietor</span>
            </p>
            <p>
              <span className="font-semibold text-gray-800">Contact:</span>{" "}
              <span className="text-gray-700">{cookie.user.mobile_no}</span>
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md border border-blue-200 
        hover:shadow-md hover:-translate-y-1 transform transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Services</h2>

          <div className="grid grid-cols-2 gap-4">

            <div
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-green-200 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 transform duration-300 cursor-pointer"
              onClick={handelServiceClick}
            >
              <img src={Service1} className="w-10 h-10 mb-2" />
              <span className="text-gray-700 text-sm font-medium">Bill Payment</span>
            </div>

            <div
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-yellow-200 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 transform duration-300 cursor-pointer"
              onClick={handelServiceClick}
            >
              <img src={Service2} className="w-10 h-10 mb-2" />
              <span className="text-gray-700 text-sm font-medium">Post Paid</span>
            </div>

            <div
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-200 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 transform duration-300 cursor-pointer"
              onClick={handelServiceClick}
            >
              <img src={Service3} className="w-10 h-10 mb-2" />
              <span className="text-gray-700 text-sm font-medium">Recharge</span>
            </div>

            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg cursor-not-allowed opacity-70">
              <img src={Service4} className="w-10 h-10 mb-2" />
              <span className="text-gray-500 text-sm">Coming Soon</span>
            </div>

          </div>
        </div>

      </section>

      {/* Latest Transactions */}
      <section className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
          Latest Transaction List
        </h2>
        <Table
          isPaginationRequired={10}
          rowsPerPage={10}
          columns={tColumns}
          data={tData}
          currentPage={1}
            tableClass="min-w-full border border-gray-400 text-sm text-gray-700 font-sans overflow-x-auto"
          headerClass="bg-blue-600 text-white font-semibold text-left uppercase border-b border-gray-400"
          rowClass="bg-white hover:bg-blue-100 border-b border-gray-300 transition-colors duration-200"
          cellClass="py-3 px-4 text-gray-700 whitespace-nowrap"
          paginationClass="flex justify-center gap-2 mt-4 text-gray-700 font-medium"
        />
      </section>

    </span>
  );
};

export default Merchent;
