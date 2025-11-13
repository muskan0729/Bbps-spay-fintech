// import React from "react";
// import { FaFileExcel, FaFilePdf, FaSyncAlt } from "react-icons/fa";

// const SearchBar = ({
//   filters,
//   handleChange,
//   handleSearch,
//   exportExcel,
//   exportPDF,
//   handleReset,
//   filterFields,
// }) => {
//   return (
//     <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-6 rounded-2xl shadow-md mb-6">
//       {/* Filter Inputs */}
//       <div className="flex flex-wrap gap-6 items-end justify-between">
//         <div className="flex flex-wrap gap-4">
//           {filterFields.map((field) => (
//             <div key={field.name} className="flex flex-col w-40 sm:w-48">
//               <label className="text-gray-700 font-medium text-sm mb-1">
//                 {field.label}
//               </label>

//               {field.type === "date" ? (
//                 <input
//                   type="date"
//                   name={field.name}
//                   value={filters[field.name]}
//                   onChange={handleChange}
//                   className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg px-3 py-2 text-gray-700 text-sm shadow-sm transition-all duration-200"
//                 />
//               ) : field.type === "select" ? (
//                 <select
//                   name={field.name}
//                   value={filters[field.name]}
//                   onChange={handleChange}
//                   className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg px-3 py-2 text-gray-700 text-sm shadow-sm transition-all duration-200"
//                 >
//                   <option value="">
//                     {field.placeholder || `Select ${field.label}`}
//                   </option>
//                   {field.options.map((option) => (
//                     <option key={option} value={option}>
//                       {option}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type="text"
//                   name={field.name}
//                   value={filters[field.name]}
//                   onChange={handleChange}
//                   placeholder={field.placeholder || `Enter ${field.label}...`}
//                   className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent rounded-lg px-3 py-2 text-gray-700 text-sm shadow-sm transition-all duration-200"
//                 />
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-3 mt-4 sm:mt-0">
//           {/* Search Button */}
//           <button
//             onClick={handleSearch}
//             className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:shadow-blue-300/40 transition-all duration-200 transform hover:scale-105"
//           >
//             Search
//           </button>


//           {/* Reset Icon */}
//           {handleReset && (
//             <button
//               onClick={handleReset}
//               title="Reset Filters"
//               className="text-gray-500 hover:text-blue-600 text-xl transition-transform transform hover:rotate-180 duration-300"
//             >
//               <FaSyncAlt />
//             </button>
//           )}

//           {/* Excel Export */}
//           {exportExcel && (
//             <button
//               onClick={exportExcel}
//               aria-label="Export to Excel"
//               className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2.5 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
//             >
//               <FaFileExcel className="text-lg" />
//               <span className="hidden sm:inline">Excel</span>
//             </button>
//           )}

//           {/* PDF Export */}
//           {exportPDF && (
//             <button
//               onClick={exportPDF}
//               aria-label="Export to PDF"
//               className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-lg shadow hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
//             >
//               <FaFilePdf className="text-lg" />
//               <span className="hidden sm:inline">PDF</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;


import React from "react";
import { FaFileExcel, FaFilePdf, FaSyncAlt, FaSearch } from "react-icons/fa";

const SearchBar = ({
  filters,
  handleChange,
  handleSearch,
  exportExcel,
  exportPDF,
  handleReset,
  filterFields,
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 p-6 rounded-2xl shadow-lg mb-6 transition-all duration-300">
      {/* Filter Inputs + Search Button */}
      <div className="flex flex-wrap items-end gap-4 justify-between">
        <div className="flex flex-wrap gap-4 items-end">
          {filterFields.map((field) => (
            <div key={field.name} className="flex flex-col w-40 sm:w-44 md:w-48">
              <label className="text-gray-700 font-medium text-sm mb-1">{field.label}</label>

              {field.type === "date" ? (
                <input
                  type="date"
                  name={field.name}
                  value={filters[field.name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm shadow-sm 
                             focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-transparent 
                             hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  value={filters[field.name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm shadow-sm 
                             focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-transparent 
                             hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                >
                  <option value="">{field.placeholder || `Select ${field.label}`}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={field.name}
                  value={filters[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || `Enter ${field.label}...`}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm shadow-sm 
                             focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-transparent 
                             hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                />
              )}
            </div>
          ))}

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md 
                       hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
          >
            <FaSearch className="text-base" /> Search
          </button>

          {/* Reset Button */}
          {handleReset && (
            <button
              onClick={handleReset}
              title="Reset Filters"
              className="text-gray-500 hover:text-blue-600 text-xl transition-transform transform hover:rotate-180 duration-300"
            >
              <FaSyncAlt />
            </button>
          )}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap justify-end gap-3 mt-4">
        {exportExcel && (
          <button
            onClick={exportExcel}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-sm 
                       hover:from-green-600 hover:to-green-700 hover:shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            <FaFileExcel className="text-base" /> Excel
          </button>
        )}
        {exportPDF && (
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl shadow-sm 
                       hover:from-red-600 hover:to-red-700 hover:shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            <FaFilePdf className="text-base" /> PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
