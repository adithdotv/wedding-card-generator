import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image, Text } from "react-konva";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../pages/DashPages/Navbar";

const WeddingCardEditor = () => {
  const stageRef = useRef(null);
  const { templateId } = useParams();
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [editableFields, setEditableFields] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [textValues, setTextValues] = useState({});
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColors, setTextColors] = useState({});
  const [fontSizes, setFontSizes] = useState({});

  useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/templates/${templateId}`);
        const { imageUrl, editableFields, templateName, price } = res.data;

        setName(templateName);
        setPrice(price)

        const img = new window.Image();
        img.src = `http://localhost:5000${imageUrl}`;
        img.crossOrigin = "Anonymous";
        img.onload = () => setImage(img);

        setEditableFields(editableFields);

        const initialTextValues = {};
        const initialTextColors = {};
        const initialFontSizes = {};
        editableFields.forEach((field, index) => {
          initialTextValues[index] = "";
          initialTextColors[index] = "#000000";
          initialFontSizes[index] = 24;
        });
        setTextValues(initialTextValues);
        setTextColors(initialTextColors);
        setFontSizes(initialFontSizes);
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };
    fetchTemplate();
  }, [templateId]);

  const handleTextChange = (index, newText) => {
    setTextValues((prev) => ({ ...prev, [index]: newText }));
  };

  const handleColorChange = (index, newColor) => {
    setTextColors((prev) => ({ ...prev, [index]: newColor }));
  };

  const handleFontSizeChange = (index, newSize) => {
    setFontSizes((prev) => ({ ...prev, [index]: parseInt(newSize) }));
  };

  const addTextField = () => {
    const newField = { x: 50, y: 50, name: "New Text" };
    setEditableFields((prev) => [...prev, newField]);
    const newIndex = editableFields.length;
    setTextValues((prev) => ({ ...prev, [newIndex]: "" }));
    setTextColors((prev) => ({ ...prev, [newIndex]: "#000000" }));
    setFontSizes((prev) => ({ ...prev, [newIndex]: 24 }));
  };

  const handleAddToCart = async () => {
    if (!stageRef.current) return;
  
    // Convert Konva Stage to a Data URL (Base64 Image)
    const dataURL = stageRef.current.toDataURL();
  
    // Convert Base64 to Blob (Required for File Upload)
    const blob = await fetch(dataURL).then((res) => res.blob());
  
    // Create a File from the Blob
    const imageFile = new File([blob], "wedding-card.png", { type: "image/png" });
  
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("email", user.email);
    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message)
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <div style={{ flex: 1, maxWidth: "300px", marginRight: "20px" }}>
          <h2 className="text-xl font-semibold mb-4">Edit Your Wedding Card</h2>
          {editableFields.map((field, index) => (
            <div key={index} className="mb-3 flex items-center">
              <input
                type="text"
                placeholder={field.name || "Enter text"}
                value={textValues[index] || ""}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="border p-2 w-1/2 rounded mb-1 mr-2"
              />
              <input
                type="color"
                value={textColors[index] || "#000000"}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className="rounded mr-2"
              />
              <select
                value={fontSizes[index] || 24}
                onChange={(e) => handleFontSizeChange(index, e.target.value)}
                className="border p-1 rounded"
              >
                {[16, 20, 24, 28, 32, 36, 40, 44, 48].map((size) => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </select>
            </div>
          ))}
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="border p-1 w-full rounded mb-2"
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
          <button onClick={addTextField} className="bg-green-500 text-white p-2 rounded w-full mb-2">Add Text Field</button>
          <button className="bg-blue-500 text-white p-2 rounded w-full" onClick={handleAddToCart}>Add to Cart</button>
        </div>
        <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
          <Stage width={400} height={600} style={{ border: "1px solid black" }} ref={stageRef}>
            <Layer>
              {image && <Image image={image} width={400} height={600} />}
              {editableFields.map((field, index) => (
                <Text
                  key={index}
                  text={textValues[index] || ""}
                  x={field.x}
                  y={field.y}
                  fontSize={fontSizes[index] || 24}
                  fill={textColors[index] || "#000000"}
                  fontFamily={fontFamily}
                  draggable
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default WeddingCardEditor;
