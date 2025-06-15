// src/components/TrendingPage.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthPopUp } from "./Helper-Components/AuthPopUp"; // Ensure this component is styled well too
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCartIcon, FireIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline"; // Import icons
import { successToast } from '../utils/toastStyles'; // Assuming this provides styled toasts
import { API_URL } from "../utils/api";

// --- Animation Variants (defined directly in component) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation of each card
    },
  },
};

export const TrendingPage = ({ trendingProducts = [], setCartProducts }) => { // Added default prop
  const { isLoggedIn } = useContext(AuthContext);
  const [showAuthPopUp, setShowAuthPopUp] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowAuthPopUp(true);
    } else {
      setCartProducts((items = []) => { // Ensure items is an array
        const existingIndex = items.findIndex((item) => item.id === product.id);

        if (existingIndex > -1) {
          successToast("Item quantity updated in cart!");
          return items.map((item, index) =>
            index === existingIndex ? { ...item, qty: (item.qty || 0) + 1 } : item
          );
        } else {
          successToast("Item added to cart!");
          return [...items, { ...product, qty: 1 }];
        }
      });
    }
  };

  const handleClosePopUp = () => setShowAuthPopUp(false);
  const handleLogin = () => {
    setShowAuthPopUp(false);
    navigate('/auth');
  };
  const handleSignup = () => {
    setShowAuthPopUp(false);
    navigate('/auth');
  };

  // Loading or Empty State
  if (!trendingProducts || trendingProducts.length === 0) {
     return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-500 min-h-[60vh] flex flex-col justify-center items-center"> {/* Added min-height and centering */}
            {/* You could add a loading spinner SVG here */}
            <ArrowTrendingUpIcon className="h-12 w-12 mx-auto mb-4 text-purple-300" />
            <h2 className="text-xl font-semibold">No Trending Products Found</h2>
            <p className="mt-2">Check back later or explore other categories!</p>
        </div>
     )
  }


  return (
    // Use Tailwind utility classes directly for page styling
    <div className="bg-gradient-to-b from-white via-purple-50/30 to-purple-100/30 min-h-screen py-12 lg:py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Heading */}
        <motion.h1
          // Apply heading styles directly
          className="text-3xl sm:text-4xl font-bold text-center text-purple-800 mb-10 lg:mb-14 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FireIcon className="h-8 w-8 text-orange-500" />
          Trending PDF Resources
        </motion.h1>

        {/* Product Grid with Staggered Animation */}
        <motion.div
          // Apply grid styles directly
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {trendingProducts.map((pdf) => (
            <motion.div
              key={pdf._id}
              // Apply card styles directly using utility classes
              className="group bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100/50 flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1.5"
              variants={fadeInUp} // Animate each card
            >
              {console.log(`${API_URL}/uploads/${pdf.image}`)}
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={`${API_URL}/uploads/${pdf.image}` || 'https://png.pngtree.com/png-clipart/20230918/original/pngtree-simple-pdf-download-icon-for-business-and-marketing-vector-png-image_12328176.png'} // Purple-themed placeholder
                  alt={pdf.title || 'PDF Cover'}
                  // Apply image styles directly
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content Area */}
              {/* Apply content area styles directly */}
              <div className="p-5 flex flex-col flex-grow">
                <h2
                  // Apply title styles directly - includes line-clamp if plugin is configured
                  className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2 h-14" // Added fixed height as fallback if line-clamp not working
                  title={pdf.title}
                >
                  {pdf.title || 'Untitled PDF'}
                </h2>
                {/* Price and Downloads */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-bold text-purple-700"> {/* Price */}
                      ₹{pdf.price ? pdf.price : '0.00'}
                    </p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"> {/* Downloads */}
                        {pdf.downloads || 0}+ downloads
                    </span>
                </div>

                {/* Button - Pushed to bottom */}
                <motion.button
                  onClick={() => handleAddToCart(pdf)}
                  // Apply button styles directly
                  className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                  whileHover={{ scale: 1.03, y: -1, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -2px rgba(99, 102, 241, 0.2)"}} // Purpleish shadow on hover
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Auth PopUp */}
      {showAuthPopUp && (
        // Assuming AuthPopUp is self-contained regarding its styling or uses utilities
        <AuthPopUp
          onClose={handleClosePopUp}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
    </div>
  );
};