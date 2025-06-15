import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import { API_URL } from '../utils/api';
import { FaTimes, FaExpand, FaCompress } from 'react-icons/fa';

// --- Animation Variants ---

// Variants for the overall section container
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      // Stagger the children (grid items)
      when: "beforeChildren", // Animate container before children
      staggerChildren: 0.1, // Delay between each child animation
    },
  },
};

// Variants for each card within the grid
const cardVariants = {
  hidden: { opacity: 0, y: 20 }, // Start slightly down and invisible
  visible: {
    opacity: 1,
    y: 0, // Animate to original position and fully visible
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const LaibraryPage = ({ userProducts }) => {
  const viewerContainer = useRef(null);
  const pdfViewerdiv = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);

  const handleReadNow = (pdf) => {
    const src = `${API_URL}/uploads/${pdf.pdf}#toolbar=0&navpanes=0&scrollbar=0`;
    viewerContainer.current.src = src;
    setCurrentPdf(pdf);
    pdfViewerdiv.current.classList.remove("hidden");
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const handleClose = () => {
    pdfViewerdiv.current.classList.add("hidden");
    setCurrentPdf(null);
    document.body.style.overflow = 'auto'; // Restore background scrolling
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      pdfViewerdiv.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <motion.div
      className="px-4 py-8 md:px-8 lg:px-12 space-y-16 min-h-screen"
    >
      {/* Purchased PDFs Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold text-purple-700 mb-8" // Slightly darker purple, larger size, more margin
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }} // Delay title slightly
        >
          🛒 Your Purchased PDFs
        </motion.h1>

        {userProducts.length === 0 ? (
          <motion.p
            className="text-lg text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You haven't purchased any PDFs yet. Explore our collection!
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" // Increased gap
          >
            {/* PDF Viewer Modal */}
            <div 
              ref={pdfViewerdiv} 
              className='hidden fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col'
            >
              {/* Viewer Header */}
              <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
                <h2 className="text-lg font-semibold truncate">
                  {currentPdf?.title || 'PDF Viewer'}
                </h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? <FaCompress /> : <FaExpand />}
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-red-600 rounded-full transition-colors"
                    title="Close Viewer"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 relative">
                <iframe
                  ref={viewerContainer}
                  className="w-full h-full absolute inset-0"
                  title="PDF Viewer"
                />
              </div>
            </div>
            
            {userProducts.map((pdf) => (
              <motion.div
                key={pdf.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer" // Added overflow-hidden
                variants={cardVariants} // Apply individual card animation
                whileHover={{
                  y: -10, // Lift effect
                  scale: 1.03, // Slight zoom
                  boxShadow: "0 15px 25px -5px rgba(128, 90, 213, 0.3), 0 8px 10px -6px rgba(128, 90, 213, 0.2)", // Enhanced purple-tinted shadow
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }} // Spring physics for hover
              >
                <img
                  src={`${API_URL}/uploads/${pdf.image}`}
                  alt={pdf.title}
                  className="w-full h-48 object-cover" // Slightly taller image
                />
                <div className="p-5"> {/* Increased padding */}
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {pdf.title}
                  </h2>
                  <p className="text-purple-600 font-bold mb-2">{pdf.price}</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Purchased on {pdf.purchaseDate}
                  </p>
                  <motion.button
                    onClick={() => handleReadNow(pdf)}
                    className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out" // Slightly thicker button, bold text
                    whileHover={{ scale: 1.03, y: -1, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -2px rgba(99, 102, 241, 0.2)"}}
                    whileTap={{ scale: 0.95 }} // Click feedback
                    transition={{ duration: 0.2 }} // Faster transition for button interactions
                  >
                    Read Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>

    </motion.div>
  );
};

