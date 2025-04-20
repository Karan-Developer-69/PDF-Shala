import React, { useState, useMemo } from "react";
import { Card } from "./Helper-Components/Card";
import { FaSearch } from "react-icons/fa";

export const ShoppingPage = ({products, setCartProducts}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  // Get unique categories from products with null check
  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      products
        .map(p => p?.category || "Uncategorized")
        .filter(Boolean)
    );
    return ["All", ...uniqueCategories];
  }, [products]);

  // Filter products based on search query, category, and price range with null checks
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (!product) return false;

      const productTitle = product.title?.toLowerCase() || "";
      const productCategory = product.category?.toLowerCase() || "uncategorized";
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch = productTitle.includes(searchLower) ||
                          productCategory.includes(searchLower);
      
      const matchesCategory = selectedCategory === "All" || 
                            product.category === selectedCategory;
      
      let matchesPrice = true;
      if (priceRange !== "All") {
        const [min, max] = priceRange.split("-").map(Number);
        const productPrice = parseInt(product.price) || 0;
        matchesPrice = productPrice >= min && productPrice <= max;
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  return (
    <div className="min-h-full">
      {/* Search and Filter Section */}
      <div className=" py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <FaSearch className="absolute left-3 top-3 text-purple-500" />
            </div>

            

            {/* Price Range Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Prices</option>
              <option value="0-500">Under ₹500</option>
              <option value="500-1000">₹500 - ₹1000</option>
              <option value="1000-2000">₹1000 - ₹2000</option>
              <option value="2000-5000">₹2000 - ₹5000</option>
              <option value="5000-10000">₹5000 - ₹10000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">All Products</h2>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(p => (
            <Card key={p.id} product={p} setCartProducts={setCartProducts} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 mt-12">
        <div className="container mx-auto text-center text-gray-500">
          &copy; {new Date().getFullYear()} PDF SHALA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};