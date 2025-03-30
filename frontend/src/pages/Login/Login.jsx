import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/bg_login.jpg')" }}
    >
      <div className="bg-white-800 bg-opacity-60 p-10 rounded-2xl shadow-lg w-full max-w-md mr-10">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Login</h2>

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none"
          />
        </div>

        <button 
          className="mt-6 w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md"
        >
          Login
        </button>

        <p className="mt-4 text-white text-center">
          Don't have an account? <Link to="/register" className="text-red-200 hover:text-red-300 underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
