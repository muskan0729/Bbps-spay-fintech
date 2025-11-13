import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../images/logo.png"
import TableSkeleton from "../components/TableSkeleton";

const MerchantReport = () => {
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

  // Mock Data
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
      const filteredData = mockData.filter((item) => {
        return (
          (!filters.fromDate || item.Date >= filters.fromDate) &&
          (!filters.toDate || item.Date <= filters.toDate) &&
          (!filters.category || item.Category === filters.category) &&
          (!filters.status || item.Status === filters.status) &&
          (!filters.billNumber || item.BillNumber.includes(filters.billNumber))
        );
      });
      setData(filteredData);
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      category: "",
      status: "",
      billNumber: "",
    });
    setData(mockData);
  };

  const exportExcel = () => {
    if (!data.length) return alert("No data to export.");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Merchant Report");
    XLSX.writeFile(wb, "Merchant_Report.xlsx");
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
    doc.save("Merchant_Report.pdf");
  };

  // 💠 Styled Status Labels
  const renderStatusLabel = (status) => {
    const base = "px-3 py-1.5 text-sm font-semibold rounded-full shadow-sm transition-all duration-300";
    const styles = {
      Success:
        "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-300/40 hover:shadow-green-400/60",
      Failed:
        "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-300/40 hover:shadow-red-400/60",
      Pending:
        "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-yellow-300/40 hover:shadow-yellow-400/60",
      Initiated:
        "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-sky-300/40 hover:shadow-sky-400/60",
    };
    return <span className={`${base} ${styles[status] || ""}`}>{status}</span>;
  };

  // 💎 Read-only Plan Toggle-Bar with text inside
const renderPlanLabel = (plan) => {
  return (
    <div
      className={`w-20 h-8 flex items-center rounded-full p-1 relative transition-all duration-300 ${
        plan === "Active" ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      {/* Knob */}
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          plan === "Active" ? "translate-x-12" : "translate-x-0"
        }`}
      ></div>

      {/* Text */}
      <span
        className={`absolute w-full text-center text-xs font-semibold text-white pointer-events-none select-none`}
      >
        {plan}
      </span>
    </div>
  );
};



  // 💰 Format Amount to currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

  const columns = [
  "SrNo",
  "RequestId",
  "CustomerName",
  "Category",
  "BillNumber",
  {
    label: "Amount",
    render: (item) => (
      <span className="font-semibold text-gray-800">
        {formatCurrency(item.Amount)}
      </span>
    ),
  },
  {
    label: "Plan",
    render: (item) => renderPlanLabel(item.Plan),
  },
  {
    label: "Status",
    render: (item) => renderStatusLabel(item.Status),
  },
  "Date",
];


  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 min-h-screen transition-all">
      {/* === Header === */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Transaction History
        </h1>
        <img
          src={logo}
          alt="Bharat Connect Logo"
          className="w-36 h-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* === Search / Filter Bar === */}
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

      {/* === Table Section === */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Latest Transactions
        </h2>

        {loading ? (
          <div className="text-center py-10 text-blue-600 font-medium animate-pulse">
            Loading transaction data...
          </div>
        ) : (
         
          <Table
  columns={columns}
  data={data}
  rowsPerPage={rowsPerPage}
  isPaginationRequired={true}
  // Wrapper rounded + shadow
  tableWrapperClass="overflow-hidden rounded-2xl shadow-md"
  // Table itself minimal
  tableClass="min-w-full"
  // Header: bluish background, white text
  headerClass="bg-blue-600 text-white font-semibold text-sm uppercase"
  // Rows: normal white, hover: very light sky blue
  rowClass="bg-white hover:bg-sky-50 transition-colors duration-200"
  // Pagination font & spacing
  paginationClass="text-sm mt-2"
/>

        )}
      </div>
    </div>
  );
};

export default MerchantReport;
