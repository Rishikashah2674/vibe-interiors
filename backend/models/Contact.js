const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      enum: {
        values: ["residential", "kitchen", "bedroom", "office", "other"],
        message: "{VALUE} is not a valid project type",
      },
    },
    budget: {
      type: String,
      required: [true, "Budget is required"],
      enum: {
        values: ["under-10l", "10l-25l", "25l-50l", "above-50l"],
        message: "{VALUE} is not a valid budget bracket",
      },
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
      enum: {
        values: ["Pending", "Contacted", "Completed"],
        message: "{VALUE} is not a valid status",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Contact", ContactSchema);
