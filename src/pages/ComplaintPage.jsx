import React, { useState } from "react";
import Table from "../components/Table";
import {
  FaClipboardList,
  FaExchangeAlt,
  FaUserTie,
  FaFileAlt,
  FaCommentDots,
  FaEye,
} from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";

const ComplaintPage = ({ role = "merchant" }) => {
  const [formData, setFormData] = useState({
    complaintType: "",
    transactionId: "",
    participationType: "",
    complaintDisposition: "",
    complaintDescription: "",
    serviceComplaint: "",
  });

  const [data] = useState([
    {
      ComplaintID: "CC0125270014750",
      TxnReferenceID: "CC015270BAAG00021064",
      ComplaintType: "Transaction",
      ParticipationType: "BILLER",
      BillerID: "OTME00005XXZ43",
      ComplaintReason: "-",
      ComplaintDisposition: "Transaction Successful, account not updated",
      ComplaintStatus: "ASSIGNED",
      //assignedTo: "-",
    },
    {
      ComplaintID: "CC0125270014751",
      TxnReferenceID: "CC015270BAAG00021065",
      ComplaintType: "Service",
      ParticipationType: "AGENT",
      BillerID: "OTME00006YYZ12",
      ComplaintReason: "Service not working properly",
      ComplaintDisposition: "IN REVIEW",
      ComplaintStatus: "Pending",
      //assignedTo: "-",
    },
  ]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const rowsPerPage = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Submitted:", formData);
    alert("Complaint submitted successfully!");
  };

  const handleViewDetails = (row) => {
    setSelectedComplaint(row);
  };

  const handleCloseModal = () => {
    setSelectedComplaint(null);
  };

  // Updated columns: Removed Sr. No., added 'assignedTo' column
  const columns = [
    "ComplaintID" ,
    "TxnReferenceID",
    "ComplaintType" ,
    "ParticipationType",
    "BillerID",
    "ComplaintReason",
    "ComplaintDisposition" ,
    "ComplaintStatus",
    
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <button
          onClick={() => handleViewDetails(row)}
          title="View Complaint Details"
          className="bg-blue-100 text-blue-600 p-2 rounded-md hover:bg-blue-600 hover:text-white transition-all shadow-sm"
        >
          <FaEye size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Complaint Form */}
      {role === "merchant" && (
        <form
  onSubmit={handleSubmit}
  className="w-full max-w-6xl mx-auto mb-10 flex flex-col md:flex-row gap-6"
>
  {/* Left Form */}
  <div className="flex-1 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm">
    <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
      <FaClipboardList className="text-gray-600" /> Complaint & Participation Details
    </h2>

    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <FaExchangeAlt className="text-gray-500" /> Complaint Type
      </label>
      <select
        name="complaintType"
        value={formData.complaintType}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">Select Complaint Type</option>
        <option value="transaction">Transaction</option>
        <option value="service">Service</option>
      </select>
    </div>

    {formData.complaintType === "transaction" && (
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <FaFileAlt className="text-gray-500" /> Enter Transaction ID
        </label>
        <input
          type="text"
          name="transactionId"
          value={formData.transactionId}
          onChange={handleChange}
          placeholder="Enter Transaction ID"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
      </div>
    )}

    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <FaUserTie className="text-gray-500" /> Participation Type
      </label>
      <select
        name="participationType"
        value={formData.participationType}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">Select Type</option>
        <option value="agent">Agent</option>
        <option value="biller">Biller</option>
      </select>
    </div>
  </div>

  {/* Right Form */}
  <div className="flex-1 bg-white p-4 md:p-6 rounded-xl border border-gray-200 shadow-sm relative">
    <img
      src="/src/images/bharat-connect-logo.png"
      alt="Bharat Connect Logo"
      className="hidden md:block absolute top-4 right-4 h-10 w-auto"
    />

    <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2 flex items-center gap-2">
      <FaCommentDots className="text-gray-600" /> Complaint Details & Resolution
    </h2>

    {formData.complaintType === "service" && (
      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <MdMiscellaneousServices className="text-gray-500" /> Enter Service Complaint Reason
        </label>
        <input
          type="text"
          name="serviceComplaint"
          value={formData.serviceComplaint}
          onChange={handleChange}
          placeholder="Enter Service Complaint Reason"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
    )}

    <div className="mb-4">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <BsCheck2Circle className="text-gray-500" /> Complaint Disposition
      </label>
      <select
        name="complaintDisposition"
        value={formData.complaintDisposition}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">Select Disposition</option>
        <option value="pending">Pending</option>
        <option value="in_review">In Review</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>

    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
        <FaCommentDots className="text-gray-500" /> Complaint Description
      </label>
      <textarea
        name="complaintDescription"
        value={formData.complaintDescription}
        onChange={handleChange}
        placeholder="Enter complaint details..."
        className="border border-gray-300 rounded px-3 py-2 w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      />
    </div>

    <div className="mt-6 flex justify-end">
      <button
        type="submit"
        className="bg-green-700 text-white px-6 py-2 rounded-md shadow hover:bg-green-800 transition-all flex items-center gap-2 w-full md:w-auto"
      >
        <FaClipboardList /> Submit Complaint
      </button>
    </div>
  </div>
</form>

      )}

      {/* Complaint Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          {role === "admin"
            ? "Admin Complaint Management Table"
            : "Merchant Complaint Status Table"}
        </h2>

        <Table
          columns={columns}
          data={data}
          rowsPerPage={5}
          isPaginationRequired={true}
          // rowKey="complaintId" // Important: unique key for each row
        />

      </div>

      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white w-[90%] max-w-2xl rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white px-6 py-3 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Complaint Details</h3>
              <button
                className="text-white text-2xl leading-none hover:text-gray-200"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <table className="w-full text-sm border border-gray-300 rounded">
                <tbody>
                  {Object.entries(selectedComplaint).map(([key, value], index) => (
                    <tr key={`${key}-${index}`} className="border-b last:border-b-0">
                      <td className="font-semibold text-gray-600 py-2 px-4 w-1/2 border-r bg-gray-50">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </td>
                      <td className="text-gray-800 py-2 px-4 w-1/2">{value || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintPage;
