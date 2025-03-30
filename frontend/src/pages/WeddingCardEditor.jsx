import React, { useState, useEffect } from "react";
import { Stage, Layer, Image, Text } from "react-konva";
import axios from "axios";
import { useParams } from "react-router-dom";

const WeddingCardEditor = () => {
  const { templateId } = useParams();
  const [image, setImage] = useState(null);
  const [editableFields, setEditableFields] = useState([]);
  const [textValues, setTextValues] = useState({});
  const [textStyles, setTextStyles] = useState({});

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/templates/${templateId}`);
        const { imageUrl, editableFields } = res.data;

        const img = new window.Image();
        img.src = `http://localhost:5000${imageUrl}`;
        img.crossOrigin = "Anonymous";
        img.onload = () => setImage(img);

        setEditableFields(editableFields);

        // Initialize text values and styles
        const initialTextValues = {};
        const initialTextStyles = {};
        editableFields.forEach((field, index) => {
          initialTextValues[index] = "";
          initialTextStyles[index] = {
            fontSize: field.fontSize || 24,
            color: field.color || "#000000",
            fontFamily: "Arial",
          };
        });
        setTextValues(initialTextValues);
        setTextStyles(initialTextStyles);
      } catch (error) {
        console.error("Error fetching template:", error);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const handleTextChange = (index, newText) => {
    setTextValues((prev) => ({ ...prev, [index]: newText }));
  };

  const handleStyleChange = (index, key, value) => {
    setTextStyles((prev) => ({
      ...prev,
      [index]: { ...prev[index], [key]: value },
    }));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Edit Your Wedding Card</h2>
      {editableFields.map((field, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Enter text"
            value={textValues[index]}
            onChange={(e) => handleTextChange(index, e.target.value)}
          />
          <select
            value={textStyles[index]?.fontFamily}
            onChange={(e) => handleStyleChange(index, "fontFamily", e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
          <input
            type="number"
            value={textStyles[index]?.fontSize}
            onChange={(e) => handleStyleChange(index, "fontSize", parseInt(e.target.value))}
            style={{ width: "60px" }}
          />
          <input
            type="color"
            value={textStyles[index]?.color}
            onChange={(e) => handleStyleChange(index, "color", e.target.value)}
          />
        </div>
      ))}
      <br />
      <Stage width={500} height={700} style={{ border: "1px solid black" }}>
        <Layer>
          {image && <Image image={image} width={500} height={700} />}
          {editableFields.map((field, index) => (
            <Text
              key={index}
              text={textValues[index] || ""}
              x={field.x}
              y={field.y}
              fontSize={textStyles[index]?.fontSize}
              fill={textStyles[index]?.color}
              fontFamily={textStyles[index]?.fontFamily}
              draggable
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default WeddingCardEditor;
