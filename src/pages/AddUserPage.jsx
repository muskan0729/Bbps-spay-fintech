import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

// Regex patterns
const PAN_REGEX = new RegExp("^[A-Z]{5}[0-9]{4}[A-Z]{1}$");
const GSTIN_REGEX = new RegExp(
    "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
);
const IFSC_REGEX = new RegExp("^[A-Z]{4}0[0-9A-Z]{6}$");
const MOBILE_REGEX = new RegExp("^[0-9]{10}$");
const MCC_REGEX = new RegExp("^[0-9]{4}$");
const PINCODE_REGEX = new RegExp("^[0-9]{6}$");
// Robust Email Regex
const EMAIL_REGEX = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
);
const AADHAAR_REGEX = new RegExp("^[0-9]{12}$");

const DIRECTOR_PAN_REGEX = PAN_REGEX; // same as company PAN
const DIRECTOR_AADHAAR_REGEX = AADHAAR_REGEX;

export const validateDirectorField = (id, value, required) => {
    value = value || ""; // normalize

    if (required && value.trim() === "") return false; // required check

    switch (id) {
        case "name":
            return value.trim().length > 0;
        case "gender":
            return ["male", "female", "other"].includes(value);
        case "pan":
            return DIRECTOR_PAN_REGEX.test(value.toUpperCase());
        case "aadhaar":
            return value === "" ? false : DIRECTOR_AADHAAR_REGEX.test(value);
        case "dob":
            return value !== "" && !isFutureDate(value); // must not be blank or future
        default:
            return true;
    }
};

// Universal validation function checking against the regex
export const validateField = (id, value, required) => {
    let isValid = true;
    const normalizedValue = value || "";

    // 1. Check for required fields
    if (required && normalizedValue.length === 0) {
        return false;
    }

    // If not required and empty, it's valid
    if (!required && normalizedValue.length === 0) {
        return true;
    }

    // 2. Check for regex patterns
    switch (id) {
        case "businessEmail":
            isValid = EMAIL_REGEX.test(normalizedValue);
            break;
        case "companyPan":
            isValid =
                normalizedValue.length === 10 && PAN_REGEX.test(normalizedValue);
            break;
        case "gstNumber":
            isValid =
                normalizedValue.length === 15 && GSTIN_REGEX.test(normalizedValue);
            break;
        case "ifsc":
            isValid =
                normalizedValue.length === 11 && IFSC_REGEX.test(normalizedValue);
            break;
        case "mobile":
            isValid =
                normalizedValue.length === 10 && MOBILE_REGEX.test(normalizedValue);
            break;
        case "businessMcc":
            isValid = normalizedValue.length === 4 && MCC_REGEX.test(normalizedValue);
            break;
        case "pincode":
            isValid =
                normalizedValue.length === 6 && PINCODE_REGEX.test(normalizedValue);
            break;
        case "bankAccount":
            isValid = /^[0-9]{9,18}$/.test(normalizedValue);
            break;
        default:
            isValid = true;
            break;
    }
    return isValid;
};

// Helper function to check if the date is in the future
const isFutureDate = (dateString) => {
    if (!dateString) return false;
    const inputDate = new Date(dateString);
    // Set time component to start of day (midnight) to compare only dates
    inputDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Returns true if inputDate is greater than today's date
    return inputDate > today;
};

const TODAY_DATE = new Date().toISOString().split("T")[0];

