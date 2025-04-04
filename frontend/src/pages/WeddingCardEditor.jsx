import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image, Text } from "react-konva";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../pages/DashPages/Navbar";
import { useNavigate } from "react-router-dom";

const WeddingCardEditor = () => {
  const navigate = useNavigate();
  const stageRef = useRef(null);
  const { templateId } = useParams();
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [editableFields, setEditableFields] = useState([]);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [textValues, setTextValues] = useState({});
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColors, setTextColors] = useState({});
  const [fontSizes, setFontSizes] = useState({});
  const [fontFamilies, setFontFamilies] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/templates/${templateId}`
        );
        const { imageUrl, editableFields, templateName, price } = res.data;

        setName(templateName);
        setPrice(price);

        const img = new window.Image();
        img.src = `http://localhost:5000${imageUrl}`;
        img.crossOrigin = "Anonymous";
        img.onload = () => setImage(img);

        setEditableFields(editableFields);

        const initialTextValues = {};
        const initialTextColors = {};
        const initialFontSizes = {};
        const initialFontFamilies = {};
        editableFields.forEach((field, index) => {
          initialTextValues[index] = "";
          initialTextColors[index] = "#000000";
          initialFontSizes[index] = 24;
          initialFontFamilies[index] = "Arial";
        });
        setTextValues(initialTextValues);
        setTextColors(initialTextColors);
        setFontSizes(initialFontSizes);
        setFontFamilies(initialFontFamilies);
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

  const handleFontFamilyChange = (index, newFontFamily) => {
    setFontFamilies((prev) => ({ ...prev, [index]: newFontFamily }));
  };

  const addTextField = () => {
    const newField = { x: 50, y: 50, name: "New Text" };
    setEditableFields((prev) => [...prev, newField]);
    const newIndex = editableFields.length;
    setTextValues((prev) => ({ ...prev, [newIndex]: "" }));
    setTextColors((prev) => ({ ...prev, [newIndex]: "#000000" }));
    setFontSizes((prev) => ({ ...prev, [newIndex]: 24 }));
    setFontFamilies((prev) => ({ ...prev, [newIndex]: "Arial" }));
  };

  const handleAddToCart = async () => {
    if (!stageRef.current) return;

    const dataURL = stageRef.current.toDataURL();
    const blob = await fetch(dataURL).then((res) => res.blob());
    const imageFile = new File([blob], "wedding-card.png", {
      type: "image/png",
    });

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("email", user.email);
    formData.append("quantity", quantity);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert(response.data.message);
      navigate("/cart");
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div style={{ flex: 1, maxWidth: "400px", marginRight: "20px" }}>
          <h2 className="text-xl font-semibold mb-4">Edit Your Wedding Card</h2>
          {editableFields.map((field, index) => (
            <div key={index} className="mb-3 flex flex-wrap items-center">
              <input
                type="text"
                placeholder={field.name || "Enter Text"}
                value={textValues[index] || ""}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="border p-2 w-full rounded mb-1 mr-2"
              />
              <div className="flex w-full">
                <input
                  type="color"
                  value={textColors[index] || "#000000"}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="rounded mr-2"
                />
                <select
                  value={fontSizes[index] || 24}
                  onChange={(e) => handleFontSizeChange(index, e.target.value)}
                  className="border p-1 rounded mr-2"
                >
                  {[16, 20, 24, 28, 32, 36, 40, 44, 48].map((size) => (
                    <option key={size} value={size}>
                      {size}px
                    </option>
                  ))}
                </select>
                <select
                  value={fontFamilies[index] || "Arial"}
                  onChange={(e) => handleFontFamilyChange(index, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Tahoma">Tahoma</option>
                  <option value="Trebuchet MS">Trebuchet MS</option>
                  <option value="Lucida Sans">Lucida Sans</option>
                  <option value="Impact">Impact</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                  <option value="Palatino">Palatino</option>
                  <option value="Garamond">Garamond</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Calibri">Calibri</option>
                </select>
              </div>
            </div>
          ))}

          <button
            onClick={addTextField}
            className="bg-green-500 text-white p-2 rounded w-full mb-2"
          >
            Enter New data
          </button>
        </div>
        <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
          <Stage
            width={400}
            height={600}
            style={{ border: "1px solid black" }}
            ref={stageRef}
          >
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
                  fontFamily={fontFamilies[index] || "Arial"}
                  draggable
                />
              ))}
            </Layer>
          </Stage>
        </div>
        <div style={{ flex: 1, maxWidth: "300px", marginLeft: "20px" }}>
          <h2 className="text-xl font-semibold mb-4">Template Details</h2> <br />
          <p className="mb-2">
            <strong>Template Name:</strong> {name}
          </p> <br />
          <p className="mb-2">
            <strong>Price:</strong> Rs.{price}
          </p> <br />
          <p className="mb-2">
            <strong>Description:</strong> Customize your wedding card with
            names, date, and other details.
          </p> <br />
          <p className="mb-2">
            <strong>Note:</strong> Select Quantity
          </p> <br />
          <input
            type="text"
            placeholder="Type Quantity of Hard Copy Eg: 20"
            className="border p-2 w-full rounded mb-2"
            value={quantity || ""}
            onChange={(e) => setQuantity(e.target.value)}
            required
          /> <br /> <br />
          <button
            className="bg-red-500 text-white p-2 rounded w-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeddingCardEditor;