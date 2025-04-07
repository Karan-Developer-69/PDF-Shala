// src/components/TrendingPage.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthPopUp } from "./Helper-Components/AuthPopUp";



export const TrendingPage = ({trendingProducts,setCartProducts}) => {

  const { isLoggedIn, login } = useContext(AuthContext);
  const [showAuthPopUp, setShowAuthPopUp] = useState(false);


  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowAuthPopUp(true);
      return;
    }else{
    setCartProducts((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...items, { ...product, qty: 1 }];
      }
    });
  }
  };

  const handleClosePopUp = () => setShowAuthPopUp(false);
  const handleLogin = () => {
    login();
    setShowAuthPopUp(false);
  };
  const handleSignup = () => {
    // navigate to signup page or open signup form
    login(); // or your signup logic
    setShowAuthPopUp(false);
  };

  return (
    <div className="px-4 py-6 relative">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">🔥 Trending PDFs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingProducts.map((pdf) => (
          <div
            key={pdf.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src={pdf.image}
              alt={pdf.title}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{pdf.title}</h2>
            <p className="text-sm text-gray-500 mb-1">by {pdf.author}</p>
            <p className="text-purple-500 font-bold">{pdf.price}</p>
            <p className="text-sm text-gray-400 mt-1">
              {pdf.downloads}+ downloads
            </p>
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
