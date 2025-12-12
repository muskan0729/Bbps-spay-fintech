import React, { useState, useEffect, useMemo } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
import { usePost } from "../../hooks/usePost";
import { useServicesContext } from "../../contexts/ServicesAuthContext";

const DetailConfirmation = () => {
  const { isModalOpen, getModalData, closeModal, openModal } = useModal();
  const { forWhat } = useServicesContext();
  // Fallback for modal data
  const modalData = getModalData("finalData") || {};
  const { data = {}, custData = {}, selectedBiller = {} } = modalData;

  const testEnv = useMemo(() => {
    return forWhat;
  }, [forWhat]);
  const [input, setInput] = useState([]);
  const [addInfo, setAddInfo] = useState([]);
  const [billerRes, setBillerRes] = useState({});
  const [acceptAmount, setAcceptAmount] = useState(false);
  const [userDataRequire, setUserDataRequire] = useState(false);
  const [formValues, setFormValues] = useState({ amount: "" });
  const [userData, setUserData] = useState({});
  const [isDisplay,setIsDisplay]=useState(false);
  const { error, execute: fetchPayment } = usePost(
    `/bbps/bill-payment${testEnv}/json`
  );
  const [resError, setResError] = useState();

  /* ---------------- LOAD RESPONSE FIELDS ---------------- */
  useEffect(() => {
    if (error?.errors) {
      let a = error?.errors;
      let msg = Object.values(a)[0][0];
      console.log("ERROR HANDELING ", a);
     
      setResError(msg);
    }

    // if (error?.message) {
    //   setResError(error.message || "Something went wrong");
    //   console.log("API Error (hook):", error);
    // }
  }, [error]);
  useEffect(()=>{
     setIsDisplay(true);
     setTimeout(()=>(setIsDisplay(false)),[3000])
  },[resError])


  useEffect(() => {
    if (!selectedBiller) return;

    // Check if user data is required
    if (
      selectedBiller?.billerFetchRequiremet !== "MANDATORY" &&
      selectedBiller?.billerFetchRequiremet !== "OPTIONAL"
    ) {
      setUserDataRequire(true);
    }
    setInput(data.inputParams?.input || []);
    setAddInfo(data.additionalInfo?.info || []);
    setBillerRes(data.billerResponse || {});
    setAcceptAmount(selectedBiller?.billerAdhoc === "true");
  }, [selectedBiller, data]);

  /* ---------------- BUILD TABLE ROWS ---------------- */
  const billerRows = Object.entries(billerRes || {})
    .map(([key, value]) => ({ key, value }))
    .filter((x) => x.value !== "" && x.value != null);

  const dynamicRows = [
    ...input.map((i) => ({
      key: i.paramName ?? "Unknown Param",
      value: i.paramValue ?? "",
    })),
    ...addInfo.map((i) => ({
      key: i.infoName ?? "Unknown Info",
      value: i.infoValue ?? "",
    })),
    ...billerRows.map((item) => ({
      key: item.key,
      value: item.key === "billAmount" ? Number(item.value) / 100 : item.value,
    })),
  ];

  const handleChange = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  /* ---------------- FINAL PAYMENT BODY ---------------- */
  const finalMergedData = {
    billerId: selectedBiller?.billerId,
    ...dynamicRows.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {}),
    ...custData,
    ...userData,
    paymentMode: "Cash",
    splitPay: "N",
    quickPay: "N",
    ...(acceptAmount ? { amount: formValues.amount } : {}),
  };

  /* ---------------- EXECUTE PAYMENT ---------------- */
  const handlePay = async () => {
    console.log("🔥 Final Payment Payload:", finalMergedData);

    const response = await fetchPayment(finalMergedData);
    if (!response) {
      return;
    }
    console.log("API Response:", response);

    // 1️⃣ Generic API error
    if (response?.status === false && response?.message) {
      setResError(response.message);
      console.log("API Error:", response.message);
      return; // prevent closing modal
    }

    // 2️⃣ Validation errors
    if (response?.errors) {
      const messages = Object.values(response.errors).flat().join(", ");
      setResError(messages);
      console.log("Validation Error:", messages);
      return;
    }

    // FORM BBPS ERROR
    if (response?.response.vErrorRootVO) {
      console.log(
        "this is hththt",
        response?.response.vErrorRootVO.error[0].errorMessage
      );
      setResError(response?.response.vErrorRootVO.error[0].errorMessage);

      // set
      closeModal("finalData");
      return;
    }

    // ✅ Success → proceed
    closeModal("finalData");
    openModal("lastModal", {
      lastModal: response,
      serviceId: selectedBiller?.billerId,
      data,
      custData,
    });
  };

  return (
    <ServicesModalWrapper
      isOpen={isModalOpen("finalData")}
      onClose={() => closeModal("finalData")}
      renderHeader={
        <>
          <img src={placeholderImg} alt="logo" className="h-7 mx-auto" />
          <p className="text-center text-lg mt-1 font-semibold">
            Are you sure you want to proceed?
          </p>
        </>
      }
      renderMiddle={
        <>
          {/* Amount Field */}
          {acceptAmount && (
            <div className="mt-4">
              <label className="font-semibold mb-1 block">Enter Amount</label>
              <input
                type="number"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
                value={formValues.amount}
                onChange={(e) => setFormValues({ amount: e.target.value })}
              />
            </div>
          )}

          {/* Show API Error */}
          {isDisplay && resError && <div className="text-red-500 mt-2">{resError}</div>}

          {/* User Required Input Fields */}
          <div className="mt-5 bg-gray-50 p-4 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">
              Customer Details
            </h3>

            {userDataRequire && (
              <div className="space-y-3">
                <div>
                  <label className="font-medium block mb-1">
                    Customer Mobile
                  </label>
                  <input
                    type="text"
                    name="customerMobile"
                    maxLength={10}
                    placeholder="Enter Customer Mobile"
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="font-medium block mb-1">Customer PAN</label>
                  <input
                    type="text"
                    name="customerPan"
                    placeholder="Enter Customer PAN"
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <label className="font-medium block mb-1">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="Enter Customer Email"
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            )}

            {/* Remitter Name */}
            <div>
              <label className="font-medium block mb-1">Remitter Name</label>
              <input
                type="text"
                name="remitterName"
                placeholder="Enter Remitter Name"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                required
              />
            </div>

            {/* Remarks */}
            <div>
              <label className="font-medium block mb-1">Remarks</label>
              <input
                type="text"
                name="remarks"
                placeholder="Enter Remarks"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                required
              />
            </div>
          </div>

          {/* Dynamic Rows Table */}
          <div className="w-full mt-6">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <tbody>
                {dynamicRows.map((row, i) => (
                  <tr key={i} className="border-b last:border-none">
                    <td className="py-2 px-3 font-semibold text-gray-700 bg-gray-100 w-1/2">
                      {row.key}
                    </td>
                    <td className="py-2 px-3 text-gray-800 w-1/2">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }
      renderFooter={(close) => (
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={handlePay}
            className="px-6 py-2 bg-green-600 text-white rounded"
          >
            Pay
          </button>
          <button
            onClick={close}
            className="px-6 py-2 bg-gray-400 text-white rounded"
          >
            Close
          </button>
        </div>
      )}
    />
  );
};

export default DetailConfirmation;
