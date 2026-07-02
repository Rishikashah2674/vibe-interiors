const mongoose = require("mongoose");

const WebsiteSettingsSchema = new mongoose.Schema({
  heroImage: {
    type: String,
    required: true,
  },
  aboutBannerImage: {
    type: String,
    required: true,
  },
  aboutStoryImage: {
    type: String,
    required: true,
  },
  founderImage: {
    type: String,
    required: true,
  },
  servicesBannerImage: {
    type: String,
    required: true,
  },
  portfolioBannerImage: {
    type: String,
    required: true,
  },
  processBannerImage: {
    type: String,
    required: true,
  },
  contactBannerImage: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WebsiteSettings", WebsiteSettingsSchema);