const INDIA_STATES = [
    { code: "AP", name: "Andhra Pradesh" },
    { code: "AR", name: "Arunachal Pradesh" },
    // ... (India States list remains the same)
    { code: "AS", name: "Assam" },
    { code: "BR", name: "Bihar" },
    { code: "CT", name: "Chhattisgarh" },
    { code: "GA", name: "Goa" },
    { code: "GJ", name: "Gujarat" },
    { code: "HR", name: "Haryana" },
    { code: "HP", name: "Himachal Pradesh" },
    { code: "JK", name: "Jammu and Kashmir" },
    { code: "JH", name: "Jharkhand" },
    { code: "KA", name: "Karnataka" },
    { code: "KL", name: "Kerala" },
    { code: "MP", name: "Madhya Pradesh" },
    { code: "MH", name: "Maharashtra" },
    { code: "MN", name: "Manipur" },
    { code: "ML", name: "Meghalaya" },
    { code: "MZ", name: "Mizoram" },
    { code: "NL", name: "Nagaland" },
    { code: "OR", name: "Odisha" },
    { code: "PB", name: "Punjab" },
    { code: "RJ", name: "Rajasthan" },
    { code: "SK", name: "Sikkim" },
    { code: "TN", name: "Tamil Nadu" },
    { code: "TG", name: "Telangana" },
    { code: "TR", name: "Tripura" },
    { code: "UP", name: "Uttar Pradesh" },
    { code: "UT", name: "Uttarakhand" },
    { code: "WB", name: "West Bengal" },
    // Union Territories
    { code: "AN", name: "Andaman and Nicobar Islands" },
    { code: "CH", name: "Chandigarh" },
    { code: "DN", name: "Dadra and Nagar Haveli and Daman and Diu" },
    { code: "DL", name: "Delhi" },
    { code: "JK-UT", name: "Jammu and Kashmir (UT)" },
    { code: "LA", name: "Ladakh" },
    { code: "LD", name: "Lakshadweep" },
    { code: "PY", name: "Puducherry" },
];

// Initial state for the main form
const initialFormState = {
    businessName: "",
    mobile: "",
    businessEmail: "",
    businessMcc: "",
    companyType: "",
    companyPan: "",
    gstNumber: "",
    cinLlp: "",
    incorporationDate: "",
    accountName: "",
    bankAccount: "",
    ifsc: "",
    city: "",
    state: "",
    district: "",
    pincode: "",
    address: "",
};

