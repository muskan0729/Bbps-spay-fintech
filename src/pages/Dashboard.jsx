import React, { useState } from "react";
import BarChart from "../components/BarChart";
import Table from "../components/Table";
import { Link } from "react-router-dom";

const Dashboard = () => {
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

  const [isAdmin, setIsAdmin] = useState(false);
  const [isPaginationRequired] = useState(true);

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];

  const currentPage = 1;
  const rowsPerPage = 5;

  // Chart data
  const chartId = "monthlySalesChart";
  const chartCategories = ["January", "February", "March", "April", "May", "June"];
  const chartName = "Total Sales";
  const dataArray = [12000, 15000, 14000, 17000, 19000, 22000];
  const chartType = "bar";

  return (
    <>
      {isAdmin ? (
        <span>
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
                <Table
                  columns={columns}
                  data={data}
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  isPaginationRequired={isPaginationRequired}
                />
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
        </span>
      ) : (
        <span>
          {/* ================= User Section ================= */}
          <section className="flex flex-col md:flex-row bg-gray-50 p-6 rounded-lg shadow-md gap-6">
            {/* Account Details */}
            <div className="flex-shrink-0 w-full md:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                💳 Account Balance
              </h3>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                ₹78,79,743.56
              </h2>
              <span className="block text-sm text-gray-600">
                Account No: 54654XFDERRDSR
              </span>
              <span className="block text-sm text-gray-600">
                IFSC: HJFHH86868
              </span>
            </div>

            {/* User Info */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                👋 Welcome Back, John Doe
              </h1>
              <p className="text-gray-600">Email: example@example.com</p>
              <p className="text-gray-600">Entity Type: Individual</p>
              <p className="text-gray-600">Contact: +123456789</p>
            </div>
            {/* Services */}
            <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🛠️ Services
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

{/* import { Link } from "react-router-dom"; */}


  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all shadow-sm hover:shadow-md cursor-pointer">
    <img
      src="https://cdn-icons-png.flaticon.com/512/1651/1651965.png"
      alt="Bill Payment"
      className="w-10 h-10 mb-2 transition-transform group-hover:scale-110"
    />
    <span className="text-gray-700 text-sm font-medium group-hover:text-blue-700">
      Bill Payment
    </span>
  </div>

                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all cursor-pointer">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/15251/15251069.png"
                    alt="Post Paid"
                    className="w-10 h-10 mb-2"
                  />
                  <span className="text-gray-700 text-sm">Post Paid</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all cursor-pointer">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1813/1813217.png"
                    alt="Recharge"
                    className="w-10 h-10 mb-2"
                  />
                  <span className="text-gray-700 text-sm">Recharge</span>
                </div>

  
          
                  <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg cursor-not-allowed opacity-70">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6581/6581218.png"
                    alt="Coming Soon"
                    className="w-10 h-10 mb-2"
                  />
                  <span className="text-gray-500 text-sm">Coming Soon</span>
                </div>                
          
              </div>
            </div>
          </section>

          {/* Latest Transactions */}
          <section className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
              🧾 Latest Transaction List
            </h2>
            <p className="text-gray-500">Coming soon...</p>
          </section>
        </span>
      )}
    </>
  );
};

export default Dashboard;
