import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import AdminReport from './pages/AdminReport'; 


function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div className="flex flex-col h-screen">
				<Header />

				<div className="flex grow overflow-hidden">
					<Sidebar />
					<main className="flex-1 p-8 overflow-y-auto">
					</main>
				</div>

			</div>
			      {/* Render the AdminReport component */}
      <AdminReport />
		</>
	);
}

export default App;
