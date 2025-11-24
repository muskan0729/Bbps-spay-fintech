import { useState, useEffect } from "react";
import Table from "../components/Table";
import { TopUpModal } from "../components/TopUpModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Users = () => {
	const navigate = useNavigate();
	const { getData, deleteData } = useAuth();

	const [openTopUpModal, setOpenTopUpModal] = useState(false);
	const [topUpModalData, setTopUpModalData] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(true);

	const rawData = [
		{ userId: 1, name: "Sample Name", email: "sn@example.com", amount: 675.45 },
		{ userId: 2, name: "John Doe", email: "john@example.com", amount: 999.0 },
	];

	const columns = ["User ID", "Name", "Email", "Amount", "Actions"];

	// Function to enhance table data with "Top Up" button
	const dataWithTopUpButton = (data) => {
		return data.map((item) => ({
			"User ID": item.userId,
			Name: item.name,
			Email: item.email,
			Amount: `₹ ${item.amount.toFixed(2)}`,
			Actions: (
				<button
					onClick={() => {
						setTopUpModalData({ merchantId: 101, userId: item.userId });
						setOpenTopUpModal(true);
					}}
					className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
				>
					Top Up
				</button>
			),
		}));
	};

	// Load initial data (including any new user from previous page)
	useEffect(() => {
		const timer = setTimeout(() => {
			const dataToProcess = getData("postSubmitData");
			let finalData = [...rawData];
			if (dataToProcess?.newUser) {
				deleteData("postSubmitData");
				finalData.push(dataToProcess.newUser);
			}
			setTableData(dataWithTopUpButton(finalData));
			setLoading(false);
		}, 500); // 2-second delay
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{/* Search / Filter Section */}
			<section className="mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8 flex flex-col justify-between">
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

				<div className="flex justify-end mt-6">
					<button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300">
						Search
					</button>
				</div>
			</section>

			{/* Users Table Section */}
			<section>
				<div className="mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-8">
					{loading && <span>Loading...</span>}

					{!loading && (
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
