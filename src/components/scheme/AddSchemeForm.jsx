// components/scheme/AddSchemeForm.jsx
import React, { useContext, useEffect, useState } from "react";
import { SchemeContext } from "../../contexts/SchemeContext";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";
import Select from "react-select";

const AddSchemeForm = () => {
  const { setIsModelOpen } = useContext(SchemeContext);

  const { data: merchentData } = useGet("/get-merchants");
  const { data: billerData } = useGet("/get-biller-name-and-category");
  const { execute } = usePost("/create-scheme");

  const [schemeName, setSchemeName] = useState("");
  const [merchentValue, setMerchentValue] = useState([]);
  const [billerValue, setBillerValue] = useState([]);
  const [commissionType, setCommissionType] = useState("");
  const [chargeValue, setChargeValue] = useState("");
  const [chargeGSTValue, setChargeGSTValue] = useState("");
  const [GSTType, setGSTType] = useState("");
  const [isError, setIsError] = useState("");

  const merchentOptions =
    merchentData?.data?.map((m) => ({ value: m.id, label: m.name })) || [];

  const billerOptions =
    billerData?.data?.map((b) => ({ value: b.blr_id, label: b.blr_name })) ||
    [];

  const closeModal = () => setIsModelOpen(false);

  const handleSubmit = async () => {
    const body = {
      name: schemeName,
      commission_type: "wallet",
      type: commissionType,
      commission_value: chargeValue,
      status: false,
      //   gst_type: GSTType,
      gst_type: "parcent",
      gst_value: chargeGSTValue,
      merchent_id: merchentValue.map((m) => m.value),
      blr_id: billerValue.map((b) => b.value),
    };

    const response = await execute(body);

    if (response?.status === "false") {
      setIsError(response.error);
      return;
    }

    closeModal();
  };

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
          <h4 className="text-md font-semibold mb-1">Scheme Name</h4>
          <input
            type="text"
            placeholder="Enter Scheme Name"
            className="w-full border rounded-md px-3 py-2 text-sm"
            onChange={(e) => setSchemeName(e.target.value)}
          />
        </div>

        <span>{isError}</span>

        {/* Commission Table */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Commission Fee</h3>

        <div className="overflow-x-auto">
          <table className="w-full rounded-md text-sm">
            <thead>
              <tr className="bg-blue-300 text-left">
                <th className="p-2">Operator</th>
                <th className="p-2">Merchant</th>
                <th className="p-2">Biller</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount / %</th>
                <th className="p-2">GST Value</th>
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
                    placeholder="Select Billers"
                  />
                </td>

                <td className="p-2">
                  <select
                    className="w-full rounded px-2 py-1"
                    onChange={(e) => setCommissionType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="flat">Flat</option>
                    <option value="percent">Percent</option>
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
                <td className="p-2" hidden>
                  <select
                    className="w-full rounded px-2 py-1"
                    onChange={(e) => setGSTType(e.target.value)}
                  >
                    {/* <option value="">Select</option> */}
                    {/* <option value="flat">Flat</option> */}
                    <option value="percent">Percent</option>
                  </select>
                </td>
                <td className="p-2">
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

export default AddSchemeForm;
