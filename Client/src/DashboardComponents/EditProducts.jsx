import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';

export const EditProducts = () => {
  const { products, updateProduct } = useProducts();
  const [editedProduct, setEditedProduct] = useState(null);

  const handleEditClick = (product) => {
    setEditedProduct({...product});
  };

  const handleChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProduct(editedProduct);
    setEditedProduct(null);
  };

  const handleCancel = () => {
    setEditedProduct(null);
  };

  return (
    <div className="min-h-screen bg-purple-100 p-6">
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-6">Edit Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
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
                <td className="py-3 px-4 text-center">{product.category}</td>
                <td className="py-3 px-4 text-center">{product.price} ₹</td>
                <td className="py-3 px-4 text-center">
                  <button 
                    onClick={() => handleEditClick(product)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors duration-300"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4 text-purple-700">Edit Product</h3>
            <form onSubmit={handleSave} className="space-y-4">
              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-purple-700">Image URL</label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  value={editedProduct.image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
              </div>
              {/* PDF URL */}
              <div>
                <label htmlFor="pdf" className="block text-purple-700">Pdf URL</label>
                <input
                  type="file"
                  name="pdf"
                  id="pdf"
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
                  value={editedProduct.title}
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
                  value={editedProduct.price}
                  onChange={handleChange}
                  placeholder="Enter product price"
                  className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-2 px-4 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
