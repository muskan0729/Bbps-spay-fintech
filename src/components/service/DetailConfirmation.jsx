import React, { useState, useEffect } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
import { usePost } from "../../hooks/usePost";

const DetailConfirmation = () => {
  const { isModalOpen, getModalData, closeModal, openModal } = useModal();

  // Ensure fallback {}
  const modalData = getModalData("finalData") || {};
  const { data = {}, custData = {}, selectedBiller = {} } = modalData;

  const [input, setInput] = useState([]);
  const [addInfo, setAddInfo] = useState([]);
  const [billerRes, setBillerRes] = useState({});
  const [acceptAmount, setAcceptAmount] = useState(false);

  const [formValues, setFormValues] = useState({ amount: "" });

  const { execute: fetchPayment } = usePost("/bbps/bill-payment-test/json");

  /* ---------------- LOAD RESPONSE FIELDS ---------------- */
  useEffect(() => {
    const resp = data
    console.log(data);
    
    // if (!resp) {
    //   console.warn("⚠ No decryptedResponse found in modal data");
    //   return;
    // }

    setInput(resp.inputParams?.input || []);
    setAddInfo(resp.additionalInfo?.info || []);
    setBillerRes(resp.billerResponse || {});

    setAcceptAmount(selectedBiller?.billerAdhoc === "true");
  }, [data, selectedBiller]);

  /* ---------------- BUILD TABLE ROWS ---------------- */

  const billerRows = Object.entries(billerRes || {})
    .map(([key, value]) => ({
      key,
      value,
    }))
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
    value:
      item.key === "billAmount"
        ? Number(item.value) / 100   // 👈 ONLY DISPLAY DIVIDED VALUE
        : item.value,
  })),
];


  /* ---------------- FINAL PAYMENT BODY ---------------- */
  const finalMergedData = {
    remarks: "Good here",
    billerId: selectedBiller?.billerId,

    // Convert rows → object
    ...dynamicRows.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {}),

    ...custData,

    paymentMode: "Cash",
    splitPay: "N",
    quickPay: "N",
    remitterName: "Saurabh",

    ...(acceptAmount ? { amount: formValues.amount } : {}),
  };

  /* ---------------- EXECUTE PAYMENT ---------------- */
  const handlePay = async () => {
    console.log("🔥 Final Payment Payload:", finalMergedData);

    const res = await fetchPayment(finalMergedData);

    closeModal("finalData");

    openModal("lastModal", {
      lastModal: res,
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
          {acceptAmount && (
            <div className="mt-3">
              <label className="font-semibold mb-1">Enter Amount</label>
              <input
                type="number"
                className="border p-2 rounded w-full"
                value={formValues.amount}
                onChange={(e) => setFormValues({ amount: e.target.value })}
              />
            </div>
          )}

          <div className="w-full mt-3">
            <table className="w-full border-collapse">
              <tbody>
                {dynamicRows.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2 px-2 font-semibold text-gray-700 w-1/2">
                      {row.key}
                    </td>
                    <td className="py-2 px-2 text-gray-800 w-1/2">
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
