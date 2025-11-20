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
import { useAuth } from "../contexts/AuthContext";
import BharatConnectLogo from "../images/logo.png"
import { usePost } from "../hooks/usePost";
const ComplaintPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const role = isAdmin ? "admin" : "merchant";

const { execute: fetchPayment } = usePost("/bbps/complaint-register/json");

  const [formData, setFormData] = useState({
    complaintType: "",
    transactionId: "",
    participationType: "",
    complaintDisposition: "",
    complaintDescription: "",
    serviceComplaint: "",
  });

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [data] = useState([
    { ComplaintID: "CC0125270014750", TxnReferenceID: "CC015270BAAG00021064", ComplaintType: "Transaction", ParticipationType: "BILLER", BillerID: "OTME00005XXZ43", ComplaintReason: "-", ComplaintDisposition: "Transaction Successful, account not updated", ComplaintStatus: "ASSIGNED" },
    { ComplaintID: "CC0125270014751", TxnReferenceID: "CC015270BAAG00021065", ComplaintType: "Service", ParticipationType: "AGENT", BillerID: "OTME00006YYZ12", ComplaintReason: "Service not working properly", ComplaintDisposition: "IN REVIEW", ComplaintStatus: "Pending" },
    { ComplaintID: "CC0125270014752", TxnReferenceID: "CC015270BAAG00021066", ComplaintType: "Transaction", ParticipationType: "AGENT", BillerID: "OTME00007ZZZ34", ComplaintReason: "-", ComplaintDisposition: "Resolved", ComplaintStatus: "Resolved" },
    { ComplaintID: "CC0125270014753", TxnReferenceID: "CC015270BAAG00021067", ComplaintType: "Service", ParticipationType: "BILLER", BillerID: "OTME00008AAA12", ComplaintReason: "Delay in service", ComplaintDisposition: "IN REVIEW", ComplaintStatus: "Pending" },
    { ComplaintID: "CC0125270014754", TxnReferenceID: "CC015270BAAG00021068", ComplaintType: "Transaction", ParticipationType: "BILLER", BillerID: "OTME00009BBB23", ComplaintReason: "-", ComplaintDisposition: "Transaction Successful, account not updated", ComplaintStatus: "ASSIGNED" },
    { ComplaintID: "CC0125270014755", TxnReferenceID: "CC015270BAAG00021069", ComplaintType: "Service", ParticipationType: "AGENT", BillerID: "OTME00010CCC34", ComplaintReason: "Incorrect info displayed", ComplaintDisposition: "IN REVIEW", ComplaintStatus: "Pending" },
  ]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    complaintType: formData.complaintType === "transaction" ? "Transaction" : "Service",
    participationType: formData.participationType.toUpperCase(),
    agentId: formData.participationType === "agent" ? user?.id || "" : "",
    billerId: formData.participationType === "biller" ? user?.id || "" : "",
    servReason: formData.serviceComplaint || "",
    complainDesc: formData.complaintDescription,
    txnRefId: formData.transactionId || "",
    complaintDisposition: formData.complaintDisposition,
  };

  try {
    console.log("Sending payload:", payload);

    const response = await fetchPayment(payload);  // ✅ using your hook

    console.log("Complaint API Response:", response); // log API output

    alert("Complaint submitted successfully!");
  } catch (error) {
    console.error("API Error:", error);
    alert("Failed to submit complaint! Check console.");
  }
};



  const handleViewDetails = (row) => setSelectedComplaint(row);
  const handleCloseModal = () => setSelectedComplaint(null);

  /// ✅ Complaint Status (keep slightly bold for importance)
  const renderStatusLabel = (status) => {
    const base =
      "px-3 py-1 text-xs font-semibold rounded-full shadow-sm border transition-all duration-300";
    const styles = {
      ASSIGNED:
        "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
      Pending:
        "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200",
      Resolved:
        "bg-sky-100 text-sky-800 border-sky-300 hover:bg-sky-200",
    };
    return (
      <span className={`${base} ${styles[status] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
        {status}
      </span>
    );
  };

  // ✅ Participation Type — soft pastel tones for readability
  const renderParticipationType = (type) => {
    const base =
      "px-2 py-1 text-xs font-semibold rounded-full border shadow-sm transition-all duration-300";
    const styles = {
      BILLER:
        "bg-violet-100 text-violet-800 border-violet-300 hover:bg-violet-200",
      AGENT:
        "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200",
    };
    return (
      <span className={`${base} ${styles[type] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
        {type}
      </span>
    );
  };

  // ✅ Complaint Type — softer blue/green pastel tones
  const renderComplaintType = (type) => {
    const base =
      "px-2 py-1 text-xs font-semibold rounded-full border shadow-sm transition-all duration-300";
    const styles = {
      Transaction:
        "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
      Service:
        "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
    };
    return (
      <span className={`${base} ${styles[type] || "bg-gray-100 text-gray-700 border-gray-300"}`}>
        {type}
      </span>
    );
  };


  const columns = [
    { label: "Complaint ID", key: "ComplaintID" },
    { label: "Txn Reference ID", key: "TxnReferenceID" },
    { label: "Complaint Type", key: "ComplaintType", render: (row) => renderComplaintType(row.ComplaintType) },
    { label: "Participation Type", key: "ParticipationType", render: (row) => renderParticipationType(row.ParticipationType) },
    { label: "Biller ID", key: "BillerID" },
    { label: "Complaint Reason", key: "ComplaintReason" },
    { label: "Disposition", key: "ComplaintDisposition" },
    { label: "Status", key: "ComplaintStatus", render: (row) => renderStatusLabel(row.ComplaintStatus) },
    {
      key: "action", label: "Action", render: (row) => (
        <button
          onClick={() => handleViewDetails(row)}
          title="View Complaint Details"
          className="bg-blue-100 text-blue-600 p-2 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm"
        >
          <FaEye size={16} />
        </button>
      )
    }
  ];

  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 min-h-screen font-sans">

      {/* Merchant Form */}
      {role === "merchant" && (
        <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-gray-100 text-gray-800 rounded-t-xl px-4 py-3 flex items-center gap-2 font-semibold text-lg shadow-sm">
              <FaClipboardList /> Transaction Complaint
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaExchangeAlt className="text-gray-500" /> Complaint Type
                </label>
                <select
                  name="complaintType"
                  value={formData.complaintType}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                >
                  <option value="">Select Complaint Type</option>
                  <option value="transaction">Transaction</option>
                  <option value="service">Service</option>
                </select>
              </div>

              {formData.complaintType === "transaction" && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <FaFileAlt className="text-gray-500" /> Transaction ID
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleChange}
                    placeholder="Enter Transaction ID"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                  />
                </div>
              )}

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaUserTie className="text-gray-500" /> Participation Type
                </label>
                <select
                  name="participationType"
                  value={formData.participationType}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                >
                  <option value="">Select Type</option>
                  <option value="agent">Agent</option>
                  <option value="biller">Biller</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <div className="bg-gray-100 text-gray-800 rounded-t-xl px-4 py-3 flex justify-between items-center font-semibold text-lg shadow-sm">
              <div className="flex items-center gap-2">
                <FaCommentDots /> Complaint Reason
              </div>
              <img
                src={BharatConnectLogo}
                alt="BharatConnect"
                className="h-8 sm:h-10 md:h-12 object-contain"
              />

            </div>
            <div className="p-4 space-y-4">
              {formData.complaintType === "service" && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <MdMiscellaneousServices className="text-gray-500" /> Service Complaint Reason
                  </label>
                  <input
                    type="text"
                    name="serviceComplaint"
                    value={formData.serviceComplaint}
                    onChange={handleChange}
                    placeholder="Enter Service Complaint Reason"
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                  />
                </div>
              )}

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <BsCheck2Circle className="text-gray-500" /> Complaint Disposition
                </label>
                <select
                  name="complaintDisposition"
                  value={formData.complaintDisposition}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                >
                  <option value="">Select Disposition</option>
                  <option value="Bill Paid but Amount not adjusted or still showing due amount">Bill Paid but Amount not adjusted or still showing due amount</option>
                  <option value="in_review">In Review</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <FaCommentDots className="text-gray-500" /> Complaint Description
                </label>
                <textarea
                  name="complaintDescription"
                  value={formData.complaintDescription}
                  onChange={handleChange}
                  placeholder="Enter complaint details..."
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                  required
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-900 transition-all flex items-center gap-2"
                >
                  <FaClipboardList /> Submit Complaint
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Complaint Table */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6 max-w-full mx-auto">

        {/* Table Header */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">All Complaints</h3>

        <Table
          columns={columns}
          data={data}
          rowsPerPage={5}
          isPaginationRequired
          tableClass="min-w-full border border-gray-400 text-sm text-gray-700 font-sans overflow-x-auto"
          headerClass="bg-blue-600 text-white font-semibold text-left uppercase border-b border-gray-400"
          rowClass="bg-white hover:bg-blue-100 border-b border-gray-300 transition-colors duration-200"
          cellClass="py-3 px-4 text-gray-700 whitespace-nowrap"
          paginationClass="flex justify-center gap-2 mt-4 text-gray-700 font-medium"
        />
      </div>




      {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Dimmed but visible background */}
          <div className="absolute inset-0 bg-black/30"></div>
          {/* bg-black/30 = 30% opacity black, dims background but keeps it visible */}

          {/* Modal content */}
          <div className="relative bg-white w-full sm:w-[90%] max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center font-semibold text-lg shadow-md">
              <h3>Complaint Details</h3>
              <button
                className="text-white text-2xl leading-none hover:text-gray-200 transition"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
              <table className="w-full text-sm border border-gray-300 rounded-lg">
                <tbody>
                  {Object.entries(selectedComplaint).map(([key, value]) => (
                    <tr key={key} className="border-b last:border-b-0">
                      <td className="font-semibold text-gray-700 py-2 px-3 sm:px-4 w-1/2 border-r bg-blue-50 whitespace-nowrap">
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </td>
                      <td className="text-gray-800 py-2 px-3 sm:px-4 w-1/2 break-words">{value || "-"}</td>
                    </tr>
                  ))}
                  <tr className="border-b last:border-b-0">
                    <td className="font-semibold text-gray-700 py-2 px-3 sm:px-4 w-1/2 border-r bg-blue-50 whitespace-nowrap">
                      Assigned To
                    </td>
                    <td className="text-gray-800 py-2 px-3 sm:px-4 w-1/2">-</td>
                  </tr>
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
