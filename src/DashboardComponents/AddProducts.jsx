import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddProducts = () => {
  // Create state to hold form data
  const [product, setProduct] = useState({
    image: '',
    title: '',
    price: '',
    rating: 0,
    reviews: 0,
    qty: 1,
    downloads: 0
  });
  
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your API call or state update logic
    console.log("Added product:", product);
    // For example, redirect after saving the product:
    navigate('/admin/products');
  };

  return (
    <div className="min-h-screen bg-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-purple-700">Image URL</label>
            <input
              type="url"
              name="image"
              id="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-purple-700">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-purple-700">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

