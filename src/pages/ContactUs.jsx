
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane, FaTimes } from "react-icons/fa"; // Font Awesome icons

const ContactUs = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard"); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 relative px-4">
      {/* Gradient background for subtle effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-gray-100 -z-10"></div>

      {/* Card */}
      <div className="bg-white relative rounded-2xl shadow-2xl w-full max-w-lg p-8 transform transition-transform duration-300 hover:-translate-y-1">
        {/* Heading */}
        <h2 className="text-center text-blue-600 text-3xl font-bold mb-6">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Subject</label>
            <input
              type="text"
              placeholder="Enter subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter description"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 resize-none"
              required
            />
          </div>

          {/* Upload PNG File */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload PNG File</label>
            <input
              type="file"
              accept=".png"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            {/* Back button with icon */}
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-blue-700 font-bold hover:translate-x-2 transition-transform duration-300"
            >
              <FaArrowLeft /> Back to Dashboard
            </button>

            {/* Submit and Cancel buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
              >
                <FaPaperPlane /> Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

