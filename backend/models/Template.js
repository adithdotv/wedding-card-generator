const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  templateName :{type: String, required: true},
  imageUrl: { type: String, required: true },
  editableFields: [
    {
      x: Number,
      y: Number,
      fontSize: Number,
      color: String,
    },
  ],
  description: { type: String, required: true},
  price: { type: Number, required: true} 
});

const Template = mongoose.model("Template", TemplateSchema);
module.exports = Template;
