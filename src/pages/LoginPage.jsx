import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIllustration from '../images/loginbg.jpg';
import {usePost} from '../hooks/usePost';
import {useCookies} from "react-cookie"
//9284210056
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const [cookie,setCookie]=useCookies(["token"]);
  const { data, loading ,error,execute:login} = usePost("/login"); // Initialize hook correctly

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Enter your credentials");
      return;
    }
    try {
      const body = { email:email, password:password };
    //   const endpoint = "/login";

      const res=await login( body ); // Call post here
      console.log("Login success:", res);
      setCookie("token",res.token,{
        path:"/"
      });
      navigate("/dashboard");

      // Example: navigate to dashboard
      // navigate("/dashboard");

    } catch (err) {
      // Convert error object to string safely
      const message = err.response?.data?.message || err.message || "Something went wrong";
      setErrorMsg(message);
      console.log("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">

        {/* Left Side: Illustration */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
          <img
            src={LoginIllustration}
            alt="Illustration"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">Log In</h2>

          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-8">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
                Password
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                required
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-red-500 text-sm mb-4">{errorMsg}</p>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


