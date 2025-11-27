import React, { useState, useEffect } from "react";
import TableSkeleton from "./TableSkeleton";
import Table from "./Table";
import BarChart from "./BarChart";
import GraphSkeleton from "../components/GraphSkeleton";
import { useGet } from "../hooks/useGet";

const Admin = () => {

    /* ---------------------- API Call ---------------------- */
    const { data: tDataRaw, loading } = useGet("/bbps/all-bill-payments-test/json");
    const [tData, setTData] = useState([]);

    useEffect(() => {
        setTData(Array.isArray(tDataRaw) ? tDataRaw : []);
    }, [tDataRaw]);


    /* ---------------------- Top User Data ---------------------- */
    const userColumns = ["id", "name", "email"];
    const userRows = [
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


    /* ---------------------- Status Renderer ---------------------- */
    const renderStatus = (status) => {
        const color =
            status === "Successful"
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
        { label: "Biller ID", key: "blr_id" },
        { label: "Request ID", key: "request_id" },
        { label: "Category", key: "category" },
        { label: "Mobile Number", key: "mobile_no" },
        { label: "Amount", key: "respAmount" },
        {label: "Status",key: "txnStatus" },
        { label: "Transaction Ref", key: "txnRefID" },
        {
            label: "Response Reason",
            key: "responseReason",
            render: (row) => renderStatus(row.responseReason),
        },
        { label: "Created At", key: "created_at" },
        { label: "Updated At", key: "updated_at" },
    ];


    /* ---------------------- Chart Data ---------------------- */
    const chartId = "monthlySalesChart";
    const chartCategories = ["January", "February", "March", "April", "May", "June"];
    const chartName = "Total Earnings";
    const dataArray = [1200, 1500, 1400, 1700, 1900, 2200];


    return (
        <div>

            {/* ================= Admin Dashboard Summary ================= */}
            <section className="p-6 bg-gray-50">
                <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center sm:text-left">
                    Dashboard Summary
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard title="Total Transactions" value="1000" img="https://cdn-icons-png.flaticon.com/512/1067/1067566.png" colors="from-yellow-200 to-orange-300" />
                    <DashboardCard title="Total Pay-in" value="2780" img="https://cdn-icons-png.flaticon.com/512/2331/2331970.png" colors="from-green-300 to-emerald-400" />
                    <DashboardCard title="Total Pay-out" value="1500" img="https://cdn-icons-png.flaticon.com/512/2331/2331968.png" colors="from-red-300 to-pink-400" />
                    <DashboardCard title="Total Users" value="100" img="https://cdn-icons-png.flaticon.com/512/1077/1077012.png" colors="from-blue-300 to-indigo-400" />
                </div>
            </section>


            {/* ================= Top Users & Chart ================= */}
            <section className="p-6 bg-gray-50">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Top User Table */}
                    <div className="flex-1 bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">👥 Top User List</h2>

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
                            data={tData}
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
    <div className={`bg-gradient-to-r ${colors} shadow-md rounded-xl p-5 flex justify-between items-center text-white`}>
        <div>
            <span className="block text-sm text-black/90">{title}</span>
            <span className="text-xl font-semibold text-black">{value}</span>
        </div>
        <img src={img} alt={title} className="w-10 h-10" />
    </div>
);

export default Admin;
