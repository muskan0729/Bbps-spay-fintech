import React, { useState, useEffect, useCallback } from "react";
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
  const [resError, setResError] = useState();
  const { error, execute: fetchResponse } = usePost(
    "/bbps/bill-process/json"
  );

  /* -------------------------------------------------------
     LOAD selectedBiller PARAMS
  ------------------------------------------------------- */
  useEffect(() => {

    setResError(error);  // sync UI error
    console.log("line 35", error?.result?.message);

  }, [resError]);


  // const checkError=useCallback(async()=>{
  //   await setResError(error);
  // },[error]);

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
    };
    // 2️⃣ Build mandatoryData based on biller param rules
    const mandatoryData = {
      customerMobile: custMob,
      customerEmail: custEmail,
      customerAdhaar: custAdd,
      customerPan: custPan,
    };

    // 3️⃣ Build API request body
    // console.log("Line 88", typeof billerFetchRequiremet);
    const currentBillerFetchRequiremet = billerFetchRequiremet;
    // console.log(currentBillerFetchRequiremet);

    // if()
    const requestBody = {
      data: {
        billerId: selectedBiller?.billerId,
        ...extendedFormValues,
        ...(currentBillerFetchRequiremet ? mandatoryData : {}),
      },
    };

    // console.log("FINAL REQUEST BODY →", requestBody);
    // console.log("Mandetory Data",mandatoryData);

    // 4️⃣ API CALL

    // callAPI()

    // setResError(null);
    const response = await fetchResponse(requestBody.data);

    // const response = await fetchResponse(requestBody.data);
    // checkError();
    const res = response?.result;

    // Check if it's an error shape
    if (res?.status === false && res?.message) {
      console.log("API Error:", res.message);
      setResError(res.message);
      return; // prevent closing modal
    }

    // Otherwise, success shape
    const decrypted = res?.decryptedResponse;
    if (!decrypted || decrypted.responseCode !== "000") {
      console.log("API Error:", decrypted?.responseReason || "Unknown error");
      setResError(decrypted?.responseReason || "Unknown error");
      return;
    }

    // Success → proceed

    console.log("out");
    console.log(response?.result);

    close();

    // 5️⃣ Send next modal data
    setTimeout(() => {
      // console.log("billerFetchRequiremet: " ,billerFetchRequiremet);
      openModal("finalData", {
        data: response?.result?.decryptedResponse,
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
          required
        />
      </div>

      <div className="flex flex-col mb-3">
        <label className="font-semibold mb-1">Customer Mobile</label>
        <input
          type="text"
          className="border p-2 rounded"
          value={custMob}
          onChange={(e) => setCustMob(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col mb-3">
        <label className="font-semibold mb-1">Customer PAN</label>
        <input
          type="text"
          className="border p-2 rounded"
          value={custPan}
          onChange={(e) => setCustPan(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col mb-3">
        <label className="font-semibold mb-1">Customer Email</label>
        <input
          type="email"
          className="border p-2 rounded"
          value={custEmail}
          onChange={(e) => setCustEmail(e.target.value)}
          required
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
              <div className="text-red-500">
                {resError && resError?.result?.message}
              </div>
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
