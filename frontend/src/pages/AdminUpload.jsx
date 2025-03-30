import { useState } from "react";
import axios from "axios";

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [fields, setFields] = useState([{ x: 100, y: 200, fontSize: 24, color: "#ff0000" }]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("editableFields", JSON.stringify(fields));

    try {
      const res = await axios.post("http://localhost:5000/api/templates/add", formData);
      alert("Template uploaded successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <h2>Upload Wedding Card Template</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AdminUpload;
