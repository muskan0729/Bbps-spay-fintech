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
import { usePost } from "../hooks/usePost";
import DashboardSkeleton from "../components/DashboardSkeleton";

const Support = () => {
  const [filters, setFilters] = useState({
    mobileNumber: "",
    startDate: "",
    endDate: "",
  });
  const [idInput, setIdInput] = useState("");
  const [tableData, setTableData] = useState([]);
  const [searchMessage, setSearchMessage] = useState(
    "Enter Transaction ID or Filters"
  );
  //Testing
  const { data, loading, execute } = usePost("/bbps/get-txn-status-test");
  //Production
  // const { data, loading, execute } = usePost("/bbps/get-txn-status");
  // const [isSingle,setIsSingle]=useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    setTableData([]);
    setSearchMessage("Searching...");

    let body = {};
    if (idInput.trim() !== "") {
      if (idInput.startsWith("SPAY")) {
        body.request_id = idInput.trim();
      } else {
        body.txnRefID = idInput.trim();
      }
    } else {
      // Use mobile + date filters
      body.mobile_no = filters.mobileNumber.trim();
      body.fromDate = filters.startDate;
      body.toDate = filters.endDate;
    }

    const res = await execute(body);

    if (res?.responses) {
      console.log("Full response:", res); // <--- Log here

      const txnList = Object.values(res.responses)
        .map((r) => r.txnList)
        .flat()
        .filter(Boolean);

      if (txnList.length > 0) {
        setTableData(txnList);
        setSearchMessage("Search Results:");
      } else {
        setSearchMessage("No transactions found for given input.");
      }
    } else {
      setSearchMessage("No response from server.");
    }
  };

  const columns = [
    { key: "txnReferenceId", label: "Transaction ID" },
    { key: "payRequestId", label: "Request ID" },
    { key: "agentId", label: "Agent ID" },
    { key: "billerId", label: "Biller ID" },
    { key: "amount", label: "Amount", render: (row) => `₹${row.amount}` },
    {
      key: "txnStatus",
      label: "Status", // <FaCheckCircle className="text-green-400 text-2xl" />
      render: (row) => {
        if (row.txnStatus === "SUCCESS")
          return <span className="text-green-600">SUCCESS</span>;
        if (row.txnStatus === "FAILURE")
          return <span className="text-red-600">FAILURE</span>;
        return <span className="text-yellow-600">{row.txnStatus}..</span>;
      },
    },
    {
      key: "txnDate",
      label: "Date",
      render: (row) => {
        const d = new Date(row.txnDate);

        const options = {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        };

        return d.toLocaleString("en-US", options);
      },
    },
    { key: "approvalRefNumber", label: "Approval Ref Number" },
    { key: "mobile", label: "Mobile" },
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

  return loading ? (
    <DashboardSkeleton />
  ) : (
    <div className="p-6 flex flex-col gap-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 min-h-screen">
      {/* Search Panel */}
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
            placeholder="Transaction Reference Id / Request Id"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <div className="text-center text-gray-400 font-medium">OR</div>

          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={filters.mobileNumber}
            onChange={handleChange}
            disabled={idInput.trim() !== ""}
            className={`border border-gray-300 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-indigo-400 outline-none ${
              idInput.trim() !== "" ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
          />

          <div className="flex gap-3">
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              disabled={idInput.trim() !== ""}
              className={`border border-gray-300 px-3 py-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400 outline-none ${
                idInput.trim() !== "" ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              disabled={idInput.trim() !== ""}
              className={`border border-gray-300 px-3 py-2 rounded-lg w-1/2 focus:ring-2 focus:ring-indigo-400 outline-none ${
                idInput.trim() !== "" ? "bg-gray-200 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-teal-400 hover:from-teal-400 hover:to-indigo-500"
            } text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center`}
          >
            <FaSearch className="mr-2" />{" "}
            {loading ? "Searching..." : "Check Status"}
          </motion.button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 p-5 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-lg"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <FaInfoCircle className="text-indigo-400" /> {searchMessage}
        </h3>

        {loading ? (
          <TableSkeleton rows={5} columns={8} />
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
