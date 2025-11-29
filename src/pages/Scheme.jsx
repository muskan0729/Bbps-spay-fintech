import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { useGet } from "../hooks/useGet";

const Scheme = () => {
  const { data: response, loading } = useGet("/get-schemes");
  const column = [
    "id",
    "name",
    "commission_type",
    "type",
    "commission_value",
    "commission_value",
    "status",
    "gst_type",
    "gst_value",
    "created_at",
    "updated_at",
  ];
  const [tableData, setTableData] = useState();
  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    setTableData(response?.data);
  }, [response, loading]);

  // Modal close handler
  const closeModal = () => setAddUser(false);

  return (
    <>
      {/* Main Scheme Page */}
      <div
        className={`p-5 md:p-8 transition-filter duration-300 ${
          addUser ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Scheme Manager</h1>

          <button
            className="mt-3 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            onClick={() => setAddUser(true)}
          >
            Add Scheme
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Search */}
          <div className="w-full md:w-1/2">
            <label className="text-gray-600 text-sm mb-1 block">Search</label>
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-1/3">
            <label className="text-gray-600 text-sm mb-1 block">Status</label>
            <select className="w-full px-3 py-2 border rounded-md bg-white cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none">
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg p-4 overflow-x-auto">
          <Table
            data={tableData}
            columns={column}
            isPaginationRequired={false}
            rowsPerPage={5}
          />
        </div>
      </div>

      {/* Modal */}
      {addUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add Scheme</h2>

            {/* Modal content here */}
            <p>This is your Add Scheme modal content.</p>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Scheme;
