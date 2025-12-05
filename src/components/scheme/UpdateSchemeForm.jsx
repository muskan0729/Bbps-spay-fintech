import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { SchemeContext } from "../../contexts/SchemeContext";
import { usePost } from "../../hooks/usePost";
import { useGet } from "../../hooks/useGet";

const UpdateSchemeForm = ({ value, refresh }) => {
  const { setIsModelOpen } = useContext(SchemeContext);
  const { data: merchantData } = useGet("/get-merchants ");
  const { data: billerData } = useGet("/get-biller-name-and-category");
  // const {data:}
  // Update API
  const { execute } = usePost("/update-scheme");
  const { data: categoryData } = useGet(`/get-billers-test/${value.name}`);
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
  console.log(" billerOptions ",billerOptions);

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
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full relative">
        <h2 className="text-xl font-bold mb-4">Update Scheme</h2>

        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-700 text-2xl"
        >
          &times;
        </button>

        <input
          type="text"
          value={value.name}
          readOnly
          className="w-full border rounded px-3 py-2 mb-4 bg-gray-100 text-gray-700 cursor-not-allowed hover:bg-gray-200 transition-colors"
        />

        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2">Merchant</th>
              <th className="p-2">Biller</th>
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">GST</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="p-2">
              <td className="p-2">
                <Select
                  isMulti
                  options={merchantOptions}
                  value={merchantValue}
                  onChange={setMerchantValue}
                />
              </td>

              <td className="p-2">
                <Select
                  isMulti
                  options={billerOptions}
                  value={billerValue}
                  onChange={setBillerValue}
                />
              </td>

              <td className="p-2">
                <select
                  className="border w-full px-2 py-1"
                  value={commissionType}
                  onChange={(e) => setCommissionType(e.target.value)}
                >
                  <option value="flat">Flat</option>
                  <option value="percent">Percent</option>
                </select>
              </td>

              <td className="p-2">
                <input
                  type="text"
                  value={chargeValue}
                  onChange={(e) => setChargeValue(e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </td>

              <td className="p-2">
                <input
                  type="text"
                  value={chargeGSTValue}
                  onChange={(e) => setChargeGSTValue(e.target.value)}
                  className="border px-2 py-1 w-full"
                />
              </td>

              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 py-2 rounded text-white"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateSchemeForm;
