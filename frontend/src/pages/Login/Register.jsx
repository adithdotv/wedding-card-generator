import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePassword = (password) => {
    // Password validation: at least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before submitting
    if (!validatePassword(formData.password)) return;

    try {
      console.log(formData);
      await axios.post("http://localhost:5000/api/users/register", formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error registering");
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/bg_login.jpg')" }}
    >
      <div className="bg-white-800 bg-opacity-60 p-10 rounded-2xl shadow-lg w-full max-w-md mr-10">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Create An Account..</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="fullName"
            placeholder="Full Name" 
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none"
            required
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none"
            required
          />
          <input 
            type="tel" 
            name="phone"
            placeholder="Phone Number" 
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none"
            required
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={(e) => {
              handleChange(e);
              validatePassword(e.target.value);
            }}
            className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none"
            required
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          <button 
            type="submit"
            className="mt-6 w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-white text-center">
          Already have an account? <Link to="/login" className="text-red-200 hover:text-red-300 underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
