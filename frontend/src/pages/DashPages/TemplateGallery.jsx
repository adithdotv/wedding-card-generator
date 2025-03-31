import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TemplateGallery = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/templates")
      .then((res) => setTemplates(res.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  return (
    <section className="py-12 bg-gray-200" id="design_section">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Our Designs
      </h2>
      
      {/* Card List */}
      <div className="grid gap-8 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {templates.length === 0 ? (
          <p className="text-center text-gray-600">Loading templates...</p>
        ) : (
          templates.map((template) => (
            <div
              key={template._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition cursor-pointer"
              onClick={() => navigate(`/editor/${template._id}`)}
            >
              <div
                className="h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url(http://localhost:5000${template.imageUrl})`,
                }}
              ></div>
              <div className="p-4 text-center">
                <h3 className="text-2xl font-semibold">{template.templateName}</h3>
                <p className="text-gray-600">Price: ₹{template.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TemplateGallery;
