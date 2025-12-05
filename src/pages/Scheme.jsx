// pages/Scheme.jsx
import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import { useGet } from "../hooks/useGet";
import { SchemeContext } from "../contexts/SchemeContext";
import SchemeOperationModal from "../components/SchemeOperationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableSkeleton from "../components/TableSkeleton";

const Scheme = () => {
  const { isModelOpen, setIsModelOpen } = useContext(SchemeContext);

  // 🔥 Refresh trigger state
  const [refreshKey, setRefreshKey] = useState(0);

  // 🔥 Refresh function passed to child
  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // 🔥 API becomes dynamic -> auto reload when refreshKey changes
  const { data: response, loading } = useGet(
    `/get-schemes?refresh=${refreshKey}`
  );

  const [tableData, setTableData] = useState([]);
  const [operation, setOperation] = useState(null);
  const [value, setValue] = useState(null);

  const columns = [
    "action",
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
  ];
  const tstyle = {
    tableClass:
      "min-w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden text-gray-700",
    headerClass:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white text-sm font-semibold uppercase tracking-wide shadow-inner sticky top-0",
    rowClass:
      "bg-white even:bg-gray-50 hover:bg-indigo-50/60 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl mb-2 cursor-pointer",
    cellClass:
      "py-3 px-4 text-sm font-medium first:rounded-l-xl last:rounded-r-xl",
    paginationClass:
      "bg-white/60 shadow-inner rounded-lg px-4 py-2 text-gray-700 flex items-center justify-center gap-2 mt-4",
  };
  //  Build table rows when response updates
  useEffect(() => {
    if (response?.data) {
      const withActionButton = response.data.map((d) => {
        const { status, ...rest } = d; // remove status

        return {
          ...rest,
          status:
            status === 0 ? (
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                Inactive
              </span>
            ) : (
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Active
              </span>
            ),

          action: (
            <span className="flex items-center gap-2">
              <button
                className="p-2 m-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setValue(d);
                  setOperation(2);
                  setIsModelOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>

              <button
                onClick={() => {
                  setValue(d.id);
                  setOperation(3);
                  setIsModelOpen(true);
                }}
                className="p-2 m-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </span>
          ),
        };
      });

      setTableData(withActionButton);
    } else {
      setTableData([]);
    }
  }, [response, loading]);

  return (
    <>
      <div
        className={`p-5 md:p-8 ${
          isModelOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Scheme Manager</h1>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              setOperation(1);
              setIsModelOpen(true);
            }}
          >
            Add Scheme
          </button>
        </div>
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="bg-white shadow-sm rounded-lg p-4 overflow-x-auto">
            <Table
              data={tableData}
              columns={columns}
              isPaginationRequired={true}
              {...tstyle}
            />
          </div>
        )}
      </div>

      {/* 🔥 Pass refresh to modal → child */}
      {isModelOpen && (
        <SchemeOperationModal
          operation={operation}
          value={value}
          refresh={refresh}
        />
      )}
    </>
  );
};

export default Scheme;
