// pages/Scheme.jsx
import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useGet } from "../hooks/useGet";
import { SchemeContext } from "../contexts/SchemeContext";
import AddScheme from "../components/AddScheme";

const Scheme = () => {
  const { isModelOpen, setIsModelOpen } = useContext(SchemeContext);
  const { data: response, loading } = useGet("/get-schemes");

  const [tableData, setTableData] = useState([]);

  const columns = [
    "id", "name", "commission_type", "type", "commission_value",
    "status", "gst_type", "gst_value", "created_at", "updated_at"
  ];

  useEffect(() => {
    setTableData(response?.data || []);
  }, [response, loading]);

  return (
    <>
      {/* MAIN PAGE */}
      <div className={`p-5 md:p-8 ${isModelOpen ? "blur-sm pointer-events-none" : ""}`}>
        
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Scheme Manager</h1>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            onClick={() => setIsModelOpen(true)}
          >
            Add Scheme
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm rounded-lg p-4 overflow-x-auto">
          <Table data={tableData} columns={columns} />
        </div>

      </div>

      {/* MODAL */}
      {isModelOpen && <AddScheme />}
    </>
  );
};

export default Scheme;
