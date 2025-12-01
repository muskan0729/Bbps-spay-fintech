// pages/Scheme.jsx
import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useGet } from "../hooks/useGet";
import { SchemeContext } from "../contexts/SchemeContext";
import AddScheme from "../components/AddScheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { usePost } from "../hooks/usePost";

// import
const Scheme = () => {
  const { isModelOpen, setIsModelOpen } = useContext(SchemeContext);
  const { data: response, loading } = useGet("/get-schemes");
  const { execute } = usePost("/");
  const [tableData, setTableData] = useState([]);
  const [isSchemeModalOpen, setIsSchemeModalOpen] = useState(false);
  const [operation, setOperation] = useState(null);
  const [value,setValue]=useState(null);
  const columns = [
    "id",
    "name",
    "commission_type",
    "type",
    "commission_value",
    "status",
    "gst_type",
    "gst_value",
    "created_at",
    "updated_at",
    "action",
  ];

  useEffect(() => {
    if (response?.data) {
      const withActionButton = response.data.map((d) => ({
        ...d,
        action: (
          <span className="flex items-center gap-2">
            <button
              className="p-2 m-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              onClick={() => {
                console.log(d);
                setValue(d.id)
                setOperation(2);
                setIsModelOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>

            <button
              onClick={() => {
                setOperation(3);
                setIsModelOpen(true);
              }}
              className="p-2 m-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </span>
        ),
      }));

      setTableData(withActionButton);
      console.log("SCHEME 38", withActionButton);
    } else {
      setTableData([]);
    }
  }, [response, loading]);

  return (
    <>
      {/* MAIN PAGE */}
      <div
        className={`p-5 md:p-8 ${
          isModelOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Scheme Manager</h1>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            onClick={() => {
              setOperation(1);
              setIsModelOpen(true);
            }}
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
      {isModelOpen && <AddScheme operation={operation} value={value}/>}
      {/* isSchemeModel */}
    </>
  );
};

export default Scheme;
