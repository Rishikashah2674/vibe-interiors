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
      values: ["Residential", "Office", "Bungalows", "Commercial"],
      message: "{VALUE} is not a valid category",
    },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
