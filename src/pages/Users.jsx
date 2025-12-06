import { useState, useEffect, useMemo } from "react";
import Table from "../components/Table";
import { TopUpModal } from "../components/TopUpModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useGet } from "../hooks/useGet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { usePost } from "../hooks/usePost";
import TableSkeleton from "../components/TableSkeleton";

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

const EditModel = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-80 p-6 rounded-xl shadow-xl text-center">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <p className="mb-4">
          You can add your edit form here for user: {user.name}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Close
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };
  const {
    data: merchantsData,
    loading: loadingMerchants,
    error,
  } = useGet(`/get-merchants?refresh=${refreshKey}`);
  const { execute: updateStatus } = usePost("/update-user-statuses");
  const [openTopUpModal, setOpenTopUpModal] = useState(false);
  const [topUpModalData, setTopUpModalData] = useState(null);

  const [originalData, setOriginalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({ name: "", email: "" });

  const endpoint = useMemo(() => `/delete-merchant/${deleteId}`, [deleteId]);
  const { execute: deleteUser } = usePost(endpoint);

  // -----------------------------
  // TOGGLE ACCOUNT STATUS
  // -----------------------------
  const handleToggleStatus = async (item) => {
    const newStatus = item.account_status ? 0 : 1;
    try {
      await updateStatus({ user_id: item.id, account_status: newStatus });
      // Update UI
      setOriginalData((prev) =>
        prev.map((u) =>
          u.id === item.id ? { ...u, account_status: newStatus } : u
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // -----------------------------
  // TABLE COLUMNS
  // -----------------------------
  const columns = [
    { label: "Actions", key: "actions" },
    { label: "User ID", key: "user_id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Amount", key: "amount" },
    { label: "Top Up", key: "top_up" },
    { label: "Account Status", key: "account_status" },
  ];

  const buildTableRows = (data) =>
    data.map((item, index) => ({
      user_id: item.id || index + 1,
      name: item.name,
      email: item.email,
      account_status: (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={item.account_status === true}
            onChange={() => handleToggleStatus(item)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-red-400 rounded-full peer peer-checked:bg-green-500 transition-all duration-300"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
          <span className="ml-3 text-sm font-medium">
            {/* {item.account_status ? "Active" : "Inactive"} */}
          </span>
        </label>
      ),
      amount: `₹ ${Number(item.merchant_bbps_wallet || 0).toFixed(2)}`,
      actions: (
        <div className="flex items-center gap-3">
          <button
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            title="Edit"
            onClick={() => {
              navigate("/UpdateUser", { state: { item } });
            }}
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
      top_up: (
        <button
          onClick={() => {
            setTopUpModalData({ merchantId: item.id });
            setOpenTopUpModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Top Up
        </button>
      ),
    }));

  // -----------------------------
  // DELETE ACTIONS
  // -----------------------------
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsAlert(true);
  };

  const confirmDelete = async () => {
    const res = await deleteUser();
    if (res?.status) {
      setIsAlert(false);
      setDeleteId(null);

      refresh();
    }
  };

  const cancelDelete = () => {
    setIsAlert(false);
    setDeleteId(null);
  };

  // -----------------------------
  // LOAD INITIAL DATA
  // -----------------------------
  useEffect(() => {
    if (merchantsData?.status) {
      let finalData = [...merchantsData.data];
      const stored = getData("postSubmitData");
      if (stored?.newUser) {
        deleteData("postSubmitData");
        finalData.push(stored.newUser);
      }
      setOriginalData(finalData);
      setTableData(buildTableRows(finalData));
    }
  }, [merchantsData]);

  // -----------------------------
  // FILTERS
  // -----------------------------
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };
  const applyFilters = () => {
    let filtered = [...originalData];
    if (filters.name)
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    if (filters.email)
      filtered = filtered.filter((item) =>
        item.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    setTableData(buildTableRows(filtered));
  };

  const tstyle = {
    tableClass:
      "min-w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden text-gray-700",
    headerClass:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white text-sm font-semibold uppercase tracking-wide shadow-inner sticky top-0",
    rowClass:
      "bg-white even:bg-gray-50 hover:bg-indigo-50/60 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl mb-2 cursor-pointer",
    cellClass:
      "py-3 px-4 text-sm font-medium first:rounded-l-xl last:rounded-r-xl",
    paginationClass:
      "bg-white/60 shadow-inner rounded-lg px-4 py-2 text-gray-700 flex items-center justify-center gap-2 mt-4",
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
          {loadingMerchants ? (
            <TableSkeleton />
          ) : (
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
                {...tstyle}
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
      {/* EDIT MODEL */}
      {selectedUser && (
        <EditModel user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
};

export default Users;
