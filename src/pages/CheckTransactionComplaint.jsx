import React, { useState } from "react";
import Table from "../components/Table";
import { usePost } from "../hooks/usePost";
import TableSkeleton from "../components/TableSkeleton";

const CheckTransactionComplaint = () => {
  const [complaintType, setComplaintType] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [complaintResponse, setComplaintResponse] = useState(null);

  const { data, error, loading, execute } = usePost("/bbps/complaint-status/json");

  const columns = [
    "Complaint ID",
    "Complaint Status",
    "Remarks",
    "Complaint Assigned",
    "Complaint Response Reason",
  ];

  const handleCheckStatus = async () => {
    if (!complaintType || !complaintId) {
      alert("Please select a complaint type and enter a complaint ID.");
      return;
    }

    const body = {
      complaintType,
      complaintId,
    };

    const res = await execute(body);

    if (res) {
      // map API response to table-friendly format
      setComplaintResponse({
        id: res.complaintId || "N/A",
        status: res.complaintStatus || "N/A",
        remarks: res.complaintRemarks || "N/A",
        complaintAssigned: res.complaintAssigned || "N/A",
        complaintResponseReason: res.complaintResponseReason || "N/A",
      });
    }
  };

  // prepare table data
  const tableData = complaintResponse
    ? [
        {
          "Complaint ID": complaintResponse.id,
          "Complaint Status": complaintResponse.status,
          "Remarks": complaintResponse.remarks,
          "Complaint Assigned": complaintResponse.complaintAssigned,
          "Complaint Response Reason": complaintResponse.complaintResponseReason,
        },
      ]
    : [];

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="relative bg-white shadow-md rounded-lg p-6 w-full max-w-4xl border border-gray-200">
        {/* Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Bharat_Connect_Primary_Logo_SVG.svg/1280px-Bharat_Connect_Primary_Logo_SVG.png"
          alt="Bharat Connect Logo"
          className="absolute top-4 right-4 w-28 h-auto"
        />

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Check Complaint Status – Tracking
        </h1>

        {/* Complaint Type */}
        <div className="mb-4">
          <label htmlFor="complaintType" className="block text-gray-700 font-medium mb-2">
            Complaint Type
          </label>
          <select
            id="complaintType"
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="Transaction">Transaction</option>
            <option value="Service">Service</option>
          </select>
        </div>

        {/* Complaint ID */}
        <div className="mb-4">
          <label htmlFor="complaintId" className="block text-gray-700 font-medium mb-2">
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

        <hr className="my-6" />

        {/* Table */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Complaint Status</h3>
          {loading ? (
            <TableSkeleton rows={1} columns={5} />
          ) : (
            <Table columns={columns} data={tableData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckTransactionComplaint;
