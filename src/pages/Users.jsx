import { useState, useEffect, useMemo } from "react";
import Table from "../components/Table";
import { TopUpModal } from "../components/TopUpModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGet } from "../hooks/useGet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { usePost } from "../hooks/usePost";
const ConformationBox = ({ onYes, onNo }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={onYes}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Yes
          </button>

          <button
            onClick={onNo}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const Users = () => {
  const navigate = useNavigate();
  const { getData, deleteData } = useAuth();

  const [isAlert, setIsAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    data: merchantsData,
    loading: loadingMerchants,
    error,
  } = useGet("/get-merchants");

  const [openTopUpModal, setOpenTopUpModal] = useState(false);
  const [topUpModalData, setTopUpModalData] = useState(null);

  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [userId, setUserId] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
  });

  const endpoint = useMemo(() => {
    return `/delete-merchant/${deleteId}`;
  }, [deleteId]);
  const { execute: deleteUser } = usePost(`${endpoint}`);

  const columns = [
    "User ID",
    "Name",
    "Email",
    "Amount",
    "Top Up",
    "Actions",
    "account_status",
  ];

  // -----------------------------
  // DELETE BUTTON → SHOW CONFIRMATION
  // -----------------------------
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsAlert(true);
  };

  // -----------------------------
  // YES BUTTON → DELETE USER
  // -----------------------------
  const confirmDelete = async () => {
    console.log("Deleting user:", deleteId);
    const res = await deleteUser();
    // Add your API delete call here
    if (res) {
      setIsAlert(false);
      setDeleteId(null);
    }
  };

  // -----------------------------
  // NO BUTTON → CLOSE ALERT
  // -----------------------------
  const cancelDelete = () => {
    setIsAlert(false);
    setDeleteId(null);
  };

  const handleEdit = () => {
    console.log("handleEdit");
  };

  // -----------------------------
  // TABLE DATA BUILDER
  // -----------------------------
  const dataWithTopUpButton = (data) =>
    data.map((item, index) => ({
      "User ID": item.id || index + 1,
      Name: item.name,
      Email: item.email,

      Status: (
        <span
          className={
            item?.account_status
              ? "px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold"
              : "px-2 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold"
          }
        >
          {item?.account_status ? "Active" : "Inactive"}
        </span>
      ),

      Amount: `₹ ${Number(item.merchant_bbps_wallet || 0).toFixed(2)}`,

      Actions: (
        <div className="flex items-center gap-3">
          <button
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            title="Edit"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>

          <button
            className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            title="Delete"
            onClick={() => handleDelete(item.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),

      "Top Up": (
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

  // -----------------------------
  // LOAD INITIAL DATA
  // -----------------------------
  useEffect(() => {
    if (merchantsData?.status) {
      let finalData = [...merchantsData.data];

      const dataToProcess = getData("postSubmitData");
      if (dataToProcess?.newUser) {
        deleteData("postSubmitData");
        finalData.push(dataToProcess.newUser);
      }

      setOriginalData(finalData);
      setTableData(dataWithTopUpButton(finalData));
    }
    setLoading(false);
  }, [merchantsData]);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

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
      {/* FILTER SECTION */}
      <section className="mx-auto bg-white p-4 rounded-xl shadow-md border border-gray-200 mt-8 flex flex-col justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Filter Users
        </h2>

        <div className="flex flex-wrap gap-4 justify-between items-end">
          <div className="flex flex-col flex-1 min-w-[180px]">
            <label htmlFor="name" className="text-gray-700 font-medium mb-2">
              Name:
            </label>
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
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              value={filters.email}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={applyFilters}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 mt-6"
          >
            Search
          </button>
        </div>
      </section>

      {/* USERS LIST */}
      <section>
        <div className="mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8">
          {(loading || loadingMerchants) && <span>Loading...</span>}

          {!loading && !loadingMerchants && (
            <>
              <div className="flex items-center justify-between p-3">
                <span className="font-semibold">All Users List</span>
                <button
                  onClick={() => navigate("/addUser")}
                  className="bg-green-800 text-white rounded-lg px-3 py-2 h-10"
                >
                  Add Users
                </button>
              </div>

              <Table
                data={tableData}
                columns={columns}
                currentPage={1}
                rowsPerPage={10}
                isPaginationRequired={true}
              />
            </>
          )}

          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
      </section>

      {/* TOPUP MODAL */}
      {openTopUpModal && (
        <TopUpModal
          data={topUpModalData}
          isOpen={openTopUpModal}
          onClose={() => setOpenTopUpModal(false)}
        />
      )}

      {/* DELETE CONFIRMATION BOX */}
      {isAlert && <ConformationBox onYes={confirmDelete} onNo={cancelDelete} />}
    </>
  );
};

export default Users;
