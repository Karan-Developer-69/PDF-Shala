import { FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Homepage = () => {
  return (
    // Full screen container with a purple gradient background
    <div className="home h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 p-4">

      {/* Content Card - This will animate */}
      <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center animate-fadeInUp transform transition-all duration-300 hover:scale-105 hover:shadow-purple-300/50">

        {/* Optional Icon */}
        <FaShieldAlt className="text-purple-600 text-6xl mx-auto mb-6" />

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
          Welcome, Admin!
        </h1>

        {/* Subtitle/Description */}
        <p className="text-lg text-gray-600 mb-8">
          Manage your application settings, users, and content from here.
        </p>

        {/* Optional: Call to Action Button */}
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          <Link to={'/admin/dashboard'}>
          Go to Dashboard
          </Link>
        </button>

      </div>
    </div>
  );
};
