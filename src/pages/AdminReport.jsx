// import React, { useState, useEffect } from "react";
// import Table from "../components/Table";
// import TableSkeleton from "../components/TableSkeleton";  // Import TableSkeleton
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import SearchBar from "../components/SearchBar";
// import logo from "../images/logo.png";
// import { FaCheckCircle, FaExclamationCircle, FaSpinner, FaTimesCircle } from "react-icons/fa"; // Importing icons for status

// const AdminReport = () => {
//   const [filters, setFilters] = useState({
//     fromDate: "",
//     toDate: "",
//     category: "",
//     status: "",
//     billNumber: "",
//   });
//   const [isPaginationRequired, setIsPaginationRequired] = useState(true);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   const mockData = [
//     { SrNo: "1", RequestId: "R001", CustomerName: "John Doe", Category: "Electricity", BillNumber: "B001", Amount: 100, Plan: "Active", Status: "Paid", Date: "2023-10-01" },
//     { SrNo: "2", RequestId: "R002", CustomerName: "Jane Smith", Category: "Water", BillNumber: "B002", Amount: 150, Plan: "Inactive", Status: "Pending", Date: "2023-10-02" },
//     { SrNo: "3", RequestId: "R003", CustomerName: "Mike Johnson", Category: "Gas", BillNumber: "B003", Amount: 200, Plan: "Active", Status: "Success", Date: "2023-10-03" },
//     { SrNo: "4", RequestId: "R004", CustomerName: "Emma Brown", Category: "Loan", BillNumber: "B004", Amount: 250, Plan: "Inactive", Status: "Initiated", Date: "2023-10-04" },
//     { SrNo: "5", RequestId: "R005", CustomerName: "Olivia White", Category: "Mobile", BillNumber: "B005", Amount: 300, Plan: "Active", Status: "Failed", Date: "2023-10-05" },
//   ];

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setData(mockData);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//     setLoading(true);
//     setTimeout(() => {
//       const filteredData = mockData.filter(item => {
//         return (
//           (!filters.fromDate || item.Date >= filters.fromDate) &&
//           (!filters.toDate || item.Date <= filters.toDate) &&
//           (!filters.category || item.Category === filters.category) &&
//           (!filters.status || item.Status === filters.status) &&
//           (!filters.billNumber || item.BillNumber.includes(filters.billNumber))
//         );
//       });
//       setData(filteredData);
//       setLoading(false);
//     }, 500);
//   };

//   const handleReset = () => {
//     setFilters({
//       fromDate: "",
//       toDate: "",
//       category: "",
//       status: "",
//       billNumber: "",
//     });
//     setData(mockData);
//   };

//   const exportExcel = () => {
//     if (data.length === 0) {
//       alert("No data to export.");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Report");
//     XLSX.writeFile(wb, "BBPS_Report.xlsx");
//   };

//   const exportPDF = () => {
//     if (data.length === 0) {
//       alert("No data to export.");
//       return;
//     }

//     const doc = new jsPDF();
//     const tableColumn = ["Sr. No.", "Request Id", "Customer Name", "Category", "Bill Number", "Amount", "Plan", "Status", "Date"];
//     const tableRows = data.map((item, index) => [
//       index + 1,
//       item.RequestId,
//       item.CustomerName,
//       item.Category,
//       item.BillNumber,
//       item.Amount,
//       item.Plan,
//       item.Status,
//       item.Date,
//     ]);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//     });

//     doc.save("BBPS_Report.pdf");
//   };

//   const columns = [
//     "SrNo",
//     "RequestId",
//     "CustomerName",
//     "Category",
//     "BillNumber",
//     "Amount",
//     {
//       key: "Plan",
//       label: "Plan",
//       render: (row) => (
//         <span className={row.Plan.toLowerCase() === "active" ? "text-green-600 font-semibold" : "text-gray-600"}>
//           {row.Plan}
//         </span>
//       )
//     },
//     {
//       key: "Status",
//       label: "Status",
//       render: (row) => {
//         let bgColor = "";
//         let icon = null;
//         switch (row.Status.toLowerCase()) {
//           case "initiated":
//             bgColor = "bg-orange-200 text-orange-800";
//             icon = <FaSpinner className="animate-spin mr-1" />;
//             break;
//           case "success":
//             bgColor = "bg-green-200 text-green-800";
//             icon = <FaCheckCircle className="mr-1" />;
//             break;
//           case "pending":
//             bgColor = "bg-yellow-200 text-yellow-800";
//             icon = <FaExclamationCircle className="mr-1" />;
//             break;
//           case "failed":
//             bgColor = "bg-red-200 text-red-800";
//             icon = <FaTimesCircle className="mr-1" />;
//             break;
//           default:
//             bgColor = "";
//         }
//         return (
//           <span className={`px-2 py-1 rounded ${bgColor} font-semibold`}>
//             {icon}
//             {row.Status}
//           </span>
//         );
//       }
//     },
//     "Date",
//   ];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
//         <img
//           src={logo}
//           alt="Bharat Connect Logo"
//           className="w-32 h-auto object-contain"
//         />
//       </div>

