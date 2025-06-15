// src/components/Helper-Components/Card.jsx
import React, { useContext } from 'react'; // Import useContext if needed for AuthContext check here, otherwise remove
import { motion } from 'framer-motion';
import { ShoppingCartIcon, StarIcon as StarSolid } from '@heroicons/react/24/solid'; // Solid star for filled
import { StarIcon as StarOutline } from '@heroicons/react/24/outline'; // Outline star for empty
import { successToast } from '../../utils/toastStyles';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/api';

// --- Card Component ---
export const Card = ({ product, setCartProducts }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddToCart = (productToAdd) => {
    if (!isLoggedIn) {
      navigate('/auth'); // Or trigger a modal
      return;
    }

    setCartProducts((prevItems = []) => {
      const existingIndex = prevItems.findIndex((item) => item.id === productToAdd.id);
      if (existingIndex !== -1) {
        successToast("Item already in cart!");
      }
      else{
        successToast("Item added to cart!");
        return [...prevItems, { ...productToAdd}];
      }
    });
  };

  // --- Data Fallbacks & Formatting ---
  const {
    _id,
    image,
    title = "Untitled Product",
    rating = 0,
    reviews = 0,
    price = 0,
  } = product || {}; // Destructure safely with fallback

  const formattedPrice = price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });

  const ratingFloor = Math.max(0, Math.min(5, Math.floor(rating))); // Ensure rating is 0-5

  return (
    <motion.div
      key={_id}
      // Use layout prop for smoother animation if the card position changes in the grid
      layout
      // Apply card base styles - similar to TrendingPage card
      className="group bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100/60 flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }} // Simple fade-in up for initial load if not staggered by parent
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }} // Optional: Add exit animation if needed
      transition={{ duration: 0.4 }}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100"> {/* Added bg for loading state */}
        <img
          src={`${API_URL}/uploads/${image}` || 'https://png.pngtree.com/png-clipart/20230918/original/pngtree-simple-pdf-download-icon-for-business-and-marketing-vector-png-image_12328176.png'} // Fallback image
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Optional: You could add a badge here e.g., for 'New' or 'Bestseller' */}
        {/* <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">New</span> */}
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-5 flex flex-col flex-grow"> {/* Slightly more padding */}
        <h3
          className="text-base sm:text-lg font-semibold text-gray-800 mb-1 line-clamp-2 h-12 sm:h-14" // Adjusted height slightly
          title={title}
        >
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center text-yellow-400 mr-1.5">
            {[...Array(ratingFloor)].map((_, i) => (
              <StarSolid key={`filled-${i}`} className="h-4 w-4" />
            ))}
            {[...Array(5 - ratingFloor)].map((_, i) => (
              <StarOutline key={`outline-${i}`} className="h-4 w-4 text-gray-300" /> // Softer empty star
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>

        {/* Price */}
        <p className="text-lg sm:text-xl font-bold text-purple-700 mb-4">
        {formattedPrice}
        </p>

        {/* Button - Pushed to bottom */}
        <motion.button
          onClick={(e) => {
             e.stopPropagation(); // Prevent potential click events on parent if card is wrapped in a link
             handleAddToCart(product);
          }}
          className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out opacity-90 group-hover:opacity-100" // Slightly transparent until card hover
          whileHover={{ scale: 1.03, y: -1, opacity: 1, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -2px rgba(99, 102, 241, 0.2)"}}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          aria-label={`Add ${title} to cart`} // Better accessibility
        >
          <ShoppingCartIcon className="h-5 w-5" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};