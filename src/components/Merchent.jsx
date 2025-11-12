import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "./Table";

const Merchent = () => {
  const navigate = useNavigate();
  const handelServiceClick = () => {
    navigate("/services");
  };

  //dummy data for transaction table
  const tData = [
    { "Req ID": 33, "Customer name": "ABC", "Category": "Mobile", "Bill No": 12303, "Amount": 1000, "Plan": "ACTIVE", "Date": "03-09-2025 05:57:40" },
    { "Req ID": 22, "Customer name": "EFG", "Category": "DTH", "Bill No": 12303, "Amount": 500, "Plan": "ACTIVE", "Date": "23-09-2025 05:57:40" },
    { "Req ID": 11, "Customer name": "HIJ", "Category": "mobile", "Bill No": 12303, "Amount": 250, "Plan": "ACTIVE", "Date": "23-09-2025 06:02:14" }
  ];
  const tColumns = ["Req ID", "Customer name", "Category", "Bill No", "Amount", "Plan", "Date"];

  return (
    <span>
      {/* ================= User Section ================= */}
      <section className="flex flex-col md:flex-row bg-gray-50 p-6 rounded-lg shadow-md gap-6">
        {/* Account Details */}
        <div className="flex-shrink-0 w-full md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-lg shadow-sm border border-blue-200 
hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            💳 Virtual  Account
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
        <div class="flex-1 bg-white rounded-xl shadow-lg border border-BLACK-100 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 overflow-hidden">
          {/* CURVED HEADER: Uses rounded-b-full for a deep arc effect, contained by parent's overflow-hidden */}
          <div class="relative bg-blue-600 pb-10 mb-10 rounded-b-full">
            <h1 class="text-xl font-bold text-white text-center pt-6">
              👋 Welcome Back, John Doe
            </h1>
          </div>

          <div class="px-6 pb-6 pt-0">
            <p class="text-gray-700 mb-2"><span class="font-semibold text-blue-600">Email:</span> example@example.com</p>
            <p class="text-gray-700 mb-2"><span class="font-semibold text-blue-600">Entity Type:</span> Individual</p>
            <p class="text-gray-700"><span class="font-semibold text-blue-600">Contact:</span> +123456789</p>
          </div>
        </div>
        {/* Services */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-black-100 
hover:shadow-md hover:-translate-y-1 transform transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🛠️ Services
          </h2>
          <div className="grid grid-cols-2 gap-4">

            {/* Service 1 */}
            <div
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-green-200 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 transform duration-300 cursor-pointer"
              onClick={() => handelServiceClick()}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1651/1651965.png"
                alt="Bill Payment"
                className="w-10 h-10 mb-2 transition-transform hover:scale-110"
              />
              <span className="text-gray-700 text-sm font-medium hover:text-blue-700">
                Bill Payment
              </span>
            </div>

            {/* Service 2 */}
            <div
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-yellow-200 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 transform duration-300 cursor-pointer"
              onClick={() => handelServiceClick()}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/15251/15251069.png"
                alt="Post Paid"
                className="w-10 h-10 mb-2 transition-transform hover:scale-110"
              />
              <span className="text-gray-700 text-sm font-medium hover:text-blue-700">
                Post Paid
              </span>
            </div>

            {/* Service 3 */}
            <div
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-200 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 transform duration-300 cursor-pointer"
              onClick={() => handelServiceClick()}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1813/1813217.png"
                alt="Recharge"
                className="w-10 h-10 mb-2 transition-transform hover:scale-110"
              />
              <span className="text-gray-700 text-sm font-medium hover:text-blue-700">
                Recharge
              </span>
            </div>

            {/* Service 4 */}
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
        <Table isPaginationRequired={false} rowsPerPage={3} columns={tColumns} data={tData} currentPage={1} />
      </section>
    </span>
  );
};

export default Merchent;