//       <SearchBar
//         filters={filters}
//         handleChange={handleChange}
//         handleSearch={handleSearch}
//         handleReset={handleReset}  // 👈 new prop
//         exportExcel={exportExcel}
//         exportPDF={exportPDF}
//         filterFields={[ 
//           {
//             name: "fromDate",
//             label: "From Date",
//             type: "date",
//             placeholder: "dd-mm-yyyy",
//           },
//           {
//             name: "toDate",
//             label: "To Date",
//             type: "date",
//             placeholder: "dd-mm-yyyy",
//           },
//           {
//             name: "category",
//             label: "Category",
//             type: "select",
//             placeholder: "Select Category",
//             options: ["Dishtv", "Gas", "Loan", "Mobile"],
//           },
//           {
//             name: "status",
//             label: "Status",
//             type: "select",
//             placeholder: "Select Status",
//             options: ["Failed", "Initiated", "Pending", "Success"],
//           },
//           {
//             name: "billNumber",
//             label: "Bill Number",
//             type: "text",
//             placeholder: "Enter Bill Number...",
//           },
//         ]}
//       />

//       <div className="bg-white p-4 rounded-lg shadow-md mt-4">
//         <h2 className="text-lg font-bold text-gray-800 mb-4">Latest Transactions List</h2>
//         {loading ? (
//           <TableSkeleton rows={rowsPerPage} columns={columns.length} />  
//         ) : (
//           <Table
//             columns={columns}
//             data={data}
//             rowsPerPage={rowsPerPage}
//             isPaginationRequired={isPaginationRequired}
//             tableClass="bg-purple-50 shadow-xl"
//             headerClass="bg-purple-200 text-purple-600 font-bold"
//             rowClass="hover:bg-purple-100"
//             paginationClass="bg-purple-500 text-white"
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminReport;



import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import TableSkeleton from "../components/TableSkeleton"; // Import TableSkeleton
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SearchBar from "../components/SearchBar";
import logo from "../images/logo.png";

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
    { SrNo: "1", RequestId: "R001", CustomerName: "John Doe", Category: "Electricity", BillNumber: "B001", Amount: 100, Plan: "Active", Status: "Success", Date: "2023-10-01" },
    { SrNo: "2", RequestId: "R002", CustomerName: "Jane Smith", Category: "Water", BillNumber: "B002", Amount: 150, Plan: "Inactive", Status: "Pending", Date: "2023-10-02" },
    { SrNo: "3", RequestId: "R003", CustomerName: "Mike Johnson", Category: "Gas", BillNumber: "B003", Amount: 200, Plan: "Active", Status: "Success", Date: "2023-10-03" },
    { SrNo: "4", RequestId: "R004", CustomerName: "Emma Brown", Category: "Loan", BillNumber: "B004", Amount: 250, Plan: "Inactive", Status: "Initiated", Date: "2023-10-04" },
    { SrNo: "5", RequestId: "R005", CustomerName: "Olivia White", Category: "Mobile", BillNumber: "B005", Amount: 300, Plan: "Active", Status: "Failed", Date: "2023-10-05" },
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

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("BBPS_Report.pdf");
  };

  const tableStyles = {
    tableClass: "table-auto w-full bg-white rounded-lg shadow-xl",
    headerClass: "text-black font-bold text-lg",
    rowClass: "hover:bg-blue-50",
    paginationClass: "bg-blue-600 text-white hover:bg-blue-700",
    prevNextClass: "text-white hover:text-blue-200",
    customHeaderCellClass: "font-bold text-black", // Apply bold and black for headers
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
        <span className={`inline-block px-3 py-1 rounded-lg ${row.Plan.toLowerCase() === "active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
          {row.Plan}
        </span>
      )
    },
    {
      key: "Status",
      label: "Status",
      render: (row) => {
        let bgColor = "";
        let shape = "rounded-full";
        switch (row.Status.toLowerCase()) {
          case "initiated":
            bgColor = "bg-sky-200 text-sky-800";
            shape = "rounded-md";
            break;
          case "success":
            bgColor = "bg-green-200 text-green-800";
            shape = "rounded-full";
            break;
          case "pending":
            bgColor = "bg-yellow-200 text-yellow-800";
            shape = "rounded-lg";
            break;
          case "failed":
            bgColor = "bg-red-200 text-red-800";
            shape = "rounded-lg";
            break;
          default:
            bgColor = "bg-gray-200 text-gray-800";
            shape = "rounded-full";
        }
        return (
          <span className={`inline-block px-3 py-1 ${shape} ${bgColor} font-semibold`}>
            {row.Status}
          </span>
        );
      }
    },
    "Date",
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          onClick={() => alert(`View details of ${row.Service} (${row.Operator})`)}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Transaction History</h1>
        <img src={logo} alt="Bharat Connect Logo" className="w-32 h-auto object-contain" />
      </div>

      <SearchBar
        filters={filters}
        handleChange={handleChange}
        handleSearch={handleSearch}
        handleReset={handleReset}
        exportExcel={exportExcel}
        exportPDF={exportPDF}
        filterFields={[
          { name: "fromDate", label: "From Date", type: "date", placeholder: "dd-mm-yyyy" },
          { name: "toDate", label: "To Date", type: "date", placeholder: "dd-mm-yyyy" },
          { name: "category", label: "Category", type: "select", placeholder: "Select Category", options: ["Dishtv", "Gas", "Loan", "Mobile"] },
          { name: "status", label: "Status", type: "select", placeholder: "Select Status", options: ["Failed", "Initiated", "Pending", "Success"] },
          { name: "billNumber", label: "Bill Number", type: "text", placeholder: "Enter Bill Number..." },
        ]}
      />

      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold text-black mb-4">Latest Transactions List</h2>
        {loading ? (
          <TableSkeleton rows={rowsPerPage} columns={columns.length} />
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

export default AdminReport;
