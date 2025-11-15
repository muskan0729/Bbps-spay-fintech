import React, { useState, useEffect, useRef } from "react";
import {ServicesModalWrapper} from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
// images/Spaylogo.jpg
const DetailInput = () => {
  const { isModalOpen, getModalData, openModal, closeModal } = useModal();
  const { selectedBiller } = getModalData("details") || {};
  const isOpen = isModalOpen("details");

  const [account, setAccount] = useState("");
  const [mobile, setMobile] = useState("");

  const resetForm = () => {
    setAccount("");
    setMobile("");
  };

  const handleSubmit = (close) => {
    if (!account || !mobile) return alert("Fill all fields");
    const data = { selectedBiller, account, mobile };
    close(); // fly-out animation
    setTimeout(() => openModal("txnConfirm", { data }), 260);
  };

  return (
    <ServicesModalWrapper
      isOpen={isOpen}
      onClose={() => closeModal("details")}
      resetOnClose={resetForm}
      renderHeader={
        <>
          <img src={placeholderImg} alt="Logo" className="h-7" />
          <span className="font-semibold ml-2">
            Details for {selectedBiller}
          </span>
        </>
      }
      renderMiddle={
        <>
          <div className="pb-3">
            You selected biller: <strong>{selectedBiller}</strong>
          </div>
          <label>Account Number</label>
          <input
            placeholder="Account Number"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <label>Mobile Number</label>
          <input
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
        </>
      }
      renderFooter={(close) => (
        <>
          <button
            onClick={() => handleSubmit(close)}
            disabled={!account || !mobile}
            className={`px-4 py-2 rounded text-white ${
              !account || !mobile
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Submit
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
export default DetailInput;