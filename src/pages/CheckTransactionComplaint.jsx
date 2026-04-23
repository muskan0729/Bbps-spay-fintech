// CC0125319441353
// CC0125318174868

import React, { useState } from "react";
import Table from "../components/Table";
import { usePost } from "../hooks/usePost";
import TableSkeleton from "../components/TableSkeleton";

const CheckTransactionComplaint = () => {
  const [complaintType, setComplaintType] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [complaintResponse, setComplaintResponse] = useState(null);

  const { error, loading, execute } = usePost("/bbps/complaint-status/json");

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

    setComplaintResponse(null);

    const body = {
      complaintType,
      complaintId,
    };

    const res = await execute(body);

    if (res) {
      setComplaintResponse({
        id: res.complaintId ?? "N/A",
        status: res.complaintStatus ?? "N/A",
        remarks: res.complaintRemarks ?? "N/A",
        complaintAssigned: res.complaintAssigned ?? "N/A",
        complaintResponseReason: res.complaintResponseReason ?? "N/A",
      });
    }
  };

  const tableData = complaintResponse
    ? [
        {
          "Complaint ID": complaintResponse.id,
          "Complaint Status": complaintResponse.status,
          Remarks: complaintResponse.remarks,
          "Complaint Assigned": complaintResponse.complaintAssigned,
          "Complaint Response Reason":
            complaintResponse.complaintResponseReason,
        },
      ]
    : [];

  return (
    <div className=" flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 ">
      <div
        className="
      relative bg-white shadow-md rounded-lg border border-gray-200
      w-full
      max-w-full
      sm:max-w-xl
      md:max-w-2xl
      lg:max-w-[60%]
      xl:max-w-5xl
      p-4 sm:p-6
    "
      >
        {/* Logo */}
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Bharat_Connect_Primary_Logo_SVG.svg/1280px-Bharat_Connect_Primary_Logo_SVG.png"
          alt="Bharat Connect Logo"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-20 sm:w-24 md:w-28 h-auto"
        />

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Check Complaint Status – Tracking
        </h1>

        {/* Complaint Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Complaint Type
          </label>
          <select
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Type</option>
            <option value="Transaction">Transaction</option>
            <option value="Service">Service</option>
          </select>
        </div>

        {/* Complaint ID */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Enter Complaint ID
          </label>
          <input
            type="text"
            value={complaintId}
            onChange={(e) => setComplaintId(e.target.value)}
            placeholder="Enter your Complaint ID"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleCheckStatus}
          disabled={loading}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-2 px-6 rounded-md transition"
        >
          {loading ? "Checking..." : "Check Status"}
        </button>

        <hr className="my-6" />

        {/* Table */}
        {loading && <TableSkeleton rows={1} columns={5} />}

        {error && (
          <p className="text-red-600 font-medium text-sm">
            Failed to fetch complaint status.
          </p>
        )}

        {complaintResponse && !loading && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Complaint Status
            </h3>

            {/* Horizontal scroll for small devices */}
            <div className="overflow-x-auto">
              <Table columns={columns} data={tableData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckTransactionComplaint;
