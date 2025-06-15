// src/components/AuthPopUp.jsx


export const AuthPopUp = ({ onClose, onLogin, onSignup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Please Log In or Sign Up
        </h2>
        <p className="text-gray-600 mb-6">
          You need an account to add items to your cart.
        </p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onLogin}
            className="flex-1 bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
          >
            Log In
          </button>
          <button
            onClick={onSignup}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
          >
            Sign Up
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};
