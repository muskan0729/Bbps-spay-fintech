import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import TableSkeleton from "../components/TableSkeleton";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SearchBar from "../components/SearchBar";
import logo from "../images/logo.png";
import {
  FaEye,
  FaRupeeSign,
  FaUserAlt,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import { usePost } from "../hooks/usePost";

const AdminReport = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "",
    status: "",
    billNumber: "",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 5;

  // ⭐ usePost hook
  const {
    execute: fetchPayments,
    data: apiResponse,
    isLoading: apiLoading,
  } = usePost(`/bbps/all-bill-payments-test/json`);

  console.log("apidemores0", apiResponse);
  useEffect(() => {
    setLoading(true);
    fetchPayments();
  }, []);

  // Map API response to table data
useEffect(() => {
  if (apiResponse) {
    const mappedData = apiResponse.map((item, index) => ({
      SrNo: index + 1,
        userName: item.u_name || "-",
      RequestId: item.request_id || item.txnRefID || "N/A",
      CustomerName: item.mobile_no || "N/A",
      Category: item.category || "-",
      BillNumber: item.txnRefID || item.request_id || "-",
      Amount: Number(item.respAmount) || 0,
      Status: item.responseReason || item.txnStatus || "Pending",
      Date: item.created_at
        ? new Date(item.created_at).toLocaleDateString("en-GB")
        : "-",
    }));
    setData(mappedData);
    setLoading(false);
  }
}, [apiResponse]);


  const handlePlanToggle = (index) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, Plan: item.Plan === "Active" ? "Inactive" : "Active" }
          : item
      )
    );
  };

  const renderPlanLabel = (plan, index) => (
    <div
      className={`relative inline-flex items-center w-14 h-6 rounded-full cursor-pointer transition-all duration-300 ${
        plan === "Active"
          ? "bg-gradient-to-r from-green-400 to-green-600"
          : "bg-gray-300"
      } hover:shadow-lg`}
      onClick={() => handlePlanToggle(index)}
    >
      <div
        className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ${
          plan === "Active" ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </div>
  );

  const renderStatusLabel = (status, index) => {
    const base =
      "px-1 py-1 text-xs font-semibold rounded-full flex items-center gap-2 transition-all duration-300";
    const styles = {
      Successful: { bg: "bg-green-100", text: "text-green-800", color: "#10B981" },
      Failed: { bg: "bg-red-100", text: "text-red-800", color: "#EF4444" },
      Pending: { bg: "bg-yellow-100", text: "text-yellow-800", color: "#F59E0B" },
      Initiated: { bg: "bg-cyan-100", text: "text-cyan-800", color: "#06B6D4" },
    };

    const style = styles[status] || { bg: "bg-gray-100", text: "text-gray-600", color: "#9CA3AF" };
    const [width, setWidth] = useState(0);

    useEffect(() => {
      const targetWidth = Math.floor(Math.random() * 30) + 20;
      const timeout = setTimeout(() => setWidth(targetWidth), 100);
      return () => clearTimeout(timeout);
    }, [status, index]);

    return (
      <span className={`${base} ${style.bg} ${style.text} relative group`}>
        {status}
        <span
          className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-700 ease-out group-hover:opacity-100 opacity-80"
          style={{ width: `${width}px`, backgroundColor: style.color }}
        />
      </span>
    );
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

  const columns = [
    {
      label: (
        <div className="flex items-center gap-1">
          <FaClipboardList className="text-gray-700 text-base" />
          <span>Sr No</span>
        </div>
      ),
      key: "SrNo",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <FaClipboardList className="text-gray-700 text-base" />
          <span>User Name</span>
        </div>
      ),
      key: "userName",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <FaCheckCircle className="text-gray-700 text-base" />
          <span>Request ID</span>
        </div>
      ),
      key: "RequestId",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <FaUserAlt className="text-gray-700 text-base" />
          <span>Customer</span>
        </div>
      ),
      key: "CustomerName",
    },
    {
      label: (
        <div className="flex items-center gap-1">
          <MdCategory className="text-gray-700 text-base" />
          <span>Category</span>
        </div>
      ),
      key: "Category",
    },
    "BillNumber",
    {
      label: (
        <div className="flex items-center gap-1">
          <FaRupeeSign className="text-gray-700 text-base" />
          <span>Amount</span>
        </div>
      ),
      render: (row) => (
        <span
          className="font-semibold text-white bg-gradient-to-r from-blue-700 to-blue-900 px-3 py-1 rounded-lg inline-block shadow-md"
          title={formatCurrency(row.Amount)}
        >
          {formatCurrency(row.Amount)}
        </span>
      ),
    },
   
    { label: "Status", render: (row, i) => renderStatusLabel(row.Status, i) },
    {
      label: (
        <div className="flex items-center gap-1">
          <BsCalendarDate className="text-gray-700 text-base" />
          <span>Date</span>
        </div>
      ),
      key: "Date",
    },

  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = data.filter(
        (item) =>
          (!filters.fromDate || item.Date >= filters.fromDate) &&
          (!filters.toDate || item.Date <= filters.toDate) &&
          (!filters.category || item.Category === filters.category) &&
          (!filters.status || item.Status === filters.status) &&
          (!filters.billNumber || item.BillNumber.includes(filters.billNumber))
      );
      setData(filteredData);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setFilters({ fromDate: "", toDate: "", category: "", status: "", billNumber: "" });
    if (apiResponse?.data) {
      const mappedData = apiResponse.data.map((item, index) => ({
        SrNo: index + 1,
         userName: item.u_name || "NA",
        RequestId: item.request_id || "-",
        CustomerName: item.user_name || "-",
        Category: item.category || "-",
        BillNumber: item.bill_number || "-",
        Amount: item.respAmount || 0,
        Plan: item.plan || "Inactive",
        Status: item.txnStatus || "Pending",
        Date: item.created_at
          ? new Date(item.created_at).toLocaleDateString("en-GB")
          : "-",
      }));
      setData(mappedData);
    }
  };

  const exportExcel = () => {
    if (!data.length) return alert("No data to export.");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admin Report");
    XLSX.writeFile(wb, "Admin_Report.xlsx");
  };

  const exportPDF = () => {
    if (!data.length) return alert("No data to export.");
    const doc = new jsPDF();
    const tableColumn = [
      "Sr. No.",
      "Request Id",
      "Customer Name",
      "Category",
      "Bill Number",
      "Amount",
      "Plan",
      "Status",
      "Date",
    ];
    const tableRows = data.map((item, index) => [
      index + 1,
      item.RequestId,
      item.CustomerName,
      item.Category,
      item.BillNumber,
      item.Amount,
      item.Plan,
      item.Status,
      item.Date,
    ]);
    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("Admin_Report.pdf");
  };

  const tableStyles = {
    tableWrapperClass:
      "overflow-x-auto rounded-3xl border border-gray-300 bg-white/95 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl",
    tableClass: "min-w-full text-base divide-y divide-gray-300 border border-gray-300",
    headerClass:
      "bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold text-sm uppercase tracking-wider sticky top-0 shadow-md border-b border-gray-300",
    rowClass:
      "bg-gray-50 even:bg-gray-100 hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 hover:shadow-md transform hover:scale-[1.01] transition-all duration-300 border-b border-gray-200",
    paginationClass: "flex justify-center items-center gap-2 py-3 border-t border-gray-200 mt-4 flex-wrap",
    paginationBtnClass:
      "flex items-center gap-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-2.5 py-1.5 rounded-lg shadow-md hover:from-teal-600 hover:to-teal-700 disabled:opacity-40 text-sm",
    paginationActiveClass:
      "px-3 py-1 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg text-sm transition-all",
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 transition-all">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-lg">
          Transaction History
        </h1>
        <img
          src={logo}
          alt="Logo"
          className="w-40 h-auto object-contain drop-shadow-xl mt-4 sm:mt-0"
        />
      </div>

      {/* Search Bar */}
      <SearchBar
        filters={filters}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleReset={handleReset}
        exportExcel={exportExcel}
        exportPDF={exportPDF}
        filterFields={[
          { name: "fromDate", label: "From Date", type: "date" },
          { name: "toDate", label: "To Date", type: "date" },
          {
            name: "category",
            label: "Category",
            type: "select",
            options: ["Electricity", "Gas", "Loan", "Water", "Mobile"],
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: ["Failed", "Initiated", "Pending", "Success"],
          },
          { name: "billNumber", label: "Bill Number", type: "text" },
        ]}
      />

      {/* Table Card */}
      <div className="mt-8">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-300 p-6 transition-all duration-300 hover:shadow-3xl">
          <div className="flex items-center gap-3 mb-6">
            <FaClockRotateLeft className="text-teal-500 text-2xl animate-pulse" />
            <h2 className="text-2xl font-semibold text-gray-800">Latest Transactions</h2>
          </div>

          {loading || apiLoading ? (
            <TableSkeleton rows={rowsPerPage} columns={columns.length} />
          ) : (
            <Table
              columns={columns}
              data={data}
               isPaginationRequired={10}
          rowsPerPage={10}
              {...tableStyles}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReport;
