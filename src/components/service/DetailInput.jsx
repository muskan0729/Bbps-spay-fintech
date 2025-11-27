import React, { useState, useEffect } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
import { usePost } from "../../hooks/usePost";

const DetailInput = () => {
  const { isModalOpen, getModalData, openModal, closeModal } = useModal();

  // Modal data
  const { selectedBiller } = getModalData("details") || {};
  const isOpen = isModalOpen("details");

  // Dynamic params from biller API
  const [params, setParams] = useState([]);
  const [formValues, setFormValues] = useState({});

  // Mandatory extra fields
  const [custMob, setCustMob] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custAdd, setCustAdd] = useState("");
  const [custPan, setCustPan] = useState("");

  const [billerFetchRequiremet, setBillerFetchRequiremet] = useState(false);

  const { execute: fetchResponse } = usePost("/bbps/bill-process-test/json");

  /* -------------------------------------------------------
     LOAD selectedBiller PARAMS
  ------------------------------------------------------- */
  useEffect(() => {
    if (!selectedBiller) return;

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

  /* -------------------------------------------------------
     TRACK INPUT CHANGES
  ------------------------------------------------------- */
  const handleChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* -------------------------------------------------------
     SUBMIT REQUEST
  ------------------------------------------------------- */
  const handleSubmit = async (close) => {
    // 1️⃣ Merge mandatory UI fields into formValues dynamically
    const extendedFormValues = {
      ...formValues,
      customerMobile: custMob,
      customerEmail: custEmail,
      customerAdhaar: custAdd,
      customerPan: custPan,
    };

    // console.log("EXTENDED FORM VALUES →", extendedFormValues);

    // 2️⃣ Build mandatoryData based on biller param rules
    const mandatoryData = {
      customerMobile: custMob,
      customerEmail: custEmail,
      customerAdhaar: custAdd,
      customerPan: custPan
    };

    // params.forEach((param) => {
    //   if (param.isOptional === "false" && extendedFormValues[param.paramName]) {
    //     mandatoryData[param.paramName] = extendedFormValues[param.paramName];
    //   }
    // });

    // console.log("COLLECTED mandatoryData →", mandatoryData);

    // 3️⃣ Build API request body
    const requestBody = {
      data: {
        billerId: selectedBiller?.billerId,
        ...extendedFormValues,
        ...(billerFetchRequiremet ? mandatoryData : {}),
      },
    };

    console.log("FINAL REQUEST BODY →", requestBody);
    // console.log("Mandetory Data",mandatoryData);
    
    // 4️⃣ API CALL
    const response = await fetchResponse(requestBody.data);

    close();

    // 5️⃣ Send next modal data
    setTimeout(() => {
      console.log("billerFetchRequiremet: " ,billerFetchRequiremet);
      
      openModal("finalData", {
        data: response.result.decryptedResponse,
        custData: billerFetchRequiremet ? mandatoryData : {},
        selectedBiller,
      });
    }, 260);
  };

  /* -------------------------------------------------------
     INPUT MAPPER (DYNAMIC PARAMS)
  ------------------------------------------------------- */
  const inputMapper = () =>
    params.map((item, index) => {
      const hasDropdown = item.values && item.values.trim() !== "";

      const optionList = hasDropdown
        ? item.values.split(",").map((v) => v.trim())
        : [];

      return (
        <div key={index} className="mb-3 flex flex-col">
          <label className="font-semibold mb-1">{item.paramName}</label>

          {hasDropdown ? (
            <select
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

  /* -------------------------------------------------------
     MANDATORY FIELDS UI
  ------------------------------------------------------- */
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

  /* -------------------------------------------------------
     COMPONENT RETURN
  ------------------------------------------------------- */
  return (
    <ServicesModalWrapper
      isOpen={isOpen}
      onClose={() => closeModal("details")}
      renderHeader={
        <>
          <img src={placeholderImg} alt="Logo" className="h-7" />
          <span className="font-semibold ml-2">
            Details for {selectedBiller?.billerName}
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
