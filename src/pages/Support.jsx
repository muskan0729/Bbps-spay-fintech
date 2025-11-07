import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
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

    // Mock transaction data (simulate API)
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

    // Handle filter input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Search specific transaction by ID
    const handleTransactionSearch = () => {
        if (!filters.transactionId) {
            alert("Please enter a Transaction ID!");
            return;
        }
        const txn = mockTransactions.find(
            (t) => t.transactionId === filters.transactionId
        );
        if (txn) setTransactionDetails(txn);
        else {
            alert("No transaction found for this ID!");
            setTransactionDetails(null);
        }
    };

    // Search by Mobile, Date range
    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            let result = mockTransactions;

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
        }, 1000);
    };

    // Define search fields for SearchBar
    const filterFields = [
        { name: "mobileNumber", label: "Mobile Number", type: "text" },
        { name: "startDate", label: "Start Date", type: "date" },
        { name: "endDate", label: "End Date", type: "date" },
    ];

    // Define columns for table
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
            <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
                Support
            </h1>

            {/* Transaction ID Search */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-3xl mx-auto">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Search Transaction by ID
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        name="transactionId"
                        placeholder="Enter Transaction ID"
                        value={filters.transactionId}
                        onChange={handleChange}
                        className="border px-3 py-2 rounded w-full sm:w-2/3"
                    />
                    <button
                        onClick={handleTransactionSearch}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Transaction Status Card */}
            {transactionDetails && (
                <div
                    className={`shadow-lg rounded-lg p-6 max-w-3xl mx-auto mb-8 border-t-4 transition-all ${transactionDetails.status === "SUCCESS"
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                        }`}
                >
                    <div className="flex items-center mb-4">
                        {transactionDetails.status === "SUCCESS" ? (
                            <div className="bg-green-500 text-white rounded-full p-2 mr-3">
                                ✅
                            </div>
                        ) : (
                            <div className="bg-red-500 text-white rounded-full p-2 mr-3">
                                ❌
                            </div>
                        )}
                        <h2 className="text-xl font-semibold text-gray-800">
                            Transaction {transactionDetails.status === "SUCCESS" ? "Successful" : "Failed"}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                        <p>
                            <span className="font-medium">Agent ID:</span> {transactionDetails.agentId}
                        </p>
                        <p>
                            <span className="font-medium">Biller ID:</span> {transactionDetails.billerId}
                        </p>
                        <p>
                            <span className="font-medium">Amount:</span>{" "}
                            <span className="font-semibold text-gray-900">₹{transactionDetails.amount}</span>
                        </p>
                        <p>
                            <span className="font-medium">Time:</span> {transactionDetails.time}
                        </p>
                        <p className="col-span-2">
                            <span className="font-medium">Bharat-Connect Txn ID:</span>{" "}
                            {transactionDetails.bharatConnectTxnId}
                        </p>
                        <p className="col-span-2">
                            <span className="font-medium">Status:</span>{" "}
                            <span
                                className={`font-semibold ${transactionDetails.status === "SUCCESS"
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

            {/* Search by Mobile/Date */}
            <SearchBar
                filters={filters}
                handleChange={handleChange}
                handleSearch={handleSearch}
                filterFields={filterFields}
            />

            {/* Table Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Transaction Records
                </h2>
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    <Table
                        columns={columns}
                        data={tableData}
                        rowsPerPage={5}
                        isPaginationRequired={true}
                    />
                )}
            </div>
        </div>
    );
};

export default Support;
