const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: [
        "Residential",
        "Commercial",
        "Office",
        "Living Room",
        "Bedroom",
        "Kitchen",
        "Hospitality",
        "Healthcare",
        "Retail",
        "Renovation",
        "Exterior",
        "Custom Design"
      ],
      message: "{VALUE} is not an approved category"
    },
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Project image path is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  area: {
    type: String,
    trim: true,
  },
  designStyle: {
    type: String,
    trim: true,
  },
  materials: {
    type: String,
    trim: true,
  },
  services: {
    type: String,
    trim: true,
  },
  images: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);

