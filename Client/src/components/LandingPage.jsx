import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowDownIcon,
  AcademicCapIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] } // Corrected -0.01 to 0.01
  }
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

// --- Landing Page Component ---
export const LandingPage = () => {
  return (
    <div className="w-full antialiased text-gray-800 bg-white overflow-x-hidden">
      {/* --- Hero Section --- */}
      <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('./main-bg-image.avif')` }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-purple-900/85 via-indigo-800/80 to-black/85"></div>

        {/* Content */}
        <motion.main
          className="relative z-20 px-4 sm:px-6 lg:px-8 py-20 max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
            variants={fadeInUp}
          >
            <span className="block text-purple-300 drop-shadow-md">Unlock Knowledge Affordably</span>
            <span className="block text-white mt-1 sm:mt-2 drop-shadow-lg">Welcome to PDF SHALA</span>
          </motion.h1>

          <motion.p
            className="mt-4 md:mt-6 text-lg sm:text-xl text-purple-100/90 leading-relaxed"
            variants={fadeInUp}
          >
            Your ultimate source for high-quality PDFs at the <span className="font-bold text-white underline decoration-purple-400 decoration-2 underline-offset-2">lowest prices</span> online. Explore, learn, and achieve more for less.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
            variants={fadeInUp}
          >
            {/* Primary CTA */}
            <motion.button
              onClick={() => document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              Discover Why
            </motion.button>
            {/* Secondary CTA */}
            <Link
              to="/trending"
              className="px-8 py-3 border-2 border-purple-400 text-purple-300 text-base sm:text-lg font-semibold rounded-lg shadow-md transform transition duration-300 ease-in-out hover:bg-purple-400/10 hover:text-purple-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
            >
              Browse PDFs
            </Link>
          </motion.div>
        </motion.main>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <ArrowDownIcon className="h-6 w-6 text-purple-300/70" />
          </motion.div>
        </motion.div>
      </section>

      {/* --- Why Choose Us Section --- */}
      <section id="why-us" className="py-20 lg:py-28 bg-gradient-to-b from-white to-purple-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-purple-800 mb-12 lg:mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
          >
            Why <span className="text-indigo-600">PDF SHALA</span> is Your Best Choice
          </motion.h2>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          >
            {/* Feature 1: Lowest Prices */}
            <motion.div className="feature-card" variants={featureCardVariants} whileHover={{ scale: 1.03 }}>
              <div className="feature-icon bg-green-100"><CurrencyDollarIcon className="h-8 w-8 text-green-600" /></div>
              <h3 className="feature-title text-green-800">Unbeatable Prices</h3>
              <p className="feature-description">
                Access premium knowledge without breaking the bank. We guarantee the lowest prices on the market.
              </p>
            </motion.div>

            {/* Feature 2: Vast Selection */}
            <motion.div className="feature-card" variants={featureCardVariants} whileHover={{ scale: 1.03 }}>
              <div className="feature-icon bg-purple-100"><AcademicCapIcon className="h-8 w-8 text-purple-600" /></div>
              <h3 className="feature-title text-purple-800">Extensive Library</h3>
              <p className="feature-description">
                From academic papers to business templates, find exactly what you need in our diverse collection.
              </p>
            </motion.div>

            {/* Feature 3: Quality & Instant Access */}
            <motion.div className="feature-card" variants={featureCardVariants} whileHover={{ scale: 1.03 }}>
              <div className="feature-icon bg-indigo-100"><SparklesIcon className="h-8 w-8 text-indigo-600" /></div>
              <h3 className="feature-title text-indigo-800">Quality & Instant Access</h3>
              <p className="feature-description">
                Get high-quality, verified PDFs delivered instantly after secure purchase. Start learning right away!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Quote/Visual Break Section --- */}
      <section className="py-20 lg:py-28 bg-purple-700 text-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
          >
            {/* Image */}
            <motion.div className="w-full md:w-1/2 lg:w-5/12 flex-shrink-0" variants={fadeInUp}>
              <img
                src="./bg-image.avif"
                alt="Learning Community"
                className="rounded-lg shadow-xl object-cover w-full h-64 md:h-auto"
              />
            </motion.div>
            {/* Quote */}
            <motion.div className="w-full md:w-1/2 lg:w-7/12 text-center md:text-left" variants={fadeInUp}>
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-purple-300 mx-auto md:mx-0 mb-4" />
              <blockquote className="text-2xl lg:text-3xl font-medium italic text-purple-100 leading-snug">
                "Affordable access to information empowers everyone. PDF SHALA makes quality resources attainable."
              </blockquote>
              <p className="mt-4 text-lg text-purple-200 font-semibold">- Happy Customer</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center text-purple-800 mb-12 lg:mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}
          >
            Get Your PDFs in <span className="text-indigo-600">3 Simple Steps</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 text-center relative"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          >
            {/* Step 1: Search */}
            <motion.div className="how-step" variants={fadeInUp}>
              <div className="how-icon bg-purple-100 text-purple-600"><MagnifyingGlassIcon className="h-10 w-10" /></div>
              <h3 className="how-title">1. Find Your PDF</h3>
              <p className="how-description">Browse categories or use our powerful search to locate the documents you need.</p>
            </motion.div>

            {/* Step 2: Purchase */}
            <motion.div className="how-step md:mt-8" variants={fadeInUp}>
              <div className="how-icon bg-indigo-100 text-indigo-600"><ShoppingCartIcon className="h-10 w-10" /></div>
              <h3 className="how-title">2. Secure Purchase</h3>
              <p className="how-description">Add to cart and complete your purchase securely with our encrypted checkout.</p>
            </motion.div>

            {/* Step 3: Download */}
            <motion.div className="how-step md:mt-16" variants={fadeInUp}>
              <div className="how-icon bg-green-100 text-green-600"><ArrowDownTrayIcon className="h-10 w-10" /></div>
              <h3 className="how-title">3. Instant Download</h3>
              <p className="how-description">Access your purchased PDFs immediately from your account library. No waiting!</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="py-20 lg:py-24 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-bold mb-4" variants={fadeInUp}>
            Ready to Explore PDFs at Unbeatable Prices?
          </motion.h2>
          <motion.p className="max-w-xl mx-auto text-lg text-purple-100/90 mb-8" variants={fadeInUp}>
            Join thousands of learners and professionals finding the resources they need without the hefty price tag.
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/trending"
              className="inline-block px-10 py-4 bg-white text-purple-700 text-lg font-semibold rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white"
            >
              Start Browsing Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-8 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PDF SHALA. All rights reserved. Affordable Knowledge For All.
          </p>
          <div className="mt-4 space-x-4">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-purple-300 transition">Privacy Policy</Link>
            <span className="text-gray-600">|</span>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-purple-300 transition">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};