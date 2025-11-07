import React, { useState } from "react";

const CheckTransactionComplaint = () => {
    const [complaintType, setComplaintType] = useState("");
    const [complaintId, setComplaintId] = useState("");
    const [complaintResponse, setComplaintResponse] = useState(null);
    const handleCheckStatus = () => {
        if (!complaintType || !complaintId) {
            alert("Please select a complaint type and enter a complaint ID.");
            return;
        }
        // Here you could fetch complaint status from API
        setComplaintResponse({
            "id": complaintId,
            "type": complaintType,
            "remark": "Working on your issue"
        });
        console.log(`Checking status for ${complaintType} - ID: ${complaintId}`);
    };

    return (
        <>
            <section className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Check Complaint Status – Tracking
                </h1>

                {/* Complaint Type */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold text-gray-700">Complaint Type</h2>
                    <select
                        value={complaintType}
                        onChange={(e) => setComplaintType(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Select Option</option>
                        <option value="transaction">Transaction Issue</option>
                        <option value="login">Login Problem</option>
                        <option value="payment">Payment Failure</option>
                    </select>
                </div>

                {/* Complaint ID Input */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="complaintId" className="text-lg font-semibold text-gray-700">
                        Enter Complaint ID
                    </label>
                    <input
                        id="complaintId"
                        type="text"
                        value={complaintId}
                        onChange={(e) => setComplaintId(e.target.value)}
                        placeholder="Enter your Complaint ID"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Check Button */}
                <button
                    type="button"
                    onClick={handleCheckStatus}
                    className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Check Status
                </button>
            </section>
            <hr />
            {complaintResponse ? (<section>
                Complent ID:<span>{complaintResponse.id}</span>
                Complent:<span>{complaintResponse.type}</span>
                Remarks:<span>{complaintResponse.remark}</span>
            </section>) : (<span>Some thing went wrong</span>)}
        </>
    );
};

export default CheckTransactionComplaint;
