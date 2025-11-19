import React, { useState, useEffect } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
// import bharatImg from "../../images/bharatConnectLogo.png"; // add if needed

const DetailConfirmation = () => {
  const { isModalOpen, getModalData, closeModal, openModal } = useModal();
  const { data } = getModalData("finalData") || {};

  const [input, setInput] = useState([]);
  const [addInfo, setAddInfo] = useState([]);
  const [billerRes, setBillerRes] = useState({});

  const isOpen = isModalOpen("finalData");

  useEffect(() => {
    if (!data?.result?.decryptedResponse) return;

    const resp = data.result.decryptedResponse;

    setInput(resp.inputParams?.input || []);
    setAddInfo(resp.additionalInfo?.info || []);
    setBillerRes(resp.billerResponse || {});
  }, [data]);

  // ➤ Convert dynamic objects into rows (AND auto remove empty values)
  const dynamicRows = [
    ...input.map((i) => ({
      key: i.paramName,
      value: i.paramValue,
    })),
    ...addInfo.map((i) => ({
      key: i.infoName,
      value: i.infoValue,
    })),
    ...Object.entries(billerRes).map(([key, value]) => ({
      key: key,
      value: value,
    })),
  ].filter((row) => row.value !== null && row.value !== "" && row.value !== undefined);

  const handlePay = () => {
    closeModal("details");
    setTimeout(() => {
      openModal("txnForm", { txnData: data });
    }, 250);
  };

  return (
    <ServicesModalWrapper
      isOpen={isOpen}
      onClose={() => closeModal("finalData")}
      renderHeader={
        <>
          <div className="flex justify-between w-full">
            <img src={placeholderImg} alt="logo" className="h-7" />
            {/* <img src={bharatImg} alt="logo" className="h-7" /> */}
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
                  <td className="py-2 px-2 text-gray-800 w-1/2">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* checkboxes (optional) */}
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
          <button onClick={handlePay} className="px-6 py-2 bg-green-600 text-white rounded">
            Pay
          </button>

          <button onClick={close} className="px-6 py-2 bg-gray-400 text-white rounded">
            Close
          </button>
        </div>
      )}
    />
  );
};

export default DetailConfirmation;
