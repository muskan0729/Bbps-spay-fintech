import React, { useState } from "react";
import Table from "../components/Table";

const ComplaintPage = ({ role = "merchant" }) => {
  

  const [formData, setFormData] = useState({
    complaintType: "",
    transactionId: "",
    participationType: "",
    complaintDisposition: "",
    complaintDescription: "",
    serviceComplaint: "",
  });

  const [data, setData] = useState([
    {
      complaintId: "CC0125270014750",
      txnReferenceId: "CC015270BAAG00021064",
      complaintType: "Transaction",
      participationType: "BILLER",
      billerId: "OTME00005XXZ43",
      complaintReason: "Transaction Successful, account not updated",
      complaintDisposition: "ASSIGNED",
      complaintStatus: "Open",
    },
    {
      complaintId: "CC0125270014751",
      txnReferenceId: "CC015270BAAG00021065",
      complaintType: "Service",
      participationType: "AGENT",
      billerId: "OTME00006YYZ12",
      complaintReason: "Service not working properly",
      complaintDisposition: "IN REVIEW",
      complaintStatus: "Pending",
    },
  ]);

  const [isPaginationRequired] = useState(true);
  const rowsPerPage = 5;

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Submitted:", formData);
    alert("Complaint submitted successfully!");
  };

  // Define columns for the table
  const columns = [
    { key: "srNo", label: "Sr. No.", render: (_, i) => i + 1 },
    { key: "complaintId", label: "Complaint ID" },
    { key: "txnReferenceId", label: "Txn Reference ID" },
    { key: "complaintType", label: "Complaint Type" },
    { key: "participationType", label: "Participation Type" },
    { key: "billerId", label: "Biller ID" },
    { key: "complaintReason", label: "Complaint Reason" },
    { key: "complaintDisposition", label: "Complaint Disposition" },
    { key: "complaintStatus", label: "Complaint Status" },
    ...(role === "admin"
      ? [
          {
            key: "assignedTo",
            label: "Assigned To",
            render: () => "Merchant_01",
          },
          {
            key: "adminAction",
            label: "Admin Action",
            render: (row) => (
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => alert(`Admin reviewing ${row.complaintId}`)}
              >
                Review
              </button>
            ),
          },
        ]
      : [
          {
            key: "action",
            label: "Action",
            render: (row) => (
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => alert(`Viewing complaint ${row.complaintId}`)}
              >
                View
              </button>
            ),
          },
        ]),
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Show Merchant Form only if role = merchant */}
      {role === "merchant" && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto mb-10">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Merchant Complaint Form
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Complaint Type */}
            <div>
              <label className="block font-medium mb-2">Complaint Type</label>
              <select
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Select Complaint Type</option>
                <option value="transaction">Transaction</option>
                <option value="service">Service</option>
              </select>
            </div>

            {/* Transaction ID (only for Transaction type) */}
            {formData.complaintType === "transaction" && (
              <div>
                <label className="block font-medium mb-2">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="Enter Transaction ID"
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
            )}

            {/* Participation Type */}
            <div>
              <label className="block font-medium mb-2">
                Participation Type
              </label>
              <select
                name="participationType"
                value={formData.participationType}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Select Type</option>
                <option value="agent">Agent</option>
                <option value="biller">Biller</option>
              </select>
            </div>

            {/* Complaint Disposition */}
            <div>
              <label className="block font-medium mb-2">
                Complaint Disposition
              </label>
              <select
                name="complaintDisposition"
                value={formData.complaintDisposition}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Select Disposition</option>
                <option value="pending">Pending</option>
                <option value="in_review">In Review</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {/* Complaint Description */}
            <div>
              <label className="block font-medium mb-2">
                Complaint Description
              </label>
              <textarea
                name="complaintDescription"
                value={formData.complaintDescription}
                onChange={handleChange}
                placeholder="Enter complaint details..."
                className="border rounded px-3 py-2 w-full min-h-[100px]"
                required
              />
            </div>

            {/* Enter Service Complaint (only if Service type) */}
            {formData.complaintType === "service" && (
              <div>
                <label className="block font-medium mb-2">
                  Enter Service Complaint
                </label>
                <input
                  type="text"
                  name="serviceComplaint"
                  value={formData.serviceComplaint}
                  onChange={handleChange}
                  placeholder="Enter Service Complaint"
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Complaint Table (common for both) */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {role === "admin"
            ? "Admin Complaint Management Table"
            : "Merchant Complaint Status Table"}
        </h2>

        <Table
          columns={columns}
          data={data}
          rowsPerPage={rowsPerPage}
          isPaginationRequired={isPaginationRequired}
        />
      </div>
    </div>
  );
};

export default ComplaintPage;
