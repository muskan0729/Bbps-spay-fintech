import React from "react";

const TableSkeleton = ({ rows = 5, columns = 3 }) => {
  return (
    <div className="w-full animate-pulse">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i} className="px-4 py-3">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
