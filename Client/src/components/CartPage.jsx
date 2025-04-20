import { Link } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { successToast, errorToast } from "../utils/toastStyles";
import api from "../utils/api";

export const CartPage = ({
  cartProducts,
  setCartProducts,
  setUserProducts,
}) => {
  const {user} = useContext(AuthContext);
  const [promoCode, setPromoCode] = useState("");
  const [grandTotal, setGrandTotal] = useState(0);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);
  
  // Available promo codes with their discount percentages
  const promoCodes = {
    "OFFER69": 0.69,
    "BINOD": 1,
    "WELCOME50": 0.50,
    "SUMMER25": 0.25,
    "FLASH15": 0.15,
    "NEWUSER": 0.30
  };

  const handleRemoveToCart = (id) => {
    setCartProducts((c) => c.filter((item) => item.id !== id));
    successToast("Item removed from cart");
  };

  const handleBuy = () => {
    const products = cartProducts.map(product => (
        {
            id: product.id,
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

  useEffect(() => {
    const total = cartProducts.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.qty,
      0
    );
    setItemsTotal(total);
    
    // If a promo is applied, calculate the discounted total
    if (appliedPromo) {
      setGrandTotal(total - (total * appliedPromo.discount));
    } else {
      setGrandTotal(total);
    }
  }, [cartProducts, appliedPromo]);

  const handlePromoCode = () => {
    const trimmedCode = promoCode.trim().toUpperCase();
    
    if (!trimmedCode) {
      errorToast("Please enter a promo code");
      return;
    }
    
    if (promoCodes[trimmedCode]) {
      const discount = promoCodes[trimmedCode];
      setAppliedPromo({ code: trimmedCode, discount });
      successToast(`Promo code ${trimmedCode} applied! (${discount * 100}% off)`);
      setGrandTotal(itemsTotal - (itemsTotal * discount));
    } else {
      errorToast("Invalid promo code");
    }
  };

  // Payment Setup Start

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
    try {
      const response = await api.post("/payment/checkout", {
        amount: grandTotal.toFixed(2),
        user,
      });
      
      const data = response.data;
      if (data.payment_session_id) {
        setOrderID(data.order_id);
        return data.payment_session_id;
      }
      console.error("Invalid response:", data);
      errorToast("Failed to initialize payment");
    } catch (err) {
      console.error("Error fetching session ID:", err);
      errorToast("Payment initialization error");
    }
  };

  const verifyPayment = async (orderID) => {
    try {
      const response = await api.post("/payment/verify", { 
        order_id: orderID 
      });

      const data = response.data;

      if (data.success) {
        successToast("Payment verified successfully!");
        handleBuy();
      } else {
        console.error("Payment verification failed:", data);
        errorToast("Payment verification failed");
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
      errorToast("Error verifying payment");
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

    const paymentSessionId = await getSessionId();
    if (!paymentSessionId) return;

    cashfree
      .checkout({
        paymentSessionId,
        redirectTarget: "_model",
      })
      .then((result) => {
        if (result.error) {
          console.error("Payment error:", result.error);
          errorToast("Payment failed");
        } else {
          verifyPayment(orderID);
        }
      })
      .catch((err) => {
        console.error("Checkout failed:", err);
        errorToast("Checkout failed");
      });
  };

  // Payment Setup End

  return (
    <div className="h-full py-10">
      <div className="container mx-auto flex flex-col lg:flex-row  bg-white">
        {/* Cart Items */}
        <div className="w-full lg:w-3/4 p-4">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">
              {cartProducts.length} Items
            </h2>
          </div>

          {/* Header Row */}
          <div className="flex mt-10 mb-5 text-gray-600 text-xs uppercase font-semibold">
            <div className="w-2/5">Product Details</div>
            <div className="w-1/5 text-center">Price</div>
          </div>

          {/* Items */}
          <div className="space-y-4 overflow-y-auto max-h-96">
            {cartProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <Link to="/" className="text-purple-600 hover:text-purple-800 mt-4 block">
                  Browse products
                </Link>
              </div>
            ) : (
              cartProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow p-4 md:p-6"
                  style={{ minHeight: "120px" }}
                >
                  {/* Product */}
                  <div className="flex items-center w-full md:w-2/5 mb-4 md:mb-0">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        className="w-full h-full object-cover rounded"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <span className="font-bold text-sm block">
                        {item.title}
                      </span>
                      <button
                        onClick={() => handleRemoveToCart(item.id)}
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                    <span className="font-semibold text-sm">₹{item.price} </span>
                  </div>

                  {/* Total */}
                </div>
              ))
            )}
          </div>

          <Link
            to="/"
            className="flex font-semibold hover:text-indigo-400 text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div id="summary" className="w-full lg:w-1/4 px-8 py-10 bg-gray-50">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cartProducts.length}
            </span>
            <span className="font-semibold text-sm">
              ₹{itemsTotal.toFixed(2)} 
            </span>
          </div>

          <div className="py-6">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              onChange={e => setPromoCode(e.target.value)}
              value={promoCode}
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full border"
            />
            <div className="text-xs text-gray-500 mt-1">
              Try: WELCOME50, SUMMER25, FLASH15, NEWUSER
            </div>
          </div>
          <button 
            onClick={handlePromoCode} 
            className="bg-purple-600 hover:bg-purple-700 px-5 py-2 text-sm text-white uppercase rounded"
          >
            Apply
          </button>
          
          {appliedPromo && (
            <div className="mt-2 text-sm text-green-600 font-medium">
              {appliedPromo.code} applied ({appliedPromo.discount * 100}% off)
            </div>
          )}
          
          <div className="border-t mt-8 pt-6">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Discount</span>
              <span className="text-green-500">
                {appliedPromo ? `-₹${(itemsTotal * appliedPromo.discount).toFixed(2)}` : "₹0.00"}
              </span>
            </div>
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
            <button
              disabled={!cashfree || cartProducts.length === 0}
              onClick={handleCheckout}
              className={`${
                !cashfree || cartProducts.length === 0 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-indigo-500 hover:bg-indigo-600"
              } font-semibold py-3 text-sm text-white uppercase w-full rounded`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
