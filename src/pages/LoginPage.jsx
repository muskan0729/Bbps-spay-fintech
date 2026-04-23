import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginIllustration from "../images/loginbg.jpg";
import { usePost } from "../hooks/usePost";
import { useCookies } from "react-cookie";
//9284210056
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);
  const { data, loading, error, execute: login } = usePost("/login"); // Initialize hook correctly
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setErrorMsg(error?.message);
  }, [error]);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Enter your credentials");
      return;
    }
    try {
      const body = { email: email, password: password };

      const res = await login(body);

      setCookie("token", res.token, {
        path: "/",
      });
      setCookie("role", res.user.role_id, {
        path: "/",
      });
      setCookie("user", res.user, {
        path: "/",
      });

      navigate("/dashboard");
    } catch (err) {
      const message = errorMsg || "Something went wrong";
      // setErrorMsg(message);
      // alert(message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full transition-transform duration-300 hover:scale-[1.01]">
        {/* Illustration */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-10">
          <img
            src={LoginIllustration}
            alt="Login Illustration"
            className="max-h-80 w-full object-contain"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 px-10 py-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-8">Please sign in to your account</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Password */}
            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide"
              >
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />

              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {errorMsg}
              </p>
            )}

            {/* Register Link */}
            {/* <p className="text-sm text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 font-medium hover:text-blue-700 underline"
          >
            Register
          </a>
        </p> */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-md
            ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
            }`}
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
