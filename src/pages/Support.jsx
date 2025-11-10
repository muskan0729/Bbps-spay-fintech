// import React, { useState } from "react";
// import Table from "../components/Table";

// const Support = () => {
//   const [filters, setFilters] = useState({
//     transactionId: "",
//     mobileNumber: "",
//     startDate: "",
//     endDate: "",
//   });

//   const [transactionDetails, setTransactionDetails] = useState(null);
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const mockTransactions = [
//     {
//       TransactionID: "TXN001",
//       AgentID: "MocktACeq7X4uL",
//       BillerID: "OTME0005XXZ49",
//       Amount: 1000,
//       Time: "2025-02-17 14:49:28",
//       BharatConnectTxnID: "MocktACeq7X4uL",
//       Status: "SUCCESS",
//       MobileNumber: "9876543210",
//     },
//     {
//       TransactionID: "TXN002",
//       AgentID: "MocktACeq7Y5uL",
//       BillerID: "OTME0005XXZ50",
//       Amount: 800,
//       Time: "2025-02-16 10:30:00",
//       BharatConnectTxnIDtTxnId: "MocktACeq7Y5uL",
//       Status: "FAILED",
//       MobileNumber: "9876543210",
//     },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = () => {
//     setTransactionDetails(null);
//     setTableData([]);
//     setLoading(true);

//     setTimeout(() => {
//       if (filters.transactionId) {
//         const txn = mockTransactions.find(
//           (t) => t.transactionId === filters.transactionId
//         );
//         if (txn) setTransactionDetails(txn);
//         else alert("No transaction found for this ID!");
//         setLoading(false);
//         return;
//       }

//       let result = mockTransactions;

//       if (filters.mobileNumber)
//         result = result.filter((t) => t.mobileNumber === filters.mobileNumber);

//       if (filters.startDate)
//         result = result.filter(
//           (t) => new Date(t.time) >= new Date(filters.startDate)
//         );

//       if (filters.endDate)
//         result = result.filter(
//           (t) => new Date(t.time) <= new Date(filters.endDate)
//         );

//       setTableData(result);
//       setLoading(false);
//     }, 500);
//   };

//     const columns = [
//     "TransactionID",
//     "AgentID",
//     "BillerID",
//     { key: "amount", label: "Amount", render: (row) => `₹${row.amount}` },
//     "Status",
//     "Time",
//   ];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
//         Support
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Left Side: Form + Table */}
//         <div className="lg:w-1/2 flex flex-col gap-4">
//           {/* Form */}
//           <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
//             <h2 className="text-lg font-semibold text-gray-700">
//               Search Transactions
//             </h2>

//             <input
//               type="text"
//               name="transactionId"
//               placeholder="Transaction ID"
//               value={filters.transactionId}
//               onChange={handleChange}
//               className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />

//             <div className="text-center font-semibold text-gray-500">OR</div>

//             <input
//               type="text"
//               name="mobileNumber"
//               placeholder="Mobile Number"
//               value={filters.mobileNumber}
//               onChange={handleChange}
//               className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />

//             <input
//               type="date"
//               name="startDate"
//               value={filters.startDate}
//               onChange={handleChange}
//               className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />

//             <input
//               type="date"
//               name="endDate"
//               value={filters.endDate}
//               onChange={handleChange}
//               className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />

//             <button
//               onClick={handleSearch}
//               className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all"
//             >
//               Search
//             </button>

//             {loading && (
//               <p className="text-gray-500 text-center mt-2">Loading...</p>
//             )}
//           </div>

//           {/* Table */}
//           {tableData.length > 0 && (
//             <div className="bg-white p-4 rounded-lg shadow-md overflow-auto max-h-[500px]">
//               <h3 className="text-md font-semibold mb-2 text-gray-700">
//                 Transaction Records
//               </h3>
//               <Table
//                 columns={columns}
//                 data={tableData}
//                 rowsPerPage={5}
//                 isPaginationRequired={true}
//               />
//             </div>
//           )}
//         </div>

//         {/* Right Side: Transaction Card */}
//         <div className="lg:w-1/2">
//           {transactionDetails && (
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                 Transaction Details
//               </h2>

