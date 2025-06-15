// src/components/CartPage.jsx
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { successToast, errorToast } from "../utils/toastStyles";
import api, { API_URL } from "../utils/api";
import {
  TrashIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
  TagIcon,
  LockClosedIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";


export const CartPage = ({
  cartProducts = [], // Default prop
  setCartProducts,
  setUserProducts,
}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // Use navigate hook

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null); // State for payment errors

  // Available promo codes
  const promoCodes = useMemo(() => ({ // Use useMemo if codes could potentially change, otherwise just const
    "OFFER69": 0.69,
    "BINOD": 1.00, // Make it 100%
    "WELCOME50": 0.50,
    "SUMMER25": 0.25,
    "FLASH15": 0.15,
    "NEWUSER": 0.30
  }), []);

  // --- Cart Calculations ---
  const itemsTotal = useMemo(() =>
    cartProducts.reduce((sum, item) => sum + (parseFloat(item.price) || 0) * (item.qty || 1), 0),
    [cartProducts]
  );

  const discountAmount = useMemo(() =>
    appliedPromo ? itemsTotal * appliedPromo.discount : 0,
    [itemsTotal, appliedPromo]
  );

  const grandTotal = useMemo(() =>
    Math.max(0, itemsTotal - discountAmount), // Ensure total doesn't go below 0
    [itemsTotal, discountAmount]
  );

  // --- Cart Item Management ---
  
  const handleBuy = () => {
    const products = cartProducts.map(product => (
        {
            id: product._id,
            pdf: product.pdf,
            title: product.title,
            downloadDate: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
            image: product.image,
        }
      )
    );
    setUserProducts(products);
    setCartProducts([]);
    successToast("Purchase completed successfully!");
  };

  const handleRemoveFromCart = (id) => {
    setCartProducts((c) => c.filter((item) => item.id !== id));
    successToast("Item removed from cart");
  };

  // --- Promo Code ---
  const handleApplyPromoCode = () => {
    const trimmedCode = promoCode.trim().toUpperCase();
    setPaymentError(null); // Clear payment errors

    if (!trimmedCode) {
      errorToast("Please enter a promo code");
      return;
    }

    if (promoCodes[trimmedCode]) {
      const discount = promoCodes[trimmedCode];
      // Prevent applying 100% discount if total is 0
      if (discount === 1 && itemsTotal === 0) {
           errorToast("Cannot apply 100% discount to an empty cart.");
           return;
      }
      setAppliedPromo({ code: trimmedCode, discount });
      successToast(`Promo code ${trimmedCode} applied! (${(discount * 100).toFixed(0)}% off)`);
      // Grand total updates automatically via useMemo
    } else {
      errorToast("Invalid or expired promo code");
      setAppliedPromo(null); // Clear any previously applied promo
    }
  };

  const handleRemovePromo = () => {
      setAppliedPromo(null);
      setPromoCode("");
      successToast("Promo code removed.");
  }

  // --- Payment Setup ---
  const [cashfree, setCashfree] = useState(null);
  const [orderID, setOrderID] = useState(null); 

  useEffect(() => {
    async function initSdk() {
      const cf = await load({ mode: "sandbox" });
      setCashfree(cf);
    }
    initSdk();
  }, []);


  const getSessionId = async () => {
    setIsProcessingPayment(true);
    try {
      const response = await api.post("/payment/checkout", {
        amount: grandTotal.toFixed(2),
        user,
      });
      
      if (response.data) {
        console.log("response.data:",response.data)
        setOrderID(response.data.order_id);
        return response.data.payment_session_id;
      }
      
      errorToast("Failed to initialize payment");
      console.error("Invalid response:", response.data);
    } catch (err) {
      errorToast("Payment initialization error");
      console.error("Error fetching session ID:", err);
    } finally {
      setIsProcessingPayment(false);
    }
    return null;
  };

   const verifyPayment = async (orderID) => {
    setIsProcessingPayment(true);
    try {
      const response = await api.post("/payment/verify", { 
        order_id: orderID 
      });

      if (response.data?.success) {
        successToast("Payment verified successfully!");
        handleBuy();
      } else {
        errorToast("Payment verification failed");
        console.error("Payment verification failed:", response.data);
      }
    } catch (err) {
      errorToast("Error verifying payment");
      console.error("Error verifying payment:", err);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (cartProducts.length === 0) {
      errorToast("Your cart is empty");
      return;
    }
    
    if (!cashfree) {
      errorToast("Payment system is loading. Please try again.");
      return;
    }

    if (isProcessingPayment) {
      return; // Prevent multiple payment attempts
    }

    const paymentSessionId = await getSessionId();
    if (!paymentSessionId) return;

    try {
      const result = await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_model",
      });
      
      if (!result) {
        errorToast("Payment failed");
        console.error("Payment error:", result.error);
      } else {
        verifyPayment(orderID);
      }
    } catch (err) {
      errorToast("Checkout failed");
      console.error("Checkout failed:", err);
    }
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/20 via-white to-white pt-20 pb-12"> {/* Adjusted padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
             <h1 className="text-3xl sm:text-4xl font-bold text-center text-purple-800 mb-8">Your Shopping Cart</h1>
         </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items Section */}
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <div className="bg-white rounded-xl shadow-lg p-5 md:p-7">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                <h2 className="font-semibold text-xl sm:text-2xl text-gray-800">
                  Cart Items
                </h2>
                <span className="font-medium text-sm text-gray-500">
                  {cartProducts.length} item{cartProducts.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Cart Item Headers (Hidden on Small Screens) */}
              <div className="hidden md:flex text-xs uppercase text-gray-500 font-semibold mb-4 px-1">
                <span className="w-2/5 lg:w-1/2">Product</span>
                <span className="w-1/5 text-center">Quantity</span>
                <span className="w-1/5 text-center">Price</span>
                <span className="w-1/5 text-right">Total</span>
              </div>

              {/* Items List */}
              <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2"> {/* Added max-height & scroll */}
                {cartProducts.length === 0 ? (
                  <motion.div
                    className="text-center py-16 md:py-20"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  >
                    <ShoppingCartIcon className="h-16 w-16 mx-auto text-purple-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Cart is Empty</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                    <Link
                       to="/shop" // Link to your main shopping page
                       className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                       <ArrowLeftIcon className="h-4 w-4"/> Start Shopping
                    </Link>
                  </motion.div>
                ) : (
                  <AnimatePresence>
                    {cartProducts.map((item) => (
                      <motion.div
                        key={item.id}
                        layout // Enable smooth layout changes (e.g., on remove)
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }} // Slide out on remove
                        className="flex flex-col md:flex-row items-center border border-gray-100 rounded-lg p-4 gap-4 transition-shadow hover:shadow-md"
                      >
                        {/* Product Details */}
                        <div className="flex items-center w-full md:w-2/5 lg:w-1/2">
                          <img
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0 mr-4 shadow-sm"
                            src={`${API_URL}/uploads/${item.image}`|| 'https://via.placeholder.com/100/EDE9FE/6D28D9?text=PDF'}
                            alt={item.title}
                          />
                          <div className="flex-grow">
                            <span className="font-semibold text-sm sm:text-base text-gray-800 block line-clamp-2" title={item.title}>
                              {item.title || 'Untitled PDF'}
                            </span>
                             {/* Optional Author Display */}
                             {item.author && <span className="text-xs text-gray-500 block mt-0.5">by {item.author}</span>}
                          </div>
                        </div>

                        

                        {/* Price */}
                        <div className="w-auto md:w-1/5 text-center font-medium text-sm text-gray-700">
                           <span className="md:hidden text-xs text-gray-500 mr-1">Price:</span>
                           ₹{item.price || 0}
                        </div>

                        {/* Total & Remove */}
                        <div className="flex items-center justify-between w-full md:w-1/5 md:justify-end gap-4">
                           <span className="font-semibold text-sm text-purple-700 md:text-right">
                               <span className="md:hidden text-xs text-gray-500 mr-1 font-medium">Total:</span>
                               ₹{item.price || 0}
                           </span>
                           <button
                             onClick={() => handleRemoveFromCart(item.id)}
                             className="text-gray-400 hover:text-red-500 transition ml-2 md:ml-4"
                             aria-label="Remove item"
                           >
                             <TrashIcon className="h-5 w-5"/>
                           </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                  <Link
                    to="/shop" // Link to your main shopping page
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Continue Shopping
                  </Link>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-5 md:p-7 sticky top-24"> {/* Sticky summary */}
              <h2 className="font-semibold text-xl sm:text-2xl text-gray-800 border-b border-gray-200 pb-4 mb-6">
                Order Summary
              </h2>

              {/* Items Total */}
              <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-600">Items Total ({cartProducts.length})</span>
                 <span className="font-medium text-gray-800">
                     ₹{itemsTotal}
                 </span>
              </div>

              {/* Promo Code Section */}
              <div className="mb-5 pt-2">
                <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    onChange={e => setPromoCode(e.target.value)}
                    value={promoCode}
                    type="text"
                    id="promo"
                    placeholder="Enter code"
                    className="flex-grow p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm disabled:bg-gray-100"
                    disabled={!!appliedPromo || isProcessingPayment} // Disable if promo applied or processing
                  />
                  {!appliedPromo ? (
                     <button
                       onClick={handleApplyPromoCode}
                       disabled={isProcessingPayment}
                       className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-md hover:bg-purple-700 transition shadow-sm disabled:opacity-50"
                     > Apply </button>
                   ) : (
                     <button
                       onClick={handleRemovePromo}
                       disabled={isProcessingPayment}
                       className="px-2 py-2 text-red-500 hover:text-red-700 transition disabled:opacity-50"
                       aria-label="Remove promo code"
                      > <TrashIcon className="h-5 w-5"/> </button>
                   )}
                </div>
                 {/* Display Applied Promo */}
                 {appliedPromo && (
                    <div className="mt-2 text-xs text-green-600 font-medium flex items-center gap-1">
                      <TagIcon className="h-4 w-4"/>
                      <span>Code <span className="font-bold">{appliedPromo.code}</span> applied ({(appliedPromo.discount * 100).toFixed(0)}% off)</span>
                    </div>
                  )}
                 {/* Hint Text */}
                 {!appliedPromo && <p className="text-xs text-gray-400 mt-1">Available: WELCOME50, NEWUSER, etc.</p>}
              </div>

              {/* Discount Display */}
               <div className="flex justify-between mb-3 text-sm">
                <span className="text-gray-600">Discount</span>
                 <span className={`font-medium ${discountAmount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                    - ₹{discountAmount}
                 </span>
              </div>

              {/* Divider */}
              <hr className="my-5 border-gray-200"/>

              {/* Grand Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-base uppercase text-gray-800">Grand Total</span>
                <span className="font-bold text-xl text-purple-800">
                ₹{grandTotal}
                </span>
              </div>

              {/* Payment Error Display */}
              {paymentError && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-md mb-4 flex items-start gap-2"
                >
                     <InformationCircleIcon className="h-4 w-4 flex-shrink-0 mt-0.5"/>
                     <span>{paymentError}</span>
                </motion.div>
              )}

              {/* Checkout Button */}
              <motion.button
                disabled={!cashfree || cartProducts.length === 0 || isProcessingPayment || paymentError } // Disable on error too
                onClick={handleCheckout}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3 text-sm text-white uppercase rounded-lg transition duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  !cashfree || cartProducts.length === 0 || isProcessingPayment || paymentError
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                }`}
                 whileTap={(!isProcessingPayment && cartProducts.length > 0) ? { scale: 0.97 } : {}} // Only tap effect when active
              >
                <LockClosedIcon className="h-5 w-5"/>
                {isProcessingPayment ? "Processing..." : "Proceed to Checkout"}
              </motion.button>

              {/* Security Note */}
              <p className="text-xs text-gray-400 text-center mt-4">Secure payments powered by Cashfree.</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};