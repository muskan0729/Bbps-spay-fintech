import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import * as XLSX from "xlsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';  
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import SearchBar from "../components/SearchBar";

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

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const mockData = [
    { requestId: "R001", customerName: "John Doe", category: "Electricity", billNumber: "B001", amount: 100, plan: "Basic", status: "Paid", date: "2023-10-01" },
    { requestId: "R002", customerName: "Jane Smith", category: "Water", billNumber: "B002", amount: 150, plan: "Premium", status: "Pending", date: "2023-10-02" },
    // More mock data...
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

  const handleSearch = () => {
    setCurrentPage(1);
    setLoading(true);
    setTimeout(() => {
      const filteredData = mockData.filter(item => {
        return (
          (!filters.fromDate || item.date >= filters.fromDate) &&
          (!filters.toDate || item.date <= filters.toDate) &&
          (!filters.category || item.category === filters.category) &&
          (!filters.status || item.status === filters.status) &&
          (!filters.billNumber || item.billNumber.includes(filters.billNumber))
        );
      });
      setData(filteredData);
      setLoading(false);
    }, 500);
  };

  const exportExcel = () => {
    if (data.length === 0) {
      alert("No data to export.");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, "BBPS_Report.xlsx");
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
      item.requestId,
      item.customerName,
      item.category,
      item.billNumber,
      item.amount,
      item.plan,
      item.status,
      item.date,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("BBPS_Report.pdf");
  };

  const columns = [
    { key: "sr", label: "Sr. No.", render: (_, i) => i + 1 },
    { key: "requestId", label: "Request Id" },
    { key: "customerName", label: "Customer Name" },
    { key: "category", label: "Category" },
    { key: "billNumber", label: "Bill Number" },
    { key: "amount", label: "Amount" },
    { key: "plan", label: "Plan" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Report</h1>

      <SearchBar
        filters={filters}
        handleChange={handleChange}
        handleSearch={handleSearch}
        exportExcel={exportExcel}
        exportPDF={exportPDF}
        filterFields={[
          { name: "fromDate", label: "From Date", type: "date" },
          { name: "toDate", label: "To Date", type: "date" },
          { 
            name: "category", 
            label: "Category", 
            type: "select", 
            options: ["Dishtv", "Gas", "Loan", "Mobile"] 
          },
          { 
            name: "status", 
            label: "Status", 
            type: "select", 
            options: ["Failed", "Initiated", "Pending", "Success"] 
          },
          { name: "billNumber", label: "Bill Number", type: "text" },
        ]}
      />

      {loading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <Table
          columns={columns}
          data={data}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          paginationHandler={(action) => {
            setCurrentPage((prevPage) => {
              if (action === "prev") return Math.max(prevPage - 1, 1);
              if (action === "next") return Math.min(prevPage + 1, totalPages);
            });
          }}
        />
      )}
    </div>
  );
};

export default AdminReport;
