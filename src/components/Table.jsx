import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Table = ({
  columns = [],
  data = [],
  rowsPerPage = 5,
  isPaginationRequired = false,
  tableWrapperClass = "",
  tableClass = "",
  headerClass = "",
  rowClass = "",
  paginationClass = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const paginationHandler = (action) => {
    setCurrentPage((prev) => {
      if (action === "prev") return Math.max(prev - 1, 1);
      if (action === "next") return Math.min(prev + 1, totalPages);
      return prev;
    });
  };

  const goToPage = (page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages));

  const getColumnLabel = (col) => (typeof col === "string" ? col : col.label || col.key);

  // Updated: Pass rowIndex to render function
  const getCellValue = (col, row, rowIndex) => {
    if (typeof col === "string") return row[col] ?? "-";
    if (col.render) return col.render(row, rowIndex); // Pass rowIndex here
    return row[col.key] ?? "-";
  };

  const defaultHeaderClass =
    "bg-blue-600 text-white font-semibold text-sm uppercase tracking-wider";
  const defaultRowClass = "bg-white hover:bg-sky-50 transition-colors duration-200";

  return (
    <div
      className={`overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${tableWrapperClass}`}
    >
      <table className={`min-w-full divide-y divide-gray-200 ${tableClass}`}>
        <thead className={headerClass || defaultHeaderClass}>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={typeof col === "string" ? col : col.key || idx}
                className="px-4 py-3 text-left text-xs sm:text-sm font-bold uppercase tracking-wider whitespace-nowrap"
              >
                {getColumnLabel(col)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rIdx) => (
              <tr key={rIdx} className={rowClass || defaultRowClass}>
                {columns.map((col, cIdx) => (
                  <td
                    key={cIdx}
                    className="px-4 py-2 text-xs sm:text-sm text-gray-700 whitespace-nowrap"
                  >
                    {getCellValue(col, row, startIndex + rIdx)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500 text-sm"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isPaginationRequired && totalPages > 1 && (
        <div
          className={`flex justify-center items-center flex-wrap gap-3 py-4 border-t border-gray-200 ${paginationClass}`}
        >
          <button
            onClick={() => paginationHandler("prev")}
            disabled={currentPage === 1}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-40 transition-all"
          >
            <FaChevronLeft /> Prev
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  page === currentPage
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginationHandler("next")}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-40 transition-all"
          >
            Next <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
