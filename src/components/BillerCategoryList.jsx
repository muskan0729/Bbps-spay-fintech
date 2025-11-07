import { useState } from 'react';

const mockBillers = [
    "Assam Power Distribution Company Ltd",
    "Ajmer Vidyut Vitran Nigam Limited",
    "BESCOM - Bangalore Electricity Supply",
    "Sikkim Power - Urban",
    "Tata Play DTH",
    "ICICI Bank FASTag"
];

export const BillerCategoryList = () => {
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBillers = mockBillers.filter(biller => 
        biller.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Categories</h2>
            
            {/* Controls */}
            <div className="flex gap-3 mb-4">
                <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="shrink-0 border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="ALL">ALL</option>
                    <option value="ELECTRICITY">Electricity</option>
                    {/* Add more categories here */}
                </select>
                <input
                    type="text"
                    placeholder="Search Category"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Biller List */}
            <div className="border border-gray-200 rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
                {filteredBillers.map((biller, index) => (
                    <div 
                        key={index} 
                        className="p-3 text-sm border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition duration-100"
                    >
                        {biller}
                    </div>
                ))}
            </div>
        </div>
    );
};