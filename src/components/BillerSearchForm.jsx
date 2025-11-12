import React, { useState } from "react";

export const BillerSearchForm = ({ selectedBiller }) => {
  const [contractAccount, setContractAccount] = useState("");
  const [tpin, setTpin] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Biller: ${selectedBiller}, Account: ${contractAccount}`);
    // 🔹 Add your API logic here
  };

  return (
    <div
      className="bg-white p-8 rounded-xl border border-gray-300 shadow-sm 
                 hover:shadow-md hover:-translate-y-1 transform transition-all duration-300
                 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        🔍 Biller Request
      </h2>

      <form onSubmit={handleSearch} className="space-y-5">
        {/* Biller Name */}
        <div>
          <label
            htmlFor="billerName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Biller Name
          </label>
          <input
            type="text"
            id="billerName"
            value={selectedBiller || "Sikkim Power - Urban"}
            readOnly
            className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 
                       text-gray-700 cursor-default focus:ring-0 focus:border-gray-300"
          />
        </div>

        {/* Contract Account Number */}
        <div>
          <label
            htmlFor="contractAccount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Contract Account Number
          </label>
          <input
            type="text"
            id="contractAccount"
            value={contractAccount}
            onChange={(e) => setContractAccount(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Contract Number"
            required
          />
        </div>

        {/* TPIN */}
        <div>
          <label
            htmlFor="tpin"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            TPIN
          </label>
          <input
            type="password"
            id="tpin"
            value={tpin}
            onChange={(e) => setTpin(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter TPIN"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white 
                     font-semibold rounded-lg transition-all duration-200 shadow-md 
                     hover:shadow-lg"
        >
          Search Biller
        </button>
      </form>
    </div>
  );
};
