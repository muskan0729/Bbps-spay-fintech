// import React, { useState } from "react";

// const Table = ({ columns, data, rowsPerPage, isPaginationRequired }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(data.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

//   const paginationHandler = (action) => {
//     setCurrentPage((prevPage) => {
//       if (action === "prev") return Math.max(prevPage - 1, 1);
//       if (action === "next") return Math.min(prevPage + 1, totalPages);
//       return prevPage;
//     });
//   };

//   return (
//     <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
//       <table className="min-w-full table-auto divide-y divide-gray-200">
//         {/* Table Headers */}
//         <thead className="bg-gray-100 text-gray-600">
//           <tr>
//             {columns.map((col, index) => (
//               <th key={col.key || col.label || index}>{col.label || col}</th>
//             ))}
//           </tr>
//         </thead>

//         {/* Table Body */}
//         <tbody className="divide-y divide-gray-200">
//           {paginatedData.length > 0 ? (
//             paginatedData.map((item, index) => (
//               <tr key={item.RequestId || index} className="hover:bg-gray-50 cursor-pointer transition-all">
//                 {columns.map((col, colIdx) => {
//                   if (typeof col === "string") {
//                     return (
//                       <td key={colIdx} className="px-6 py-4 text-sm text-gray-700">
//                         {item[col] || "-"}
//                       </td>
//                     );
//                   }

//                   if (typeof col === "object" && col.render) {
//                     return (
//                       <td key={colIdx} className="px-6 py-4 text-sm text-gray-700">
//                         {col.render(item)}
//                       </td>
//                     );
//                   }

//                   return (
//                     <td key={colIdx} className="px-6 py-4 text-sm text-gray-700">
//                       {item[col.key] || "-"}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={columns.length || 1} className="text-center py-4 text-gray-500">
//                 No data found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       {isPaginationRequired && (
//         <div className="flex justify-between items-center mt-6">
//           <button
//             onClick={() => paginationHandler("prev")}
//             className="px-6 py-2 bg-gray-300 rounded text-sm disabled:opacity-50"
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => paginationHandler("next")}
//             className="px-6 py-2 bg-gray-300 rounded text-sm disabled:opacity-50"
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;


import React, { useState } from "react";

const Table = ({
  columns,
  data,
  rowsPerPage,
  isPaginationRequired,
  tableClass = "bg-white shadow-lg rounded-lg",
  headerClass = "bg-gray-100 text-gray-600",
  rowClass = "hover:bg-gray-50 cursor-pointer transition-all",
  paginationClass = "bg-gray-300 rounded text-sm px-4 py-2",
}) => {
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
    <div className={`overflow-x-auto ${tableClass}`}>
      <table className="min-w-full table-auto divide-y divide-gray-200">
        {/* Table Headers */}
        <thead className={headerClass}>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key || col.label || index}
                className="px-3 py-2 text-left text-xs sm:text-sm font-medium text-gray-600"
              >
                {col.label || col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr key={item.RequestId || index} className={rowClass}>
                {columns.map((col, colIdx) => {
                  if (typeof col === "string") {
                    return (
                      <td key={colIdx} className="px-3 py-2 text-xs sm:text-sm text-gray-700">
                        {item[col] || "-"}
                      </td>
                    );
                  }

                  if (typeof col === "object" && col.render) {
                    return (
                      <td key={colIdx} className="px-3 py-2 text-xs sm:text-sm text-gray-700">
                        {col.render(item)}
                      </td>
                    );
                  }

                  return (
                    <td key={colIdx} className="px-3 py-2 text-xs sm:text-sm text-gray-700">
                      {item[col.key] || "-"}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length || 1} className="text-center py-4 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {isPaginationRequired && (
        <div className={`flex justify-between items-center mt-4 ${paginationClass}`}>
          <button
            onClick={() => paginationHandler("prev")}
            className="bg-gray-400 text-white rounded px-4 py-2 text-xs sm:text-sm disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-xs sm:text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginationHandler("next")}
            className="bg-gray-400 text-white rounded px-4 py-2 text-xs sm:text-sm disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
