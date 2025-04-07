import React from "react";

export const LandingPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <main className="px-4 sm:px-6 lg:px-8 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-400">
            Welcome to <span className="text-white">PDF SHALA</span>
          </h1>
          <p className="mt-4 text-white max-w-xl mx-auto">
            The best e-commerce platform for buying and selling PDFs at suitable prices.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#products"
              className="px-8 py-3 bg-purple-400 text-white rounded-lg shadow hover:bg-purple-500 transition"
            >
              Explore PDFs
            </a>
            <a
              href="#features"
              className="px-8 py-3 border-2 border-purple-400 text-purple-400 rounded-lg shadow hover:bg-purple-100 transition"
            >
              Learn More
            </a>
          </div>
        </main>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-purple-400">
            Why Choose PDF SHALA?
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1581091870622-3b06b9a7f5de?auto=format&fit=crop&w=400&q=80"
                alt="Affordable Pricing"
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-4 text-xl font-bold">Affordable Pricing</h3>
              <p className="mt-2 text-gray-600">
                Choose from a wide range of PDFs priced to fit every budget.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=400&q=80"
                alt="Secure Transactions"
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-4 text-xl font-bold">Secure Transactions</h3>
              <p className="mt-2 text-gray-600">
                We use top-notch encryption to keep your purchases safe and private.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
                alt="Wide Selection"
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-4 text-xl font-bold">Wide Selection</h3>
              <p className="mt-2 text-gray-600">
                From academic texts to professional guides, find the PDF you need.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-6 bg-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} PDF SHALA. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
