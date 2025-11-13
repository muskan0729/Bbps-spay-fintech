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
      className={`relative inline-flex items-center w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ${plan === "Active" ? "bg-emerald-400" : "bg-gray-300"
        } hover:shadow-md`}
      onClick={() => handlePlanToggle(index)}
    >
      <div
        className={`absolute top-[2px] left-[2px] w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${plan === "Active" ? "translate-x-6" : "translate-x-0"
          }`}
      />
    </div>
  );

  const renderStatusLabel = (status, index) => {
    const base =
      "px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-2 transition-all duration-300";
    const styles = {
      Success: { bg: "bg-green-100", text: "text-green-800", color: "#10B981" },
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
      <span className={`${base} ${style.bg} ${style.text}`}>
        {status}
        <span
          className="inline-block h-1 rounded-full transition-all duration-700 ease-out"
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
      className="font-semibold text-white bg-blue-800 px-2 py-1 rounded-lg inline-block"
      title={formatCurrency(row.Amount)}
    >
      {formatCurrency(row.Amount)}
    </span>
  ),
},


    { label: "Plan", render: (row, i) => renderPlanLabel(row.Plan, i) },
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
    {
      label: "Action",
      render: (row) => (
        <button
          className="group flex items-center gap-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1.5 rounded-xl
                    hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
          onClick={() => alert(`Viewing details of ${row.CustomerName}`)}
        >
          <FaEye className="text-white group-hover:scale-110 transition-transform" /> View
        </button>
      ),
    },
  ];



  const mockData = Array.from({ length: 15 }, (_, i) => ({
    SrNo: i + 1,
    RequestId: `R00${i + 1}`,
    CustomerName: `User ${i + 1}`,
    Category: ["Electricity", "Gas", "Loan", "Water", "Mobile"][i % 5],
    BillNumber: `B00${i + 1}`,
    Amount: (i + 1) * 100,
    Plan: i % 2 === 0 ? "Active" : "Inactive",
    Status: ["Success", "Pending", "Failed", "Initiated"][i % 4],
    Date: `2023-10-${(i + 1).toString().padStart(2, "0")}`,
  }));

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = mockData.filter(
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
    setData(mockData);
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
      "overflow-x-auto rounded-2xl border border-gray-300 bg-white/95 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl",
    tableClass: "min-w-full text-base divide-y divide-gray-300 border border-gray-300",
    headerClass:
      "bg-gray-200 text-gray-800 font-semibold text-sm uppercase tracking-wider sticky top-0 shadow-sm border-b border-gray-300",
    rowClass:
      "bg-gray-50 even:bg-gray-100 hover:bg-teal-50 hover:shadow-md transform hover:scale-[1.01] transition-all duration-300 border-b border-gray-200",
    paginationClass: "flex justify-center items-center gap-2 py-3 border-t border-gray-200 mt-4 flex-wrap",
    paginationBtnClass:
      "flex items-center gap-1 bg-teal-500 text-white px-2.5 py-1.5 rounded-lg shadow-md hover:bg-teal-600 disabled:opacity-40 text-sm",
    paginationActiveClass:
      "px-3 py-1 rounded-full bg-teal-600 text-white shadow-lg text-sm transition-all",
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 transition-all">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md">
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

          {loading ? (
            <TableSkeleton rows={rowsPerPage} columns={columns.length} />
          ) : (
            <Table columns={columns} data={data} rowsPerPage={rowsPerPage} isPaginationRequired={true} {...tableStyles} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReport;
