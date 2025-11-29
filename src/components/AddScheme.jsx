// components/AddScheme.jsx
import React, { useContext, useEffect, useState } from "react";
import { SchemeContext } from "../contexts/SchemeContext";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
// import Select from "react-select"
import Select from "react-select";
const AddScheme = () => {
  const { setIsModelOpen } = useContext(SchemeContext);
  const { data: merchentData, loading: merchentLoading } =
    useGet("/get-merchants");
  const { data: billerData, loading: billerLoading } = useGet(
    "/get-biller-name-and-category"
  );

  const [schemeName, setSchemeName] = useState("");
  const [merchentValue, setMerchentValue] = useState([]);
  const [billerValue, setBillerValue] = useState([]);
  const [commissionType, setCommissionType] = useState([]);
  const [chargeValue, setChargeValue] = useState([]);
  const [chargeGSTValue,setChargeGSTValue]=useState([]);
  const [GSTType,setGSTType]=useState([])
  const [billerInput, setBillerInput] = useState([]);
  const [merchentInput, setMerchentInput] = useState([]);
  useEffect(() => {
    setBillerInput(billerData?.data || []);
  }, [billerData, billerLoading]);

  useEffect(() => {
    console.log(merchentData?.data || []);
    setMerchentInput(merchentData?.data || []);
  }, [merchentData, merchentLoading]);
  const closeModal = () => setIsModelOpen(false);

  const handleSubmit = () => {
    const data = {
      schemeName,
      merchentValue,
      billerValue,
      commissionType,
      chargeValue,
      chargeGSTValue,
      GSTType
    };

    console.log("Scheme Added:", data);
    closeModal();
  };
  const selectedMerchentIds = merchentValue.map((m) => m.value);
  const selectedBillerIds = billerValue.map((b) => b.value);

  const merchentOptions = merchentInput?.map((m) => ({
    value: m.id,
    label: m.name,
  }));

  const billerOptions = billerInput?.map((b) => ({
    value: b.blr_id,
    label: b.blr_name,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Add Scheme</h2>

        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Scheme Name */}
        <div className="mb-4">
          <h4 className="block text-md font-semibold mb-1">Scheme Name</h4>
          <input
            type="text"
            placeholder="Enter Scheme Name"
            className="w-full border rounded-md px-3 py-2 text-sm"
            onChange={(e) => setSchemeName(e.target.value)}
          />
        </div>
        <h3 className="text-lg font-semibold mt-4 mb-2">Commission Fee</h3>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full rounded-md text-sm">
            <thead>
              <tr className="bg-blue-300 text-left">
                <th className="p-2">Operator</th>
                <th className="p-2">Merchent</th>
                <th className="p-2">Biller</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount / %</th>
                <th className="p-2">GST Type</th>
                <th className="p-2">Value</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-2">Payin Commission Slab</td>

                <td className="p-2">
                  <Select
                    options={merchentOptions}
                    isMulti
                    value={merchentValue}
                    onChange={setMerchentValue}
                    placeholder="Select Merchants"
                  />
                </td>

                <td className="p-2">
                  <Select
                    options={billerOptions}
                    isMulti
                    value={billerValue}
                    onChange={setBillerValue}
                    placeholder="Select Merchants"
                  />
                </td>

                <td className="p-2">
                  <select
                    className="w-full rounded px-2 py-1"
                    onChange={(e) => setCommissionType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Flat">Flat</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </td>

                <td className="p-2">
                  <input
                    type="text"
                    placeholder="Enter value"
                    className="w-full rounded px-2 py-1"
                    onChange={(e) => setChargeValue(e.target.value)}
                  />
                </td>

                <td>
                  <select
                    className="w-full rounded px-2 py-1"
                    onChange={(e) => setGSTType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Flat">Flat</option>
                    <option value="Percentage">Percentage</option>
                  </select>
                </td>

                <td>
                  <input
                    type="text"
                    placeholder="Enter value"
                    className="w-full rounded px-2 py-1"
                    onChange={(e) => setChargeGSTValue(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Submit */}
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddScheme;
