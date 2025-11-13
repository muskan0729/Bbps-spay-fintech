import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import TableSkeleton from "../components/TableSkeleton";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SearchBar from "../components/SearchBar";
import logo from "../images/placeholder.jpeg";

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



// Toggle plan handler
const handlePlanToggle = (index) => {
  setData(prev =>
    prev.map((item, i) =>
      i === index
        ? { ...item, Plan: item.Plan === "Active" ? "Inactive" : "Active" }
        : item
    )
  );
};


const renderPlanLabel = (plan, index) => {
  return (
    <div
      className={`relative inline-flex items-center w-16 h-6 sm:w-20 sm:h-8 rounded-full cursor-pointer transition-colors duration-300
        ${plan === "Active" ? "bg-green-500" : "bg-gray-300"}`}
      onClick={() => handlePlanToggle(index)}
    >
      {/* Sliding Circle */}
      <div
        className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 sm:w-7 sm:h-7 rounded-full shadow-md transform transition-transform duration-300
          ${plan === "Active" ? "translate-x-10 sm:translate-x-12" : "translate-x-0"}`}
      ></div>

      {/* Labels inside switch */}
      <div className="flex justify-between w-full px-1 sm:px-2 text-[0.55rem] sm:text-xs font-semibold text-white select-none pointer-events-none">
        <span className={`${plan === "Active" ? "opacity-100" : "opacity-50"}`}>Active</span>
        <span className={`${plan === "Active" ? "opacity-50" : "opacity-100"}`}>Inactive</span>
      </div>
    </div>
  );
};




// Update columns to pass index
const columns = [
  "SrNo",
  "RequestId",
  "CustomerName",
  "Category",
  "BillNumber",
  { label: "Amount", render: (row) => <span className="font-semibold text-gray-800">{formatCurrency(row.Amount)}</span> },
  { label: "Plan", render: (row, rowIndex) => renderPlanLabel(row.Plan, rowIndex) },
  { label: "Status", render: (row) => renderStatusLabel(row.Status) },
  "Date",
  { key: "action", label: "Action", render: (row) => (
    <button
      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 shadow-md transition"
      onClick={() => alert(`View details of ${row.CustomerName}`)}
    >
      View
    </button>
  ) },
];

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
      const filteredData = mockData.filter(item => {
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

  // Export Excel
  const exportExcel = () => {
    if (!data.length) return alert("No data to export.");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admin Report");
    XLSX.writeFile(wb, "Admin_Report.xlsx");
  };

  // Export PDF
  const exportPDF = () => {
    if (!data.length) return alert("No data to export.");
    const doc = new jsPDF();
    const tableColumn = ["Sr. No.", "Request Id", "Customer Name", "Category", "Bill Number", "Amount", "Plan", "Status", "Date"];
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

  // Styled Status Labels
  const renderStatusLabel = (status) => {
    const base = "px-3 py-1.5 text-sm font-semibold rounded-full shadow-sm transition-all duration-300";
    const styles = {
      Success: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-300/40 hover:shadow-green-400/60",
      Failed: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-300/40 hover:shadow-red-400/60",
      Pending: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-yellow-300/40 hover:shadow-yellow-400/60",
      Initiated: "bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-sky-300/40 hover:shadow-sky-400/60",
    };
    return <span className={`${base} ${styles[status] || ""}`}>{status}</span>;
  };

 

  // Currency Formatter
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

  
  // Table Styles
  const tableStyles = {
    tableWrapperClass:
      "overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:shadow-xl",
    tableClass: "min-w-full divide-y divide-gray-200",
    headerClass:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white font-semibold text-sm uppercase tracking-wider sticky top-0 shadow-inner",
    rowClass: "bg-white even:bg-gray-50 hover:bg-sky-50 transition-all duration-300 cursor-pointer",
    paginationClass: "flex justify-center items-center flex-wrap gap-3 py-4 border-t border-gray-200",
    paginationBtnClass: "px-3 py-1 rounded-lg text-gray-700 hover:bg-blue-100 transition-all duration-200",
    paginationActiveClass: "px-3 py-1 rounded-lg bg-blue-600 text-white shadow-md transition-all duration-200",
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 min-h-screen transition-all">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Transaction History</h1>
        <img src={logo} alt="Bharat Connect Logo" className="w-36 h-auto object-contain drop-shadow-lg" />
      </div>

      {/* Filters */}
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
          { name: "category", label: "Category", type: "select", options: ["Electricity", "Gas", "Loan", "Water", "Mobile"] },
          { name: "status", label: "Status", type: "select", options: ["Failed", "Initiated", "Pending", "Success"] },
          { name: "billNumber", label: "Bill Number", type: "text" },
        ]}
      />

      {/* Table */}
      <div className="mt-6">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Latest Transactions</h2>
          {loading ? (
            <TableSkeleton rows={rowsPerPage} columns={columns.length} />
          ) : (
            <Table
              columns={columns}
              data={data}
              rowsPerPage={rowsPerPage}
              isPaginationRequired={true}
              {...tableStyles}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReport;