//               <div className="space-y-3 text-gray-700">
//                 <p>
//                   <span className="font-medium">Agent ID:</span>{" "}
//                   {transactionDetails.agentId}
//                 </p>
//                 <p>
//                   <span className="font-medium">Biller ID:</span>{" "}
//                   {transactionDetails.billerId}
//                 </p>
//                 <p>
//                   <span className="font-medium">Amount:</span>{" "}
//                   <span className="font-semibold text-gray-900">
//                     ₹{transactionDetails.amount}
//                   </span>
//                 </p>
//                 <p>
//                   <span className="font-medium">Time:</span>{" "}
//                   {transactionDetails.time}
//                 </p>
//                 <p>
//                   <span className="font-medium">Bharat-Connect Txn ID:</span>{" "}
//                   {transactionDetails.bharatConnectTxnId}
//                 </p>
//                 <p>
//                   <span className="font-medium">Status:</span>{" "}
//                   <span
//                     className={`font-semibold ${
//                       transactionDetails.status === "SUCCESS"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {transactionDetails.status}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Support;



import React, { useState } from "react";
import Table from "../components/Table";

const Support = () => {
  const [filters, setFilters] = useState({
    transactionId: "",
    mobileNumber: "",
    startDate: "",
    endDate: "",
  });

  const [transactionDetails, setTransactionDetails] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const mockTransactions = [
    {
      transactionId: "TXN001",
      agentId: "MocktACeq7X4uL",
      billerId: "OTME0005XXZ49",
      amount: 1000,
      time: "2025-02-17 14:49:28",
      bharatConnectTxnId: "MocktACeq7X4uL",
      status: "SUCCESS",
      mobileNumber: "9876543210",
    },
    {
      transactionId: "TXN002",
      agentId: "MocktACeq7Y5uL",
      billerId: "OTME0005XXZ50",
      amount: 800,
      time: "2025-02-16 10:30:00",
      bharatConnectTxnId: "MocktACeq7Y5uL",
      status: "FAILED",
      mobileNumber: "9876543210",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setTransactionDetails(null);
    setTableData([]);
    setLoading(true);

    setTimeout(() => {
      // Filter by Transaction ID first
      if (filters.transactionId) {
        const txn = mockTransactions.find(
          (t) => t.transactionId === filters.transactionId
        );
        if (txn) setTransactionDetails(txn);
        else alert("No transaction found for this ID!");
        setLoading(false);
        return;
      }

      // Filter by other criteria
      let result = [...mockTransactions];

      if (filters.mobileNumber)
        result = result.filter((t) => t.mobileNumber === filters.mobileNumber);

      if (filters.startDate)
        result = result.filter(
          (t) => new Date(t.time) >= new Date(filters.startDate)
        );

      if (filters.endDate)
        result = result.filter(
          (t) => new Date(t.time) <= new Date(filters.endDate)
        );

      setTableData(result);
      setLoading(false);
    }, 500);
  };

  const columns = [
    { key: "transactionId", label: "Transaction ID" },
    { key: "agentId", label: "Agent ID" },
    { key: "billerId", label: "Biller ID" },
    { key: "amount", label: "Amount", render: (row) => `₹${row.amount}` },
    { key: "status", label: "Status" },
    { key: "time", label: "Time" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Support
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Form + Table */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          {/* Form */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Search Transactions
            </h2>

            <input
              type="text"
              name="transactionId"
              placeholder="Transaction ID"
              value={filters.transactionId}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="text-center font-semibold text-gray-500">OR</div>

            <input
              type="text"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={filters.mobileNumber}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all"
            >
              Search
            </button>

            {loading && (
              <p className="text-gray-500 text-center mt-2">Loading...</p>
            )}
          </div>

          {/* Table */}
          {tableData.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow-md overflow-auto max-h-[500px]">
              <h3 className="text-md font-semibold mb-2 text-gray-700">
                Transaction Records
              </h3>
              <Table
                columns={columns}
                data={tableData}
                rowsPerPage={5}
                isPaginationRequired={true}
              />
            </div>
          )}
        </div>

        {/* Right Side: Transaction Card */}
        <div className="lg:w-1/2">
          {transactionDetails && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Transaction Details
              </h2>

              <div className="space-y-3 text-gray-700">
                <p>
                  <span className="font-medium">Agent ID:</span>{" "}
                  {transactionDetails.agentId}
                </p>
                <p>
                  <span className="font-medium">Biller ID:</span>{" "}
                  {transactionDetails.billerId}
                </p>
                <p>
                  <span className="font-medium">Amount:</span>{" "}
                  <span className="font-semibold text-gray-900">
                    ₹{transactionDetails.amount}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Time:</span>{" "}
                  {transactionDetails.time}
                </p>
                <p>
                  <span className="font-medium">Bharat-Connect Txn ID:</span>{" "}
                  {transactionDetails.bharatConnectTxnId}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`font-semibold ${
                      transactionDetails.status === "SUCCESS"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transactionDetails.status}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
