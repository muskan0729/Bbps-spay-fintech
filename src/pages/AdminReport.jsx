import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SearchBar from "../components/SearchBar";

const AdminReport = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "",
    status: "",
    billNumber: "",
  });
  const [isPaginationRequired, setIsPaginationRequired] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const mockData = [
    { SrNo:"1", RequestId: "R001", CustomerName: "John Doe", Category: "Electricity", BillNumber: "B001", Amount: 100, Plan: "Active", Status: "Paid", Date: "2023-10-01" },
    { SrNo:"2", RequestId: "R002", CustomerName: "Jane Smith", Category: "Water", BillNumber: "B002", Amount: 150, Plan: "Inactive", Status: "Pending", Date: "2023-10-02" },
    { SrNo:"3", RequestId: "R003", CustomerName: "Mike Johnson", Category: "Gas", BillNumber: "B003", Amount: 200, Plan: "Active", Status: "Success", Date: "2023-10-03" },
    { SrNo:"4", RequestId: "R004", CustomerName: "Emma Brown", Category: "Loan", BillNumber: "B004", Amount: 250, Plan: "Inactive", Status: "Initiated", Date: "2023-10-04" },
    { SrNo:"5", RequestId: "R005", CustomerName: "Olivia White", Category: "Mobile", BillNumber: "B005", Amount: 300, Plan: "Active", Status: "Failed", Date: "2023-10-05" },
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
      item.RequestId,
      item.CustomerName,
      item.Category,
      item.BillNumber,
      item.Amount,
      item.Plan,
      item.Status,
      item.Date,
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("BBPS_Report.pdf");
  };

  const columns = [
    "SrNo",
    "RequestId",
    "CustomerName",
    "Category",
    "BillNumber",
    "Amount",
    {
      key: "Plan",
      label: "Plan",
      render: (row) => (
        <span className={row.Plan.toLowerCase() === "active" ? "text-green-600 font-semibold" : ""}>
          {row.Plan}
        </span>
      )
    },
    {
      key: "Status",
      label: "Status",
      render: (row) => {
        let bgColor = "";
        switch (row.Status.toLowerCase()) {
          case "initiated":
            bgColor = "bg-blue-200 text-blue-800";
            break;
          case "success":
            bgColor = "bg-green-200 text-green-800";
            break;
          case "pending":
            bgColor = "bg-yellow-200 text-yellow-800";
            break;
          case "failed":
            bgColor = "bg-red-200 text-red-800";
            break;
          default:
            bgColor = "";
        }
        return <span className={`px-2 py-1 rounded ${bgColor} font-semibold`}>{row.Status}</span>;
      }
    },
    "Date",
  ];

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
          />
        )}
      </div>
    </div>
  );
};

export default AdminReport;
