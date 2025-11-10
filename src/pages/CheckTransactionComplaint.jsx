import React, { useState } from "react";
import Table from "../components/Table";

const CheckTransactionComplaint = () => {
  const [complaintType, setComplaintType] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [complaintResponse, setComplaintResponse] = useState(null);

  const columns = ["Complaint ID", "Complaint Status", "Remarks"];
  const data = [
    { id: 1, "Complaint Status": "Working", Remarks: "Describe your issue" },
  ];

  const handleCheckStatus = () => {
    if (!complaintType || !complaintId) {
      alert("Please select a complaint type and enter a complaint ID.");
      return;
    }
    setComplaintResponse({
      id: complaintId,
      type: complaintType,
      remark: "Working on your issue",
    });
    console.log(`Checking status for ${complaintType} - ID: ${complaintId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
      {/* ==== Card Container ==== */}
      <div className="relative bg-white shadow-md rounded-lg p-6 w-full max-w-7xl border border-gray-200">
        {/* Logo (Top Right) */}
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Bharat_Connect_Primary_Logo_SVG.svg/1280px-Bharat_Connect_Primary_Logo_SVG.svg.png"
          alt="Bharat Connect Logo"
          className="absolute top-4 right-4 w-28 h-auto"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Check Complaint Status – Tracking
        </h1>

        {/* Complaint Type */}
        <div className="mb-4">
          <label
            htmlFor="complaintType"
            className="block text-gray-700 font-medium mb-2"
          >
            Complaint Type
          </label>
          <select
            id="complaintType"
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="transaction">Transaction Issue</option>
            <option value="login">Login Problem</option>
            <option value="payment">Payment Failure</option>
          </select>
        </div>

        {/* Complaint ID */}
        <div className="mb-4">
          <label
            htmlFor="complaintId"
            className="block text-gray-700 font-medium mb-2"
          >
            Enter Complaint ID
          </label>
          <input
            id="complaintId"
            type="text"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            placeholder="Enter your Complaint ID"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Check Button */}
        <button
          onClick={handleCheckStatus}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Check Status
        </button>

        {/* Divider */}
        <hr className="my-6" />

        {/* Complaint Status Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Complaint Status
          </h3>
          <input
            type="text"
            placeholder="Search Complaint ID..."
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Table
            columns={columns}
            rowsPerPage={2}
            data={data}
            isPaginationRequired={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckTransactionComplaint;
