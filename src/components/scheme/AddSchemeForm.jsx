// components/scheme/AddSchemeForm.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { SchemeContext } from "../../contexts/SchemeContext";
import { useGet } from "../../hooks/useGet";
import { usePost } from "../../hooks/usePost";
import Select from "react-select";
// import {}
const AddSchemeForm = ({ refresh }) => {
  const { setIsModelOpen } = useContext(SchemeContext);

  const { data: merchentData } = useGet("/get-merchants");
  // const { data: billerData } = useGet("/get-biller-name-and-category");
  const { execute } = usePost("/create-scheme");

  const [schemeName, setSchemeName] = useState("");
  const [merchentValue, setMerchentValue] = useState([]);
  const [billerValue, setBillerValue] = useState([]);
  const [commissionType, setCommissionType] = useState("");
  const [chargeValue, setChargeValue] = useState("");
  const [chargeGSTValue, setChargeGSTValue] = useState("");
  const [GSTType, setGSTType] = useState("");
  const [isError, setIsError] = useState("");
  const [category, setCategory] = useState("");
  const [billerData, setBillerData] = useState([]);

  const endpoint = useMemo(() => {
    return category ? `/get-billers-test/${category}` : null;
  }, [category]);

  const { data: serviceByCategory } = useGet(endpoint);

  useEffect(() => {
    setBillerData(serviceByCategory);
    console.log(serviceByCategory);
  }, [serviceByCategory]);

  const servicesList = [
    { label: "Agent Collection" },
    { label: "Broadband Postpaid" },
    { label: "Cable TV" },
    { label: "Clubs and Associations" },
    { label: "Credit Card" },
    { label: "Donation" },
    { label: "DTH" },
    { label: "eChallan" },
    { label: "Education Fees" },
    { label: "Electricity" },
    { label: "EV Recharge" },
    { label: "Fastag" },
    { label: "Gas" },
    { label: "Housing Society" },
    { label: "Insurance" },
    { label: "Landline Postpaid" },
    { label: "Loan Repayment" },
    { label: "LPG Gas" },
    { label: "Mobile Postpaid" },
    { label: "Mobile Prepaid" },
    { label: "Municipal Services" },
    { label: "Municipal Taxes" },
    { label: "National Pension System" },
    { label: "NCMC Recharge" },
    { label: "Prepaid Meter" },
    { label: "Recurring Deposit" },
    { label: "Rental" },
    { label: "Subscription" },
    { label: "Water" },
  ];

  const merchentOptions =
    merchentData?.data?.map((m) => ({ value: m.id, label: m.name })) || [];

  const billerOptions =
    billerData?.map((b) => ({ value: b.blr_id, label: b.blr_name })) || [];

  const closeModal = () => setIsModelOpen(false);

  const handleSubmit = async () => {
    const body = {
      name: schemeName,
      commission_type: "wallet",
      type: commissionType,
      commission_value: chargeValue,
      status: true,
      gst_type: "percent",
      gst_value: chargeGSTValue,
      merchant_id: merchentValue.map((m) => m.value),
      blr_id: billerValue.map((b) => b.value),
    };
    console.log(body);
    const response = await execute(body);

    if (response?.status === "false") {
      setIsError(response.error);
      return;
    }
    refresh();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm  p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl p-6 relative h-[85vh] flex flex-col">
  {/* Header */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">Add Scheme</h2>

    <button
      onClick={closeModal}
      className="text-gray-600 hover:text-gray-900 text-3xl font-bold"
    >
      &times;
    </button>
  </div>

  <span className="text-red-500 text-sm mb-2">{isError}</span>

  {/* Category */}
  <div className="flex flex-col gap-2 w-64 mb-4">
    <label className="text-gray-700 font-semibold">Select Category</label>
    <select
      onChange={(e) => {
        setSchemeName(e.target.value);
        setCategory(e.target.value);
      }}
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
      value={category}
    >
      <option value="">Select Category</option>
      {servicesList.map((s) => (
        <option key={s.label} value={s.label}>
          {s.label}
        </option>
      ))}
    </select>
  </div>

  {/* Commission Table */}
  <h3 className="text-lg font-semibold mb-2">Commission Fee</h3>

  {/* Scrollable area */}
  <div className="overflow-y-auto pr-2 flex-1">

    <table className="w-full rounded-md text-sm border-collapse">
      <thead>
        <tr className="bg-blue-300 text-left">
          <th className="p-2">Merchant</th>
          <th className="p-2">Biller</th>
          <th className="p-2">Type</th>
          <th className="p-2">Amount / %</th>
          <th className="p-2">GST Value</th>
        </tr>
      </thead>

      <tbody>
        <tr className="border-b">
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
              className="w-full border rounded px-2 py-1"
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
              className="w-full border rounded px-2 py-1"
              onChange={(e) => setChargeValue(e.target.value)}
            />
          </td>

          <td className="p-2">
            <input
              type="text"
              placeholder="Enter GST"
              className="w-full border rounded px-2 py-1"
              onChange={(e) => setChargeGSTValue(e.target.value)}
            />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Small Button */}
    <button
      className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-fit"
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
