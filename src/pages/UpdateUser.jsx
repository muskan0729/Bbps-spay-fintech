import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { useCookies } from "react-cookie";

const UpdateUser = () => {
  const navigate = useNavigate();
  const data = useLocation();
  const { execute: executeMember, loading } = usePost(`/update-merchant`);
  const [cookie] = useCookies();
  const baseURL = "https://bbps.spay.live/";

  const [chequeImageUrl, setChequeImageUrl] = useState(null);
  const [panImageUrl, setPanImageUrl] = useState(null);
  const [gstImageUrl, setGstImageUrl] = useState(null);
  const [directorDocUrls, setDirectorDocUrls] = useState([]);

  const processFilePath = (filePath) => {
    if (!filePath || typeof filePath !== "string") return null;

    const separator = "/public/";
    const parts = filePath.split(separator);

    if (parts.length > 1) {
      const trimmedPath = parts.pop();
      return baseURL + "storage/" + trimmedPath;
    }
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toISOString().split("T")[0];
  };

  const DocumentPreview = ({ url, label }) => {
    if (!url) {
      return (
        <p className="mt-2 text-sm text-gray-500 italic">
          No previous {label} document found.
        </p>
      );
    }

    return (
      <div className="mt-3 p-3 border rounded-lg bg-gray-50 flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Thumbnail Preview */}
        {url.endsWith(".pdf") ? (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded text-gray-700 font-semibold text-xs">
            PDF
          </div>
        ) : (
          <img
            src={url}
            alt={`${label} Preview`}
            className="w-20 h-20 object-contain border rounded"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        {/* Text + Button */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">{label} Document</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded transition"
          >
            See Document
          </a>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setChequeImageUrl(processFilePath(data.state.item.cancel_cheque_doc));
    setPanImageUrl(processFilePath(data.state.item.company_pan_no_doc));
    setGstImageUrl(processFilePath(data.state.item.company_gst_no_doc));

    const initialDirectorsData = Array.isArray(data.state.item.director_info)
      ? data.state.item.director_info
      : [];

    const processedDirectorDocs = initialDirectorsData.map((dd) => ({
      pan_doc_url: processFilePath(dd.user_pan_doc),
      addhar_doc_url: processFilePath(dd.user_addhar_doc),
    }));

    setDirectorDocUrls(processedDirectorDocs);
  }, [data, baseURL]);

  const [formData, setFormData] = useState({
    id: data.state.item.id,
    name: data.state.item.name || "",
    mobile_no: data.state.item.mobile_no || "",
    email: data.state.item.email || "",
    business_mcc: data.state.item.business_mcc || "",
    company_type: data.state.item.company_type || "",
    company_pan_no: data.state.item.company_pan_no || "",
    company_gst_no: data.state.item.company_gst_no || "",
    cin_llpin: data.state.item.cin_llpin || "",
    date_of_incorporation: formatDate(data.state.item.date_of_incorporation),

    account_holder_name: data.state.item.account_holder_name || "",
    bank_account_no: data.state.item.bank_account_no || "",
    ifsc_code: data.state.item.ifsc_code || "",

    city: data.state.item.city || "",
    state: data.state.item.state || "",
    district: data.state.item.district || "",
    pin_code: data.state.item.pin_code || "",
    address: data.state.item.address || "",
    website_url: data.state.item.website_url || "",
    description: data.state.item.description || "",
  });

  const [companyDocs, setCompanyDocs] = useState({
    company_pan_no_doc: data.state.item.company_pan_no_doc,
    company_gst_no_doc: data.state.item.company_gst_no_doc,
    cancel_cheque_doc: data.state.item.cancel_cheque_doc,
  });

  const initialDirectors = Array.isArray(data.state.item.director_info)
    ? data.state.item.director_info.map((dd) => ({
      director_name: dd.director_name || "",
      director_pan_no: dd.director_pan_no || "",
      director_aadhar_no: dd.director_aadhar_no || "",
      director_gender: dd.director_gender || "",
      director_dob: formatDate(dd.director_dob),
      user_pan_doc: dd.user_pan_doc,
      user_addhar_doc: dd.user_addhar_doc,
    }))
    : [];

  const [directors, setDirectors] = useState(initialDirectors);

  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleCompanyFileChange = (key, file) =>
    setCompanyDocs((prev) => ({ ...prev, [key]: file }));

  const handleDirectorChange = (i, key, value) => {
    const updated = [...directors];
    updated[i][key] = value;
    setDirectors(updated);
  };

  const handleDirectorFileChange = (i, key, file) => {
    const updated = [...directors];
    updated[i][key] = file;
    setDirectors(updated);
  };

  const addDirector = () => {
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

    setDirectorDocUrls((prev) => [
      ...prev,
      { pan_doc_url: null, addhar_doc_url: null },
    ]);
  };

  const removeDirector = (i) => {
    setDirectors((prev) => prev.filter((_, idx) => idx !== i));
    setDirectorDocUrls((prev) => prev.filter((_, idx) => idx !== i));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    // Append main form fields
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

    // Append company documents only if file is newly uploaded
    Object.entries(companyDocs).forEach(([key, file]) => {
      if (file instanceof File) {
        fd.append(key, file);
      }
    });

    // Append directors & their document data
    directors.forEach((d, i) => {
      Object.entries(d).forEach(([k, v]) => {
        if (!v) return;

        // If value is a file or an existing string path
        if (k === "user_pan_doc" || k === "user_addhar_doc") {
          if (v instanceof File || (typeof v === "string" && v.length > 0)) {
            fd.append(`director_info[${i}][${k}]`, v);
          }
        } else {
          fd.append(`director_info[${i}][${k}]`, v);
        }
      });
    });

    // Debug all form entries
    for (let pair of fd.entries()) {
      console.log(pair[0], ":", pair[1]);
    }

    try {
      const res = await executeMember(fd);
      if (res) {
        alert("Merchant updated successfully!");
        navigate("/users");
      } else {
        alert("Update failed: " + (res?.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      // alert("Something went wrong");
    }
  };

  const input = "w-full px-3 py-2 border rounded-lg border-gray-300";
  const file = "w-full px-3 py-3 border rounded-lg bg-white border-gray-300";
  const grid3 = "grid grid-cols-1 md:grid-cols-3 gap-5";
  const box = "bg-white p-6 rounded-xl shadow border border-gray-200 mb-8";
  const label = "font-semibold text-gray-700 mb-1 block";
  const onCancel = () => {
    navigate("/users");
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Update Merchant</h1>

      <form onSubmit={handleSubmit}>
        {/* =============================== */}
        {/* BUSINESS DETAILS SECTION        */}
        {/* =============================== */}
        <div className={box}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-blue-700">
              🏢 Business Details
            </h2>

            <button
              type="button"
              onClick={onCancel}
              className="
      bg-gray-600 
      hover:bg-gray-700 
      text-white 
      px-4 py-2 
      rounded-lg 
      shadow 
      transition-all 
      duration-200
    "
            >
              Cancel
            </button>
          </div>

          {/* BUSINESS INPUTS */}
          <div className={grid3}>
            <div>
              <label className={label}>Business Name</label>
              <input
                className={input}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Mobile</label>
              <input
                className={input}
                value={formData.mobile_no}
                onChange={(e) => handleChange("mobile_no", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Email</label>
              <input
                className={input}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>MCC</label>
              <input
                className={input}
                value={formData.business_mcc}
                onChange={(e) => handleChange("business_mcc", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Company Type</label>
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

            <div>
              <label className={label}>Company PAN</label>
              <input
                className={input}
                value={formData.company_pan_no}
                onChange={(e) => handleChange("company_pan_no", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>GST No</label>
              <input
                className={input}
                value={formData.company_gst_no}
                onChange={(e) => handleChange("company_gst_no", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>CIN / LLPIN</label>
              <input
                className={input}
                value={formData.cin_llpin}
                onChange={(e) => handleChange("cin_llpin", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Date of Incorporation</label>
              <input
                type="date"
                className={input}
                value={formData.date_of_incorporation}
                onChange={(e) =>
                  handleChange("date_of_incorporation", e.target.value)
                }
              />
            </div>

            <div>
              <label className={label}>Website URL</label>
              <input
                className={input}
                value={formData.website_url}
                onChange={(e) => handleChange("website_url", e.target.value)}
              />
            </div>
          </div>
          {/* =============================== */}
          {/* COMPANY DOCUMENTS SECTION       */}
          {/* =============================== */}
          <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
            Company Documents
          </h3>

          <div className={`${grid3} mt-6`}>
            {/* Company PAN Document */}
            <div>
              <label className={label}>Company PAN Document</label>
              <input
                type="file"
                className={file}
                onChange={(e) =>
                  handleCompanyFileChange(
                    "company_pan_no_doc",
                    e.target.files[0]
                  )
                }
              />
              <DocumentPreview url={panImageUrl} label="Company PAN" />
            </div>

            {/* GST Document */}
            <div>
              <label className={label}>GST Document</label>
              <input
                type="file"
                className={file}
                onChange={(e) =>
                  handleCompanyFileChange(
                    "company_gst_no_doc",
                    e.target.files[0]
                  )
                }
              />
              <DocumentPreview url={gstImageUrl} label="GST" />
            </div>

            {/* Cancel Cheque */}
            <div>
              <label className={label}>Cancel Cheque</label>
              <input
                type="file"
                className={file}
                onChange={(e) =>
                  handleCompanyFileChange(
                    "cancel_cheque_doc",
                    e.target.files[0]
                  )
                }
              />
              <DocumentPreview url={chequeImageUrl} label="Cancel Cheque" />
            </div>
          </div>
        </div>

        {/* =============================== */}
        {/* BANK ACCOUNT DETAILS            */}
        {/* =============================== */}
        <div className={box}>
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            💰 Bank Account Details
          </h2>
          <div className={grid3}>
            <div>
              <label className={label}>Account Holder Name</label>
              <input
                className={input}
                value={formData.account_holder_name}
                onChange={(e) =>
                  handleChange("account_holder_name", e.target.value)
                }
              />
            </div>

            <div>
              <label className={label}>Bank Account No</label>
              <input
                className={input}
                value={formData.bank_account_no}
                onChange={(e) =>
                  handleChange("bank_account_no", e.target.value)
                }
              />
            </div>

            <div>
              <label className={label}>IFSC Code</label>
              <input
                className={input}
                value={formData.ifsc_code}
                onChange={(e) => handleChange("ifsc_code", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* =============================== */}
        {/* ADDRESS DETAILS                 */}
        {/* =============================== */}
        <div className={box}>
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            📍 Address Details
          </h2>
          <div className={grid3}>
            <div>
              <label className={label}>City</label>
              <input
                className={input}
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>State</label>
              <input
                className={input}
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>District</label>
              <input
                className={input}
                value={formData.district}
                onChange={(e) => handleChange("district", e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Pin Code</label>
              <input
                className={input}
                value={formData.pin_code}
                onChange={(e) => handleChange("pin_code", e.target.value)}
              />
            </div>

            <div className="md:col-span-3">
              <label className={label}>Address</label>
              <textarea
                rows="2"
                className={input}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <div className="md:col-span-3">
              <label className={label}>Description</label>
              <textarea
                rows="2"
                className={input}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>
        </div>

        <hr className="my-8" />

        {/* =============================== */}
        {/* DIRECTOR SECTION                */}
        {/* =============================== */}
        <div className={box}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-700">
              👤 Director Information
            </h2>
            <button
              type="button"
              onClick={addDirector}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              + Add Director
            </button>
          </div>
          {directors.map((d, i) => (
            <div
              key={i}
              className="p-5 border rounded-xl bg-gray-100 mb-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Director {i + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeDirector(i)}
                  disabled={directors.length === 1}
                  className={`px-4 py-1 rounded text-white ${directors.length === 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  Remove
                </button>
              </div>

              <div className={grid3}>
                <div>
                  <label className={label}>Name</label>
                  <input
                    className={input}
                    value={d.director_name}
                    onChange={(e) =>
                      handleDirectorChange(i, "director_name", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className={label}>PAN</label>
                  <input
                    className={input}
                    value={d.director_pan_no}
                    onChange={(e) =>
                      handleDirectorChange(i, "director_pan_no", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className={label}>Aadhar</label>
                  <input
                    className={input}
                    value={d.director_aadhar_no}
                    onChange={(e) =>
                      handleDirectorChange(
                        i,
                        "director_aadhar_no",
                        e.target.value
                      )
                    }
                  />
                </div>

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

                {/* Director PAN Document */}
                <div>
                  <label className={label}>PAN Document</label>
                  <input
                    type="file"
                    className={file}
                    onChange={(e) =>
                      handleDirectorFileChange(
                        i,
                        "user_pan_doc",
                        e.target.files[0]
                      )
                    }
                  />
                  {directorDocUrls[i] && (
                    <DocumentPreview
                      url={directorDocUrls[i].pan_doc_url}
                      label={`Director ${i + 1} PAN`}
                    />
                  )}
                </div>

                {/* Director Aadhaar Document */}
                <div>
                  <label className={label}>Aadhaar Document</label>
                  <input
                    type="file"
                    className={file}
                    onChange={(e) =>
                      handleDirectorFileChange(
                        i,
                        "user_addhar_doc",
                        e.target.files[0]
                      )
                    }
                  />
                  {directorDocUrls[i] && (
                    <DocumentPreview
                      url={directorDocUrls[i].addhar_doc_url}
                      label={`Director ${i + 1} Aadhaar`}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* =============================== */}
          {/* SUBMIT BUTTON                  */}
          {/* =============================== */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg transition duration-150"
          >
            {loading ? "Updating..." : "Update Merchant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
