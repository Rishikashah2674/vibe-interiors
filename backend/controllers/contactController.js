const Contact = require("../models/Contact");

// @desc    Submit a design consultation contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, projectType, budget, message } = req.body;

    // Validate that all fields are present
    if (!name || !email || !phone || !projectType || !budget || !message) {
      console.error("Validation Error: Missing required fields in body:", req.body);
      return res.status(500).json({ message: "Something went wrong" });
    }

    // Validate email format simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Validation Error: Invalid email format:", email);
      return res.status(500).json({ message: "Something went wrong" });
    }

    // Validate allowed projectType values
    const allowedProjectTypes = ["residential", "kitchen", "bedroom", "office", "other"];
    if (!allowedProjectTypes.includes(projectType)) {
      console.error("Validation Error: Invalid projectType:", projectType);
      return res.status(500).json({ message: "Something went wrong" });
    }

    // Validate allowed budget values
    const allowedBudgets = ["under-10l", "10l-25l", "25l-50l", "above-50l"];
    if (!allowedBudgets.includes(budget)) {
      console.error("Validation Error: Invalid budget:", budget);
      return res.status(500).json({ message: "Something went wrong" });
    }

    // Create and save new Contact instance
    const newContact = new Contact({
      name,
      email,
      phone,
      projectType,
      budget,
      message,
    });

    await newContact.save();

    return res.status(201).json({
      message: "Consultation request submitted successfully",
    });
  } catch (error) {
    console.error("Error saving contact request to database:", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Get Contacts Controller Error:", error);
    return res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

// @desc    Update status of a consultation inquiry
// @route   PATCH /api/contact/:id/status
// @access  Private/Admin
const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contactId = req.params.id;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const allowedStatuses = ["Pending", "Contacted", "Completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Inquiry request not found" });
    }

    contact.status = status;
    await contact.save();

    return res.status(200).json(contact);
  } catch (error) {
    console.error("Update Contact Status Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc    Delete a consultation inquiry
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Inquiry request not found" });
    }

    await Contact.findByIdAndDelete(contactId);
    return res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Delete Contact Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
};
