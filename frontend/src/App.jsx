import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminUpload from "./pages/AdminUpload";
import TemplateSelection from "./pages/TemplateSelection";
import WeddingCardEditor from "./pages/WeddingCardEditor";
import Registration from "./pages/Login/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/DashPages/Home";
import AboutUs from "./pages/DashPages/AboutUs";
import ContactUs from "./pages/DashPages/ContactUs";
import Cart from "./pages/DashPages/Cart";
import Payment from "./pages/DashPages/Payment";
import MyOrder from "./pages/DashPages/MyOrder";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard";
import AddTemplate from "./pages/Admin/AddTemplate";
import ViewOrders from "./pages/Admin/ViewOrders";
import AdminContactUs from "./pages/Admin/AdminContactUS";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AllTemplates from "./pages/DashPages/AllTemplates";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contacts" element={<ContactUs />} />
        <Route path="/all-templates" element={<AllTemplates />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/editor/:templateId" element={<WeddingCardEditor />} />
          <Route path="/payment/:orderId" element={<Payment />} />
          <Route path="/myorder" element={<MyOrder />} />
        </Route>

        {/* Admin Login (Public) */}
        <Route path="/adminlogin" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/addtemplate" element={<AddTemplate />} />
          <Route path="/admin/vieworders" element={<ViewOrders />} />
          <Route path="/admin/contactus" element={<AdminContactUs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
