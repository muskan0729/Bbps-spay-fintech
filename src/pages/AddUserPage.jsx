import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../hooks/usePost";

const AddUserPage = () => {
  const navigate = useNavigate();
  const { execute: executeMember, loading } = usePost("/onboard-merchant");

  const [formData, setFormData] = useState({
    // BUSINESS DETAILS
    name: "",
    mobile_no: "",
    email: "",
    business_mcc: "",
    company_type: "",
    company_pan_no: "",
    company_gst_no: "",
    cin_llpin: "",
    date_of_incorporation: "",

    // ACCOUNT DETAILS
    account_holder_name: "",
    bank_account_no: "",
    ifsc_code: "",

    // LOCATION DETAILS
    city: "",
    state: "",
    district: "",
    pin_code: "",
    address: "",

    // OTHER FIELDS
    website_url: "",
    description: "",
  });

  const [companyDocs, setCompanyDocs] = useState({
    company_pan_no_doc: null,
    company_gst_no_doc: null,
    cancel_cheque_doc: null,
  });

  const [directors, setDirectors] = useState(() => [
  {
    director_name: "",
    director_pan_no: "",
    director_aadhar_no: "",
    director_gender: "",
    director_dob: "",
    user_pan_doc: null,
    user_addhar_doc: null,
  },
]);


  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleFileChange = (key, file) =>
    setCompanyDocs((prev) => ({ ...prev, [key]: file }));

  const handleDirectorChange = (i, key, val) => {
    const copy = [...directors];
    copy[i][key] = val;
    setDirectors(copy);
  };

  const addDirector = () =>
    setDirectors((prev) => [
      ...prev,
      {
        director_name: "",
        director_pan_no: "",
        director_aadhar_no: "",
        director_gender: "",
        director_dob: "",
        user_pan_doc: null,
        user_addhar_doc: null,
      },
    ]);

  const removeDirector = (i) =>
    setDirectors((prev) => prev.filter((_, x) => x !== i));

  const input = "w-full px-3 py-2 border rounded-lg border-gray-300";
  const file = "w-full px-3 py-3 border rounded-lg bg-white border-gray-300";
  const grid3 = "grid grid-cols-1 md:grid-cols-3 gap-5";
  const box = "bg-white p-6 rounded-xl shadow border border-gray-200 mb-8";
  const label = "font-semibold text-gray-700 mb-1 block";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(formData).forEach((k) => fd.append(k, formData[k]));

    Object.keys(companyDocs).forEach((k) => {
      if (companyDocs[k]) fd.append(k, companyDocs[k]);
    });

    directors.forEach((d, i) => {
      Object.entries(d).forEach(([k, v]) => {
        if (v) fd.append(`director_info[${i}][${k}]`, v);
      });
    });

    fd.append("scheme_id", "");

    const res = await executeMember(fd);
    if (res?.success) {
  alert(res.message || "Merchant registered successfully!");
  navigate("/users");
} else {
  alert("Failed: " + (res?.message || JSON.stringify(res)));
}
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Registration Form</h1>

      <form onSubmit={handleSubmit}>
        {/* BUSINESS DETAILS */}
        <div className={box}>
          <h2 className="text-xl font-bold text-blue-700 mb-4">Business Details</h2>

          <div className={grid3}>
            {/* Name */}
            <div>
              <label className={label}>Business Name *</label>
              <input
                className={input}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            {/* Mobile */}
            <div>
              <label className={label}>Mobile *</label>
              <input
                className={input}
                value={formData.mobile_no}
                onChange={(e) => handleChange("mobile_no", e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className={label}>Business Email *</label>
              <input
                className={input}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            {/* MCC */}
            <div>
              <label className={label}>Business MCC *</label>
              <input
                className={input}
                value={formData.business_mcc}
                onChange={(e) => handleChange("business_mcc", e.target.value)}
              />
            </div>

            {/* Company Type */}
            <div>
              <label className={label}>Company Type *</label>
              <select
                className={input}
                value={formData.company_type}
                onChange={(e) => handleChange("company_type", e.target.value)}
              >
                <option value="">Select</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>

            {/* Company PAN */}
            <div>
              <label className={label}>Company PAN *</label>
              <input
                className={input}
                value={formData.company_pan_no}
                onChange={(e) => handleChange("company_pan_no", e.target.value)}
              />
            </div>

            {/* GST */}
            <div>
              <label className={label}>GST Number *</label>
              <input
                className={input}
                value={formData.company_gst_no}
                onChange={(e) => handleChange("company_gst_no", e.target.value)}
              />
            </div>

            {/* CIN */}
            <div>
              <label className={label}>CIN / LLPIN *</label>
              <input
                className={input}
                value={formData.cin_llpin}
                onChange={(e) => handleChange("cin_llpin", e.target.value)}
              />
            </div>

            {/* Date of Incorporation */}
            <div>
              <label className={label}>Date of Incorporation *</label>
              <input
                type="date"
                className={input}
                value={formData.date_of_incorporation}
                onChange={(e) =>
                  handleChange("date_of_incorporation", e.target.value)
                }
              />
            </div>
               {/* Website Url */}
            <div>
              <label className={label}>Website Url *</label>
              <input
                type="text"
                className={input}
                value={formData.website_url}
                onChange={(e) =>
                  handleChange("website_url", e.target.value)
                }
              />
            </div>
          </div>

          {/* FILE uploads */}
          <div className={`${grid3} mt-6`}>
            <div>
              <label className={label}>Company PAN Document *</label>
              <input
                type="file"
                className={file}
                onChange={(e) =>
                  handleFileChange("company_pan_no_doc", e.target.files[0])
                }
              />
            </div>

            <div>
              <label className={label}>Company GST Document *</label>
              <input
                type="file"
                className={file}
                onChange={(e) =>
                  handleFileChange("company_gst_no_doc", e.target.files[0])
                }
              />
            </div>

            <div>
              <label className={label}>Cancel Cheque *</label>
              <input
                type="file"
                className={file}
                onChange={(e) =>
                  handleFileChange("cancel_cheque_doc", e.target.files[0])
                }
              />
            </div>
          </div>
        </div>

        {/* ACCOUNT DETAILS */}
        <div className={box}>
          <h2 className="text-xl font-bold text-blue-700 mb-4">Account Details</h2>

          <div className={grid3}>
            <div>
              <label className={label}>Account Holder Name *</label>
              <input
                className={input}
                value={formData.account_holder_name}
                onChange={(e) =>
                  handleChange("account_holder_name", e.target.value)
                }
              />
            </div>

            <div>
              <label className={label}>Bank Account No *</label>
              <input
                className={input}
                value={formData.bank_account_no}
                onChange={(e) =>
                  handleChange("bank_account_no", e.target.value)
                }
              />
            </div>

            <div>
              <label className={label}>IFSC Code *</label>
              <input
                className={input}
                value={formData.ifsc_code}
                onChange={(e) => handleChange("ifsc_code", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* LOCATION DETAILS */}
        <div className={box}>
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            Location Details
          </h2>

          <div className={grid3}>
            <div>
              <label className={label}>City *</label>
              <input
                className={input}
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>State *</label>
              <input
                className={input}
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>District *</label>
              <input
                className={input}
                value={formData.district}
                onChange={(e) => handleChange("district", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Pincode *</label>
              <input
                className={input}
                value={formData.pin_code}
                onChange={(e) => handleChange("pin_code", e.target.value)}
              />
            </div>

            <div className="md:col-span-3">
              <label className={label}>Address *</label>
              <input
                className={input}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* DIRECTORS */}
      {/* DIRECTOR SECTION */}
<div className={box}>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-blue-700">Director Information</h2>
    <button
      type="button"
      onClick={addDirector}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      + Add Director
    </button>
  </div>

  {directors.map((d, i) => (
    <div key={i} className="p-5 border rounded-xl bg-gray-50 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800 text-lg">
          Director {i + 1}
        </h3>

        {/* REMOVE BUTTON — disabled if only ONE director */}
        <button
          type="button"
          onClick={() => removeDirector(i)}
          disabled={directors.length === 1}
          className={`px-4 py-1 rounded text-white ${
            directors.length === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Remove
        </button>
      </div>

      <div className={grid3}>
        {/* NAME */}
        <div>
          <label className={label}>Director Name</label>
          <input
            className={input}
            value={d.director_name}
            onChange={(e) =>
              handleDirectorChange(i, "director_name", e.target.value)
            }
          />
        </div>

        {/* PAN */}
        <div>
          <label className={label}>Director PAN</label>
          <input
            className={input}
            value={d.director_pan_no}
            onChange={(e) =>
              handleDirectorChange(i, "director_pan_no", e.target.value)
            }
          />
        </div>

        {/* AADHAAR */}
        <div>
          <label className={label}>Director Aadhaar</label>
          <input
            className={input}
            value={d.director_aadhar_no}
            onChange={(e) =>
              handleDirectorChange(i, "director_aadhar_no", e.target.value)
            }
          />
        </div>

        {/* GENDER */}
        <div>
          <label className={label}>Gender</label>
          <select
            className={input}
            value={d.director_gender}
            onChange={(e) =>
              handleDirectorChange(i, "director_gender", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* DOB */}
        <div>
          <label className={label}>Date of Birth</label>
          <input
            type="date"
            className={input}
            value={d.director_dob}
            onChange={(e) =>
              handleDirectorChange(i, "director_dob", e.target.value)
            }
          />
        </div>

        {/* PAN DOC */}
        <div>
          <label className={label}>Director PAN Document</label>
          <input
            type="file"
            className={file}
            onChange={(e) =>
              handleDirectorChange(i, "user_pan_doc", e.target.files[0])
            }
          />
        </div>

        {/* AADHAAR DOC */}
        <div>
          <label className={label}>Director Aadhaar Document</label>
          <input
            type="file"
            className={file}
            onChange={(e) =>
              handleDirectorChange(i, "user_addhar_doc", e.target.files[0])
            }
          />
        </div>
      </div>
    </div>
  ))}
</div>


        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
