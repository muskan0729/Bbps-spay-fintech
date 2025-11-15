import React, { useState, useEffect, useMemo } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
import { useGet } from "../../hooks/useGet";

const SelectServiceBiller = () => {
  const { isModalOpen, getModalData, openModal, closeModal } = useModal();

  const [selectedBiller, setSelectedBiller] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOpen = isModalOpen("serviceSelecter");
  const { service } = getModalData("serviceSelecter") || {};

  // ❗ FIX 1 — useMemo ensures endpoint does not change on every re-render
  const endpoint = useMemo(() => {
    return service?.label ? `/get-billers/${service.label}` : null;
  }, [service?.label]);

  // Call API (runs automatically when endpoint changes)
  const { data, loading: apiLoading } = useGet(endpoint);

  console.log("Service:", service?.label);
  console.log("API Data:", data);

  // ❗ FIX 2 — Update dropdown only when API returns data
  useEffect(() => {
    if (apiLoading) {
      setLoading(true);
      return;
    }

    if (Array.isArray(data)) {
      setServiceList(data);
      setLoading(false);
    }
  }, [data, apiLoading]);

  const resetForm = () => {
    setSelectedBiller("");
    setLoading(true);
  };

  const handleNext = (close) => {
    if (!selectedBiller) return alert("Select a biller!");

    close(); // animation fly-out
    setTimeout(() => {
      openModal("details", { selectedBiller });
    }, 260);
  };

  return (
    <ServicesModalWrapper
      isOpen={isOpen}
      onClose={() => closeModal("serviceSelecter")}
      resetOnClose={resetForm}
      renderHeader={
        <>
          <img src={placeholderImg} alt="Logo" className="h-7" />
          <span className="font-semibold text-xl ml-2">
            Select {service?.label || "Biller"}
          </span>
        </>
      }
      renderMiddle={
        <select
          value={selectedBiller}
          onChange={(e) => setSelectedBiller(e.target.value)}
          disabled={loading}
          className="w-full p-3 border border-gray-200 rounded mb-4"
        >
          <option value="">
            {loading ? "Loading..." : "Select Biller"}
          </option>

          {serviceList.map((item) => (
            <option key={item.blr_id} value={item.blr_id}>
              {item.blr_name}
            </option>
          ))}
        </select>
      }
      renderFooter={(close) => (
        <>
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

export default SelectServiceBiller;
