// src/components/AuthPage.jsx
import React, { useContext, useState } from 'react';
import Logo from '../assets/logo.png';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserIcon, AtSymbolIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion'; 

// Define animation variants for form switching
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

const inputContainerVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeIn" } }
};


export const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!formData.agree) {
        setError("You must agree to the terms and privacy policy.");
        return;
      }
      console.log('Registering:', formData);
      try {
        const success = login({
          query: "register",
          data: formData
        });
        if (success) navigate('/');
        else setError("Registration failed. Please try again.");
      } catch (err) {
        setError(err.message || "An unexpected error occurred during registration.");
      }
    } else {
      console.log('Logging in:', { email: formData.email, password: formData.password });
      try {
        const success = login({
          query: "login",
          data: formData
        });
        if (success) navigate('/');
        else setError("Login failed. Please check your credentials.");
      } catch (err) {
        setError(err.message || "An unexpected error occurred during login.");
      }
    }
  };

  // Input classes with transitions
  const inputBaseClasses = "w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-sm hover:shadow-md focus:shadow-lg";
  const inputWithIconClasses = inputBaseClasses + " pl-10";

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-purple-50 via-indigo-50 to-gray-50">

      {/* LEFT PANEL - Animated Logo */}
      <div className="relative hidden lg:flex flex-col justify-center items-start p-12 lg:p-24 bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
        {/* Add motion.div for potential entry animation */}
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className='z-10'
        >
          {/* Add 'animate-pulse-slow' class for subtle pulse */}
          <img src={Logo} alt="PDF - SHALA Logo" className="w-28 h-28 mb-6 drop-shadow-lg animate-pulse-slow" />
          <h2 className="text-purple-200 text-3xl font-light mb-1">Welcome to</h2>
          <h1 className="text-white text-5xl font-bold mb-6 drop-shadow-md">PDF - SHALA</h1>
          <p className="text-purple-200 text-lg max-w-md leading-relaxed">
            Your premium destination for educational PDF materials. Discover, share, and elevate your learning experience.
          </p>
        </motion.div>
        {/* Optional decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 opacity-10 rounded-full -translate-x-1/4 -translate-y-1/4 filter blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400 opacity-10 rounded-full translate-x-1/4 translate-y-1/4 filter blur-2xl"></div>
      </div>

      {/* RIGHT PANEL - Animated Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16">
        {/* Add motion.div for entry animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100"
        >
          <div className="text-center mb-8">
             {/* Use AnimatePresence and motion for title changes */}
             <AnimatePresence mode="wait">
                <motion.div
                    key={isRegister ? 'registerTitle' : 'loginTitle'}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                     <h2 className="text-gray-800 text-3xl font-semibold mb-2">
                        {isRegister ? 'Create Your Account' : 'Welcome Back'}
                     </h2>
                     <p className="text-gray-500 text-sm">
                        {isRegister ? 'Join PDF - SHALA today!' : 'Sign in to continue'}
                     </p>
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Error Message Animation */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm overflow-hidden" // overflow-hidden helps with height animation
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Use AnimatePresence for smooth switching between register/login fields */}
            <AnimatePresence mode="wait">
              {isRegister ? (
                // --- Registration Fields ---
                <motion.div
                  key="registerFields"
                  variants={inputContainerVariants} // Use a slightly different animation for fields
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      <input type="text" name="username" placeholder="First Name" value={formData.username} onChange={handleChange} className={inputWithIconClasses} required />
                    </div>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className={inputWithIconClasses} required />
                    </div>
                  </div>

                  <div className="relative">
                    <AtSymbolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputWithIconClasses} required />
                  </div>

                  <div className="relative">
                    <DevicePhoneMobileIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input type="tel" name="mobileNumber" maxLength={10} minLength={10} placeholder="Mobile Number (10 digits)" pattern="[0-9]{10}" title="Please enter a 10-digit mobile number" value={formData.mobileNumber} onChange={handleChange} className={inputWithIconClasses} required />
                  </div>

                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={inputWithIconClasses} required />
                  </div>

                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className={inputWithIconClasses} required />
                  </div>

                  <label className="flex items-center text-gray-600 space-x-3 cursor-pointer group">
                    <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="form-checkbox h-5 w-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 transition duration-150 ease-in-out" />
                    <span className="text-sm select-none group-hover:text-purple-700 transition-colors">
                      I accept the{' '}
                      <a href="#terms" className="text-purple-600 hover:text-purple-800 font-medium transition underline">
                        Terms & Privacy Policy
                      </a>
                    </span>
                  </label>
                </motion.div>
              ) : (
                // --- Login Fields ---
                <motion.div
                  key="loginFields"
                  variants={inputContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  <div className="relative">
                    <AtSymbolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputWithIconClasses} required />
                  </div>

                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={inputWithIconClasses} required />
                  </div>

                  <div className="text-right text-sm">
                    <a href="#forgot-password" className="text-purple-600 hover:text-purple-800 font-medium transition hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button with enhanced animations */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 ease-in-out shadow-lg hover:shadow-xl" // Increased shadow
            >
              {isRegister ? 'Create Account' : 'Sign In'}
            </motion.button>

            <div className="text-center pt-4"> {/* Added pt-4 for spacing */}
              <p className="text-sm text-gray-600">
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(!isRegister);
                    setError(null);
                    // Consider resetting specific fields if desired when switching
                    // setFormData(prev => ({...prev, password: '', confirmPassword: '', agree: false}));
                  }}
                  className="font-medium text-purple-600 hover:text-purple-800 focus:outline-none transition hover:underline"
                >
                  {isRegister ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}


