// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LoginIllustration from '../images/loginbg.jpg';
// import usePost from '../hooks/usePost';
// //9284210056
// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const navigate = useNavigate();

//   const { data, loading ,error,post} = usePost("/login"); // Initialize hook correctly

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       alert("Enter your credentials");
//       return;
//     }

//     try {
//       const body = { email: username, password };
//     //   const endpoint = "/login";

//       const data = await post({ body }); // Call post here
//       console.log("Login success:", data);

//       // Example: navigate to dashboard
//       // navigate("/dashboard");

//     } catch (err) {
//       // Convert error object to string safely
//       const message = err.response?.data?.message || err.message || "Something went wrong";
//       setErrorMsg(message);
//       console.log("Login error:", err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">

//         {/* Left Side: Illustration */}
//         <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
//           <img
//             src={LoginIllustration}
//             alt="Illustration"
//             className="max-h-full max-w-full object-contain"
//           />
//         </div>

//         {/* Right Side: Login Form */}
//         <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
//           <h2 className="text-3xl font-semibold mb-8 text-gray-800">Log In</h2>

//           <form onSubmit={handleLogin}>
//             {/* Username Field */}
//             <div className="mb-6">
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                 required
//               />
//             </div>

//             {/* Password Field */}
//             <div className="mb-8">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
//                 Password
//               </label>
//               <input
//                 type="text"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//                 required
//               />
//             </div>

//             {/* Error Message */}
//             {errorMsg && (
//               <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
//             )}

//             {/* Sign In Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
//               disabled={loading}
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginIllustration from '../images/loginbg.jpg';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Enter your credentials");
      return;
    }

    // Call dummy login
    login({ username });

    // Navigate after login
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">

        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
          <img src={LoginIllustration} alt="Illustration"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">Log In</h2>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium uppercase mb-1">Username</label>
              <input type="text" value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg" />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium uppercase mb-1">Password</label>
              <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg" />
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Sign In
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
