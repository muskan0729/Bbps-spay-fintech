import React, { useState, useEffect } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
import { usePost } from "../../hooks/usePost";

const DetailInput = () => {
  const { isModalOpen, getModalData, openModal, closeModal } = useModal();
  const { selectedBiller } = getModalData("details") || {};

  const isOpen = isModalOpen("details");

  const [params, setParams] = useState([]);
  const [formValues, setFormValues] = useState({});

  // MANDATORY FIELDS (for Mandatory billerFetchRequiremet)
  const [custMob, setCustMob] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custAdd, setCustAdd] = useState("");
  const [custPan, setCustPan] = useState("");

  const [billerFetchRequiremet, setBillerFetchRequiremet] = useState(false);

  const { execute: fetchResponse } = usePost("/bbps/bill-process/json");

  // Load Biller Params
  useEffect(() => {
    if (selectedBiller?.billerInputParams?.[0]?.paramsList) {
      setParams(selectedBiller.billerInputParams[0].paramsList);
    }

    if (
      selectedBiller?.billerFetchRequiremet === "MANDATORY" ||
      selectedBiller?.billerFetchRequiremet === "OPTIONAL"
    ) {
      setBillerFetchRequiremet(true);
    }
  }, [selectedBiller]);

  // Track form values
  const handleChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle submit request
  const handleSubmit = async (close) => {
    const mandatoryData = {
      customerAdhaar: custAdd,
      customerMobile: custMob,
      customerPan: custPan,
      customerEmail: custEmail,
    };

    const requestBody = {
      data: {
        billerId: selectedBiller.billerId,
        ...formValues,
        ...(billerFetchRequiremet ? mandatoryData : {}),
      },
    };

    const response = await fetchResponse(requestBody.data);

    close();

    setTimeout(() => {
      openModal("finalData", {
        data: response,
        custData: mandatoryData,
        serviceId: selectedBiller.billerId,
      });
    }, 260);
  };

  // Input Mapper (Handles dropdown / input box)
  const inputMapper = () =>
    params.map((item, index) => {
      const hasDropdown = item.values && item.values.trim() !== "";

      const optionList = hasDropdown
        ? item.values.split(",").map((v) => v.trim())
        : [];

      return (
        <div key={index} className="mb-3 flex flex-col">
          <label className="font-semibold mb-1" htmlFor={item.paramName}>
            {item.paramName}
          </label>

          {hasDropdown ? (
            <select
              id={item.paramName}
              name={item.paramName}
              className="border p-2 rounded"
              value={formValues[item.paramName] || ""}
              onChange={(e) => handleChange(item.paramName, e.target.value)}
              required={item.isOptional === "false"}
            >
              <option value="">Select {item.paramName}</option>
              {optionList.map((opt, idx) => (
                <option key={idx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={item.paramName}
              name={item.paramName}
              type="text"
              className="border p-2 rounded"
              value={formValues[item.paramName] || ""}
              minLength={Number(item.minLength)}
              maxLength={Number(item.maxLength)}
              pattern={item.regEx || ".*"}
              required={item.isOptional === "false"}
              onChange={(e) => handleChange(item.paramName, e.target.value)}
            />
          )}
        </div>
      );
    });

  // Mandatory Inputs (if billerFetchRequiremet is true)
  const mandatoryInputs = () => (
    <div className="mt-3">
      <h3 className="font-semibold mb-2">Customer Details</h3>

      <div className="flex flex-col mb-3">
        <label className="font-semibold mb-1">Customer Aadhaar</label>
        <input
          type="text"
          className="border p-2 rounded"
          value={custAdd}
          onChange={(e) => setCustAdd(e.target.value)}
        />
      </div>

      <div className="flex flex-col mb-3">
        <label className="font-semibold mb-1">Customer Mobile</label>
        <input
          type="text"
          className="border p-2 rounded"
          value={custMob}
          onChange={(e) => setCustMob(e.target.value)}
        />
      </div>

      <div className="flex flex-col mb-3">
        <label className="font-semibold mb-1">Customer PAN</label>
        <input
          type="text"
          className="border p-2 rounded"
          value={custPan}
          onChange={(e) => setCustPan(e.target.value)}
        />
      </div>

      <div className="flex flex-col mb-3">
        <label className="font-semibold mb-1">Customer Email</label>
        <input
          type="email"
          className="border p-2 rounded"
          value={custEmail}
          onChange={(e) => setCustEmail(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <ServicesModalWrapper
      isOpen={isOpen}
      onClose={() => closeModal("details")}
      renderHeader={
        <>
          <img src={placeholderImg} alt="Logo" className="h-7" />
          <span className="font-semibold ml-2">
            Details for {selectedBiller?.billerName || ""}
          </span>
        </>
      }
      renderMiddle={
        <>
          {selectedBiller ? (
            <>
              {inputMapper()}
              {billerFetchRequiremet && mandatoryInputs()}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </>
      }
      renderFooter={(close) => (
        <>
          <button
            onClick={() => handleSubmit(close)}
            className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
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
