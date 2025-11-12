import React, { useState } from "react";
import Table from "../components/Table";
import logo from "../images/logo.png";
import { FaSearch, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const Support = () => {
  const [filters, setFilters] = useState({
    transactionId: "",
    mobileNumber: "",
    startDate: "",
    endDate: "",
  });

  const [transactionDetails, setTransactionDetails] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMessage, setSearchMessage] = useState(
    "Enter the Transaction ID or Search Filters"
  );

  const mockTransactions = [
    {
      transactionId: "TXN001",
      agentId: "MocktACeq7X4uL",
      billerId: "OTME0005XXZ49",
      amount: 1000,
      time: "2025-02-17 14:49:28",
      bharatConnectTxnId: "MocktACeq7X4uL",
      status: "SUCCESS",
      mobileNumber: "9876543210",
    },
    {
      transactionId: "TXN002",
      agentId: "MocktACeq7Y5uL",
      billerId: "OTME0005XXZ50",
      amount: 800,
      time: "2025-02-16 10:30:00",
      bharatConnectTxnId: "MocktACeq7Y5uL",
      status: "FAILED",
      mobileNumber: "9876543210",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setTransactionDetails(null);
    setTableData([]);
    setLoading(true);
    setSearchMessage("Searching...");

    setTimeout(() => {
      if (filters.transactionId) {
        const txn = mockTransactions.find(
          (t) => t.transactionId === filters.transactionId
        );
        if (txn) {
          setTransactionDetails(txn);
          setSearchMessage("Transaction Found!");
        } else {
          setSearchMessage("No transaction found for this ID!");
        }
        setLoading(false);
        return;
      }

      let result = [...mockTransactions];

      if (filters.mobileNumber)
        result = result.filter((t) => t.mobileNumber === filters.mobileNumber);

      if (filters.startDate)
        result = result.filter(
          (t) => new Date(t.time) >= new Date(filters.startDate)
        );

      if (filters.endDate)
        result = result.filter(
          (t) => new Date(t.time) <= new Date(filters.endDate)
        );

      if (result.length === 0) {
        setSearchMessage("No data found matching your criteria.");
      } else {
        setSearchMessage("Search Results:");
      }

      setTableData(result);
      setLoading(false);
    }, 500);
  };

  const columns = [
    { key: "transactionId", label: "Transaction ID" },
    { key: "agentId", label: "Agent ID" },
    { key: "billerId", label: "Biller ID" },
    { key: "amount", label: "Amount", render: (row) => `₹${row.amount}` },
    { key: "status", label: "Status", render: (row) => renderStatus(row.status) },
    { key: "time", label: "Time" },
  ];

  const renderStatusIcon = (status) => {
    if (status === "SUCCESS") {
      return <FaCheckCircle className="text-green-600" />;
    } else if (status === "FAILED") {
      return <FaExclamationCircle className="text-red-600" />;
    }
    return null;
  };

   const tstyle={tableClass:"min-w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-lg border border-gray-200 rounded-lg overflow-hidden",
            headerClass:"py-3 px-4 text-gray-800 font-semibold text-sm bg-gradient-to-r from-indigo-200 to-pink-200 text-white",
            rowClass:"py-3 px-4 text-gray-700 hover:bg-gradient-to-r from-teal-100 to-indigo-100 transition-all duration-200",
            paginationClass:"bg-gray-300 rounded text-sm px-6 py-2 text-gray-700 flex items-center justify-center"
   };

  const renderStatus = (status) => {
    let statusClass = "";
    if (status === "SUCCESS") {
      statusClass = "bg-green-100 text-green-600";
    } else if (status === "FAILED") {
      statusClass = "bg-red-100 text-red-600";
    } else {
      statusClass = "bg-yellow-100 text-yellow-600"; // For pending or any other status
    }

    return (
      <span className={`py-1 px-2 text-xs rounded-full ${statusClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Review Transaction Activity
          </h2>

          <input
            type="text"
            name="transactionId"
            placeholder="Transaction Request / Reference ID"
            value={filters.transactionId}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <span className="text-center text-gray-500 font-medium">OR</span>

          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={filters.mobileNumber}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex gap-4">
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-teal-400 to-indigo-500 text-white px-6 py-2 rounded hover:bg-gradient-to-l transition-all flex items-center justify-center mt-2"
          >
            <FaSearch className="inline-block mr-2" /> Check Status
          </button>

          {loading && (
            <p className="text-gray-500 text-center mt-2">Loading...</p>
          )}
        </div>

        {/* Transaction Status Card */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-indigo-200 to-pink-200 p-6 rounded-lg shadow-xl relative flex flex-col">
          <img
            src={logo}
            alt="Bharat Connect Logo"
            className="absolute top-4 right-4 w-16"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            {renderStatusIcon(transactionDetails?.status)} Transaction Status
          </h2>

          {transactionDetails ? (
            <div className="space-y-3 text-gray-800 mt-4">
              <p>
                <span className="font-medium">Agent ID:</span>{" "}
                {transactionDetails.agentId}
              </p>
              <p>
                <span className="font-medium">Biller ID:</span>{" "}
                {transactionDetails.billerId}
              </p>
              <p>
                <span className="font-medium">Amount:</span> ₹
                {transactionDetails.amount}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {transactionDetails.time}
              </p>
              <p>
                <span className="font-medium">Bharat-Connect Txn ID:</span>{" "}
                {transactionDetails.bharatConnectTxnId}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-semibold ${transactionDetails.status === "SUCCESS"
                      ? "text-green-600"
                      : "text-red-600"
                    }`}
                >
                  {transactionDetails.status}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No transaction details available. Enter Transaction ID</p>
            
          )}
        </div>
      </div>

      {/* Table below both if searched by mobile number */}
      {filters.mobileNumber && tableData.length > 0 && (
  <div className="bg-white p-4 rounded-lg shadow-md overflow-auto mt-6 w-full">
    <h3 className="text-md font-semibold mb-2 text-gray-700">
      Transaction Records
    </h3>
    <Table
      columns={columns}
      data={tableData}
      rowsPerPage={5}
      isPaginationRequired={true}
      {...tstyle}
    />
  </div>
)}

    </div>
  );
};

export default Support;
