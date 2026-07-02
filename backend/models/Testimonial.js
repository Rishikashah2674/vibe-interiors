const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Client name is required"],
    trim: true,
  },
  role: {
    type: String,
    required: [true, "Client role or designation is required"],
    trim: true,
  },
  review: {
    type: String,
    required: [true, "Review message is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
    default: 5,
  },
  image: {
    type: String,
    required: [true, "Client avatar or image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
