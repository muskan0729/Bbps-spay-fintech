import React from "react";

const Dashboard = () => {
  const topUsers = [
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

  return (
    <>
      <section className="p-6 bg-gray-50 ">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Dashboard Summary
        </h1>

        {/* Grid layout for cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition-shadow">
            <div>
              <span className="block text-sm text-gray-500">
                Total Transactions
              </span>
              <span className="text-xl font-semibold text-gray-800">1000</span>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1067/1067566.png"
              alt="Transactions"
              className="w-10 h-10"
            />
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition-shadow">
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
          <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition-shadow">
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
          <div className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center hover:shadow-lg transition-shadow">
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
      <section className="p-6 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 🧾 Table Section */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              👥 Top User List
            </h2>
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border text-left">SR.No</th>
                  <th className="py-2 px-4 border text-left">Name</th>
                  <th className="py-2 px-4 border text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{user.id}</td>
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📊 Bar Graph Section */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-4 flex justify-center items-center">
            <h2 className="text-lg font-semibold text-gray-700">
              📊 Bar Graph Chart Section
            </h2>
            {/* You can replace this with an actual chart (like Chart.js or Recharts) */}
          </div>
        </div>
      </section>
      <section>
        <h2>Latest Transactions  List</h2>
      </section>
    </>
  );
};

export default Dashboard;
