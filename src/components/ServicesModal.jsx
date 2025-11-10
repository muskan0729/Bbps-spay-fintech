import { useState, useEffect } from "react";
import { ModalWrapper } from "./ServicesModalWrapper";
import { useModal } from "../contexts/ServicesModalContext";
import placeholderImg from "../images/placeholder.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const BillerSelectionModal = () => {
  const { isModalOpen, getModalData, openModal, closeModal } = useModal();
  const [selectedBiller, setSelectedBiller] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOpen = isModalOpen("biller");

  const { service } = getModalData("biller") || {};
  useEffect(() => {
    const timer = setTimeout(() => {
      setServiceList(["Tata Play", "Airtel DTH", "Videocon d2h", "DishTV"]);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Reset form state
  const resetForm = () => {
    setSelectedBiller("");
    setLoading(true);
  };

  const handleNext = (close) => {
    if (!selectedBiller) return alert("Select a biller!");
    close(); // fly-out animation
    setTimeout(() => openModal("details", { selectedBiller }), 260);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={() => closeModal("biller")}
      resetOnClose={resetForm}
      renderHeader={({ close }) => (
        <div className="flex justify-between items-center p-4 bg-linear-to-r from-blue-900 to-cyan-500 text-white rounded-t-lg">
          {/* Image on the left */}
          <img src={placeholderImg} alt="Logo" className="h-7" />
          <span className="font-semibold ml-2">
            Select {service["label"]} Biller
          </span>
          {/* Close button */}
          <button
            onClick={close}
            className="p-1 rounded-full hover:bg-white/20"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
      renderFooter={({ close }) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={close}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => handleNext(close)}
            disabled={loading || !selectedBiller}
            className={`px-4 py-2 rounded text-white ${
              !selectedBiller
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    >
      {({ close }) => (
        <select
          value={selectedBiller}
          onChange={(e) => setSelectedBiller(e.target.value)}
          disabled={loading}
          className="w-full p-3 border rounded mb-4"
        >
          <option value="">{loading ? "Loading..." : "Select Biller"}</option>
          {serviceList.map((biller) => (
            <option key={biller} value={biller}>
              {biller}
            </option>
          ))}
        </select>
      )}
    </ModalWrapper>
  );
};

export const DetailsModalComponent = () => {
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
    close(); // triggers fly-out
    setTimeout(() => openModal("txnConfirm", { data }), 260);
  };

  return (
    <ModalWrapper
      title={`Details for ${selectedBiller}`}
      isOpen={isOpen}
      onClose={() => closeModal("details")}
      resetOnClose={resetForm}
      renderHeader={({ close }) => (
        <div className="flex justify-between items-center p-4 bg-linear-to-r from-blue-900 to-cyan-500 text-white rounded-t-lg">
          {/* Image on the left */}
          <img src={placeholderImg} alt="Logo" className="h-7" />
          <span className="font-semibold ml-2">
            Details for {selectedBiller}
          </span>
          {/* Close button */}
          <button
            onClick={close}
            className="p-1 rounded-full hover:bg-white/20"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
      renderFooter={({ close }) => (
        <div className="flex justify-end gap-2">
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
            onClick={close} // triggers reset + fly-out
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
    >
      {({ close }) => (
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
      )}
    </ModalWrapper>
  );
};

export const TxnConfirmModal = () => {
  const { isModalOpen, getModalData, closeModal } = useModal();
  const { data } = getModalData("txnConfirm") || {};
  const isOpen = isModalOpen("txnConfirm");

  const resetForm = () => {
  };
  return (
    <ModalWrapper
      title={`Details for txnConfirm`}
      isOpen={isOpen}
      onClose={() => closeModal("txnConfirm")}
      resetOnClose={resetForm}
      renderHeader={({ close }) => (
        <div className="flex justify-between items-center p-4 bg-linear-to-r from-blue-900 to-cyan-500 text-white rounded-t-lg">
          {/* Image on the left */}
          <img src={placeholderImg} alt="Logo" className="h-7" />
          <span className="font-semibold ml-2">
            Details for txnConfirm
          </span>
          {/* Close button */}
          <button
            onClick={close}
            className="p-1 rounded-full hover:bg-white/20"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      )}
      renderFooter={({ close }) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={close}
            disabled={true}
            className={`px-4 py-2 rounded text-white ${
              true
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
        </div>
      )}
    >
      {({ close }) => (
        <>
          <div className="pb-3">
            {[data['selectedBiller'],data['account'],data['mobile']]}
			</div>
          
        </> 
      )}
    </ModalWrapper>
  );
};
