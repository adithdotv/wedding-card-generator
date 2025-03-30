const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  editableFields: [
    {
      x: Number,
      y: Number,
      fontSize: Number,
      color: String,
    },
  ],
});

const Template = mongoose.model("Template", TemplateSchema);
module.exports = Template;
