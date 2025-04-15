
import { Link } from "react-router-dom";


export const CartPage = ({cartProducts,setCartProducts,setUserProducts}) => {

  const handleQtyAdd = (product) => {
    setCartProducts((items) => {
      // Find if this product is already in the cart
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
        // Map over items, increment qty for the matching one
        return items.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        // Not in cart yet — add with qty:1
        return [...items, { ...product, qty: 1 }];
      }
    });
  };

  const handleQtySub = (product) => {
    setCartProducts((items) => {
      return items.map((item) => {
        if (item.id !== product.id) return item;
        return {
          ...item,
          qty: Math.max(1, item.qty - 1)
        };
      });
    });
  };
  
  const handleRemoveToCart = (id) => {
    setCartProducts((c) => c.filter((item) => item.id !== id));
  };

  const handleBuy = ()=>{
    const products = cartProducts.map(product=>(
        {
            id: product.id,
            title: product.title,
            downloadDate: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`,
            image: product.image,
        }
      )
    )
    setUserProducts(products)
    setCartProducts([])
  }

  const itemsTotal = cartProducts.reduce((sum, item) => sum + item.price * item.qty, 0);
  const grandTotal = itemsTotal ;

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto flex flex-col lg:flex-row  bg-white">
        {/* Cart Items */}
        <div className="w-full lg:w-3/4 p-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartProducts.length} Items</h2>
          </div>

          {/* Header Row */}
          <div className="flex mt-10 mb-5 text-gray-600 text-xs uppercase font-semibold">
            <div className="w-2/5">Product Details</div>
            <div className="w-1/5 text-center">Quantity</div>
            <div className="w-1/5 text-center">Price</div>
            <div className="w-1/5 text-center">Total</div>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {cartProducts.map((item) => (
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
                    <span className="font-bold text-sm block">{item.title}</span>
                    <button
                      onClick={() => handleRemoveToCart(item.id)}
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between w-full md:w-1/5 mb-4 md:mb-0">
                  <button
                    onClick={() => handleQtySub(item)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 448 512">
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                    </svg>
                  </button>

                  <input
                    className="mx-2 border text-center w-10"
                    type="text"
                    value={item.qty}
                    readOnly
                  />

                  <button
                    onClick={() => handleQtyAdd(item)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/>
                    </svg>
                  </button>
                </div>

                {/* Price */}
                <div className="w-full md:w-1/5 text-center mb-4 md:mb-0">
                  <span className="font-semibold text-sm">{item.price} ₹</span>
                </div>

                {/* Total */}
                <div className="w-full md:w-1/5 text-center">
                  <span className="font-semibold text-sm">
                    {(item.price * item.qty).toFixed(2)} ₹
                  </span>
                </div>
              </div>
            ))}
          </div>


          <Link
            to="/"
            className="flex font-semibold hover:text-indigo-400 text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/>
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
              {itemsTotal.toFixed(2)} ₹
            </span>
          </div>
          
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full border"
            />
          </div>
          <button  className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8 pt-6">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>{grandTotal.toFixed(2)} ₹</span>
            </div>
            <button onClick={handleBuy} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
