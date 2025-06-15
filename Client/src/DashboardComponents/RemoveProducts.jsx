import React, { useState, useContext } from 'react'
import { FaTrashAlt, FaSpinner, FaInfoCircle } from 'react-icons/fa'
import { API_URL } from '../utils/api'
import { ProductsContext } from '../context/ProductsContext'

export const RemoveProducts = () => {
  const { products, removeProduct } = useContext(ProductsContext);
  const [loadingId, setLoadingId] = useState(null)
  const [message, setMessage] = useState({ type: '', content: '' })

  const handleRemove = async (id) => {
    setLoadingId(id)
    setMessage({ type: '', content: '' })
    try {
      const result = await removeProduct(id);
      if (result.success) {
        setMessage({ type: 'success', content: 'Product removed successfully!' })
      } else {
        throw new Error(result.error || 'Failed to remove product')
      }
    } catch (err) {
      setMessage({ type: 'error', content: err.message })
    } finally {
      setLoadingId(null)
    }
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <FaInfoCircle size={48} className="text-purple-400 mb-2" />
        <p>No products found.</p>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-purple-50 via-purple-100 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-purple-800">
          Manage Products
        </h2>

        {message.content && (
          <div
            className={`p-3 rounded-md text-sm text-center ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.content}
          </div>
        )}

        {products.map(({ _id, title, price, image }) => (
          <div
            key={_id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4 flex-grow">
              <img
                src={
                  image
                    ? `${API_URL}/uploads/${image}`
                    : 'https://via.placeholder.com/80?text=No+Image'
                }
                alt={title}
                className="w-auto h-16 md:w-auto md:h-20 rounded object-cover bg-gray-200 flex-shrink-0"
                onError={e => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src =
                    'https://via.placeholder.com/80?text=Error'
                }}
              />
              <div className="min-w-0">
                <h3
                  className="text-lg font-semibold text-purple-800 truncate"
                  title={title}
                >
                  {title}
                </h3>
                <p className="text-sm text-gray-600">
                  ${Number(price).toFixed(2)}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(_id)}
              disabled={loadingId === _id}
              className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-150 flex items-center"
            >
              {loadingId === _id ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Removing...
                </>
              ) : (
                <>
                  <FaTrashAlt className="mr-2" />
                  Remove
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
