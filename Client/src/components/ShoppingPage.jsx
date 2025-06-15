// src/components/ShoppingPage.jsx
import React, { useState, useMemo } from "react";
import { Card } from "./Helper-Components/Card"; // Assuming Card is styled well
import { motion } from "framer-motion";
import { MagnifyingGlassIcon,  ChevronDownIcon, InboxIcon } from "@heroicons/react/24/outline"; // Import icons

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }, // Faster stagger for product cards
  },
};

export const ShoppingPage = ({ products = [], setCartProducts }) => { // Added default prop
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  // Get unique categories safely
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      (products || []) // Ensure products is an array
        .map(p => p?.category || "Uncategorized")
        .filter(Boolean) // Remove any potential null/undefined after mapping
    );
    return ["All Categories", ...uniqueCategories]; // Changed default label
  }, [products]);

  // Filter products safely
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Basic check if product object is valid
      if (!product || typeof product !== 'object') return false;

      const productTitle = product.title ? product.title.toLowerCase() : "";
      const searchLower = searchQuery.toLowerCase();

      // Improved Search Logic
      const matchesSearch = searchLower === '' || // Show all if search is empty
                            productTitle.includes(searchLower) ||
                            productCategory.includes(searchLower) 

      // Category Logic
      

      // Price Logic
      let matchesPrice = true;
      if (priceRange !== "All") {
        try {
            // More robust parsing for price range
            const [minStr, maxStr] = priceRange.split("-");
            const min = parseInt(minStr, 10);
            // Handle ranges like "5000+" by setting max to Infinity
            const max = maxStr ? parseInt(maxStr, 10) : Infinity;
            const productPrice = parseFloat(product.price) || 0; // Use parseFloat for decimals

            if (!isNaN(min) && !isNaN(max)) { // Check if parsing was successful
                matchesPrice = productPrice >= min && (max === Infinity ? true : productPrice <= max);
            } else {
                 matchesPrice = false; // Invalid range format or price
            }
        } catch (e) {
             console.error("Error parsing price range:", e);
             matchesPrice = false; // Error during parsing
        }
      }

      return matchesSearch  && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  // Base input/select styling
  const filterControlBaseClass = "w-full bg-white px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out text-gray-700 shadow-sm appearance-none"; // Added appearance-none for custom arrow
  const filterLabelBaseClass = "block text-sm font-medium text-gray-600 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/30 to-purple-100/30">
      {/* Filters Section */}
      <motion.div
        className="bg-white shadow-md sticky top-16 z-30 py-4 border-b border-gray-200" // Make filters sticky below navbar
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-6 items-end"> {/* items-end aligns labels nicely */}
            {/* Search Bar */}
            <div className="w-full md:w-auto md:flex-grow"> {/* Allow search to grow */}
              <label htmlFor="search" className={filterLabelBaseClass}>Search</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search title, category, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${filterControlBaseClass} pl-10`} // Padding for icon
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full sm:w-1/2 md:w-auto">
              <label htmlFor="category" className={filterLabelBaseClass}>Category</label>
              <div className="relative">
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`${filterControlBaseClass} pr-8`} // Padding for icon
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
               </div>
            </div>

            {/* Price Range Filter */}
             <div className="w-full sm:w-1/2 md:w-auto">
              <label htmlFor="price" className={filterLabelBaseClass}>Price Range</label>
              <div className="relative">
                  <select
                    id="price"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className={`${filterControlBaseClass} pr-8`} // Padding for icon
                  >
                    <option value="All">All Prices</option>
                    <option value="0-500">Under ₹500</option>
                    <option value="500-1000">₹500 - ₹1000</option>
                    <option value="1000-2000">₹1000 - ₹2000</option>
                    <option value="2000-5000">₹2000 - ₹5000</option>
                    <option value="5000-">₹5000+</option> {/* Handle open-ended range */}
                  </select>
                   <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
               </div>
            </div>

            

          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
            {selectedCategory === 'All Categories' ? 'All Products' : selectedCategory}
          </h2>
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products?.length || 0} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map(p => (
              // Card is wrapped in motion.div for individual animation
              <motion.div key={p.id} variants={fadeInUp}>
                 {/* Assuming Card component handles its own styling and hover effects */}
                <Card product={p} setCartProducts={setCartProducts} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
           // Enhanced "No Results" State
          <motion.div
            className="text-center py-16 md:py-24"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <InboxIcon className="h-16 w-16 mx-auto text-purple-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any products matching your current filters. Try adjusting your search or filters.
            </p>
            {/* Optional: Button to clear filters */}
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All Categories'); setPriceRange('All'); }}
              className="mt-6 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </main>

      {/* Footer can remain simple or be enhanced */}
      <footer className="bg-transparent py-6 mt-12">
        <div className="container mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PDF SHALA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};