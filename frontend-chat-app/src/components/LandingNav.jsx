import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LandingNav = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <img
            src="https://c9lab.com/wp-content/uploads/2025/02/Untitled-design-2048x1240.png"
            className="h-8 md:h-10"
            alt="Swift Logo"
          />
          <span className="ml-3 text-xl md:text-2xl font-semibold text-white">
            C9 Quickkonnect
          </span>
        </div>

        {/* Hamburger Button for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <NavLink
            to={isAuthenticated ? "/chathome" : "/login"}
            className={({ isActive }) =>
              `py-1 px-2 text-lg font-medium ${isActive ? "text-[#1B57E9] border-b-2 border-[#1B57E9]" : "text-white"
              } hover:text-[#1B57E9] transition duration-300`
            }
          >
            {isAuthenticated ? "Home" : "Login"}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `py-1 px-2 text-lg font-medium ${isActive ? "text-[#1B57E9] border-b-2 border-[#1B57E9]" : "text-white"
              } hover:text-[#1B57E9] transition duration-300`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 w-64 bg-gray-800 h-full transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white mb-4 text-lg"
              aria-label="Close menu"
            >
              Close
            </button>
            <div className="flex flex-col space-y-4">
              <NavLink
                to={isAuthenticated ? "/chathome" : "/login"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-4 text-lg font-medium ${isActive ? "text-[#1B57E9]" : "text-white"
                  } hover:text-[#1B57E9] transition duration-300`
                }
              >
                {isAuthenticated ? "Home" : "Login"}
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-4 text-lg font-medium ${isActive ? "text-[#1B57E9]" : "text-white"
                  } hover:text-[#1B57E9] transition duration-300`
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;