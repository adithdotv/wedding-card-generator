import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const admin = localStorage.getItem("adminToken"); // Check admin authentication

  return admin ? <Outlet /> : <Navigate to="/adminlogin" replace />;
};

export default AdminProtectedRoute;
