import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import { FaRegCopy } from "react-icons/fa";

import Service1 from "../images/logo.png";
import Service2 from "../images/placeholder.jpeg";
import Service3 from "../images/placeholder.jpeg";
import Service4 from "../images/placeholder.jpeg";

const Merchent = () => {
  const navigate = useNavigate();
  const handelServiceClick = () => {
    navigate("/services");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  const tData = [
    {
      "Req ID": 33,
      "Customer name": "ABC",
      Category: "Mobile",
      "Bill No": 12303,
      Amount: 1000,
      Plan: "ACTIVE",
      Date: "03-09-2025 05:57:40",
    },
    {
      "Req ID": 22,
      "Customer name": "EFG",
      Category: "DTH",
      "Bill No": 12303,
      Amount: 500,
      Plan: "ACTIVE",
      Date: "23-09-2025 05:57:40",
    },
    {
      "Req ID": 11,
      "Customer name": "HIJ",
      Category: "mobile",
      "Bill No": 12303,
      Amount: 250,
      Plan: "ACTIVE",
      Date: "23-09-2025 06:02:14",
    },
  ];

  const tColumns = [
    "Req ID",
    "Customer name",
    "Category",
    "Bill No",
    "Amount",
    "Plan",
    "Date",
  ];

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
            ₹78,79,743.56
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
              Welcome, ak@gmail.com
            </h2>
            <p className="text-sm opacity-90">Your personalized dashboard</p>
          </div>

          <div className="p-6 bg-gray-50 flex flex-col justify-center">
            <p className="mb-2">
              <span className="font-semibold text-gray-800">User Name:</span>{" "}
              <span className="text-gray-700">ak@gmail.com</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-800">Email:</span>{" "}
              <span className="text-gray-700">ak@gmail.com</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold text-gray-800">Entity Type:</span>{" "}
              <span className="text-gray-700">Proprietor</span>
            </p>
            <p>
              <span className="font-semibold text-gray-800">Contact:</span>{" "}
              <span className="text-gray-700">7878576985</span>
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
          isPaginationRequired={false}
          rowsPerPage={3}
          columns={tColumns}
          data={tData}
          currentPage={1}
        />
      </section>

    </span>
  );
};

export default Merchent;
