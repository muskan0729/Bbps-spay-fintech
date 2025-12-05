import React, { useState, useEffect } from "react";
import TableSkeleton from "./TableSkeleton";
import Table from "./Table";
import BarChart from "./BarChart";
import GraphSkeleton from "../components/GraphSkeleton";
import { useGet } from "../hooks/useGet";

const Admin = () => {
  /* ---------------------- API Call ---------------------- */
  const { data: merchantsData, loading } = useGet("/admin/dashboard-data");

  const [topUsers, setTopUsers] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [summary, setSummary] = useState({
    total_reports: 0,
    success_count: 0,
    failed_count: 0,
    total_users: 0,
  });

  useEffect(() => {
    if (merchantsData) {
      setTopUsers(
        Array.isArray(merchantsData.top_users) ? merchantsData.top_users : []
      );
      setLatestTransactions(
        Array.isArray(merchantsData.successful_reports)
          ? merchantsData.successful_reports
          : []
      );
      setMonthlyEarnings(
        Array.isArray(merchantsData.month_wise_earnings)
          ? merchantsData.month_wise_earnings
          : []
      );
      setSummary(merchantsData.summary || summary);
    }
  }, [merchantsData]);

  /* ---------------------- Top User Data ---------------------- */
  const userColumns = ["id", "name", "email", "total_payout"];

  const userRows =
    merchantsData?.top_users?.map((user) => ({
      id: user.user_id, // match 'id' column
      name: user.user_name, // match 'name' column
      email: user.user_email, // match 'email' column
      total_payout: user.total_payout, // match 'total_payout' column
    })) || [];

  /* ---------------------- Status Renderer ---------------------- */
  const renderStatus = (status) => {
    const color =
      status === "SUCCESS"
        ? "bg-green-100 text-green-700"
        : status === "FAILED"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700";

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
        {status}
      </span>
    );
  };

  /* ---------------------- Transaction Column Objects ---------------------- */
  const tColumns = [
    { label: "ID", key: "id" },
    { label: "User Name", key: "user_name" },
    { label: "Request ID", key: "request_id" },
    { label: "Category", key: "category" },
    { label: "Mobile Number", key: "mobile_no" },
    { label: "Amount", key: "respAmount" },
    { label: "Status", key: "txnStatus" },
    {
      label: "Response Reason",
      key: "responseReason",
      render: (row) => renderStatus(row.responseReason),
    },

    { label: "Created At", key: "created_at" },
    { label: "Updated At", key: "updated_at" },
    // {label:"NONE",key:"trikj"}
  ];
  // Map the API 'successful_reports' to the table rows
  // Map the API 'successful_reports' to table rows
  const mappedTransactions =
    merchantsData?.successful_reports?.map((item) => ({
      id: item.id,
      user_name: item.user_name,
      request_id: item.spay_txn_id || "-",
      category: item.product_type,
      mobile_no: item.mobile,
      respAmount: item.amount,
      txnStatus: item.status,
      responseReason: item.description,
      created_at: item.created_at,
      updated_at: item.updated_at,
    })) || [];

  /* ---------------------- Chart Data ---------------------- */
  // Get last 6 months of data
  const lastSixMonths = merchantsData?.month_wise_earnings
    ?.slice(0, 6) // adjust if your data is descending
    .reverse(); // reverse to show oldest first

  // Month names for display
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartCategories =
    lastSixMonths?.map((item) => {
      const [year, month] = item.month_year.split("-");
      return `${monthNames[parseInt(month, 10) - 1]}-${year}`; // e.g., "Dec-2025"
    }) || [];

  const dataArray =
    lastSixMonths?.map((item) => parseFloat(item.total_earning)) || [];

  const chartId = "monthlySalesChart";
  const chartName = "Total Earnings";

  return (
    <div>
      {/* ================= Admin Dashboard Summary ================= */}
      <section className="p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center sm:text-left">
          Dashboard Summary
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Transactions"
            value={summary.total_reports}
            img="https://cdn-icons-png.flaticon.com/512/1067/1067566.png"
            colors="from-yellow-200 to-orange-300"
          />
          <DashboardCard
            title="Total Success"
            value={summary.success_count}
            img="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
            colors="from-green-300 to-emerald-400"
          />
          <DashboardCard
            title="Total Failed"
            value={summary.failed_count}
            img="https://cdn-icons-png.flaticon.com/512/2331/2331968.png"
            colors="from-red-300 to-pink-400"
          />
          <DashboardCard
            title="Total Users"
            value={summary.total_users}
            img="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
            colors="from-blue-300 to-indigo-400"
          />
        </div>
      </section>

      {/* ================= Top Users & Chart ================= */}
      <section className="p-6 bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Top User Table */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
              👥 Top User List
            </h2>

            {loading ? (
              <TableSkeleton />
            ) : (
              <Table
                columns={userColumns}
                data={userRows}
                currentPage={1}
                rowsPerPage={5}
                isPaginationRequired={true}
              />
            )}
          </div>

          {/* Bar Chart */}
          <div className="flex-1 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              📊 Revenue Trend (Commission Earned)
            </h2>

            {loading ? (
              <GraphSkeleton />
            ) : (
              <BarChart
                chartId={chartId}
                chartCategories={chartCategories}
                chartName={chartName}
                dataArray={dataArray}
                chartType="bar"
              />
            )}
          </div>
        </div>
      </section>

      {/* ================= Latest Transactions Table ================= */}
      <section className="p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
            🧾 Latest Transactions
          </h2>

          {loading ? (
            <TableSkeleton />
          ) : (
            <Table
              data={mappedTransactions}
              columns={tColumns}
              currentPage={1}
              rowsPerPage={10}
              isPaginationRequired={true}
            />
          )}
        </div>
      </section>
    </div>
  );
};

/* ===================================================================
   Dashboard Card Component
=================================================================== */
const DashboardCard = ({ title, value, img, colors }) => (
  <div
    className={`bg-gradient-to-r ${colors} shadow-md rounded-xl p-5 flex justify-between items-center text-white`}
  >
    <div>
      <span className="block text-sm text-black/90">{title}</span>
      <span className="text-xl font-semibold text-black">{value}</span>
    </div>
    <img src={img} alt={title} className="w-10 h-10" />
  </div>
);

export default Admin;
