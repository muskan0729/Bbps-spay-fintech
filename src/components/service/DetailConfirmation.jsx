import React, { useState, useEffect } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
import { usePost } from "../../hooks/usePost";

const DetailConfirmation = () => {
  const { isModalOpen, getModalData, closeModal, openModal } = useModal();

  const { data, custData, serviceId } = getModalData("finalData") || {};
  const { execute: fetchPayment } = usePost("/bbps/bill-payment/json");

  const [input, setInput] = useState([]);
  const [addInfo, setAddInfo] = useState([]);
  const [billerRes, setBillerRes] = useState({});
  const isOpen = isModalOpen("finalData");

  // Extract response fields
  useEffect(() => {
    if (!data?.result?.decryptedResponse) return;

    const resp = data.result.decryptedResponse;

    setInput(resp.inputParams?.input || []);
    setAddInfo(resp.additionalInfo?.info || []);
    setBillerRes(resp.billerResponse || {});
  }, [data, custData]);

  // Convert table items into array
  const dynamicRows = [
    ...input.map((i) => ({ key: i.paramName, value: i.paramValue })),
    ...addInfo.map((i) => ({ key: i.infoName, value: i.infoValue })),
    ...Object.entries(billerRes).map(([key, value]) => ({ key, value })),
  ].filter((row) => row.value !== "" && row.value !== null && row.value !== undefined);

  // Convert array → object
  const dynamicObject = dynamicRows.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  // FINAL MERGED PAYMENT BODY
  const finalMergedData = {
    billerId: serviceId,   // Added here
    ...dynamicObject,
    ...(custData || {}),
  };

  const handlePay = async () => {
    console.log("Customer Data:", custData);
    console.log("Dynamic Rows:", dynamicRows);
    console.log("FINAL MERGED OBJECT:", finalMergedData);

    const res = await fetchPayment(finalMergedData);

    // Close the correct modal
    closeModal("finalData");

    setTimeout(() => {
      openModal("lastModal", { lastModal: res, serviceId });
    }, 150);
  };

  return (
    <ServicesModalWrapper
      isOpen={isOpen}
      onClose={() => closeModal("finalData")}
      renderHeader={
        <>
          <div className="flex justify-between w-full">
            <img src={placeholderImg} alt="logo" className="h-7" />
          </div>

          <p className="text-center text-lg mt-1 font-semibold">
            Are you want to proceed?
          </p>
        </>
      }
      renderMiddle={
        <div className="w-full mt-3">
          <table className="w-full border-collapse">
            <tbody>
              {dynamicRows.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2 px-2 font-semibold text-gray-700 w-1/2">
                    {row.key}
                  </td>
                  <td className="py-2 px-2 text-gray-800 w-1/2">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4 mt-3 text-sm text-gray-700">
            <label>
              <input type="checkbox" /> Late Payment Fee (45)
            </label>
            <label>
              <input type="checkbox" /> Fixed Charges (50)
            </label>
            <label>
              <input type="checkbox" /> Additional Charges (60)
            </label>
          </div>
        </div>
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
