import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = localStorage.getItem("user"); // Check user authentication

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
