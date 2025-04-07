

const purchasedPDFs = [
  {
    id: 1,
    title: "React in Depth PDF",
    author: "John Doe",
    price: "₹499",
    purchaseDate: "2025-03-20",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Advanced JavaScript Guide",
    author: "Jane Smith",
    price: "₹599",
    purchaseDate: "2025-03-18",
    image: "https://via.placeholder.com/150",
  },
];

const downloadedPDFs = [
  {
    id: 1,
    title: "NCERT Biology",
    author: "NCERT",
    downloadDate: "2025-03-22",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Objective Mathematics",
    author: "RD Sharma",
    downloadDate: "2025-03-21",
    image: "https://via.placeholder.com/150",
  },
];

export const LaibraryPage = () => {
  return (
    <div className="px-4 py-6 space-y-12">
      {/* Purchased PDFs */}
      <section>
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          🛒 Purchased PDFs
        </h1>
        {purchasedPDFs.length === 0 ? (
          <p className="text-gray-500">You haven’t purchased any PDFs yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedPDFs.map((pdf) => (
              <div
                key={pdf.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={pdf.image}
                  alt={pdf.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {pdf.title}
                </h2>
                <p className="text-sm text-gray-500 mb-1">by {pdf.author}</p>
                <p className="text-purple-500 font-bold">{pdf.price}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Purchased on {pdf.purchaseDate}
                </p>
                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition">
                  Read Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Downloaded PDFs */}
      <section>
        <h1 className="text-3xl font-bold text-purple-600 mb-4">
          📥 Downloaded PDFs
        </h1>
        {downloadedPDFs.length === 0 ? (
          <p className="text-gray-500">You haven’t downloaded any PDFs yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadedPDFs.map((pdf) => (
              <div
                key={pdf.id}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={pdf.image}
                  alt={pdf.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {pdf.title}
                </h2>
                <p className="text-sm text-gray-500 mb-1">by {pdf.author}</p>
                <p className="text-sm text-gray-400">
                  Downloaded on {pdf.downloadDate}
                </p>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition">
                  Open File
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
