import React, { useState, useEffect } from "react";
import TableSkeleton from "./TableSkeleton";
import Table from "./Table";
import BarChart from "./BarChart";

const Admin = () => {
    const [isPaginationRequired] = useState(true);
    const [loading, setLoading] = useState(true);
    const columns = ["id", "name", "email"];

    const currentPage = 1;
    const rowsPerPage = 5;

    // Chart data
    const chartId = "monthlySalesChart";
    const chartCategories = ["January", "February", "March", "April", "May", "June"];
    const chartName = "Total Sales";
    const dataArray = [1200, 1500, 1400, 1700, 1900, 2200];
    const chartType = "bar";

    const data = [
        { id: 1, name: "Akash Kumar", email: "akash.kumar@gmail.com" },
        { id: 2, name: "Priya Sharma", email: "priya.sharma@outlook.com" },
        { id: 3, name: "Rohit Patel", email: "rohit.patel@yahoo.com" },
        { id: 4, name: "Neha Verma", email: "neha.verma@live.com" },
        { id: 5, name: "Sahil Mehta", email: "sahil.mehta@gmail.com" },
        { id: 6, name: "Kanak Singh", email: "kanak.singh@company.com" },
        { id: 7, name: "Ritika Das", email: "ritika.das@sample.com" },
        { id: 8, name: "Vikram Nair", email: "vikram.nair@corp.net" },
        { id: 9, name: "Anjali Gupta", email: "anjali.gupta@domain.org" },
        { id: 10, name: "Deepak Rao", email: "deepak.rao@techmail.io" },
    ];

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (<span>
        {/* ================= Admin Section ================= */}
        <section className="p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center sm:text-left">
                Dashboard Summary
            </h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition-all duration-300">
                    <div>
                        <span className="block text-sm text-gray-500">Total Transactions</span>
                        <span className="text-xl font-semibold text-gray-800">1000</span>
                    </div>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1067/1067566.png"
                        alt="Transactions"
                        className="w-10 h-10"
                    />
                </div>

                {/* Card 2 */}
                <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition-all duration-300">
                    <div>
                        <span className="block text-sm text-gray-500">Total Pay-in</span>
                        <span className="text-xl font-semibold text-green-600">2780</span>
                    </div>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
                        alt="Pay-in"
                        className="w-10 h-10"
                    />
                </div>

                {/* Card 3 */}
                <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition-all duration-300">
                    <div>
                        <span className="block text-sm text-gray-500">Total Pay-out</span>
                        <span className="text-xl font-semibold text-red-600">1500</span>
                    </div>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2331/2331968.png"
                        alt="Pay-out"
                        className="w-10 h-10"
                    />
                </div>

                {/* Card 4 */}
                <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition-all duration-300">
                    <div>
                        <span className="block text-sm text-gray-500">Total Users</span>
                        <span className="text-xl font-semibold text-blue-600">100</span>
                    </div>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                        alt="Users"
                        className="w-10 h-10"
                    />
                </div>
            </div>
        </section>
        {/* ================= Table + Chart Section ================= */}
        <section className="p-6 bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* 👥 Top User List */}
                <div className="flex-1 bg-white shadow-md rounded-lg p-4 overflow-x-auto hover:shadow-lg transition-all duration-300">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                        👥 Top User List
                    </h2>
                    {loading ? <TableSkeleton /> : <Table
                        columns={columns}
                        data={data}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        isPaginationRequired={isPaginationRequired}
                    />}
                </div>
                {/* 📊 Bar Graph Section */}
                <div className="flex-1 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                        📊 Monthly Sales Overview
                    </h2>
                    <BarChart
                        chartId={chartId}
                        chartCategories={chartCategories}
                        chartName={chartName}
                        dataArray={dataArray}
                        chartType={chartType}
                    />
                </div>
            </div>
        </section>

        {/* ================= Latest Transactions ================= */}
        <section className="p-6 bg-gray-50">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                    🧾 Latest Transactions
                </h2>
                <p className="text-gray-500">Coming soon...</p>
            </div>
        </section>
    </span>)
}

export default Admin;