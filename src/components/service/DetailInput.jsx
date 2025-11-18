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
  const [formValues, setFormValues] = useState({}); // store dynamic fields
  const [custMob, setCustMob] = useState("9284210056");
  const [custEmail, setCustEmail] = useState("khanamaanak1@gmail.com");
  const [custAdd, setCustAdd] = useState("548550008000");
  const [custPan, setCustPan] = useState("AAAPZ1234C");
  const [check, setCheck] = useState();
  const { data, error, execute: fetchResponse } = usePost("/bbps/bill-process/json");

  useEffect(() => {
    if (selectedBiller?.billerInputParams?.[0]?.paramsList) {
      setParams(selectedBiller.billerInputParams[0].paramsList);
    }
  }, [selectedBiller]);

  const handleChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (close) => {

    // 🔥 All values under ONE object called "data"
    const requestBody = {
      data: {
        billerId: selectedBiller.billerId,
        ...formValues, // merge all input fields here
      },
    };
    if (selectedBiller.billerFetchRequiremet === "MANDATORY") {
      requestBody.data.customerAdhaar = custAdd;
      requestBody.data.customerMobile = custMob;
      requestBody.data.customerPan = custPan;
      requestBody.data.customerEmail = custEmail;
    }
    // console.log("Sending to API:", requestBody.data);

    const response = await fetchResponse(requestBody.data);

    // console.log(response);
    setCheck(response);

    close();
    setTimeout(() => openModal("finalData", { data: response ,service:selectedBiller}), 260);
  };

  const inputMapper = () => {
    return params.map((item, index) => (
      <div key={index} className="mb-3 flex flex-col">
        <label className="font-semibold mb-1" htmlFor={item.paramName}>
          {item.paramName}
        </label>

        <input
          id={item.paramName}
          name={item.paramName}
          type="text"
          className="border p-2 rounded"
          onChange={(e) => handleChange(item.paramName, e.target.value)}
        />
      </div>
    ));
  };


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
          {selectedBiller ? <div>{inputMapper()}</div> : <p>Loading details...</p>}
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
