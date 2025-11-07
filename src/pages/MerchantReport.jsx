import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MerchantReport = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    service: "",
    operator: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPaginationRequired, setIsPaginationRequired] = useState(true);
  const rowsPerPage = 5;

  // Mock data
  const mockData = [
    { service: "Electricity", category: "Basic", operator: "DISCOM1", number: "12345", amount: 100, totalAmount: 110, status: "Paid", date: "2023-10-01" },
    { service: "Water", category: "Premium", operator: "WATERCO", number: "67890", amount: 150, totalAmount: 160, status: "Pending", date: "2023-10-02" },
    { service: "Gas", category: "Standard", operator: "GASCO", number: "11223", amount: 200, totalAmount: 210, status: "Success", date: "2023-10-03" },
    // Add more mock data if needed
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
    setLoading(true);
    setTimeout(() => {
      const filteredData = mockData.filter((item) => {
        return (
          (!filters.fromDate || item.date >= filters.fromDate) &&
          (!filters.toDate || item.date <= filters.toDate) &&
          (!filters.service || item.service === filters.service) &&
          (!filters.operator || item.operator === filters.operator)
        );
      });
      setData(filteredData);
      setLoading(false);
    }, 500);
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
    const tableColumn = ["Sr. No.", "Service", "Category", "Operator", "Number", "Amount", "Total Amount", "Status", "Date"];
    const tableRows = data.map((item, index) => [
      index + 1,
      item.service,
      item.category,
      item.operator,
      item.number,
      item.amount,
      item.totalAmount,
      item.status,
      item.date,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("Merchant_Report.pdf");
  };

  const columns = [
    { key: "sr", label: "Sr. No.", render: (_, i) => i + 1 },
    { key: "service", label: "Service" },
    { key: "category", label: "Category" },
    { key: "operator", label: "Operator" },
    { key: "number", label: "Number" },
    { key: "amount", label: "Amount" },
    { key: "totalAmount", label: "Total Amount" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { 
      key: "actions", 
      label: "Actions", 
      render: (row) => (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          onClick={() => alert(`View details of ${row.service} (${row.operator})`)}
        >
          View
        </button>
      ) 
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Merchant Report</h1>

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
            name: "service", 
            label: "Service", 
            type: "select", 
            options: ["Electricity", "Water", "Gas", "Mobile", "Dishtv"] 
          },
          { name: "operator", label: "Operator", type: "text" },
        ]}
      />

      {loading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <Table
          columns={columns}
          data={data}
          rowsPerPage={rowsPerPage}
          isPaginationRequired={isPaginationRequired}
        />
      )}
    </div>
  );
};

export default MerchantReport;
