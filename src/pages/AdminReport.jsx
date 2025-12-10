import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import TableSkeleton from "../components/TableSkeleton";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SearchBar from "../components/SearchBar";
import logo from "../images/logo.png";
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
  const [rawData, setRawData] = useState([]); // ✅ Keep original data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 5;

  const {
    execute: fetchPayments,
    data: apiResponse,
    isLoading: apiLoading,
  } = usePost(`/bbps/all-bill-payments-test/json`);

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
        Status: item.responseReason || "Pending", // ✅ keep as string
        Date: item.created_at
          ? new Date(item.created_at).toLocaleDateString("en-GB")
          : "-",
      }));
      setRawData(mappedData); // store original
      setData(mappedData);
      setLoading(false);
    }
  }, [apiResponse]);

  const columns = [
    { label: "Sr No", key: "SrNo" },
    { label: "User Name", key: "userName" },
    { label: "Request ID", key: "RequestId" },
    { label: "Customer", key: "CustomerName" },
    { label: "Category", key: "Category" },
    { label: "Transaction ID", key: "BillNumber" },
    { label: "Amount", key: "Amount" },
    {
      label: "Status",
      key: "Status",
      render: (row) => (
        <span
          className={
            row.Status === "Successful"
              ? "bg-green-200 text-green-800 px-2 py-1 rounded-full"
              : "bg-red-200 text-red-800 px-2 py-1 rounded-full"
          }
        >
          {row.Status}
        </span>
      ),
    },
    { label: "Date", key: "Date" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = rawData.filter((item) => {
        const itemDate =
          item.Date !== "-"
            ? new Date(item.Date.split("/").reverse().join("-"))
            : null;
        const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
        const toDate = filters.toDate ? new Date(filters.toDate) : null;

        return (
          (!fromDate || (itemDate && itemDate >= fromDate)) &&
          (!toDate || (itemDate && itemDate <= toDate)) &&
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
    setData(rawData); // ✅ reset to original data
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
      { label: "Sr. No.", key: "sr_no" },
      { label: "Request Id", key: "request_id" },
      { label: "Customer Name", key: "customer_name" },
      { label: "Category", key: "category" },
      { label: "Bill Number", key: "bill_number" },
      { label: "Amount", key: "amount" },
      { label: "Plan", key: "plan" },
      { label: "Status", key: "status" },
      { label: "Date", key: "date" },
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
      "overflow-x-auto rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-2xl",
    tableClass:
      "min-w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden text-gray-700",
    headerClass:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white text-sm font-semibold uppercase tracking-wide shadow-inner sticky top-0 text-center",
    rowClass:
      "bg-white even:bg-gray-50 hover:bg-indigo-50/60 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl mb-2 cursor-pointer",
    cellClass:
      "py-3 px-4 text-sm font-medium first:rounded-l-xl last:rounded-r-xl text-center",
    paginationClass:
      "bg-blue-50/80 shadow-inner rounded-lg px-4 py-2 text-blue-700 flex items-center justify-center gap-2 mt-4",
    paginationBtnClass:
      "flex items-center gap-1 bg-blue-500 text-white px-2.5 py-1.5 rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-40 text-sm transition-all",
    paginationActiveClass:
      "px-3 py-1 rounded-full bg-blue-700 text-white shadow-lg text-sm transition-all",
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
            options: [
              "Agent Collection",
              "Broadband Postpaid",
              "Cable TV",
              "Clubs and Associations",
              "Credit Card",
              "Donation",
              "DTH",
              "eChallan",
              "Education Fees",
              "Electricity",
              "EV Recharge",
              "Fastag",
              "Gas",
              "Housing Society",
              "Insurance",
              "Landline Postpaid",
              "Loan Repayment",
              "LPG Gas",
              "Mobile Postpaid",
              "Mobile Prepaid",
              "Municipal Services",
              "Municipal Taxes",
              "National Pension System",
              "NCMC Recharge",
              "Prepaid Meter",
              "Recurring Deposit",
              "Rental",
              "Subscription",
              "Water",
            ],
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: ["Failed", "Initiated", "Pending", "Successful"],
          },
          { name: "billNumber", label: "Transaction ID", type: "text" },
        ]}
      />

      {/* Table Card */}
      <div className="mt-8">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-300 p-6 transition-all duration-300 hover:shadow-3xl">
          <div className="flex items-center gap-3 mb-6">
            <FaClockRotateLeft className="text-teal-500 text-2xl animate-pulse" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Latest Transactions
            </h2>
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
