import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../images/logo.png";
import { usePost } from "../hooks/usePost";

const MerchantReport = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "",
    status: "",
    billNumber: "",
  });

  const [data, setData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const rowsPerPage = 5;

  // ⭐ usePost hook
  const {
    execute: fetchPayments,
    data: apiResponse,
    isLoading,
  } = usePost("/bbps/all-bill-payments-test/json");

  // ⭐ Fetch API Data on load
  useEffect(() => {
    const loadPayments = async () => {
      await fetchPayments(); // triggers API call
    };

    loadPayments();
  }, []);

  // ⭐ When API response updates, map to table rows
  useEffect(() => {
    if (!apiResponse) return;

    // allow both: res.data or res.data.data or raw array
    const list = Array.isArray(apiResponse)
      ? apiResponse
      : Array.isArray(apiResponse.data)
      ? apiResponse.data
      : [];

    const mappedRows = list.map((item, index) => ({
      SrNo: index + 1,
      RequestId: item.request_id ?? "-",
      Category: item.category ?? "-",
      BillNumber: item.txnRefID ?? "-",
      Amount: item.respAmount ?? 0,
      Status: item.responseReason ?? "-",
      Date: item.created_at?.split("T")[0] ?? "-",
    }));

    setApiData(mappedRows);
    setData(mappedRows);
  }, [apiResponse]);

  // ⭐ Handle Filters
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const filtered = apiData.filter((item) => {
      return (
        (!filters.fromDate || item.Date >= filters.fromDate) &&
        (!filters.toDate || item.Date <= filters.toDate) &&
        (!filters.category || item.Category === filters.category) &&
        (!filters.status || item.Status === filters.status) &&
        (!filters.billNumber || item.BillNumber.includes(filters.billNumber))
      );
    });
    setData(filtered);
  };

  const handleReset = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      category: "",
      status: "",
      billNumber: "",
    });
    setData(apiData);
  };

  // ⭐ Export Excel
  const exportExcel = () => {
    if (!data.length) return alert("No data to export.");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Merchant Report");
    XLSX.writeFile(wb, "Merchant_Report.xlsx");
  };

  // ⭐ Export PDF
  const exportPDF = () => {
    if (!data.length) return alert("No data to export.");
    const doc = new jsPDF();
    const tableColumn = [
      "SrNo",
      "Request Id",
      "Category",
      "Bill Number",
      "Amount",
      "Status",
      "Date",
    ];
    const tableRows = data.map((item) => [
      item.SrNo,
      item.RequestId,
      item.Category,
      item.BillNumber,
      item.Amount,
      item.Status,
      item.Date,
    ]);

    autoTable(doc, { head: [tableColumn], body: tableRows });
    doc.save("Merchant_Report.pdf");
  };

  // ⭐ Status UI
  const renderStatusLabel = (status) => {
    const base =
      "inline-block px-3 py-1 text-sm font-semibold rounded-full shadow-sm w-20 text-center";
    const styles = {
      Successful: "bg-green-100 text-green-700",
      Failed: "bg-red-100 text-red-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Initiated: "bg-blue-100 text-blue-700",
    };
    return <span className={`${base} ${styles[status]}`}>{status}</span>;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);

  const columns = [
    "SrNo",
    "RequestId",
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
      label: "Status",
      render: (item) => renderStatusLabel(item.Status),
    },
    "Date",
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Transaction History
        </h1>
        <img src={logo} className="w-36 h-14" alt="Logo" />
      </div>

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
            options: ["Electricity", "Gas", "Fastag", "LPG Gas"],
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: ["Failed", "Initiated", "Pending", "Successful"],
          },
          { name: "billNumber", label: "Bill Number", type: "text" },
        ]}
      />

      <div className="bg-white rounded-2xl shadow-xl border p-6 mt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Latest Transactions
        </h2>

        {isLoading ? (
          <div className="text-center py-10 text-blue-600 animate-pulse">
            Loading transaction data...
          </div>
        ) : (
          <Table
            columns={columns}
            data={data}
            rowsPerPage={rowsPerPage}
            isPaginationRequired={true}
              tableClass="min-w-full border border-gray-400 text-sm text-gray-700 font-sans overflow-x-auto"
          headerClass="bg-blue-600 text-white font-semibold text-left uppercase border-b border-gray-400"
          rowClass="bg-white hover:bg-blue-100 border-b border-gray-300 transition-colors duration-200"
          cellClass="py-3 px-4 text-gray-700 whitespace-nowrap"
          paginationClass="flex justify-center gap-2 mt-4 text-gray-700 font-medium"
          />
        )}
      </div>
    </div>
  );
};

export default MerchantReport;
