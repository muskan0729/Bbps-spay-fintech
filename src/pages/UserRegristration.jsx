import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    name = "",
    email = "",
    phone = "",
    option = "",
  } = location.state || {};

  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    aadhar: "",
    pan: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    accountNumber: "",
    branchName: "",
    ifsc: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = () => {
     navigate("/user-instruction", {
      state: { userData: formData },
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            User Registration Details
          </h1>
          <p className="text-sm text-gray-500">Account Type: {option}</p>
        </div>

        {/* Personal Details */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Personal Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="input"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input"
            />

            <input
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              placeholder="Aadhar Number"
              className="input"
            />

            <input
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              placeholder="PAN Number"
              className="input"
            />

            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="input col-span-1 md:col-span-2"
            />

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="input"
            />

            <input
              name="district"
              value={formData.district}
              onChange={handleChange}
              placeholder="District"
              className="input"
            />

            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="input"
            />

            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pin Code"
              className="input"
            />
          </div>
        </section>

        {/* Bank Details */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Bank Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Account Number"
              className="input"
            />

            <input
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              placeholder="IFSC Code"
              className="input"
            />

            <input
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              placeholder="Branch Name"
              className="input"
            />
          </div>
        </section>

        {/* Upload Section */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Upload Documents
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Aadhar Card
              </label>
              <input type="file" className="file-input" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                PAN Card
              </label>
              <input type="file" className="file-input" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Cancelled Cheque / Passbook
              </label>
              <input type="file" className="file-input" />
            </div>
          </div>
        </section>

        {/* Submit */}
        <button
          onClick={submitHandler}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Registration
        </button>
      </div>
    </div>
  );
};

export default UserRegistration;
