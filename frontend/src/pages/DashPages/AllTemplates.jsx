import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../DashPages/Navbar";
import Footer from "../DashPages/Footer";
import axios from "axios";

const AllTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [priceFilter, setPriceFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/templates")
      .then((res) => {
        setTemplates(res.data);
        setFilteredTemplates(res.data); // Initially, show all templates
      })
      .catch((err) => console.error("Error fetching templates:", err));
  }, []);

  useEffect(() => {
    if (priceFilter === "all") {
      setFilteredTemplates(templates);
    } else {
      let maxPrice = parseInt(priceFilter.replace("below ", ""));
      const filtered = templates.filter((template) => template.price <= maxPrice);
      setFilteredTemplates(filtered);
    }
  }, [priceFilter, templates]);

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <section className="py-12 bg-gray-200">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          All Designs
        </h2>

        {/* Price Filter Selector */}
        <div className="flex justify-center mb-8">
          <select
            value={priceFilter}
            onChange={handlePriceFilterChange}
            className="border p-2 rounded"
          >
            <option value="all">All Prices</option>
            <option value="below 10">Below ₹10</option>
            <option value="below 20">Below ₹20</option>
            <option value="below 40">Below ₹40</option>
            <option value="below 60">Below ₹60</option>
            <option value="below 80">Below ₹80</option>
            <option value="below 100">Below ₹100</option>
            <option value="below 150">Below ₹150</option>
          </select>
        </div>

        {/* Card List */}
        <div className="grid gap-8 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filteredTemplates.length === 0 ? (
            <p className="text-center text-gray-600">No templates found.</p>
          ) : (
            filteredTemplates.map((template) => (
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
      <Footer />
    </div>
  );
};

export default AllTemplates;