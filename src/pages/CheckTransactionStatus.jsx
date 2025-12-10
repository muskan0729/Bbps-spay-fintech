import React, { useEffect, useState } from "react";
import { usePost } from "../hooks/usePost";

const CheckTransactionStatus = () => {
  // Input State
  const [requestId, setRequestId] = useState("");
  const [mobile, setMobile] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [response, setResponse] = useState(null);

  // API Hook
  const { loading, execute } = usePost("/bbps/get-txn-status-test");

  const handleSubmit = async () => {
    try {
      const result = await execute({ txnRefID: requestId });

      console.log("Response:", result.responses?.[requestId]?.txnList);

      const txn = result.responses?.[requestId]?.txnList?.[0];
      setResponse(txn || null);
    } catch (error) {
      console.log(error);
    }
  };

  const clearField = () => {
    setRequestId("");
    setMobile("");
    setStartDate("");
    setEndDate("");
    setResponse(null);
  };

  return (
    <div className="p-6 flex flex-col gap-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 min-h-screen">

      {/* Input Section */}
      <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100 mx-auto">
        
        <h2 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">
          Review Transaction Activity
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Transaction Reference Id / Request Id"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
          />

          <div className="relative text-center text-gray-500 font-semibold">
            <span className="bg-white px-2">OR</span>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>

          <input
            type="text"
            placeholder="Mobile Number"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <div className="flex gap-3">
            <input
              type="date"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-6 py-2 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Status"}
          </button>

          <button
            onClick={clearField}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Transaction Response */}
      {response && (
        <div className="bg-white/90 p-6 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-lg w-full lg:w-2/3 mx-auto">
          <h3 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Transaction Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {[
              { label: "Agent ID", value: response?.agentId },
              { label: "Amount", value: response?.amount },
              { label: "Biller ID", value: response?.billerId },
              { label: "Mobile", value: response?.mobile },
              { label: "Pay Request ID", value: response?.payRequestId },
              { label: "Approval Ref Number", value: response?.approvalRefNumber },
              { label: "Transaction Date", value: response?.txnDate },
              { label: "Customer Name", value: response?.respCustomerName },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition"
              >
                <b className="text-gray-600">{item.label}</b>
                <p className="text-gray-800 font-medium break-all">
                  {item.value || "—"}
                </p>
              </div>
            ))}

            {/* Transaction Status */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition">
              <b className="text-gray-600">Transaction Status</b>
              <p
                className={`font-semibold ${
                  response?.txnStatus === "SUCCESS"
                    ? "text-green-600"
                    : response?.txnStatus === "FAILED"
                    ? "text-red-600"
                    : "text-gray-800"
                }`}
              >
                {response?.txnStatus || "—"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckTransactionStatus;
