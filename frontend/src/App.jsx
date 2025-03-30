import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminUpload from "./pages/AdminUpload";
import TemplateSelection from "./pages/TemplateSelection";
import WeddingCardEditor from "./pages/WeddingCardEditor";
import Registration from "./pages/Login/Register";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplateSelection />} />
        <Route path="/admin" element={<AdminUpload />} />
        <Route path="/editor/:templateId" element={<WeddingCardEditor />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
