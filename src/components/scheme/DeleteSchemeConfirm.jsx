// components/scheme/DeleteSchemeConfirm.jsx
import React, { useContext } from "react";
import { SchemeContext } from "../../contexts/SchemeContext";
import { usePost } from "../../hooks/usePost";

const DeleteSchemeConfirm = ({ value }) => {
  const { setIsModelOpen } = useContext(SchemeContext);
  const { execute } = usePost("/delete-scheme");

  const closeModal = () => setIsModelOpen(false);

  const handleDelete = async () => {
    await execute(value);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-72 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure?
        </h3>

        <div className="flex justify-between mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Yes
          </button>

          <button
            onClick={closeModal}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSchemeConfirm;
