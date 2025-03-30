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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplateSelection />} />
        <Route path="/admin" element={<AdminUpload />} />
        <Route path="/editor/:templateId" element={<WeddingCardEditor />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contacts" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/myorder" element={<MyOrder />} />


        {/* Admin Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/addtemplate" element={<AddTemplate />} />
        <Route path="/admin/vieworders" element={<ViewOrders />} />
        <Route path="/admin/contactus" element={<AdminContactUs />} />

       






      </Routes>
    </Router>
  );
}

export default App;
