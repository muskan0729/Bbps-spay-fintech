import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserInstruction = () => {
  const location = useLocation();
  const userData = location.state?.userData || {};
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [acceptVideo, setAcceptVideo] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const data = [
    {
      title: "Personal Guidelines",
      points: [
        "Only you should appear in the video.",
        "Your face must be clearly visible throughout the recording.",
        "Do not wear a cap, mask, helmet, or sunglasses.",
        "Keep a neutral expression and look directly at the camera.",
      ],
    },
    {
      title: "Identity Proof",
      points: [
        "Keep your original valid ID proof ready (as required).",
        "Show the ID clearly in the video when instructed.",
        "Ensure the photo and details are readable.",
        "Do not use photocopies, screenshots, or edited images.",
      ],
    },
    {
      title: "Recording Environment",
      points: [
        "Record the video in a well-lit area.",
        "Choose a quiet place with no background noise.",
        "Use a plain background if possible.",
      ],
    },
    {
      title: "Device & Camera",
      points: [
        "Use a device with a working front camera and microphone.",
        "Ensure the camera lens is clean.",
        "Hold the device steady while recording.",
        "Avoid using filters or virtual backgrounds.",
      ],
    },
    {
      title: "While Recording",
      points: [
        "Follow the on-screen instructions carefully.",
        "Speak clearly and audibly if asked.",
        "Do not pause, edit, or cut the video.",
        "Complete the recording in one continuous take.",
      ],
    },
    {
      title: "Common Reasons for Rejection",
      points: [
        "Face not clearly visible",
        "Poor lighting or unclear audio",
        "Blurry or incomplete ID details",
        "Another person appearing in the video",
      ],
    },
  ];

  const totalSteps = data.length;

  const handleNext = () => {
    if (page < totalSteps - 1) {
      setPage(page + 1);
    } else {
      setAcceptVideo(true);
    }
  };

  const handleVideoUpload = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = () => {
  
    alert(
      "Your Data has been reserved your account will be activated with in 24-48 Hours"
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-6">
      {!acceptVideo ? (
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Hi {userData.name || "User"}!
            </h1>
            <p className="text-gray-600 text-lg">
              Please complete your Self Video KYC by following the instructions
              below.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((page + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>

          {/* Instruction Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 mb-6 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {data[page].title}
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
              {data[page].points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className={`px-6 py-3 rounded-lg font-medium text-white transition-colors duration-300 ${
                page === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Prev
            </button>

            <button
              onClick={handleNext}
              className={`px-6 py-3 rounded-lg font-medium text-white transition-colors duration-300 ${
                page === totalSteps - 1
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {page === totalSteps - 1 ? "Upload Video" : "Next"}
            </button>
          </div>

          {/* Step Info */}
          <p className="text-center text-gray-500 mt-4">
            Step {page + 1} of {totalSteps}
          </p>
        </div>
      ) : (
        // === Upload Video Section Styled Like Instruction Card ===
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Upload Your Video
          </h2>
          <p className="text-gray-600 text-center">
            Please upload a clear video following the instructions provided.
          </p>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setAcceptVideo(false)}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!videoFile}
              className={`px-6 py-3 rounded-lg text-white transition-colors ${
                videoFile
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInstruction;
