// components/scheme/UpdateSchemeForm.jsx
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { SchemeContext } from "../../contexts/SchemeContext";
import { usePost } from "../../hooks/usePost";
import { useGet } from "../../hooks/useGet";

const UpdateSchemeForm = ({ value }) => {
  const { setIsModelOpen } = useContext(SchemeContext);
  const { data: merchentData } = useGet("/get-merchants ");
  const { data: billerData } = useGet("/get-biller-name-and-category");
  const { data: findBiller, refetch: featchBiller } = useGet(`/show-merchant`);
  const { execute } = usePost("/update-scheme");

  const [merchentValue, setMerchentValue] = useState(value.merchant_id || []);
  const [billerValue, setBillerValue] = useState(value.blr_id || []);
  const [commissionType, setCommissionType] = useState(value.type);
  const [chargeValue, setChargeValue] = useState(value.commission_value);
  const [chargeGSTValue, setChargeGSTValue] = useState(value.gst_value);
  const [status, setStatus] = useState(value.status);
  const [getedBillerData, setGetedBillerData] = useState([]);
  const [getedMerchentData,setGetedMerchentData]=useState([]);

  useEffect(() => {
    const fetchBillers = async () => {
      if (!value?.merchant_id) return;

      let ids = value.merchant_id;

      // case: string
      if (typeof ids === "string") {
        ids = ids.split(",");
      }

      // case: array of objects from react-select
      if (Array.isArray(ids) && typeof ids[0] === "object") {
        ids = ids.map((i) => i.value);
      }

      if (!Array.isArray(ids)) return;

      const data = await Promise.all(ids.map((id) => featchBiller(id)));
      setGetedMerchentData(data);
    };

    fetchBillers();
  }, [value]);

  const merchentOptions =
    merchentData?.data?.map((m) => ({ value: m.id, label: m.name })) || [];

  const billerOptions =
    billerData?.data?.map((b) => ({ value: b.blr_id, label: b.blr_name })) ||
    [];

  const closeModal = () => setIsModelOpen(false);

  const handleSubmit = async () => {
    const body = {
      id: value.id,
      name: value.name,
      type: commissionType,
      commission_value: chargeValue,
      gst_value: chargeGSTValue,
      merchant_id: merchentValue.map((m) => m.value),
      blr_id: billerValue.map((b) => b.value),
      status,
    };

    await execute(body);
    closeModal();
  };
console.log(getedMerchentData);

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

        {/* Name */}
        <input
          type="text"
          value={value.name}
          className="w-full border rounded px-3 py-2 mb-4"
          readOnly
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
                  options={merchentOptions}
                  value={merchentValue}
                  onChange={setMerchentValue}
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
