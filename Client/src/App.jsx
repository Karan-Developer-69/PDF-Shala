// src/App.jsx
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate,  useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from './utils/toastStyles';
import api from "./utils/api";  
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { ShoppingPage } from "./components/ShoppingPage";
import { AuthContext } from "./context/AuthContext";
import { TrendingPage } from "./components/TrendingPage";
import { LaibraryPage } from "./components/LaibraryPage";
import { CartPage } from "./components/CartPage";
import {AuthPage} from "./components/AuthPage";
import { ProductsContext } from "./context/ProductsContext";

const App = () => {
  const { isLoggedIn,login } = useContext(AuthContext);

  const {products} = useContext(ProductsContext)

  

  useEffect(()=>{
    const state = {query: 'verify'}
    login(state)
  },[])

  const [trendingProducts, setTrendingProducts] = useState([]);

  const [userProducts,setUserProducts] = useState([])
  const [cartProducts,setCartProducts] = useState([])
  
  useEffect(() => {
    // Create a fresh sorted copy whenever `products` changes
    const sorted = [...products].sort((a, b) => b.downloads - a.downloads);
    setTrendingProducts(sorted);
  }, [products]);
  let navigate = useLocation()
  
  return <>
      <ToastContainer {...toastConfig} />
      <Navbar cartProducts={cartProducts} />
      <div className={`w-full  flex flex-col ${navigate.pathname == "/auth" || navigate.pathname == "/cart" ? "md:h-[90vh] overflow-hidden" : " min-h-screen"} ${isLoggedIn ? "md:px-10" : ""} py-2`}>
        <Routes>
          {/* Public landing page */}
          <Route path="/" element={!isLoggedIn ? <LandingPage /> : <ShoppingPage products={products} setCartProducts={setCartProducts} />} />
          <Route path="/trending"  element={<TrendingPage trendingProducts={trendingProducts} setCartProducts={setCartProducts}  />} />
          <Route path="/auth"  element={<AuthPage />} />

          {/* Protected routes */}
          {isLoggedIn && (
            <>
              <Route path="/library"  element={<LaibraryPage userProducts={userProducts} setCartProducts={setCartProducts} />} />
              <Route path="/cart" element={<CartPage cartProducts={cartProducts} setUserProducts={setUserProducts} setCartProducts={setCartProducts} />} />
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
          <Route path="/8890312895/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </div>
  </>
};

export default App;
