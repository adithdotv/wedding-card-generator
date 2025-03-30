import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Navbar */}
      {/* Navbar */}
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
                  const element = document.getElementById("design_section");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition"
              >
                Designs
              </button>
            </li>
            <li className="relative">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="px-4 py-2 rounded-md hover:bg-red-700 hover:text-white transition"
              >
                Username
              </button>
              {isNavOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  <button
                    onClick={() => alert("Logging out")}
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

      {/* Main Content */}
      <div className="w-full">
        {/* Hero Section */}
        <section className="w-full">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            transitionTime={1000}
            className="mb-6"
          >
            {/* Slide 1 */}
            <div className="relative w-full h-[70vh] md:h-[90vh] bg-gradient-to-r from-red-500 to-blue-500">
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                  Create Your Dream Wedding Card
                </h2>
                <p className="text-lg mb-6 text-center">
                  Design beautiful and customized wedding invitation cards with
                  ease.
                </p>
                <button
                  className="px-6 py-2 rounded-full bg-red-700 text-white font-semibold hover:bg-red-900 transition"
                  onClick={() =>
                    document
                      .getElementById("design_section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Create Now
                </button>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="relative w-full h-[70vh] md:h-[90vh] bg-gradient-to-r from-blue-500 to-red-500">
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                  Elegant and Stylish Designs
                </h2>
                <p className="text-lg mb-6 text-center">
                  Make your wedding invitation unique and memorable.
                </p>
                <button
                  className="px-6 py-2 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-900 transition"
                  onClick={() =>
                    document
                      .getElementById("design_section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Browse Designs
                </button>
              </div>
            </div>
          </Carousel>
        </section>
      </div>

      {/* Best Wedding Cards Section */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/src/assets/bg_login.jpg')" }}
      >
        <h2 className="text-white text-4xl sm:text-6xl font-bold bg-opacity-50 p-4 rounded-md text-center">
          We make the best wedding cards
        </h2>
      </section>

      {/* Our Designs Section */}
      <section className="py-12 bg-gray-200" id="design_section">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Our Designs
        </h2>
        <div className="grid gap-8 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition"
            >
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/src/assets/wedding_card.jpg')",
                }}
              ></div>
              <div className="p-4 text-center">
                <h3 className="text-2xl font-semibold">
                  Card Design {index + 1}
                </h3>
                <p className="text-gray-600">Price: ₹{499 + index * 100}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Satisfied Customers Section */}
<section className="py-12 bg-gray-100">
  <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
    Our Satisfied Customers
  </h2>
  <div className="max-w-4xl mx-auto">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={4000}
      transitionTime={1000}
      showArrows={false}
      showIndicators={false}
    >
      {[
        "The Wedding Floor made our invitation cards so beautiful and unique! Highly recommended!",
        "We loved the customization options. Our guests were amazed by the design!",
        "Fast, reliable, and truly amazing! The cards were delivered on time and looked gorgeous.",
        "Great customer service and beautiful card designs. We couldn't be happier!",
        "The interface was easy to use, and the results were beyond our expectations!",
        "Fantastic experience! Our wedding invitations looked classy and elegant.",
        "Affordable and stunning designs. Our guests kept complimenting the cards!",
      ].map((review, index) => (
        <div key={index} className="p-6 bg-white rounded-md shadow-md text-center">
          <p className="text-xl text-gray-700 italic">"{review}"</p>
          <p className="mt-4 text-red-700 font-semibold">- Happy Customer {index + 1}</p>
        </div>
      ))}
    </Carousel>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-red-700 text-white p-10">
  <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Contact Us Section */}
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Contact Us</h3>
      <p>Email: support@weddingcardgen.com</p>
      <p>Phone: +1 234 567 890</p>
      <p>Address: 123 Wedding Lane, Love City, Bliss Country</p>
    </div>

    {/* Quick Links Section */}
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/home" className="hover:text-gray-300 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-300 transition">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contacts" className="hover:text-gray-300 transition">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-gray-300 transition">
            Cart
          </Link>
        </li>
      </ul>
    </div>

    {/* Social Media Section */}
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold">Follow Us</h3>
      <div className="flex space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
          <i className="fab fa-instagram fa-2x"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      </div>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="mt-8 text-center border-t border-gray-400 pt-4">
    <p>&copy; 2025 Wedding Card Generator. All rights reserved.</p>
    <p>Privacy Policy | Terms of Service</p>
  </div>
</footer>

    </div>
  );
}
