import React from "react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

const SearchBar = ({
  filters,
  handleChange,
  handleSearch,
  exportExcel,
  exportPDF,
  filterFields,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 justify-between items-end">
      {/* Dynamic Filters */}
      <div className="flex flex-wrap gap-4">
        {filterFields.map((field) => (
          <div key={field.name} className="w-full sm:w-auto">
            <label className="block text-sm font-medium mb-1">
              {field.label}
            </label>

            {field.type === "date" ? (
              <input
                type="date"
                name={field.name}
                value={filters[field.name]}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full sm:w-48"
              />
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={filters[field.name]}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-full sm:w-48"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={field.name}
                value={filters[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label}...`}
                className="border rounded px-3 py-2 w-full sm:w-48"
              />
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
        >
          Search
        </button>

        {/* Show export buttons only if provided */}
        {exportExcel && (
          <button
            onClick={exportExcel}
            aria-label="Export to Excel"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2 transition-all"
          >
            <FaFileExcel />
            Export Excel
          </button>
        )}

        {exportPDF && (
          <button
            onClick={exportPDF}
            aria-label="Export to PDF"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2 transition-all"
          >
            <FaFilePdf />
            Export PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
