import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import avatarImg from "../images/avatars/1.png";
import logo from "../images/Spaylogo.jpg";
import profilePic from "../images/avatars/1.png";
// import spayImg from "../images/placeholder.jpeg";
// import logo from  "../images/placeholder.jpeg"
// import profilePic from  "../images/placeholder.jpeg";


import { NotificationBell } from "./NotificationBell";
import { ProfileSidebar } from "./ProfileSidebar";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 py-1 z-50 bg-white shadow-xl border-b border-blue-100">
      <div className="mx-auto px-3">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo */}
          <div className="relative h-15 flex items-center justify-center cursor-pointer"
			onClick={() => {
				navigate("/dashboard"); // navigate to dashboard
				window.location.reload(); // then refresh
			}}>
            <img
            //   src={spayImg}
              src={logo}
              alt="User avatar"
              className="w-full h-full object-cover "
            />
          </div>

          {/* Right side - Wallet, Notifications, Avatar, Button */}
          <div className="flex items-center space-x-3">
            <div className="text-amber-900">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            <span className="text-gray-700 font-bold">₹ 5,000/-</span>
            <NotificationBell />

			<button
			onClick={() => setIsSidebarOpen(true)}
			className="flex items-center space-x-2 cursor-pointer focus:outline-none">
			<div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 hover:shadow-md transition">
				<img
				src={profilePic}
				alt="User avatar"
				className="w-full h-full object-cover rounded-full"
				/>
			</div>
			<FontAwesomeIcon
				icon={faCaretDown}
				className="text-blue-500 hover:text-blue-700"
			/>
			</button>
			
          </div>
        </div>
      </div>


		{/* Overlay behind sidebar */}
		{/* {isSidebarOpen && (
		<div
			className="fixed top-0 left-0 h-full w-[100%] bg-black bg-opacity-40 z-40"
			onClick={() => setIsSidebarOpen(false)}
		></div>
		)} */}

		{/* Sidebar Component */}
		<ProfileSidebar
			isOpen={isSidebarOpen}
			onClose={() => setIsSidebarOpen(false)}
		/>

	 	</header>
	);
};
