const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const templateRoutes = require("./routes/templateRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use("/api/templates", templateRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/weddingcards", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
