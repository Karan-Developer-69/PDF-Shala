// src/components/Navbar.jsx
import React, { useState, useContext, useMemo, useEffect } from "react";
import { NavLink, Link } from "react-router-dom"; // Use Link for the logo
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Icons for clarity

// Animation variants for the mobile menu
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2, ease: "easeOut" },
  }
};

// Reusable NavLink classes
const navLinkBaseClasses = "relative py-2 px-1 text-sm font-medium transition-colors duration-200 ease-in-out";
const navLinkHoverClasses = "hover:text-purple-700";
const navLinkActiveClasses = "text-purple-700 after:content-[''] after:absolute after:left-1 after:right-1 after:bottom-0 after:h-[2px] after:bg-purple-600"; // Underline effect
const navLinkHighlightClasses = "bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 hover:text-white"; // Button style for Login/Logout


export const Navbar = ({ cartProducts = [] }) => { // Default prop for safety
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Calculate cart count safely
  const cartCount = useMemo(() => cartProducts?.length || 0, [cartProducts]);

  const links = useMemo(() => {
    const base = [
      { to: "/", label: "Home", protected: false },
      { to: "/trending", label: "Trending", protected: false },
      { to: "/library", label: "My Library", protected: true },
      {
        to: "/cart",
        label: "Cart",
        protected: true,
        icon: ShoppingBagIcon, // Add icon reference
        badge: cartCount,
      },
    ];

    // Filter protected links based on login status
    const visibleBaseLinks = base.filter(link => !link.protected || isLoggedIn);

    // Define Auth link separately for clarity
    const authLink = isLoggedIn
      ? { type: 'button', label: "Logout", action: logout, highlight: true } // Use type: 'button' for non-navigation actions
      : { type: 'link', to: "/auth", label: "Login / Sign Up", highlight: true };

    return [...visibleBaseLinks, authLink];

  }, [isLoggedIn, logout, cartCount]);

  // Handle scroll effect for navbar background/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false); // Close menu on scroll
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change (listening to isLoggedIn or links potentially changing)
  useEffect(() => {
      setIsOpen(false);
  }, [isLoggedIn, links]);


  // Common function to close menu
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isOpen ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-md' // Subtle transparent effect when not scrolled
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          {/* Consider adding your actual SVG/Image logo here */}
           <span className="text-xl font-bold text-purple-700 tracking-tight hover:text-purple-900 transition-colors duration-200">
             PDF SHALA
           </span>
           {/* <img src="/path/to/your/purple-logo.svg" alt="PDF SHALA" className="h-8 w-auto" /> */}
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-4 lg:space-x-6 text-gray-600">
          {links.map((link) => (
            <li key={link.label} className="flex items-center">
              {link.type === 'button' ? (
                // Render Logout Button
                 <button
                    onClick={() => { link.action && link.action(); closeMenu(); }}
                    className={`${navLinkBaseClasses} ${navLinkHoverClasses} ${link.highlight ? navLinkHighlightClasses : ''}`}
                 >
                    {link.label}
                 </button>
              ) : link.to ? (
                 // Render NavLink for navigation
                 <NavLink
                    to={link.to}
                    end // Ensure exact match for active state
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${navLinkBaseClasses} ${navLinkHoverClasses} ${
                        isActive && !link.highlight ? navLinkActiveClasses : '' // Active state only if not highlighted button
                      } ${link.highlight ? navLinkHighlightClasses : ''}` // Highlighted style overrides others
                    }
                 >
                    {link.icon && <link.icon className="inline h-5 w-5 mr-1 mb-0.5" aria-hidden="true" />}
                    {link.label}
                    {link.badge > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full">
                        {link.badge > 9 ? '9+' : link.badge} {/* Cap badge display */}
                      </span>
                    )}
                 </NavLink>
              ) : null /* Should not happen with current structure, but good practice */}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
           {/* Optional: Show Cart Icon on mobile next to burger */}
           {isLoggedIn && (
             <NavLink to="/cart" className="relative mr-3 text-gray-600 hover:text-purple-700" onClick={closeMenu}>
               <ShoppingBagIcon className="h-6 w-6" />
               {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
             </NavLink>
           )}
           {/* Burger Menu Toggle */}
           <button
             onClick={() => setIsOpen((o) => !o)}
             className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition duration-150 ease-in-out"
             aria-controls="mobile-menu"
             aria-expanded={isOpen}
             aria-label={isOpen ? "Close main menu" : "Open main menu"}
           >
             {isOpen ? (
               <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
             ) : (
               <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
             )}
           </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100" // Added border-t
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            <ul className="flex flex-col space-y-1 px-2 pt-2 pb-4"> {/* Adjusted padding */}
              {links.map((link) => (
                 <li key={`mobile-${link.label}`}>
                   {link.type === 'button' ? (
                     // Mobile Logout Button
                     <button
                        onClick={() => { link.action && link.action(); closeMenu(); }}
                        className={`block w-full text-left rounded-md px-3 py-3 text-base font-medium transition ${
                           link.highlight
                           ? 'bg-purple-600 text-white hover:bg-purple-700'
                           : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'
                        }`}
                     >
                       {link.label}
                     </button>
                   ) : link.to ? (
                      // Mobile NavLink
                      <NavLink
                        to={link.to}
                        end
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `relative block rounded-md px-3 py-3 text-base font-medium transition ${
                            isActive && !link.highlight // Don't apply active style if it's the highlight button
                              ? 'bg-purple-50 text-purple-700' // Active state style for mobile
                              : link.highlight
                              ? 'bg-purple-600 text-white hover:bg-purple-700' // Highlight button style
                              : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700' // Default link style
                          }`
                        }
                      >
                        {link.label}
                        {/* Badge on mobile - Adjusted position */}
                        {link.badge > 0 && (
                          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-purple-100 bg-purple-600 rounded-full">
                            {link.badge > 9 ? '9+' : link.badge}
                          </span>
                        )}
                      </NavLink>
                   ) : null}
                 </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};