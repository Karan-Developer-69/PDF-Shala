// src/components/TrendingPage.jsx
import  { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthPopUp } from "./Helper-Components/AuthPopUp";
import { useNavigate } from "react-router-dom";
import { successToast } from '../utils/toastStyles';



export const TrendingPage = ({trendingProducts,setCartProducts}) => {

  const { isLoggedIn } = useContext(AuthContext);
  const [showAuthPopUp, setShowAuthPopUp] = useState(false);

  const navigate = useNavigate()


  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowAuthPopUp(true);
      return;
    }else{
    setCartProducts((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        successToast("Item quantity updated!");
        return items.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        successToast("Item Added!");
        return [...items, { ...product, qty: 1 }];
      }
    });
  }
  };

  const handleClosePopUp = () => setShowAuthPopUp(false);
  const handleLogin = () => {
    setShowAuthPopUp(false);
    navigate('/auth');
  };
  const handleSignup = () => {
    setShowAuthPopUp(false);
    navigate('/auth');
  };

  return (
    <div className="px-4 py-6 relative">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">🔥 Trending PDFs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trendingProducts.map((pdf) => (
          <div
            key={pdf.id}
            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col h-full"
          >
            {/* Image */}
            <div className="h-40 w-full">
              <img
                src={pdf.image}
                alt={pdf.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{pdf.title}</h2>
            <p className="text-sm text-gray-500 mb-1">by {pdf.author}</p>
            <p className="text-purple-500 font-bold">₹{pdf.price}</p>
            <p className="text-sm text-gray-400 mt-1">
              {pdf.downloads}+ downloads
            </p>
            </div>
            <button
              onClick={() => handleAddToCart(pdf)}
              className="mt-4 w-full bg-purple-500 text-white py-2 rounded-xl hover:bg-purple-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showAuthPopUp && (
        <AuthPopUp
          onClose={handleClosePopUp}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
    </div>
  );
};
