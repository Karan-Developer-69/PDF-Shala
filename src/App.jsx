// src/App.jsx
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { ShoppingPage } from "./components/ShoppingPage";
import { AuthContext } from "./context/AuthContext";
import { TrendingPage } from "./components/TrendingPage";
import { LaibraryPage } from "./components/LaibraryPage";
import { CartPage } from "./components/CartPage";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const [products, setProducts] = useState([
    { id: 1, image: 'https://picsum.photos/id/1011/300/200', title: 'React in Depth PDF', price: '499', rating: 4.7, reviews: 320, qty: 1, downloads: 20 },
    { id: 2, image: 'https://picsum.photos/id/1012/300/200', title: 'Advanced JavaScript Guide', price: '599', rating: 4.5, reviews: 210, qty: 1, downloads: 150 },
    { id: 3, image: 'https://picsum.photos/id/1013/300/200', title: 'CSS Mastery E-book', price: '399', rating: 4.3, reviews: 150, qty: 1, downloads: 150 },
    { id: 4, image: 'https://picsum.photos/id/1014/300/200', title: 'Full-Stack Bundle', price: '1299', rating: 4.8, reviews: 480, qty: 1, downloads: 125 },
  ]);

  const [trendingProducts, setTrendingProducts] = useState([]);

  const [userProducts,setUserProducts] = useState([])
  const [cartProducts,setCartProducts] = useState([])
  
  useEffect(() => {
    // Create a fresh sorted copy whenever `products` changes
    const sorted = [...products].sort((a, b) => b.downloads - a.downloads);
    setTrendingProducts(sorted);
  }, [products]);
  
  return (
    <BrowserRouter>
      <Navbar cartProducts={cartProducts} />

      <div className={`w-full min-h-screen flex flex-col ${isLoggedIn ? "md:px-10" : ""} py-2`}>
        <Routes>
          {/* Public landing page */}
          <Route path="/" element={!isLoggedIn ? <LandingPage /> : <ShoppingPage products={products} setCartProducts={setCartProducts} />} />
          <Route path="/trending"  element={<TrendingPage trendingProducts={trendingProducts} setCartProducts={setCartProducts}  />} />

          {/* Protected routes */}
          {isLoggedIn && (
            <>
              <Route path="/library"  element={<LaibraryPage userProducts={userProducts} setCartProducts={setCartProducts} />} />
              <Route path="/cart" element={<CartPage cartProducts={cartProducts} setCartProducts={setCartProducts} />} />
            </>
          )}

          {/* Login/Logout handled by Navbar actions */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <LandingPage />}
          />
          <Route
            path="/logout"
            element={<Navigate to="/" replace />}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
