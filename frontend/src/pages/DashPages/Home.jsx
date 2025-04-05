import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../DashPages/Navbar";
import Footer from "../DashPages/Footer";
import TemplateGallery from "./TemplateGallery";

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Retrieve user info if available
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove authentication token
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
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
        style={{
          backgroundImage: "url('/src/assets/home_page1.jpg')",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
          backgroundBlendMode: "multiply", // Apply blend mode
        }}
      >
        <div className="text-center">
          <h2 className="text-white text-5xl font-extrabold bg-opacity-50 p-4 rounded-md">
            We make the best wedding cards
          </h2>
          <p className="text-white text-lg mt-4 bg-opacity-50 p-4 rounded-md max-w-2xl mx-auto font-semibold">
            Welcome to Wedding Floor, your premier online destination for
            creating exquisite and personalized wedding invitations. We
            understand that your wedding day is a once-in-a-lifetime event, and
            your invitations should reflect the unique essence of your love
            story.
          </p>
          <p className="text-white text-lg mt-2 bg-opacity-50 p-4 rounded-md max-w-2xl mx-auto font-semibold">
            With our user-friendly card generator, you can effortlessly design
            stunning invitations that capture the spirit of your celebration.
            From traditional elegance to modern chic, we offer a diverse range
            of templates and customization options to suit every style and
            preference. Let us help you set the perfect tone for your special
            day.
          </p>
        </div>
      </section>

      {/* Our Designs Card */}
      <TemplateGallery />

      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/src/assets/home_bg2.jpg')" }}
      >
        <div className="text-center">
          {" "}
          {/* Container for centering content */}
          <h2 className="text-white text-4xl font-bold mb-8">
            Our Achievements
          </h2>{" "}
          {/* Added heading */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center p-8  bg-opacity-50 rounded-lg">
            <div>
              <h2 className="text-4xl font-bold">100+</h2>
              <p className="text-lg">Happy Customers</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">30+</h2>
              <p className="text-lg">Templates</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">500+</h2>
              <p className="text-lg">Downloads</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Satisfied Customers Section */}
<section className="py-16 bg-white">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-semibold text-gray-800 mb-8">
      What Our Customers Say
    </h2>
    <div className="max-w-3xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={800}
        showArrows={false}
        showIndicators={true}
        className="relative"
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
            className="p-8 bg-gray-50 rounded-lg m-4 border border-gray-200"
          >
            <p className="text-xl text-gray-700 italic mb-4">
              "{review}"
            </p>
            <div className="flex justify-center mt-4">
              <span className="text-sm text-gray-500">
                - Happy Customer {index + 1}
              </span>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  </div>
</section>

      {/* Footer */}
      <Footer />

      {/* User Greeting & Logout Button */}
      {user ? (
        <div className="fixed top-4 right-4 bg-white shadow-md p-3 rounded-md flex items-center space-x-3">
          <p className="text-base font-semibold text-gray-700">
            Welcome, {user.fullName}!
          </p>
          <button
            className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="fixed top-4 right-4 bg-white shadow-md p-4 rounded-md">
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>{" "}
          |{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      )}

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
