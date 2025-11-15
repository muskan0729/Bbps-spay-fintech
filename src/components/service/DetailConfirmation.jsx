import React, { useState, useEffect, useRef } from "react";
import {ServicesModalWrapper} from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";

const DetailConfirmation = () => {
  const { isModalOpen, getModalData, closeModal, openModal } = useModal();
  const { data } = getModalData("txnConfirm") || {};
  const isOpen = isModalOpen("txnConfirm");

  const tableData = [
    { key: "Biller ID:", value: "DUMMY0000DIG08" },
    { key: "Customer Email:", value: "khanamaanak1@gmail.com" },
    { key: "Customer Name:", value: "N/A" },
    { key: "Bill Date:", value: "N/A" },
    { key: "Bill Amount:", value: "₹N/A" },
    { key: "Total Amount:", value: "₹N/A" },
    { key: "Customer Mobile:", value: "9284210056" },
    { key: "Customer Pan:", value: "AAAPZ1234C" },
    { key: "Bill Number:", value: "N/A" },
    { key: "Bill Period:", value: "N/A" },
    { key: "Due Date:", value: "N/A" },
  ];

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const processedData = (() => {
    let list = [...tableData];

    if (list.length % 2 !== 0) list.push({ key: "", value: "" });

    if (isDesktop) {
      const mid = list.length / 2;
      const merged = [];
      for (let i = 0; i < mid; i++) merged.push([list[i], list[i + mid]]);
      return merged;
    }

    return list.map((item) => [item]);
  })();

  const handlePay = () => {
    closeModal("txnConfirm"); // close current modal
    setTimeout(() => {
      openModal("txnForm", { txnData: data }); // open new form modal
    }, 250); // allow fly-out animation
  };

  const resetForm = () => {};

  return (
    <ServicesModalWrapper
      isOpen={isOpen}
      onClose={() => closeModal("txnConfirm")}
      resetOnClose={resetForm}
      renderHeader={
        <>
          <img src={placeholderImg} alt="Logo" className="h-7" />
          <span className="font-semibold ml-2">
            Are you sure you want to proceed?
          </span>
        </>
      }
      renderMiddle={
        <>
          <div className="pb-3">
            <div className="p-3 shadow-md border-2 border-gray-50 shadow-gray-400">
              <div className="pb-3 font-semibold">Your Bill Details:</div>
              <table className="w-full text-[15px] border border-gray-200 border-collapse">
                <tbody>
                  {processedData.map((pair, index) => (
                    <tr key={index} className="border border-gray-200">
                      {pair.map((item, i) => (
                        <React.Fragment key={i}>
                          <td className="border border-gray-200 p-1 w-1/4">
                            {item.key}
                          </td>
                          <td className="border border-gray-200 p-1 w-1/4">
                            {item.value}
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 p-3 shadow-md border-2 border-gray-50 shadow-gray-400">
              <div className="pb-3 font-semibold text-orange-400">
                Enter Payment Details
              </div>
              <div className="flex mb-4">
                <div className="flex flex-col space-y-1 w-full p-1">
                  <label>Remitter Name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="border border-gray-300 rounded-md px-3 py-2 h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full p-1">
                  <label>Payment Mode</label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>Cash</option>
                    <option>Debit Card</option>
                    <option>Credit Card</option>
                    <option>Net Banking</option>
                    <option>UPI</option>
                  </select>
                </div>
              </div>

              <div className="flex mb-4">
                <div className="flex flex-col space-y-1 w-full p-1">
                  <label>Quick Pay</label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1 w-full p-1">
                  <label>Split Pay</label>
                  <select className="border border-gray-300 rounded-md px-3 py-2 h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      renderFooter={(close) => (
        <>
          <button
            onClick={handlePay}
            className="px-4 py-2 rounded text-white bg-green-700"
          >
            Pay
          </button>
          <button
            onClick={close}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </>
      )}
    />
  );
};

export default DetailConfirmation;