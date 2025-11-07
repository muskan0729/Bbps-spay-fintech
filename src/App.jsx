import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

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
		</>
	);
}

export default App;
