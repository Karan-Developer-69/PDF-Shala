import React from "react";
import { Card } from "./Helper-Components/Card";

export const ShoppingPage = ({products,setCartProducts}) => {


  return (
    <div className="min-h-full ">
     

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <Card key={p.id} product={p}  setCartProducts={setCartProducts} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 mt-12">
        <div className="container mx-auto text-center text-gray-500">
          &copy; {new Date().getFullYear()} PDF SHALA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};