import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { SchemeContext } from "../../contexts/SchemeContext";
import { usePost } from "../../hooks/usePost";
import { useGet } from "../../hooks/useGet";
import { useServicesContext } from "../../contexts/ServicesAuthContext";

const UpdateSchemeForm = ({ value, refresh }) => {
  const { setIsModelOpen } = useContext(SchemeContext);
  const {forWhat}=useServicesContext()
  const { data: merchantData } = useGet("/get-merchants ");
  const { data: billerData } = useGet("/get-biller-name-and-category");
  // const {data:}
  // Update API
  const { execute } = usePost("/update-scheme");
  const { data: categoryData } = useGet(`/get-billers${forWhat}/${value.name}`);
  // Local form states
  const [merchantValue, setMerchantValue] = useState([]);
  const [billerValue, setBillerValue] = useState([]);
  const [commissionType, setCommissionType] = useState(value.type);
  const [chargeValue, setChargeValue] = useState(value.commission_value);
  const [chargeGSTValue, setChargeGSTValue] = useState(value.gst_value);
  const [status, setStatus] = useState(value.status);
  // const [billerByCatagore]
  const [billerOptionData, setBillerOptionData] = useState([]);
  // Pre-select merchant & biller values
  useEffect(() => {
    if (merchantData?.data && value?.merchant_id) {
      let ids = Array.isArray(value.merchant_id)
        ? value.merchant_id
        : JSON.parse(value.merchant_id);

      const selected = merchantData.data
        .filter((m) => ids.includes(m.id))
        .map((m) => ({ value: m.id, label: m.name }));

      setMerchantValue(selected);
    }
  }, [merchantData, value]);

  useEffect(() => {
    setBillerOptionData(categoryData);
  }, [categoryData]);

  useEffect(() => {
    if (billerData?.data && value?.blr_id) {
      let ids = Array.isArray(value.blr_id)
        ? value.blr_id
        : JSON.parse(value.blr_id);

      const selected = billerData.data
        .filter((b) => ids.includes(b.blr_id))
        .map((b) => ({ value: b.blr_id, label: b.blr_name }));

      setBillerValue(selected);
    }
  }, [billerData, value]);

  // Prepare dropdown options
  const merchantOptions =
    merchantData?.data?.map((m) => ({ value: m.id, label: m.name })) || [];

  const billerOptions =
    billerOptionData?.map((b) => ({
      value: b.blr_id,
      label: b.blr_name,
    })) || [];
  console.log(" billerOptions ", billerOptions);

  // Close modal
  const closeModal = () => setIsModelOpen(false);

  // Submit update
  const handleSubmit = async () => {
    const body = {
      id: value.id,
      name: value.name,
      type: commissionType,
      commission_type: "wallet",
      commission_value: chargeValue,
      gst_value: chargeGSTValue,
      merchant_id: merchantValue.map((m) => m.value),
      blr_id: billerValue.map((b) => b.value),
      status,
    };

    const response = await execute(body);
    if (response) {
      refresh();
      closeModal();
    }
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-6xl w-full relative h-[80vh] flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Update Scheme</h2>

        <button
          onClick={closeModal}
          className="text-gray-700 hover:text-black text-3xl font-bold leading-none"
        >
          &times;
        </button>
      </div>

      {/* READONLY INPUT */}
      <input
        type="text"
        value={value.name}
        readOnly
        className="w-full border rounded px-3 py-2 mb-4 bg-gray-100 text-gray-700 cursor-not-allowed hover:bg-gray-200 transition"
      />

      {/* SCROLLABLE AREA */}
      <div className="flex-1 overflow-y-auto pr-2">

        {/* Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Merchant */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <label className="font-semibold block mb-2">Merchant</label>
            <Select
              isMulti
              options={merchantOptions}
              value={merchantValue}
              onChange={setMerchantValue}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 })
              }}
            />
          </div>

          {/* Biller */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <label className="font-semibold block mb-2">Biller</label>
            <Select
              isMulti
              options={billerOptions}
              value={billerValue}
              onChange={setBillerValue}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 })
              }}
            />
          </div>

          {/* Commission Type */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <label className="font-semibold block mb-2">Type</label>
            <select
              className="border w-full px-3 py-2 rounded"
              value={commissionType}
              onChange={(e) => setCommissionType(e.target.value)}
            >
              <option value="flat">Flat</option>
              <option value="percent">Percent</option>
            </select>
          </div>

          {/* Amount */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <label className="font-semibold block mb-2">Amount</label>
            <input
              type="text"
              value={chargeValue}
              onChange={(e) => setChargeValue(e.target.value)}
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          {/* GST */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <label className="font-semibold block mb-2">GST</label>
            <input
              type="text"
              value={chargeGSTValue}
              onChange={(e) => setChargeGSTValue(e.target.value)}
              className="border px-3 py-2 w-full rounded"
            />
          </div>

          {/* Status */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm flex items-center gap-3">
            <label className="font-semibold">Status</label>
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="w-5 h-5"
            />
          </div>

        </div>

        {/* Update Button */}
        <button
          onClick={handleSubmit}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-fit"
        >
          Update
        </button>

      </div>
    </div>
  </div>
);

};

export default UpdateSchemeForm;
