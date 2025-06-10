import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const BASE_URL = 'http://localhost:5000';

  // handle for submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setLoading(false)
      if (data.message) {
        toast.success(data.message);
        location.href = '/admin/home';

        // set token from api to localstorage
        localStorage.setItem("token", data.token)
      }
      if (data.error) {
        throw new Error(data.error);
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src="/login.svg"
            alt="Login Illustration"
            className="object-cover w-full h-64 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <div className="space-y-6">

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="#" className="text-sm text-orange-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex justify-center items-center"
            >
              {loading ? (<FaSpinner className="animate-spin text-lg" />) : 'Sign In'}
            </button>
            <div className="flex justify-center">
              <Link className="text-orange-600 text-center text-sm" to={'/'}>Back to Home</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;