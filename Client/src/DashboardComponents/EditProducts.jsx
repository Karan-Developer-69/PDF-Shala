import React, { useState, useEffect, useContext } from 'react';
import {
  FaFilePdf,
  FaDollarSign,
  FaSave,
  FaImage,
  FaTag,
  FaSpinner,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa';
import { API_URL } from '../utils/api';
import { ProductsContext } from '../context/ProductsContext';

const initialFormData = {
  title: '',
  price: '',
  newImageFile: null,
  newPdfFile: null,
  imagePreviewSrc: '',
  currentPdfName: ''
};

export const EditProducts = () => {
  const { products, updateProduct } = useContext(ProductsContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title,
        price: selectedProduct.price,
        newImageFile: null,
        newPdfFile: null,
        imagePreviewSrc: selectedProduct.image ? `${API_URL}/uploads/${selectedProduct.image}` : '',
        currentPdfName: selectedProduct.pdf || ''
      });
      setSubmitError(null);
      setSuccessMessage('');
    } else {
      setFormData(initialFormData);
    }
  }, [selectedProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          newImageFile: file,
          imagePreviewSrc: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } else if (e.target.files.length === 0) {
      setFormData(prev => ({
        ...prev,
        newImageFile: null,
        imagePreviewSrc: selectedProduct?.image ? `${API_URL}/uploads/${selectedProduct.image}` : ''
      }));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData(prev => ({
        ...prev,
        newPdfFile: file,
        currentPdfName: file.name
      }));
    } else if (e.target.files.length === 0) {
      setFormData(prev => ({
        ...prev,
        newPdfFile: null,
        currentPdfName: selectedProduct?.pdf || ''
      }));
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage('');

    if (!formData.title || !formData.price) {
      setSubmitError('Please fill in Title and Price fields.');
      return;
    }
    if (parseFloat(formData.price) <= 0) {
      setSubmitError('Price must be a positive value.');
      return;
    }

    setIsSubmitting(true);
    const dataToSubmit = new FormData();
    dataToSubmit.append('_id', selectedProduct._id);
    dataToSubmit.append('title', formData.title);
    dataToSubmit.append('price', formData.price);
    if (formData.newImageFile) {
      dataToSubmit.append('image', formData.newImageFile);
    }
    if (formData.newPdfFile) {
      dataToSubmit.append('pdf', formData.newPdfFile);
    }

    try {
      const result = await updateProduct(selectedProduct._id, dataToSubmit);
      if (result.success) {
        setSuccessMessage('Product updated successfully!');
        setSelectedProduct(null);
      } else {
        throw new Error(result.error || 'Failed to update product');
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setFormData(initialFormData);
    setSubmitError(null);
    setSuccessMessage('');
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-purple-700">Edit Products</h1>
      
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <FaInfoCircle className="text-4xl mx-auto mb-3 text-purple-400"/>
            <p className="text-lg font-semibold">No products found.</p>
            <p className="text-sm">Once you add products, they will appear here for editing.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition-colors duration-150`}
                  >
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{product.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-150"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-purple-700">Edit Product Details</h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaImage className="mr-2 text-purple-500" /> Product Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {formData.imagePreviewSrc && (
                    <img 
                      src={formData.imagePreviewSrc} 
                      className="h-20 w-32 object-cover rounded-md border border-gray-300"
                      alt="Product Preview" 
                    />
                  )}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Current: {selectedProduct.image || 'None'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaFilePdf className="mr-2 text-purple-500" /> PDF File
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <input
                    type="file"
                    name="pdf"
                    accept="application/pdf"
                    onChange={handlePdfChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Current: {selectedProduct.pdf || 'None'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaTag className="mr-2 text-purple-500" /> Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FaDollarSign className="mr-2 text-purple-500" /> Price
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {submitError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  {submitError}
                </div>
              )}

              {successMessage && (
                <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm">
                  {successMessage}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};