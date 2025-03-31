import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/users/admin-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("adminToken", data.token);
            navigate("/admin/dashboard");
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Login Error:", error);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
