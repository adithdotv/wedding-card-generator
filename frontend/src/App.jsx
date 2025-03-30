import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminUpload from "./pages/AdminUpload";
import TemplateSelection from "./pages/TemplateSelection";
import WeddingCardEditor from "./pages/WeddingCardEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemplateSelection />} />
        <Route path="/admin" element={<AdminUpload />} />
        <Route path="/editor/:templateId" element={<WeddingCardEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
