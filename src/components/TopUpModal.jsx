import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { usePost } from "../hooks/usePost";

export const TopUpModalWrapper = ({
  isOpen,
  headerRender,
  middleRender,
  footerRender,
  onClose,
  resetOnClose,
}) => {
  const modalRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

  // Internal close handler with animation
  const handleClose = () => {
    if (resetOnClose) resetOnClose();
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      if (onClose) onClose(); // notify parent after animation
    }, 250); // match CSS animation duration
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-black/40 flex items-center justify-center p-4
                ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-2xl w-full max-w-2xl transform
                    ${isClosing ? "animate-fly-out" : "animate-fly-in"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-4 bg-linear-to-r from-blue-900 to-cyan-500 text-white rounded-t-lg">
          {headerRender}
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-white/20"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Middle content */}
        <div className="p-6">{middleRender}</div>

        {/* Footer */}
        <div className="py-3 px-4 border-t-2 border-gray-100 flex justify-end gap-2">
          {footerRender && footerRender(handleClose)}{" "}
          {/* pass handleClose to footer */}
        </div>
      </div>
    </div>
  );
};

// ==================== TopUpModal Component ====================
export const TopUpModal = ({ data, isOpen, onClose }) => {
  const dataForModal = data || {};
  const { execute: topUp } = usePost("/add-money-to-merchant-wallet");
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState("");
  const [productType, setProductType] = useState("load_wallet");
  const handleResetModalContent = () => {
    // reset form fields if needed
  };

  const handleSubmitModal = async(closeModal) => {
    const body = {
      product_type: productType,
      merchant_id: dataForModal.merchantId,
      amount,
      remark,
    };
const response=await topUp(body);;
    console.log("Data submitted from modal:", body);
    if (response){
        console.log(response);   
        closeModal();
    } 
  };

  return (
    <TopUpModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      resetOnClose={handleResetModalContent}
      headerRender={
        <div className="text-lg font-semibold">Top Up Fund Transfer</div>
      }
      middleRender={
        <>
          <div className="flex mb-4 gap-4">
            <div className="flex flex-col space-y-1 w-full">
              <label>Fund Action</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value="load_wallet">Load Wallet Payout</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1 w-full">
              <label>Amount</label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder="Enter Amount"
                className="border border-gray-300 rounded-md px-3 py-2 h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <div className="flex flex-col space-y-1">
              <label>Remark</label>
              <textarea
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Enter Remark"
                className="border border-gray-300 rounded-md px-3 py-2 h-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </>
      }
      footerRender={(handleClose) => (
        <>
          <button
            onClick={() => handleSubmitModal(handleClose)}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Submit
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Close
          </button>
        </>
      )}
    />
  );
};
