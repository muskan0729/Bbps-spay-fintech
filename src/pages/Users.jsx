import { useState, useEffect } from "react";
import Table from "../components/Table";
import { TopUpModal } from "../components/TopUpModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGet } from "../hooks/useGet";

const Users = () => {
  const navigate = useNavigate();
  const { getData, deleteData } = useAuth();

  // Fetch merchants using useGet hook
  const { data: merchantsData, loading: loadingMerchants, error } = useGet("/get-merchants");

  const [openTopUpModal, setOpenTopUpModal] = useState(false);
  const [topUpModalData, setTopUpModalData] = useState(null);
  const [originalData, setOriginalData] = useState([]); // raw data for filtering
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
  });

  const columns = ["User ID", "Name", "Email", "Amount", "Actions"];

  // Enhance table data with Top Up button
  const dataWithTopUpButton = (data) =>
    data.map((item, index) => ({
      "User ID": item.id || index + 1,
      Name: item.name,
      Email: item.email,
      Amount: `₹ ${Number(item.merchant_bbps_wallet || 0).toFixed(2)}`,

      Actions: (
        <button
          onClick={() => {
            setTopUpModalData({ merchantId: item.id, userId: item.id });
            setOpenTopUpModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Top Up
        </button>
      ),
    }));

  // Load data after API fetch
  useEffect(() => {
    if (merchantsData?.status) {
      let finalData = [...merchantsData.data];

      // Include new user from previous page if exists
      const dataToProcess = getData("postSubmitData");
      if (dataToProcess?.newUser) {
        deleteData("postSubmitData");
        finalData.push(dataToProcess.newUser);
      }

      setOriginalData(finalData); // store raw data
      setTableData(dataWithTopUpButton(finalData));
    }
    setLoading(false);
  }, [merchantsData]);

  // Handle input/select change
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  // Apply filters manually
  const applyFilters = () => {
    let filtered = [...originalData];

    if (filters.name) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter((item) =>
        item.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

  

  

    setTableData(dataWithTopUpButton(filtered));
  };

  return (
    <>
      {/* Search / Filter Section */}
      <section className="mx-auto bg-white p-4 rounded-xl shadow-md border border-gray-200 mt-8 flex flex-col justify-between">
  {/* Section Title */}
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    Filter Users
  </h2>

  <div className="flex flex-wrap gap-4 justify-between items-end">
    <div className="flex flex-col flex-1 min-w-[180px]">
      <label htmlFor="name" className="text-gray-700 font-medium mb-2">Name:</label>
      <input
        type="text"
        id="name"
        placeholder="Enter Name"
        value={filters.name}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="flex flex-col flex-1 min-w-[180px]">
      <label htmlFor="email" className="text-gray-700 font-medium mb-2">Email:</label>
      <input
        type="email"
        id="email"
        placeholder="Enter Email"
        value={filters.email}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <div className="flex justify-end mt-6">
      <button
        onClick={applyFilters}
        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        Search
      </button>
    </div>
  </div>
</section>


      {/* Users Table Section */}
      <section>
        <div className="mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8">
          {(loading || loadingMerchants) && <span>Loading...</span>}
          {!loading && !loadingMerchants && (
            <>
              <div className="flex items-center justify-between p-3">
                <span className="font-semibold">All Users List</span>
                <button
                  onClick={() => navigate("/addUser")}
                  className="bg-green-800 text-white rounded-lg px-3 py-2 h-10 focus:ring-2 focus:ring-green-300 focus:border-green-300 outline-none"
                >
                  Add Users
                </button>
              </div>

              <div>
                <Table
                  data={tableData}
                  columns={columns}
                  currentPage={1}
                  rowsPerPage={10}
                  isPaginationRequired={true}
                />
              </div>
            </>
          )}
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
      </section>

      {/* Top Up Modal */}
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
