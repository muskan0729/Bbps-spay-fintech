import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import avatarImg from "../images/placeholder.jpeg";
import spayImg from "../images/placeholder.jpeg";

import { NotificationBell } from "./NotificationBell";

// const mockNotifications = [
// 	{ id: 1, message: "New report generated successfully." },
// 	{ id: 2, message: "Complaint #101 assigned to you." },
// 	{ id: 3, message: "System maintenance scheduled for 2 AM." },
// ];

export const Header = () => {
	return (
		<header className="sticky top-0 py-1 z-50 bg-white shadow-xl border-b border-blue-100">
			<div className="mx-auto px-3">
				<div className="flex justify-between items-center h-16">
					<div className="relative h-15 flex items-center justify-center">
						<img
							src={spayImg}
							alt="User avatar"
							className="w-full h-full object-cover"
						/>
					</div>

					{/* Right side - Avatar */}
					<div className="flex items-center space-x-3">
						<div className="text-amber-900">
							<FontAwesomeIcon icon={faWallet} />
						</div>
						<span className="text-gray-700 font-bold">
							₹ 5,000/-
						</span>
						<NotificationBell/>
						<div className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
							<img
								src={avatarImg}
								alt="User avatar"
								className="w-full h-full object-cover rounded-full"
							/>
						</div>
						<button className="text-blue-500 hover:text-blue-700 font-bold">
							<FontAwesomeIcon icon={faCaretDown} />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};