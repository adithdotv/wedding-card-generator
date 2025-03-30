import React from 'react';
import { Link } from 'react-router-dom';

export default function Registration() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/bg_login.jpg')" }}
    >
      <div className="bg-white-800 bg-opacity-60 p-10 rounded-2xl shadow-lg w-full max-w-md mr-10">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Create An Account..</h2>

        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none"
          />
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 rounded-xl bg-gray-100 text-gray-800 focus:outline-none"
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
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
         onClick={() => alert('Registration successful!')}>
          Register
        </button>

        <p className="mt-4 text-white text-center">
          Already have an account? <Link to="/login" className="text-red-200 hover:text-red-300 underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
