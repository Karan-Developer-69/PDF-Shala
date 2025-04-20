// src/components/AuthPage.jsx
import React, { useContext, useState } from 'react';
import Logo from '../assets/logo.png';  // <-- your "PS" logo here
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AuthPage = ()=> {
  const [isRegister, setIsRegister] = useState(true);
  const {login, isLoggedIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      console.log('Registering:', formData);
      const success = await login({
        query:"register",
        data:formData
      });
      if (success) {
        navigate('/');
      }
    } else {
        console.log('Logging in:', {
            email: formData.email,
            password: formData.password,
        });
        const success = await login({
          query:"login",
          data:formData
        });
        if (success) {
          navigate('/');
        }
    }
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT PANEL */}
      <div className="relative flex flex-col justify-center items-start px-8 md:px-16 py-12 bg-purple-800 overflow-hidden">
        {/* Your Logo */}
        <img src={Logo} alt="PDF - SHALA Logo" className="w-24 h-24 mb-4" />

        <h2 className="text-purple-200 text-2xl md:text-3xl font-light">Welcome to</h2>
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">PDF - SHALA</h1>
        <p className="text-purple-300 max-w-sm">
          Your one‑stop solution for PDF education materials. Learn, share, and grow with us!
        </p>

        {/* bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32">
            <path
              fill="#F5F3FF"
              d="M0,32L1440,96L1440,120L0,120Z"
            />
          </svg>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative flex flex-col justify-center items-center px-8 md:px-16 py-12 bg-purple-50">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-800 text-2xl font-semibold">
              {isRegister ? 'Sign Up to PDF - SHALA' : 'Sign In to PDF - SHALA'}
            </h2>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-purple-700 hover:underline focus:outline-none text-sm"
            >
              {isRegister ? 'Already a member? Sign In' : 'New here? Sign Up'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="flex space-x-2 flex-wrap gap-2">
                <input
                  type="text"
                  name="username"
                  placeholder="First Name"
                  value={formData.username}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              name="mobileNumber"
              maxLength={10}
              minLength={10}
              placeholder="Mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            {isRegister && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            )}

            {isRegister && (
              <label className="flex items-center text-gray-600 space-x-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-purple-600"
                  required
                />
                <span className="text-sm">
                  I accept the{' '}
                  <a href="#terms" className="text-purple-700 hover:underline">
                    Terms & Privacy Policy
                  </a>
                </span>
              </label>
            )}

            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded-full hover:bg-purple-800 transition"
            >
              {isRegister ? 'Register' : 'Submit'}
            </button>
          </form>
        </div>

        
      </div>
    </div>
  );
}
