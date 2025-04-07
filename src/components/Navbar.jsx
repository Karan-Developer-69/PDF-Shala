// src/components/Navbar.jsx
import React, { useState, useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";// <-- your cart context

export const Navbar = ({cartProducts}) => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const links = useMemo(() => {
    const base = [
      { to: "/", label: "Home", protected: false },
      { to: "/trending", label: "Trending", protected: false },
      { to: "/library", label: "My Library", protected: true },
      {
        to: "/cart",
        label: "Cart",
        protected: true,
        badge: cartProducts.length,
      },
    ];
    const authLink = isLoggedIn
      ? { to: "/", label: "Logout", highlight: true, action: logout }
      : { to: "/login", label: "Login", highlight: true, action: login };
    return [...base, authLink];
  }, [isLoggedIn, login, logout, cartProducts.length]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h3 className="text-2xl font-bold text-purple-500 tracking-widest">
          PDF SHALA
        </h3>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-lg text-gray-700">
          {links.map(
            ({ to, label, highlight, protected: prot, action, badge }) =>
              (!prot || isLoggedIn) && (
                <li key={`${to}-${label}`} className="relative">
                  <NavLink
                    to={to}
                    end
                    onClick={() => action && action()}
                    className={({ isActive }) =>
                      `inline-block py-2 px-1 hover:text-purple-400 hover:border-b-2 hover:border-purple-500 ${
                        highlight ? "text-purple-500" : ""
                      } ${isActive ? "border-b-2 border-purple-500" : ""}`
                    }
                  >
                    {label}
                  </NavLink>
                  {badge > 0 && (
                    <span className="
                      absolute -top-2 -right-4
                       text-[#9810FA] text-sm font-bold
                      rounded-full h-5 w-5 flex items-center justify-center
                    ">
                      {badge}
                    </span>
                  )}
                </li>
              )
          )}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-2 p-4 text-gray-700">
            {links.map(
              ({ to, label, highlight, protected: prot, action, badge }) =>
                (!prot || isLoggedIn) && (
                  <li key={`${to}-${label}`} className="relative">
                    <NavLink
                      to={to}
                      end
                      onClick={() => {
                        action && action();
                        setIsOpen(false);
                      }}
                      className={({ isActive }) =>
                        `block py-2 hover:text-purple-400 ${
                          highlight ? "text-purple-500" : ""
                        } ${isActive ? "border-b-2 border-purple-500" : ""}`
                      }
                    >
                      {label}
                    </NavLink>
                    {badge > 0 && (
                      <span className="
                        absolute top-0 right-0
                        bg-purple-500 text-white text-xs font-bold
                        rounded-full h-5 w-5 flex items-center justify-center
                      ">
                        {badge}
                      </span>
                    )}
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};
