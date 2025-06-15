import React, { useState, useContext } from 'react';
// Optional: Icons for inputs
import { FaFileUpload, FaImage, FaFilePdf, FaTag, FaDollarSign } from 'react-icons/fa';
import { ProductsContext } from '../context/ProductsContext';

export const AddProducts = () => {
  const { addProduct } = useContext(ProductsContext);
  // State for form inputs
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null); // Holds the File object for the image
  const [pdfFile, setPdfFile] = useState(null);     // Holds the File object for the PDF
  const [imagePreview, setImagePreview] = useState(''); // For showing image preview
  const [pdfFileName, setPdfFileName] = useState(''); // For showing selected PDF name

  // State for loading and feedback messages
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' }); // type: 'success' or 'error'

  // --- Handlers ---

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview URL
      };
      reader.readAsDataURL(file);
      setMessage({ type: '', content: '' }); // Clear previous messages
    } else {
      setImageFile(null);
      setImagePreview('');
      setMessage({ type: 'error', content: 'Please select a valid image file.' });
    }
  };

  const handlePdfChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setPdfFileName(file.name); // Show the selected file name
      setMessage({ type: '', content: '' }); // Clear previous messages
    } else {
      setPdfFile(null);
      setPdfFileName('');
      setMessage({ type: 'error', content: 'Please select a valid PDF file.' });
    }
  };

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setImageFile(null);
    setPdfFile(null);
    setImagePreview('');
    setPdfFileName('');
    // Reset the file input elements visually (important!)
    document.getElementById('image-upload').value = null;
    document.getElementById('pdf-upload').value = null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !price || !imageFile || !pdfFile) {
      setMessage({ type: 'error', content: 'Please fill in all fields and upload both files.' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', content: '' });

    // 1. Build FormData
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('image', imageFile);
    formData.append('pdf', pdfFile);

    try {
      const result = await addProduct(formData);
      if (result.success) {
        setMessage({ type: 'success', content: 'Product added successfully!' });
        resetForm();
      } else {
        throw new Error(result.error || 'Failed to add product');
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', content: err.message });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-800 mb-6 md:mb-8">
          Add New PDF Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaTag className="mr-2 text-purple-500" /> Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., Advanced React Patterns"
            />
          </div>

          {/* Price Input */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaDollarSign className="mr-2 text-purple-500" /> Price ($)
            </label>
            <input
              type="number" // Use number type for better mobile keyboards
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0.01" // Optional: minimum price
              step="0.01" // Allow cents
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., 29.99"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaImage className="mr-2 text-purple-500" /> Product Image
            </label>
            <input
              type="file"
              id="image-upload"
              name="image"
              accept="image/*" // Only accept image files
              onChange={handleImageChange}
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 transition duration-150 ease-in-out cursor-pointer"
            />
             {imagePreview && (
               <div className="mt-3 border border-gray-200 rounded-md p-2 inline-block">
                 <img src={imagePreview} alt="Image Preview" className="h-24 w-auto object-cover rounded" />
               </div>
            )}
          </div>

          {/* PDF Upload */}
          <div>
            <label htmlFor="pdf-upload" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
               <FaFilePdf className="mr-2 text-purple-500" /> Product PDF
            </label>
            <input
              type="file"
              id="pdf-upload"
              name="pdf"
              accept="application/pdf" // Only accept PDF files
              onChange={handlePdfChange}
              required
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 transition duration-150 ease-in-out cursor-pointer"
            />
            {pdfFileName && (
                <p className="mt-2 text-sm text-gray-600">Selected: <span className="font-medium text-purple-700">{pdfFileName}</span></p>
            )}
          </div>

           {/* Feedback Message Area */}
           {message.content && (
             <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
               {message.content}
             </div>
           )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading} // Disable button when loading
              className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                 <FaFileUpload className="mr-2" /> Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};