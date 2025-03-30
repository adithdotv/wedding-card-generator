// src/components/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For Username dropdown
  const navigate = useNavigate();

  return (
    <nav className="bg-white text-red-800 p-4 shadow-md relative z-50">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold">Wedding Floor</h1>
        <div className="md:hidden">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="text-red-800 focus:outline-none"
          >
            {isNavOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6L14 14M14 6L6 14"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5h14M3 10h14m-7 5h7"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`md:flex space-x-4 ${
            isNavOpen ? "block" : "hidden"
          } md:block`}
        >
          <li>
            <Link
              to="/home"
              className="px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contacts"
              className="px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition"
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition"
            >
              Cart
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                setTimeout(() => {
                  const element = document.getElementById("design_section");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }, 200);
              }}
              className="px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition"
            >
              <Link to="/home">Designs</Link>
            </button>
          </li>
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition"
            >
              Username
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <button
                  onClick={() => navigate("/myorder")}
                  className="block w-full px-4 py-2 text-left hover:bg-red-700 hover:text-white transition"
                >
                  My Orders
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="block w-full px-4 py-2 text-left hover:bg-red-700 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
