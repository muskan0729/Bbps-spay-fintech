import React from "react";
import { useNavigate } from "react-router-dom";

const Merchent = () => {
  const navigate = useNavigate();
  const handelServiceClick = () => {
    navigate("/services");
  };
  return (
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
          <span className="block text-sm text-gray-600">IFSC: HJFHH86868</span>
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

            <div
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all shadow-sm hover:shadow-md cursor-pointer "
              onClick={() => handelServiceClick()}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1651/1651965.png"
                alt="Bill Payment"
                className="w-10 h-10 mb-2 transition-transform group-hover:scale-110"
              />
              <span className="text-gray-700 text-sm font-medium group-hover:text-blue-700">
                Bill Payment
              </span>
            </div>

            <div
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all cursor-pointer"
              onClick={() => handelServiceClick()}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/15251/15251069.png"
                alt="Post Paid"
                className="w-10 h-10 mb-2"
              />
              <span className="text-gray-700 text-sm">Post Paid</span>
            </div>

            <div
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all cursor-pointer"
              onClick={() => handelServiceClick()}
            >
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
  );
};

export default Merchent;
