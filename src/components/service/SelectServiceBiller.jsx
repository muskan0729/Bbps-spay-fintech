import React, { useState, useEffect, useMemo } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";

const SelectServiceBiller = () => {
  const { isModalOpen, getModalData, openModal, closeModal } = useModal();

  const [selectedBiller, setSelectedBiller] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOpen = isModalOpen("serviceSelecter");
  const { service } = getModalData("serviceSelecter") || {};

  // Build endpoint dynamically
  const endpoint = useMemo(() => {
    return service?.label ? `/get-billers/${service.label}` : null;
  }, [service?.label]);

  // Fetch list of billers
  const { data, loading: apiLoading } = useGet(endpoint);

  // Fetch selected biller info
  const {
    data: billerResponse,
    loading: billerLoading,
    error: billerError,
    execute: fetchBillerInfo,
  } = usePost("/bbps/biller-info/json");

  // Handle biller list loading
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

  // Watch for biller info changes
  useEffect(() => {
    if (billerResponse) {
      console.log("Updated Bill Info:", billerResponse);
    }
  }, [billerResponse]);

  // Reset modal state when closing
  const resetForm = () => {
    setSelectedBiller("");
    setLoading(true);
  };

  // Move to next modal
  const handleNext = (close) => {
    if (!selectedBiller) return alert("Select a biller!");

    close();
    setTimeout(() => {
      openModal("details", { selectedBiller, billerResponse });
    }, 260);
  };

  // When user selects biller
  const onChangeHandler = async (id) => {
    setSelectedBiller(id);
    console.log("Selected biller:", id);

   const d =await fetchBillerInfo({ blr_id: id }); // Call API
   console.log(d);
    setSelectedBiller(d)
   
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
          onChange={(e) => onChangeHandler(e.target.value)}
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
