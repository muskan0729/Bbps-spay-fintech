import React, { useState } from "react";
import Table from "../components/Table";
import TableSkeleton from "../components/TableSkeleton";
import {
  FaSearch,
  FaExclamationCircle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../images/logo.png"; 

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
      time: "2025-02-17T14:49:28",
      bharatConnectTxnId: "MocktACeq7X4uL",
      status: "SUCCESS",
      mobileNumber: "9876543210",
    },
    {
      transactionId: "TXN002",
      agentId: "MocktACeq7Y5uL",
      billerId: "OTME0005XXZ50",
      amount: 800,
      time: "2025-02-16T10:30:00",
      bharatConnectTxnId: "MocktACeq7Y5uL",
      status: "FAILED",
      mobileNumber: "9876543210",
    },
    // Added extra mock data for pagination
    {
      transactionId: "TXN003",
      agentId: "MocktACeq7Z6uL",
      billerId: "OTME0005XXZ51",
      amount: 500,
      time: "2025-02-15T09:20:00",
      bharatConnectTxnId: "MocktACeq7Z6uL",
      status: "PENDING",
      mobileNumber: "9876543210",
    },
    {
      transactionId: "TXN004",
      agentId: "MocktACeq7A7uL",
      billerId: "OTME0005XXZ52",
      amount: 1200,
      time: "2025-02-14T11:15:00",
      bharatConnectTxnId: "MocktACeq7A7uL",
      status: "SUCCESS",
      mobileNumber: "9876543210",
    },
    {
      transactionId: "TXN005",
      agentId: "MocktACeq7B8uL",
      billerId: "OTME0005XXZ53",
      amount: 900,
      time: "2025-02-13T08:50:00",
      bharatConnectTxnId: "MocktACeq7B8uL",
      status: "FAILED",
      mobileNumber: "9876543210",
    },
    {
      transactionId: "TXN006",
      agentId: "MocktACeq7C9uL",
      billerId: "OTME0005XXZ54",
      amount: 1100,
      time: "2025-02-12T07:30:00",
      bharatConnectTxnId: "MocktACeq7C9uL",
      status: "SUCCESS",
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
      let result = [...mockTransactions];

      if (filters.transactionId) {
        const txn = result.find(
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
    }, 1000);
  };

  const renderStatusIcon = (status) => {
    if (status === "SUCCESS")
      return <FaCheckCircle className="text-green-400 text-3xl" />;
    if (status === "FAILED")
      return <FaExclamationCircle className="text-red-400 text-3xl" />;
    return <FaInfoCircle className="text-yellow-400 text-3xl" />;
  };

  const columns = [
    { key: "transactionId", label: "Transaction ID" },
    { key: "agentId", label: "Agent ID" },
    { key: "billerId", label: "Biller ID" },
    {
      key: "amount",
      label: "Amount",
      render: (row) => `₹${row.amount}`,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <motion.span
          className={`py-1 px-3 text-xs rounded-full font-medium shadow-sm ${row.status === "SUCCESS"
            ? "bg-green-600 text-white"
            : row.status === "FAILED"
              ? "bg-red-600 text-white"
              : "bg-yellow-500 text-white"
            }`}
          animate={{
            scale: row.status === "PENDING" ? [1, 1.05, 1] : [1],
            rotate: row.status === "FAILED" ? [0, -2, 2, 0] : [0],
            boxShadow:
              row.status === "SUCCESS"
                ? ["0 0 5px #16a34a", "0 0 10px #16a34a", "0 0 5px #16a34a"]
                : row.status === "FAILED"
                  ? ["0 0 5px #dc2626", "0 0 10px #dc2626", "0 0 5px #dc2626"]
                  : ["0 0 5px #f59e0b", "0 0 10px #f59e0b", "0 0 5px #f59e0b"],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {row.status}
        </motion.span>
      ),
    },
    { key: "time", label: "Time" },
  ];

  const tstyle = {
    tableClass:
      "min-w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden text-gray-700",
    headerClass:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white text-sm font-semibold uppercase tracking-wide shadow-inner sticky top-0",
    rowClass:
      "bg-white even:bg-gray-50 hover:bg-indigo-50/60 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl mb-2 cursor-pointer",
    cellClass:
      "py-3 px-4 text-sm font-medium first:rounded-l-xl last:rounded-r-xl",
    paginationClass:
      "bg-white/60 shadow-inner rounded-lg px-4 py-2 text-gray-700 flex items-center justify-center gap-2 mt-4",
  };

  return (
    <div className="p-6 flex flex-col gap-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* 🔹 Search & Status Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🔸 Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full lg:w-1/2 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-indigo-200 hover:scale-[1.02] transition-all duration-300"
        >
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-3">
            <FaSearch className="text-indigo-500" /> Review Transaction Activity
          </h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="transactionId"
              placeholder="Transaction Request / Reference ID"
              value={filters.transactionId}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <div className="text-center text-gray-400 font-medium">OR</div>

            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={filters.mobileNumber}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <div className="flex gap-3">
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={loading}
              className={`${loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-teal-400 hover:to-indigo-500"
                } text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center`}
            >
              <FaSearch className="mr-2" /> {loading ? "Searching..." : "Check Status"}
            </motion.button>
          </div>
        </motion.div>

        {/* 🔸 Transaction Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full lg:w-1/2 relative bg-gradient-to-br from-blue-100 via-blue-50 to-teal-100 text-gray-800 p-6 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Frosted background layer */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-2xl animate-fade" />

          {/* Logo top right */}
          <img
            src={logo}
            alt="Logo"
            className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
          />


          <div className="relative z-10 flex flex-col gap-4">
            {/* Header with animated icon */}
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <motion.div
                animate={{
                  rotate:
                    transactionDetails?.status === "SUCCESS"
                      ? [0, 10, -10, 0]
                      : transactionDetails?.status === "FAILED"
                        ? [0, -5, 5, 0]
                        : [0],
                  scale:
                    transactionDetails?.status === "SUCCESS"
                      ? [1, 1.15, 1, 1.1]
                      : transactionDetails?.status === "FAILED"
                        ? [1, 1.05, 1]
                        : transactionDetails?.status === "PENDING"
                          ? [1, 1.05, 1]
                          : 1,
                  boxShadow:
                    transactionDetails?.status === "SUCCESS"
                      ? ["0 0 5px #38bdf8", "0 0 15px #38bdf8", "0 0 5px #38bdf8"]
                      : transactionDetails?.status === "FAILED"
                        ? ["0 0 5px #f87171", "0 0 15px #f87171", "0 0 5px #f87171"]
                        : ["0 0 5px #facc15", "0 0 15px #facc15", "0 0 5px #facc15"],
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {renderStatusIcon(transactionDetails?.status)}
              </motion.div>
              Transaction Status
            </h2>

            {transactionDetails ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2 text-sm"
              >
                <p className="text-base font-bold">
                  <span className="font-bold">Agent ID:</span> {transactionDetails.agentId}
                </p>
                <p className="text-base font-bold">
                  <span className="font-bold">Biller ID:</span> {transactionDetails.billerId}
                </p>
                <p className="text-base font-bold">
                  <span className="font-bold">Amount:</span> ₹{transactionDetails.amount}
                </p>
                <p className="text-base font-bold">
                  <span className="font-bold">Time:</span>{" "}
                  {new Date(transactionDetails.time).toLocaleString()}
                </p>
                <p className="text-base font-bold">
                  <span className="font-bold">BharatConnect Txn ID:</span>{" "}
                  {transactionDetails.bharatConnectTxnId}
                </p>
                <p className="text-base font-bold">
                  <span className="font-bold">Status:</span>{" "}
                  <motion.span
                    className={`font-bold px-3 py-1 rounded-full shadow-lg ${transactionDetails.status === "SUCCESS"
                      ? "bg-sky-100 text-sky-800"
                      : transactionDetails.status === "FAILED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}
                    animate={{
                      scale:
                        transactionDetails.status === "PENDING"
                          ? [1, 1.05, 1]
                          : transactionDetails.status === "SUCCESS"
                            ? [1, 1.05, 1]
                            : [1],
                      rotate: transactionDetails.status === "FAILED" ? [0, -2, 2, 0] : [0],
                      boxShadow:
                        transactionDetails.status === "SUCCESS"
                          ? ["0 0 5px #38bdf8", "0 0 15px #38bdf8", "0 0 5px #38bdf8"]
                          : transactionDetails.status === "FAILED"
                            ? ["0 0 5px #f87171", "0 0 15px #f87171", "0 0 5px #f87171"]
                            : ["0 0 5px #facc15", "0 0 15px #facc15", "0 0 5px #facc15"],
                    }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {transactionDetails.status}
                  </motion.span>
                </p>
              </motion.div>
            ) : (
              <p className="text-gray-700/80 mt-4 italic">
                No transaction details available. Enter Transaction ID.
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* 🔹 Transaction Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 p-5 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-lg"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <FaInfoCircle className="text-indigo-400" /> {searchMessage}
        </h3>

        {loading ? (
          <TableSkeleton rows={5} columns={6} />
        ) : tableData.length > 0 ? (
          <Table
            columns={columns}
            data={tableData}
            rowsPerPage={5}
            isPaginationRequired={true}
            {...tstyle}
          />
        ) : (
          !loading && (
            <p className="text-gray-500 text-center py-4">
              No records to display.
            </p>
          )
        )}
      </motion.div>
    </div>
  );
};

export default Support;
