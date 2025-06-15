import { useState } from "react";
// Use NavLink for active state styling if needed, otherwise Link is fine
import { Link, NavLink } from "react-router-dom";
// Import necessary icons
import {
    FaHome,
    FaTachometerAlt,
    FaBoxOpen,
    FaPlusCircle,
    FaTrashAlt,
    FaEdit,
    FaChevronDown, // Better icon for dropdown
    FaBars,       // Hamburger icon for mobile toggle
    FaTimes       // Close icon for mobile toggle
} from "react-icons/fa";

export const Sidebar = () => {
    // State for mobile sidebar visibility
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // State for the products dropdown
    const [isProductsOpen, setIsProductsOpen] = useState(false);

    // Helper function for NavLink active class
    const getNavLinkClass = ({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ease-in-out ${
        isActive
            ? 'bg-purple-700 text-white' // Active link style
            : 'text-purple-100 hover:bg-purple-700 hover:text-white' // Inactive link style
        }`;

    // Reusable style for dropdown links
    const dropdownLinkClass = "block px-4 py-2 text-sm text-purple-200 hover:bg-purple-600 hover:text-white rounded-md transition-colors duration-150 ease-in-out";

    return (
        <>
            {/* --- Mobile Toggle Button (Placeholder) --- */}
            {/* This button would typically live in your main layout's Header */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-md text-purple-800 bg-white shadow-md md:hidden" // Only show on mobile
                aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
                aria-controls="admin-sidebar"
                aria-expanded={isMobileOpen}
            >
                {isMobileOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>

            {/* --- Sidebar --- */}
            <aside
                id="admin-sidebar"
                className={`
                    fixed top-0 left-0 z-40 h-screen bg-gradient-to-b from-purple-900 to-purple-800 text-white
                    md:w-[20%] space-y-4 py-4 px-3
                    transform transition-transform duration-300 ease-in-out
                    md:translate-x-0 md:relative md:inset-y-0 md:flex md:flex-col
                    ${isMobileOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'}
                `}
            >
                {/* Logo/Header Area (Optional) */}
                <div className="px-4 py-2 mb-4 text-center">
                    <Link to="/admin" className="text-2xl font-semibold text-white hover:text-purple-300 transition-colors">
                        Admin Panel
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-grow px-1">
                    {/* Using NavLink for automatic active styling */}
                    <NavLink to="/admin" end className={getNavLinkClass}>
                        <FaHome className="mr-3 h-5 w-5" />
                        Home
                    </NavLink>

                    <NavLink to="/admin/dashboard" className={getNavLinkClass}>
                        <FaTachometerAlt className="mr-3 h-5 w-5" />
                        Dashboard
                    </NavLink>

                    {/* Products Dropdown Section */}
                    <div className="pt-2">
                        {/* Dropdown Toggle Button */}
                        <button
                            onClick={() => setIsProductsOpen(!isProductsOpen)}
                            aria-expanded={isProductsOpen}
                            aria-controls="products-submenu"
                            className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-left text-purple-100 rounded-lg hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-150 ease-in-out"
                        >
                            <span className="flex items-center">
                                <FaBoxOpen className="mr-3 h-5 w-5" />
                                Products
                            </span>
                            <FaChevronDown
                                className={`h-4 w-4 transform transition-transform duration-300 ${
                                isProductsOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            />
                        </button>

                        {/* Dropdown Content */}
                        <div
                            id="products-submenu"
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                isProductsOpen ? 'max-h-60 mt-2' : 'max-h-0' // Use max-h for transition
                            }`}
                        >
                            <div className="pl-5 pr-2 py-1 space-y-1"> {/* Indented slightly */}
                                <Link to="/admin/add-products" className={dropdownLinkClass}>
                                    <FaPlusCircle className="inline mr-2 h-4 w-4 opacity-80"/>
                                    Add Products
                                </Link>
                                
                                <Link to="/admin/remove-products" className={dropdownLinkClass}>
                                    <FaTrashAlt className="inline mr-2 h-4 w-4 opacity-80"/>
                                    Remove Products
                                </Link>
                                <Link to="/admin/edit-products" className={dropdownLinkClass}>
                                    <FaEdit className="inline mr-2 h-4 w-4 opacity-80"/>
                                    Edit Products
                                </Link>
                               
                            </div>
                        </div>
                    </div>

                    {/* Add more top-level links here if needed */}

                </nav>

                {/* Footer Area (Optional) */}
                <div className="px-4 py-2 mt-auto text-center text-xs text-purple-300">
                    © {new Date().getFullYear()} PDF - Shala
                </div>

            </aside>

             {/* --- Overlay for Mobile --- */}
             {isMobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
                    onClick={() => setIsMobileOpen(false)} // Close sidebar on overlay click
                ></div>
             )}
        </>
    );
};