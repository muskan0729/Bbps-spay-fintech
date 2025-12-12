import React, { useState, useEffect, useMemo } from "react";
import { ServicesModalWrapper } from "../ServicesModalWrapper";
import { useModal } from "../../contexts/ServicesModalContext";
import placeholderImg from "../../images/Spaylogo.jpg";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";
import { useServicesContext } from "../../contexts/ServicesAuthContext";

const SelectServiceBiller = () => {
  const { forWhat } = useServicesContext();
  const { isModalOpen, getModalData, openModal, closeModal } = useModal();

  const testEnv = useMemo(() => {
    console.log("this is ", forWhat);
    return forWhat;
  }, [forWhat]);
  // console.log(testEnv);

  const [selectedBillerId, setSelectedBillerId] = useState("");
  const [selectedBillerData, setSelectedBillerData] = useState(null);
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false); // <-- NEW

  const isOpen = isModalOpen("serviceSelecter");
  const { service } = getModalData("serviceSelecter") || {};

  const endpoint = useMemo(() => {
    return service?.label ? `/get-billers${testEnv}/${service.label}` : null;
  }, [service?.label]);

  const { data, loading: apiLoading } = useGet(endpoint);

  const { data: billerResponse, execute: fetchBillerInfo } = usePost(
    `/bbps/biller-info${testEnv}/json`
  );

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
    setSelectedBillerId("");
    setSelectedBillerData(null);
    setLoading(true);
  };

  const handleNext = (close) => {
    if (!selectedBillerId) {
      alert("Select a biller!");
      return;
    }

    close();
    setTimeout(() => {
      if (
        selectedBillerData?.planMdmRequirement === "MANDATORY" ||
        selectedBillerData?.planMdmRequirement === "OPTIONAL"
      ) {
        openModal("plandisplay", { selectedBiller: selectedBillerData });
      } else {
        openModal("details", {
          selectedBiller: selectedBillerData,
          billerResponse,
        });
      }
    }, 260);
  };

  const onChangeHandler = async (id) => {
    setSelectedBillerId(id);
    setDropdownOpen(false);

    const res = await fetchBillerInfo(id);
    const result = res.data.biller;

    if (Array.isArray(result) && result[0]) {
      setSelectedBillerData(result[0]);
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
        data && data.length > 0 ? (
          <div className="relative w-full mt-3">
            {/* Selected box */}
            <div
              onClick={() => !loading && setDropdownOpen(!dropdownOpen)}
              className="border p-3 rounded bg-white w-full flex justify-between items-center cursor-pointer text-sm"
            >
              <span className="truncate w-[90%]">
                {selectedBillerId
                  ? serviceList.find((x) => x.blr_id === selectedBillerId)
                      ?.blr_name
                  : loading
                  ? "Loading..."
                  : "Select Biller"}
              </span>
              <span>▼</span>
            </div>

            {/* Dropdown list */}
            {dropdownOpen && (
              <div
                className="
                  absolute top-full left-0 mt-1 
                  w-full 
                  max-h-48 
                  overflow-y-auto 
                  bg-white border rounded shadow-lg z-50
                "
              >
                {serviceList.map((item) => (
                  <div
                    key={item.blr_id}
                    onClick={() => onChangeHandler(item.blr_id)}
                    className="
                      p-3 text-sm 
                      hover:bg-blue-100 
                      cursor-pointer 
                      break-words
                    "
                  >
                    {item.blr_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>No Biller Available</div>
        )
      }
      renderFooter={(close) => (
        <>
          <button
            onClick={() => handleNext(close)}
            disabled={loading || !selectedBillerId}
            className={`px-4 py-2 rounded text-white ${
              !selectedBillerId
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
