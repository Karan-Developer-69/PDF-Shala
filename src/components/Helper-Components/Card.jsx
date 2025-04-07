export const Card = ({ product,  setCartProducts }) => {
  const handleAddToCart = (product) => {
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
  };

  return (
    <div
      key={product.id}
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col h-full"
    >
      {/* Image */}
      <div className="h-40 w-full">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-gray-800 mb-2">{product.title}</h3>

        <div className="mt-2 flex items-center mb-2">
          <span className="text-yellow-400 mr-2">
            {"★".repeat(Math.floor(product.rating))}
            {"☆".repeat(5 - Math.floor(product.rating))}
          </span>
          <span className="text-gray-500 text-sm">({product.reviews})</span>
        </div>

        <p className="text-lg font-bold text-purple-600 mb-4">
          {product.price} ₹
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Button always at bottom */}
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-500 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
