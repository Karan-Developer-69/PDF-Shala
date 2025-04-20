


export const LaibraryPage = ({userProducts}) => {
  return (
    <div className="px-4 py-6 space-y-12">
      {/* Purchased PDFs */}
      <section>
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          🛒 Purchased PDFs
        </h1>
        {userProducts.length === 0 ? (
          <p className="text-gray-500">You haven’t purchased any PDFs yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {userProducts.map((pdf) => (
              <div
                key={pdf.id}
                className="bg-white hover:-translate-y-2 transition duration-300 rounded-2xl shadow-md  hover:shadow-lg transition"
              >
                <img
                  src={pdf.image}
                  alt={pdf.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <div className="p-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {pdf.title}
                </h2>
                <p className="text-zinc-500 font-bold">{pdf.price}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Purchased on {pdf.purchaseDate}
                </p>
                <button className="mt-4 w-full bg-[#AD46FF] text-white py-2 rounded-xl hover:bg-green-600 transition">
                  Read Now
                </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      
    </div>
  );
};
