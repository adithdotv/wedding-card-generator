import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import Navbar from "../DashPages/Navbar";
import Footer from "../DashPages/Footer";

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Navbar */}
      {/* Navbar */}
      <Navbar />

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

      {/* Our Designs Card */}

      <section className="py-12 bg-gray-200" id="design_section">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Our Designs
        </h2>
        {/* Edit here */}

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
              <div
                key={index}
                className="p-6 bg-white rounded-md shadow-md text-center"
              >
                <p className="text-xl text-gray-700 italic">"{review}"</p>
                <p className="mt-4 text-red-700 font-semibold">
                  - Happy Customer {index + 1}
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <button
        className="fixed bottom-4 right-4 bg-yellow-300 text-black p-4 rounded-full shadow-xl hover:bg-yellow-400 transition"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        &#8593;
      </button>
    </div>
  );
}
