import React, { useState } from 'react';

export const BillerSearchForm = ({ selectedBiller }) => {
    const [contractAccount, setContractAccount] = useState('20168201901');
    const [tpin, setTpin] = useState('1234');

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Searching biller: ${selectedBiller} with account: ${contractAccount}`);
        // Add your form submission logic (e.g., API call) here
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Request Form</h2>
            
            <form onSubmit={handleSearch} className="space-y-6">
                
                {/* Biller Name Field (Read-only/Defaulted) */}
                <div>
                    <label htmlFor="billerName" className="block text-sm font-medium text-gray-700 mb-1">
                        Biller Name*
                    </label>
                    <input
                        type="text"
                        id="billerName"
                        value={selectedBiller || 'Sikkim Power - Urban'} // Example default value
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-default"
                    />
                </div>

                {/* Contract Account Number Field */}
                <div>
                    <label htmlFor="contractAccount" className="block text-sm font-medium text-gray-700 mb-1">
                        Contract Account Number*
                    </label>
                    <input
                        type="text"
                        id="contractAccount"
                        value={contractAccount}
                        onChange={(e) => setContractAccount(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* TPIN Field */}
                <div>
                    <label htmlFor="tpin" className="block text-sm font-medium text-gray-700 mb-1">
                        TPIN*
                    </label>
                    <input
                        type="password"
                        id="tpin"
                        value={tpin}
                        onChange={(e) => setTpin(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
                >
                    Search
                </button>
            </form>
        </div>
    );
};