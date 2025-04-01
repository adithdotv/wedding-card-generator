import React, { useState } from "react";
import axios from "axios";
import Navbar from "../DashPages/Navbar";
import Footer from "../DashPages/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/enquiry/contact", formData);
      setStatus(response.data.message);
      setFormData({ name: "", email: "", message: "" }); // Clear form after success
    } catch (error) {
      setStatus("Error submitting enquiry. Please try again.");
      console.error("Error submitting enquiry:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section
        className="w-full min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/src/assets/slide1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-gray-300 bg-opacity-10 p-8 rounded-xl shadow-lg max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Contact Us</h1>
          <p className="text-lg mb-8 text-gray-800">
            Have any questions or need assistance? Fill out the form below, and we will get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-black font-semibold py-2 px-6 rounded-md hover:bg-red-800 transition"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-gray-800">{status}</p>}
          <div className="mt-8 text-gray-800">
            <p className="text-lg">Or reach out to us directly:</p>
            <p>Email: support@weddingfloor.com</p>
            <p>Phone: +1 234 567 890</p>
            <p>Address: 123 Wedding Lane, Love City, Bliss Country</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
