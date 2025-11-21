import React, { useState, useEffect, useMemo } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";

const SelectServiceBiller = () => {
  const { isModalOpen, getModalData, openModal, closeModal } = useModal();

  const [selectedBillerId, setSelectedBillerId] = useState(""); // <-- dropdown controlled ID
  const [selectedBillerData, setSelectedBillerData] = useState(null); // <-- API biller object
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const isOpen = isModalOpen("serviceSelecter");
  const { service } = getModalData("serviceSelecter") || {};

  // Build endpoint dynamically
  const endpoint = useMemo(() => {
    return service?.label ? `/get-billers/${service.label}` : null;
  }, [service?.label]);

  // Fetch biller list
  const { data, loading: apiLoading } = useGet(endpoint);

  // Fetch selected biller info
  const {
    data: billerResponse,
    execute: fetchBillerInfo,
  } = usePost("/bbps/biller-info/json");

  useEffect(() => {
    if (apiLoading) {
      setLoading(true);
      return;
    }

    if (Array.isArray(data)) {
      setServiceList(data);
      setLoading(false);
    }
    console.log("Select Service Biller");
  }, [data, apiLoading]);

  // Reset modal state on close
  const resetForm = () => {
    setSelectedBillerId("");
    setSelectedBillerData(null);
    setLoading(true);
  };

  // Move to next modal
  const handleNext = (close) => {
    if (!selectedBillerId) {
      alert("Select a biller!");
      return;
    }

    close();
    setTimeout(() => {

      console.log(selectedBillerData);

      if (selectedBillerData.planMdmRequirement === "MANDATORY") {
        console.log("enter");

        openModal("plandisplay", {
          data: selectedBillerData.billerId
        })
      }
      else {
        openModal("details", {
          selectedBiller: selectedBillerData,
          billerResponse,
        });
      }
    }, 260);
  };

  // When user selects a biller
  const onChangeHandler = async (id) => {
    setSelectedBillerId(id); // store selected ID for dropdown to stay selected

    const res = await fetchBillerInfo( id );
const result=res.data.biller
    if (Array.isArray(result) && result[0]) {
      // console.log("Selected biller object:", result[0]);
      // console.log(
      //   result[0].billerId,
      //   result[0].billerInputParams?.[0]?.paramsList?.[0]
      // );

      setSelectedBillerData(result[0]); // store full biller details
    }
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
          value={selectedBillerId}
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
            disabled={loading || !selectedBillerId}
            className={`px-4 py-2 rounded text-white ${!selectedBillerId
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
