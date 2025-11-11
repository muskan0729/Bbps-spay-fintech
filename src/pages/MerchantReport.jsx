import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TableSkeleton from "../components/TableSkeleton";
import logo from "../images/logo.png";

const MerchantReport = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    service: "",
    billNumber: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPaginationRequired, setIsPaginationRequired] = useState(true);
  const rowsPerPage = 5;

  // Mock data
  const mockData = [
    { SrNo: "1", Service: "Electricity", Category: "Basic", Operator: "DISCOM1", Number: "12345", Amount: 100, TotalAmount: 110, Status: "Paid", Date: "2023-10-01" },
    { SrNo: "2", Service: "Water", Category: "Premium", Operator: "WATERCO", Number: "67890", Amount: 150, TotalAmount: 160, Status: "Pending", Date: "2023-10-02" },
    { SrNo: "3", Service: "Gas", Category: "Standard", Operator: "GASCO", Number: "11223", Amount: 200, TotalAmount: 210, Status: "Success", Date: "2023-10-03" },
  ];

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

  const tableStyles = {
    tableClass: "table-auto w-full bg-white rounded-lg shadow-xl",
    headerClass: "text-black font-bold text-lg",
    rowClass: "hover:bg-blue-50",
    paginationClass: "bg-blue-600 text-white hover:bg-blue-700",
    prevNextClass: "text-white hover:text-blue-200",
    customHeaderCellClass: "font-bold text-black", // Apply bold and black for headers
  };
  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = mockData.filter((item) => {
        return (
          (!filters.fromDate || item.Date >= filters.fromDate) &&
          (!filters.toDate || item.Date <= filters.toDate) &&
          (!filters.service || item.Service === filters.service) &&
          (!filters.operator || item.Operator === filters.operator)
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
    if (data.length === 0) {
      alert("No data to export.");
      return;
    }

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

    // ✅ Call the function directly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("BBPS_Report.pdf");
  };


  const columns = [
    "SrNo",
    "Service",
    "Category",
    "Operator",
    "Number",
    "Amount",
    "TotalAmount",
    "Status",
    "Date",
    
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ✅ Header Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Left - Title */}
        <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>

        {/* Right - Logo */}
        <img
          src={logo}
          alt="Bharat Connect Logo"
          className="w-32 h-auto object-contain"
        />
      </div>

      {/* Filters/Search */}
      <SearchBar
        filters={filters}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleReset={handleReset}  // 👈 new prop
        exportExcel={exportExcel}
        exportPDF={exportPDF}
        filterFields={[
          {
            name: "fromDate",
            label: "From Date",
            type: "date",
            placeholder: "dd-mm-yyyy",
          },
          {
            name: "toDate",
            label: "To Date",
            type: "date",
            placeholder: "dd-mm-yyyy",
          },
          {
            name: "category",
            label: "Category",
            type: "select",
            placeholder: "Select Category",
            options: ["Dishtv", "Gas", "Loan", "Mobile"],
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            placeholder: "Select Status",
            options: ["Failed", "Initiated", "Pending", "Success"],
          },
          {
            name: "billNumber",
            label: "Bill Number",
            type: "text",
            placeholder: "Enter Bill Number...",
          },
        ]}
      />

      {/* Table Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold mb-4">Latest Transactions List</h2>
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading...</div>
        ) : (
          <Table
            columns={columns}
            data={data}
            rowsPerPage={rowsPerPage}
            isPaginationRequired={isPaginationRequired}
            {...tableStyles}
          />
        )}
      </div>
    </div>
  );
};

export default MerchantReport;
