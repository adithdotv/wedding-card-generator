import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TemplateSelection = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/templates")
      .then(res => setTemplates(res.data))
      .catch(err => console.error("Error fetching templates:", err));
  }, []);

  return (
    <div>
      <h2>Select a Wedding Card Template</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {templates.length === 0 ? (
          <p>Loading templates...</p>
        ) : (
          templates.map(template => (
            <img
              key={template._id}
              src={`http://localhost:5000${template.imageUrl}`}
              alt="Template"
              width="200"
              onClick={() => navigate(`/editor/${template._id}`)}
              style={{ cursor: "pointer", border: "2px solid transparent", padding: "5px" }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TemplateSelection;
