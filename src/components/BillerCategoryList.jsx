import { useState } from "react";

const mockBillers = [
  "Assam Power Distribution Company Ltd",
  "Ajmer Vidyut Vitran Nigam Limited",
  "BESCOM - Bangalore Electricity Supply",
  "Sikkim Power - Urban",
  "Tata Play DTH",
  "ICICI Bank FASTag",
];

export const BillerCategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBillers = mockBillers.filter((biller) =>
    biller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="bg-white p-8 rounded-xl border border-gray-300 shadow-sm 
                 hover:shadow-md hover:-translate-y-1 transform transition-all duration-300 
                 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        📂 Biller Categories
      </h2>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg py-2.5 px-3 text-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-1/3"
        >
          <option value="ALL">ALL</option>
          <option value="ELECTRICITY">Electricity</option>
          <option value="DTH">DTH</option>
          <option value="BANK">Bank</option>
        </select>

        <input
          type="text"
          placeholder="Search biller..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg py-2.5 px-3 text-sm 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
        />
      </div>

      {/* Biller List */}
      <div
        className="border border-gray-200 rounded-lg overflow-hidden 
                   max-h-[400px] overflow-y-auto divide-y divide-gray-100"
      >
        {filteredBillers.length > 0 ? (
          filteredBillers.map((biller, index) => (
            <div
              key={index}
              className="p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 
                         cursor-pointer transition-all duration-200"
            >
              {biller}
            </div>
          ))
        ) : (
          <div className="p-4 text-sm text-gray-500 text-center">
            No billers found.
          </div>
        )}
      </div>
    </div>
  );
};
