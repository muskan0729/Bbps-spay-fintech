import { useState } from "react";
import Table from "../components/Table";
import { TopUpModal } from "../components/TopUpModal";

const Users = () => {
  const [openTopUpModal, setOpenTopUpModal] = useState(false);
  const [topUpModalData, setTopUpModalData] = useState(null);
  const columns = [
    "Sr.no",
    "Txn. ID",
    "Service",
    "Category",
    "Number",
    "Amount",
    "Total Amount",
    "Status",
    "Date",
    "Actions",
  ];
  const data = [
    {
      "Sr.no": 1,
      "Txn. ID": "jkdjkj",
      Service: "ghfgh",
      Category: "vfdf",
      Number: "129389",
      Amount: 67568745,
      "Total Amount": 3234,
      Status: (
        <span className="bg-green-500 text-sm font-bold text-white p-1 px-2 rounded">
          Successful
        </span>
      ),
      Date: (
        <div>
          <div>Transaction Date: 17/02/2023 14:49 PM</div>
          <div>Updated Date: 17/02/2023 14:49 PM</div>
        </div>
      ),
      Actions: (
        <button
          onClick={() => {
            setTopUpModalData({ merchantId: 101, userId: 60 });
            setOpenTopUpModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Top Up
        </button>
      ),
    },
  ];
  return (
    <>
      <section className=" mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8 flex flex-col justify-between">
        {/* Input Fields Row */}
        <div className="flex flex-wrap gap-4 justify-between items-end">
          {/* Name */}
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label htmlFor="name" className="text-gray-700 font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label
              htmlFor="category"
              className="text-gray-700 font-medium mb-2"
            >
              Category:
            </label>
            <select
              id="category"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="water">Water</option>
              <option value="power">Power</option>
            </select>
          </div>

          {/* Operator */}
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label
              htmlFor="operator"
              className="text-gray-700 font-medium mb-2"
            >
              Operator:
            </label>
            <select
              id="operator"
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Operator</option>
              <option value="sikkim">Sikkim Power</option>
              <option value="delhi">Delhi Power</option>
            </select>
          </div>
        </div>

        {/* Search Button - Bottom Right */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300">
            Search
          </button>
        </div>
      </section>

      <section>
        <h3>All Users List</h3>
        <div>
          <Table
            data={data}
            columns={columns}
            currentPage={1}
            rowsPerPage={10}
            isPaginationRequired={true}
          />
        </div>
      </section>

      {openTopUpModal && (
        <TopUpModal
          data={topUpModalData}
          isOpen={openTopUpModal}
          onClose={() => setOpenTopUpModal(false)}
        />
      )}
    </>
  );
};

export default Users;
