import React, { useState } from "react";

const Table = ({ columns, data, rowsPerPage, isPaginationRequired }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const paginationHandler = (action) => {
    setCurrentPage((prevPage) => {
      if (action === "prev") return Math.max(prevPage - 1, 1);
      if (action === "next") return Math.min(prevPage + 1, totalPages);
      return prevPage;
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-all">
                {columns.map((col) => (
                  <td key={col} className="px-6 py-4 text-sm text-gray-700">
                    {item[col]} {/* Directly access the data */}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {isPaginationRequired && (
        <div className="flex justify-between items-center mt-6">
          <button onClick={() => paginationHandler("prev")} className="px-4 py-2 bg-gray-300 rounded text-sm">
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => paginationHandler("next")} className="px-4 py-2 bg-gray-300 rounded text-sm">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;

