import React from 'react';
import { useProducts } from '../context/ProductsContext';

export const RemoveProducts = () => {
  const { products, removeProduct } = useProducts();

  const handleRemove = (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this product?");
    if (confirmed) {
      removeProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 p-6">
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">Remove Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="py-3 px-4 text-center">{product.id}</td>
                <td className="py-3 px-4 flex justify-center">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-20 h-14 object-cover rounded" 
                  />
                </td>
                <td className="py-3 px-4">{product.title}</td>
                <td className="py-3 px-4 text-center">{product.price} ₹</td>
                <td className="py-3 px-4 text-center">
                  <button 
                    onClick={() => handleRemove(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-300"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