export const AddUserPage = () => {
    const navigate = useNavigate();
    const { setData } = useAuth();
    const [formData, setFormData] = useState(initialFormState);
    const [directorErrors, setDirectorErrors] = useState({});
    const [directorTouched, setDirectorTouched] = useState({});

    // State for real-time validation errors
    const [validationErrors, setValidationErrors] = useState({});

    // State to track if a field has been touched (to only show error after focus)
    const [isTouched, setIsTouched] = useState({});

    const [directors, setDirectors] = useState([
        // Start with one director
        { id: Date.now() + 1 },
    ]);

    // Handler run on Blur (when element loses focus)
    const handleValidation = (e) => {
        const { id, value, required } = e.target;

        // 1. Mark as touched
        setIsTouched((prev) => ({ ...prev, [id]: true }));

        // 2. Perform base validation (using the new utility)
        const isBaseValid = validateField(id, value, required);

        // 3. Perform specific date validation
        let isDateValid = true;
        let customError = "";

        if (id === "incorporationDate" && isFutureDate(value)) {
            isDateValid = false;
            customError = "Date of Incorporation cannot be in the future.";
        }

        const isValid = isBaseValid && isDateValid;

        // 4. Set error state
        setValidationErrors((prev) => ({
            ...prev,
            [id]: !isValid, // true if there is an error
            [`${id}CustomError`]: customError, // Save custom error message
        }));
    };

    const validateDirector = (index, field, value) => {
        const isValid = validateDirectorField(field, value, field === "name"); // name required
        setDirectorErrors((prev) => ({
            ...prev,
            [index]: { ...(prev[index] || {}), [field]: !isValid },
        }));
    };

    // Unified form change handler
    const handleChange = (e) => {
        const { id, value, required } = e.target;
        let newValue = value;

        // 1. Input Control (Restricting length and type)
        if (id === "mobile" || id === "businessMcc" || id === "pincode") {
            newValue = value.replace(/[^0-9]/g, "");
            if (id === "mobile") newValue = newValue.substring(0, 10);
            if (id === "businessMcc") newValue = newValue.substring(0, 4);
            if (id === "pincode") newValue = newValue.substring(0, 6);
        }

        // 2. PAN/GSTIN/IFSC Control (Uppercase and Alphanumeric for PAN)
        if (id === "companyPan") {
            newValue = value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
                .substring(0, 10); // FIX: Ensure only valid PAN chars
        } else if (id === "gstNumber" || id === "ifsc") {
            newValue = value.toUpperCase();
        }

        // 3. Update State
        setFormData((prev) => ({
            ...prev,
            [id]: newValue,
        }));

        // 4. Real-time Validation Feedback if touched
        if (isTouched[id]) {
            const isBaseValid = validateField(id, newValue, required);
            let isDateValid = true;

            if (id === "incorporationDate" && isFutureDate(newValue)) {
                isDateValid = false;
            }

            const isValid = isBaseValid && isDateValid;

            setValidationErrors((prev) => ({
                ...prev,
                [id]: !isValid,
                [`${id}CustomError`]: isDateValid
                    ? ""
                    : "Date of Incorporation cannot be in the future.",
            }));
        }
    };

    // Director form change handler
    const handleDirectorChange = (index, name, value) => {
        const newDirectors = directors.map((d, i) =>
            i === index ? { ...d, [name]: value } : d
        );
        setDirectors(newDirectors);
        validateDirector(index, name, value); // update error state
    };

    // Mock data for the starter code's logic
    const newUserData = {
        userId: Date.now(),
        name: formData.businessName || "New Business",
        email: formData.businessEmail,
        amount: 0
        // amount: Math.floor(Math.random() * 1000) + 100, // mock amount
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

        let directorHasError = false;

        directors.forEach((d, index) => {
            const fields = ["name", "pan", "aadhaar", "dob"];
            fields.forEach((f) => {
                const valid = validateDirectorField(f, d[f], f === "name");
                setDirectorErrors((prev) => ({
                    ...prev,
                    [index]: { ...(prev[index] || {}), [f]: !valid },
                }));
                if (!valid) directorHasError = true;
            });
        });

        if (directorHasError) {
            alert("Please fix errors in Director Information before submitting.");
            return;
        }

        // Trigger browser validation for Director form fields
        if (!form.checkValidity()) {
            alert("Please correct the errors in the Director Information fields.");
            return;
        }

        // Final check for controlled fields
        let formHasError = false;
        const finalErrors = {};
        const errorIds = []; // Temporary array to track errors

        Object.keys(formData).forEach((key) => {
            const inputElement = document.getElementById(key);
            if (inputElement) {
                const required = inputElement.required;

                // 1. Check base validation
                const isBaseValid = validateField(key, formData[key], required);

                // 2. Check date validation
                let isDateValid = true;
                let customError = "";
                if (key === "incorporationDate" && isFutureDate(formData[key])) {
                    isDateValid = false;
                    customError = "Date of Incorporation cannot be in the future.";
                }

                const isInvalid = !(isBaseValid && isDateValid);

                setIsTouched((prev) => ({ ...prev, [key]: true }));

                if (isInvalid) {
                    finalErrors[key] = true;
                    finalErrors[`${key}CustomError`] = customError;
                    formHasError = true;
                    errorIds.push(key);
                } else {
                    delete finalErrors[key];
                    delete finalErrors[`${key}CustomError`];
                }
            }
        });

        setValidationErrors((prev) => ({ ...prev, ...finalErrors }));

        if (formHasError) {
            alert("Please correct the validation errors before submitting.");
            // Optional: Focus on the first error field
            if (errorIds.length > 0) {
                document.getElementById(errorIds[0]).focus();
            }
            return;
        }

        console.log("Form Data:", formData);
        console.log("Directors Data:", directors);

        // --- Key Action: Set the temporary data ---
        setData("postSubmitData", {
            message: `${formData.businessName} successfully registered!`,
            newUser: newUserData,
            status: "success",
        });

        // Navigate back to the list page (e.g., '/')
        navigate("/users");
    };

    const addDirector = () => {
        setDirectors([...directors, { id: Date.now() }]);
    };

    const removeDirector = (indexToRemove) => {
        setDirectors(directors.filter((_, index) => index !== indexToRemove));
    };

    // Helper function to get the validation status class
    const getValidationClass = (id) => {
        // Check if the field has been touched and has an error
        const isInvalid = isTouched[id] && validationErrors[id];

        // Apply red border if invalid, green border if touched and valid (and not empty), otherwise default gray
        if (isInvalid) {
            return "border-red-500 focus:border-red-500 focus:ring-red-500";
        } else if (isTouched[id] && !validationErrors[id] && formData[id]) {
            return "border-green-500 focus:border-green-500 focus:ring-green-500";
        }
        return "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
    };

    // Helper function to get the title for an input
    const getTitle = (id) => {
        const element = document.getElementById(id);
        return (
            validationErrors[`${id}CustomError`] || (element ? element.title : "")
        );
    };

    // The main form component
    return (
        <div className="text-sm mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Registration Form
            </h1>

            <form onSubmit={handleSubmit}>
                {/* --- Business Details Section --- */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Business Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-sm">
                    {/* Business Name */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="businessName"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Business Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter Value"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "businessName"
                            )}`}
                            required
                        />
                        {isTouched["businessName"] && validationErrors["businessName"] && (
                            <p className="mt-1 text-xs text-red-600">
                                This field is required.
                            </p>
                        )}
                    </div>

                    {/* Mobile */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="mobile"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Mobile <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter 10-digit mobile"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "mobile"
                            )}`}
                            required
                            minLength="10"
                            maxLength="10"
                            title="Mobile number must be 10 digits"
                        />
                        {isTouched["mobile"] && validationErrors["mobile"] && (
                            <p className="mt-1 text-xs text-red-600">{getTitle("mobile")}</p>
                        )}
                    </div>

                    {/* Business Email */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="businessEmail"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Business Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="businessEmail"
                            value={formData.businessEmail}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter Email address"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "businessEmail"
                            )}`}
                            required
                            title="Please enter a valid email address (e.g., user@example.com)"
                        />
                        {isTouched["businessEmail"] &&
                            validationErrors["businessEmail"] && (
                                <p className="mt-1 text-xs text-red-600">
                                    {getTitle("businessEmail")}
                                </p>
                            )}
                    </div>

                    {/* Business MCC */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="businessMcc"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Business MCC <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="businessMcc"
                            value={formData.businessMcc}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter 4-digit MCC Code"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "businessMcc"
                            )}`}
                            required
                            minLength="4"
                            maxLength="4"
                            title="MCC must be a 4-digit code"
                        />
                        {isTouched["businessMcc"] && validationErrors["businessMcc"] && (
                            <p className="mt-1 text-xs text-red-600">
                                {getTitle("businessMcc")}
                            </p>
                        )}
                    </div>

                    {/* Company Type */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="companyType"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Company Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="companyType"
                            value={formData.companyType}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            className={`p-2 border rounded-md bg-white ${getValidationClass(
                                "companyType"
                            )}`}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="pvt">Pvt. Ltd.</option>
                            <option value="llp">LLP</option>
                            <option value="sole">Sole Proprietorship</option>
                        </select>
                        {isTouched["companyType"] && validationErrors["companyType"] && (
                            <p className="mt-1 text-xs text-red-600">
                                Please select a company type.
                            </p>
                        )}
                    </div>

                    {/* Company Pancard Number */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="companyPan"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Company Pancard Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="companyPan"
                            value={formData.companyPan}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter PAN (E.g. ABCDE1234F)"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "companyPan"
                            )}`}
                            required
                            minLength="10"
                            maxLength="10"
                            title="PAN must be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)"
                        />
                        {isTouched["companyPan"] && validationErrors["companyPan"] && (
                            <p className="mt-1 text-xs text-red-600">
                                {getTitle("companyPan")}
                            </p>
                        )}
                    </div>

                    {/* GST Number */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="gstNumber"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            GST Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter 15-Character GSTIN (E.g. 22ABCDE1234F1Z5)"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "gstNumber"
                            )}`}
                            required
                            minLength="15"
                            maxLength="15"
                            title="GSTIN must be 15 characters (2-digit State Code, 10-digit PAN, 3 additional chars, e.g., 22ABCDE1234F1Z5)"
                        />
                        {isTouched["gstNumber"] && validationErrors["gstNumber"] && (
                            <p className="mt-1 text-xs text-red-600">
                                {getTitle("gstNumber")}
                            </p>
                        )}
                    </div>

                    {/* CIN/LLP */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="cinLlp"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            CIN/LLP
                        </label>
                        <input
                            type="text"
                            id="cinLlp"
                            value={formData.cinLlp}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter CIN or LLPIN"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "cinLlp"
                            )}`}
                            maxLength="21" // CIN is 21 alphanumeric characters
                            title="CIN should be 21 characters."
                        />
                        {isTouched["cinLlp"] && validationErrors["cinLlp"] && (
                            <p className="mt-1 text-xs text-red-600">
                                Please check CIN/LLP format.
                            </p>
                        )}
                    </div>

                    {/* Date of Incorporation (FIXED FUTURE DATE CHECK) */}
                    <div className="flex flex-col relative">
                        <label
                            htmlFor="incorporationDate"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Date of Incorporation <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="incorporationDate"
                            value={formData.incorporationDate}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="dd-mm-yyyy"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "incorporationDate"
                            )}`}
                            required
                            max={TODAY_DATE}
                            title="Date is required."
                        />
                        {isTouched["incorporationDate"] &&
                            validationErrors["incorporationDate"] && (
                                <p className="mt-1 text-xs text-red-600">
                                    {getTitle("incorporationDate") === ""
                                        ? "Date is required."
                                        : getTitle("incorporationDate")}
                                </p>
                            )}
                    </div>
                </div>

                {/* --- Account Details Section --- */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Account Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {/* Account Holder Name */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="accountName"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Account Holder Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="accountName"
                            value={formData.accountName}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter Value"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "accountName"
                            )}`}
                            required
                        />
                        {isTouched["accountName"] && validationErrors["accountName"] && (
                            <p className="mt-1 text-xs text-red-600">
                                This field is required.
                            </p>
                        )}
                    </div>

                    {/* Bank Account No */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="bankAccount"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Bank Account No <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="bankAccount"
                            value={formData.bankAccount}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter Value"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "bankAccount"
                            )}`}
                            required
                            minLength="9"
                            maxLength="18"
                            title="Bank Account number must be between 9 and 18 digits"
                        />
                        {isTouched["bankAccount"] && validationErrors["bankAccount"] && (
                            <p className="mt-1 text-xs text-red-600">
                                {getTitle("bankAccount")}
                            </p>
                        )}
                    </div>

                    {/* IFSC */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="ifsc"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            IFSC <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="ifsc"
                            value={formData.ifsc}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter Value (e.g. KKBK0000000)"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "ifsc"
                            )}`}
                            required
                            minLength="11"
                            maxLength="11"
                            title="IFSC must be 11 characters (4 letters, 0, 6 alphanumeric)"
                        />
                        {isTouched["ifsc"] && validationErrors["ifsc"] && (
                            <p className="mt-1 text-xs text-red-600">{getTitle("ifsc")}</p>
                        )}
                    </div>
                </div>

                {/* --- Location Details Section --- */}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Location Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {/* City */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="city"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            value={formData.city}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter Value"
                            className={`p-2 border rounded-md ${getValidationClass("city")}`}
                            required
                        />
                        {isTouched["city"] && validationErrors["city"] && (
                            <p className="mt-1 text-xs text-red-600">
                                This field is required.
                            </p>
                        )}
                    </div>

                    {/* State */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="state"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            State <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            className={`p-2 border rounded-md bg-white ${getValidationClass(
                                "state"
                            )}`}
                            required
                        >
                            <option value="">Select State</option>
                            {INDIA_STATES.map((item) => (
                                <option key={item.code} value={item.code}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {isTouched["state"] && validationErrors["state"] && (
                            <p className="mt-1 text-xs text-red-600">
                                Please select a state.
                            </p>
                        )}
                    </div>

                    {/* District */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="district"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            District <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="district"
                            value={formData.district}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter Value"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "district"
                            )}`}
                            required
                        />
                        {isTouched["district"] && validationErrors["district"] && (
                            <p className="mt-1 text-xs text-red-600">
                                This field is required.
                            </p>
                        )}
                    </div>

                    {/* Pincode */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="pincode"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter 6-digit Pincode"
                            className={`p-2 border rounded-md ${getValidationClass(
                                "pincode"
                            )}`}
                            required
                            minLength="6"
                            maxLength="6"
                            title="Pincode must be a 6-digit number"
                        />
                        {isTouched["pincode"] && validationErrors["pincode"] && (
                            <p className="mt-1 text-xs text-red-600">{getTitle("pincode")}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="flex flex-col lg:col-span-2">
                        <label
                            htmlFor="address"
                            className="text-sm font-semibold text-gray-700 mb-1"
                        >
                            Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            onBlur={handleValidation}
                            placeholder="Enter Address"
                            rows="1"
                            className={`p-2 border rounded-md resize-y ${getValidationClass(
                                "address"
                            )}`}
                            required
                        ></textarea>
                        {isTouched["address"] && validationErrors["address"] && (
                            <p className="mt-1 text-xs text-red-600">
                                This field is required.
                            </p>
                        )}
                    </div>
                </div>

                {/* --- Director Information Section --- */}
                <div className="flex justify-between items-center mb-4 mt-6">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Director Information
                    </h2>
                    <button
                        type="button"
                        onClick={addDirector}
                        className="flex items-center bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add Director
                    </button>
                </div>

                {/* Director Forms */}
                {directors.map((director, index) => (
                    <DirectorForm
                        key={director.id}
                        index={index}
                        director={director}
                        onChange={handleDirectorChange}
                        onRemove={removeDirector}
                        errors={directorErrors}
                        touched={directorTouched}
                        setTouched={setDirectorTouched}
                    />
                ))}

                {/* --- Submit Button Section --- */}
                <div className="p-3 mt-8 border-t border-gray-200 flex justify-end">
                    <button
                        type="submit"
                        className="bg-green-800 text-white rounded-lg px-6 py-2 h-10 hover:bg-green-900 focus:ring-2 focus:ring-green-300 focus:border-green-300 outline-none transition duration-150 ease-in-out"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

// Mock Director component for the dynamic list
const DirectorForm = ({
    index,
    director,
    onChange,
    onRemove,
    errors,
    touched,
    setTouched,
}) => {
    const handleDirectorChange = (field, value) => {
        onChange(index, field, value);
    };

    const handleBlur = (field, value) => {
        setTouched((prev) => ({
            ...prev,
            [index]: { ...(prev[index] || {}), [field]: true },
        }));
        onChange(index, field, value); // triggers validateDirector
    };

    const getValidationClass = (field) => {
        if (touched[index]?.[field] && errors[index]?.[field]) {
            return "border-red-500 focus:border-red-500 focus:ring-red-500";
        } else if (
            touched[index]?.[field] &&
            !errors[index]?.[field] &&
            director[field]
        ) {
            return "border-green-500 focus:border-green-500 focus:ring-green-500";
        }
        return "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
    };

    return (
        <div className="text-sm border border-gray-300 p-4 rounded-lg mt-4 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <h3 className="col-span-full font-semibold text-gray-700">
                Director {index + 1}
            </h3>

            <div className="flex flex-col">
                <label
                    htmlFor={`director-name-${index}`}
                    className="text-sm font-semibold text-gray-700 mb-1"
                >
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id={`director-name-${index}`}
                    placeholder="Enter Name"
                    value={director.name || ""}
                    onChange={(e) => handleDirectorChange("name", e.target.value)}
                    onBlur={(e) => handleBlur("name", e.target.value)}
                    className={`p-2 border rounded-md ${getValidationClass("name")}`}
                />
                {touched[index]?.name && errors[index]?.name && (
                    <p className="text-xs text-red-600">Name is required</p>
                )}
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor={`director-gender-${index}`}
                    className="text-sm font-semibold text-gray-700 mb-1"
                >
                    Gender <span className="text-red-500">*</span>
                </label>
                <select
                    id={`director-gender-${index}`}
                    value={director.gender || ""}
                    onChange={(e) => handleDirectorChange("gender", e.target.value)}
                    onBlur={(e) => handleBlur("gender", e.target.value)}
                    className={`p-2 border rounded-md bg-white ${getValidationClass(
                        "gender"
                    )}`}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {touched[index]?.gender && errors[index]?.gender && (
                    <p className="text-xs text-red-600">Please select gender</p>
                )}
            </div>

            <div className="flex flex-col relative">
                <label
                    htmlFor={`director-dob-${index}`}
                    className="text-sm font-semibold text-gray-700 mb-1"
                >
                    DOB  <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    id={`director-dob-${index}`}
                    placeholder="dd-mm-yyyy"
                    value={director.dob || ""}
                    onChange={(e) => handleDirectorChange("dob", e.target.value)}
                    onBlur={(e) => handleBlur("dob", e.target.value)}
                    className={`p-2 border rounded-md uppercase ${getValidationClass(
                        "dob"
                    )}`}
                    max={TODAY_DATE}
                />
                {touched[index]?.dob && errors[index]?.dob && (
                    <p className="text-xs text-red-600">DOB cannot be in the future</p>
                )}
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor={`director-pan-${index}`}
                    className="text-sm font-semibold text-gray-700 mb-1"
                >
                    Pancard Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id={`director-pan-${index}`}
                    placeholder="PAN (E.g. ABCDE1234F)"
                    value={director.pan || ""}
                    onChange={(e) =>
                        handleDirectorChange("pan", e.target.value.toUpperCase())
                    }
                    onBlur={(e) => handleBlur("pan", e.target.value)}
                    className={`p-2 border rounded-md ${getValidationClass(
                        "pan"
                    )}`}
                    maxLength="10"
                />
                {touched[index]?.pan && errors[index]?.pan && (
                    <p className="text-xs text-red-600">PAN must be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)</p>
                )}
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor={`director-aadhar-${index}`}
                    className="text-sm font-semibold text-gray-700 mb-1"
                >
                    Aadhaar Number  <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id={`director-aadhaar-${index}`}
                    placeholder="Enter 12-digit Aadhaar number"
                    value={director.aadhaar || ""}
                    onChange={(e) =>
                        handleDirectorChange(
                            "aadhaar",
                            e.target.value.replace(/[^0-9]/g, "").slice(0, 12)
                        )
                    }
                    onBlur={(e) => handleBlur("aadhaar", e.target.value)}
                    className={`p-2 border rounded-md ${getValidationClass("aadhaar")}`}
                />
                {touched[index]?.aadhaar && errors[index]?.aadhaar && (
                    <p className="text-xs text-red-600">Aadhaar must be 12 digits</p>
                )}
            </div>

            {/* Remove button positioned absolutely on the right */}
            <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                title="Remove Director"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    );
};