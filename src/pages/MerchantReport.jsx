  import React, { useState, useEffect } from "react";
  import Table from "../components/Table";
  import SearchBar from "../components/SearchBar";
  import * as XLSX from "xlsx";
  import jsPDF from "jspdf";
  import autoTable from "jspdf-autotable";
  import logo from "../images/logo.png";
  import { usePost } from "../hooks/usePost";
  import { useCookies } from "react-cookie";
  import TableSkeleton from "../components/TableSkeleton"
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
    const rowsPerPage = 10;

    const [cookie] = useCookies();
    const userId = cookie.user.id;

    /* ---------------- API CALL ---------------- */
    const {
      execute: fetchPayments,
      data: apiResponse,
      isLoading,
    } = usePost(`/bbps/user-bill-payments/json/${userId}`);

    useEffect(() => {
      fetchPayments();
    }, []);

    /* ---------------- STATUS MAPPER ---------------- */
  const mapTxnStatus = (code, reason) => {
    if (reason) return reason; // ✅ prefer API message if available
    if (code === "000") return "Successful";
    if (code === "205" || code === "001") return "Failed";
    if (code === "102") return "Pending";
    return "Initiated";
  };

    /* ---------------- MAP API DATA ---------------- */
    useEffect(() => {
      if (!apiResponse) return;

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
        Amount: Number(item.respAmount) || 0,
      Status: mapTxnStatus(item.txnStatus, item.responseReason), // ✅ fix here
        Date: item.created_at?.split("T")[0] ?? "-",
      }));

      setApiData(mappedRows);
      setData(mappedRows);
    }, [apiResponse]);

    /* ---------------- FILTER HANDLERS ---------------- */
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
          (!filters.billNumber ||
            item.BillNumber?.includes(filters.billNumber))
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

    /* ---------------- EXPORT EXCEL ---------------- */
    const exportExcel = () => {
      if (!data.length) return alert("No data to export.");

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Merchant Report");
      XLSX.writeFile(wb, "Merchant_Report.xlsx");
    };

    /* ---------------- EXPORT PDF ---------------- */
    const exportPDF = () => {
      if (!data.length) return alert("No data to export.");

      const doc = new jsPDF();

      const tableColumn = [
        "Sr No",
        "Request ID",
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

      autoTable(doc, {
        startY:25,
        head: [tableColumn],
        body: tableRows,
        theme: "grid",
        styles: {
          fontSize: 9,
          cellPadding: 3,
          halign: "center",
        },
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: 255,
          fontStyle: "bold",
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 30 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
          4: { cellWidth: 25 },
          5: { cellWidth: 25 },
          6: { cellWidth: 30 },
        },
      });

      doc.save("Merchant_Report.pdf");
    };

    /* ---------------- STATUS BADGE ---------------- */
    const renderStatusLabel = (status) => {
      const isSuccess = status === "Successful";

      const base =
        "inline-block px-2 py-1 text-xs font-semibold rounded-full shadow-sm w-24 text-center";

      const className = isSuccess
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";

      return <span className={`${base} ${className}`}>{status}</span>;
    };

    /* ---------------- FORMAT CURRENCY ---------------- */
    const formatCurrency = (amount) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      }).format(amount);

    /* ---------------- TABLE COLUMNS ---------------- */
    const columns = [
    { label: "Sr No", render: (item) => item.SrNo },
    { label: "Request Id", render: (item) => item.RequestId },
    { label: "Category", render: (item) => item.Category },
    { label: "Transaction Id", render: (item) => item.BillNumber },
    {
      label: "Amount",
      render: (item) => (
        <span className="font-semibold text-gray-800">
          {formatCurrency(item.Amount/100)}
        </span>
      ),
    },
    {
      label: "Status",
      render: (item) => renderStatusLabel(item.Status),
    },
    { label: "Date", render: (item) => item.Date },
  ];


    /* ---------------- RENDER ---------------- */
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
              options: ["Successful", "Failed", "Pending", "Initiated"],
            },
            { name: "billNumber", label: "Bill Number", type: "text" },
          ]}
        />

        <div className="bg-white rounded-2xl shadow-xl border p-6 mt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Latest Transactions
          </h2>

          {isLoading ? (
            <TableSkeleton/>
          ) : (
            <Table
              columns={columns}
            data={[...data].reverse()}
              rowsPerPage={rowsPerPage}
              isPaginationRequired
              tableClass="min-w-full border border-gray-400 text-sm"
              headerClass="bg-blue-600 text-white uppercase border-b"
              rowClass="hover:bg-blue-100 border-b"
              cellClass="py-3 px-4 whitespace-nowrap"
              paginationClass="flex justify-center gap-2 mt-4"
            />
          )}
        </div>
      </div>
    );
  };

  export default MerchantReport;
