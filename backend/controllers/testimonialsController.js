const Testimonial = require("../models/Testimonial");

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json(testimonials);
  } catch (error) {
    console.error("Get Testimonials Controller Error:", error);
    return res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// @desc    Create a new testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
const createTestimonial = async (req, res) => {
  try {
    const { name, role, review, rating, image } = req.body;

    if (!name || !role || !review || !rating || !image) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newTestimonial = new Testimonial({
      name,
      role,
      review,
      rating,
      image,
    });

    await newTestimonial.save();
    return res.status(201).json(newTestimonial);
  } catch (error) {
    console.error("Create Testimonial Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
const updateTestimonial = async (req, res) => {
  try {
    const { name, role, review, rating, image } = req.body;
    const testimonialId = req.params.id;

    let testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    testimonial.name = name || testimonial.name;
    testimonial.role = role || testimonial.role;
    testimonial.review = review || testimonial.review;
    testimonial.rating = rating !== undefined ? rating : testimonial.rating;
    testimonial.image = image || testimonial.image;

    await testimonial.save();
    return res.status(200).json(testimonial);
  } catch (error) {
    console.error("Update Testimonial Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = async (req, res) => {
  try {
    const testimonialId = req.params.id;

    const testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    await Testimonial.findByIdAndDelete(testimonialId);
    return res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Delete Testimonial Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
