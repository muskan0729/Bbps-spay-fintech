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
  cellClass = "",
  paginationClass = "",
  paginationBtnClass = "",
  paginationActiveClass = "",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
console.log("from Table",data);

  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
  console.log(totalPages);
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  
  console.log(startIndex);
  
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const paginationHandler = (action) => {
    setCurrentPage((prev) => {
      if (action === "prev") return Math.max(prev - 1, 1);
      if (action === "next") return Math.min(prev + 1, totalPages);
      return prev;
    });
  };

  const goToPage = (page) =>
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));

  const getColumnLabel = (col) =>
    typeof col === "string" ? col : col.label || col.key;
  const getCellValue = (col, row, rowIndex) => {
    if (typeof col === "string") return row[col] ?? "-";
    if (col.render) return col.render(row, rowIndex);
    return row[col.key] ?? "-";
  };

  // Table wrapper
  const defaultWrapperClass =
    "overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-xl";

  // Table
  const defaultTableClass = "min-w-full divide-y divide-gray-200";

  // Header
  const defaultHeaderClass =
    "bg-gradient-to-r from-purple-50 to-purple-100 text-gray-800 font-semibold text-sm uppercase tracking-wider sticky top-0 shadow-sm";

  // Rows
  const defaultRowClass =
    "bg-white even:bg-gray-50 hover:bg-purple-50 transition-colors duration-200";

  // Cells
  const defaultCellClass =
    "px-3 sm:px-4 py-3 text-sm text-gray-700 whitespace-nowrap align-middle";

  // Pagination
  const defaultPaginationClass =
    "flex justify-center items-center gap-2 py-3 border-t border-gray-200 flex-wrap";
  const defaultPaginationBtnClass =
    "flex items-center gap-1 bg-blue-500 text-white px-2.5 py-1.5 rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-40 transition-all text-sm";
  const defaultPaginationActiveClass =
    "px-3 py-1 rounded-full bg-blue-600 text-white shadow-lg transition-all text-sm";

  return (
    <div className={`${defaultWrapperClass} ${tableWrapperClass}`}>
      <table className={`${defaultTableClass} ${tableClass}`}>
        <thead className={headerClass || defaultHeaderClass}>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={typeof col === "string" ? col : col.key || idx}
                className="px-3 sm:px-4 py-2 text-left text-sm font-semibold uppercase tracking-wide whitespace-nowrap"
              >
                {getColumnLabel(col)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rIdx) => (
              <tr key={rIdx} className={`${rowClass || defaultRowClass}`}>
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className={`${defaultCellClass} ${cellClass}`}>
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
        <div className={`${defaultPaginationClass} ${paginationClass}`}>
          <button
            onClick={() => paginationHandler("prev")}
            disabled={currentPage === 1}
            className={paginationBtnClass || defaultPaginationBtnClass}
          >
            <FaChevronLeft /> Prev
          </button>

          <div className="flex gap-1 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={
                  page === currentPage
                    ? paginationActiveClass || defaultPaginationActiveClass
                    : "px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-blue-200 transition-all"
                }
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginationHandler("next")}
            disabled={currentPage === totalPages}
            className={paginationBtnClass || defaultPaginationBtnClass}
          >
            Next <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
