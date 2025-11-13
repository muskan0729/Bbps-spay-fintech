import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIllustration from '../images/loginbg.jpg'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        navigate('/dashboard'); 
        // 🚨 Placeholder Logic: Replace this with actual API call and authentication
        if (username === 'testuser' && password === 'password') {
            // Success: Navigate to the Dashboard (the root path in your setup)
            console.log('Login successful!');
            navigate('/dashboard'); 
        } else {
            // Failure: Show error message
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full">
                
                {/* Left Side: Illustration */}
                <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
                    {/* Placeholder for the illustration */}
                    <img 
                        src={LoginIllustration} 
                        alt="Illustration of people interacting with app mockups" 
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-800">Log In</h2>
                    
                    <form onSubmit={handleLogin}>
                        {/* Username Field */}
                        <div className="mb-6">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 uppercase">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                required
                            />
                        </div>
                        
                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 text-sm mb-4">{error}</p>
                        )}

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;