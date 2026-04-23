import React, { useEffect, useState } from "react";
import { usePost } from "../hooks/usePost";

const CheckTransactionStatus = () => {
  // Input State
  const [requestId, setRequestId] = useState("");
  const [mobile, setMobile] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isDisable, setIsDisable] = useState({
    mobile: false,
    startDate: false,
    endDate: false,
    requestId: false,
  });

  // RESPONSE IS ALWAYS ARRAY
  const [response, setResponse] = useState([]);
  const [resError, setResError] = useState(null);
  // API Hook
  const { error, loading, execute } = usePost(`/bbps/get-txn-status`);

  const handleSubmit = async () => {
    let body;

    if (!isDisable.requestId) {
      body = {
        txnRefID: requestId,
      };
    } else {
      body = {
        mobile_no: mobile,
        fromDate: startDate,
        toDate: endDate || new Date().toISOString().split("T")[0],
      };
    }

    try {
      const result = await execute(body);

      if (result?.responses[requestId || mobile].errorInfo) {
        setResError(
          result?.responses[requestId || mobile].errorInfo.error[0].errorMessage
        );
        return;
      }
      const txn = result?.responses?.[requestId || mobile]?.txnList || [];
      setResponse(txn);
    } catch (error) {
      setResponse([]);
    }
  };

  useEffect(() => {
    const hasRequestId = requestId.trim().length > 0;
    const hasOtherFields =
      mobile.trim().length > 0 ||
      startDate.trim().length > 0 ||
      endDate.trim().length > 0;

    setIsDisable({
      requestId: hasOtherFields,
      mobile: hasRequestId,
      startDate: hasRequestId,
      endDate: hasRequestId,
    });
  }, [requestId, mobile, startDate, endDate]);

  useEffect(() => {}, [error]);

  const clearField = () => {
    setRequestId("");
    setMobile("");
    setStartDate("");
    setEndDate("");
    setResponse([]);
  };

  useEffect(() => {
    if (!resError) return;
    alert(resError);
    setResError(null);
  }, [resError]);

  return (
    <div className="p-6 flex  flex-col gap-8 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 container">
      {/* Input Section */}
      <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-100 mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-5">
          Review Transaction Activity
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            disabled={isDisable.requestId}
            placeholder="Transaction Reference Id / Request Id"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
          />

          <div className="relative text-center text-gray-500 font-semibold">
            <span className="bg-white px-2">OR</span>
          </div>

          <input
            type="text"
            disabled={isDisable.mobile}
            placeholder="Mobile Number"
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <div className="flex gap-3">
            <input
              type="date"
              disabled={isDisable.startDate}
              className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              disabled={isDisable.endDate}
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
      {/* {resError && (
        <div className="mt-3 text-sm text-red-600 font-medium">{resError}</div>
      )} */}

      {/* Transaction Response */}
      {response.length > 0 && (
        <div className="space-y-6">
          {response.map((res, index) => (
            <div
              key={res.payRequestId || index}
              className="bg-white/90 p-6 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-lg w-full lg:w-2/3 mx-auto"
            >
              <h3 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Transaction Status
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Agent ID", value: res.agentId },
                  { label: "Amount", value: res.amount },
                  { label: "Biller ID", value: res.billerId },
                  { label: "Mobile", value: res.mobile },
                  { label: "Pay Request ID", value: res.payRequestId },
                  {
                    label: "Approval Ref Number",
                    value: res.approvalRefNumber,
                  },
                  { label: "Transaction Date", value: res.txnDate },
                  {
                    label: "Customer Name",
                    value: res.respCustomerName,
                  },
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
                      res.txnStatus === "SUCCESS"
                        ? "text-green-600"
                        : res.txnStatus === "FAILED"
                        ? "text-red-600"
                        : "text-gray-800"
                    }`}
                  >
                    {res.txnStatus || "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckTransactionStatus;
