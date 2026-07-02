const WebsiteSettings = require("../models/WebsiteSettings");

// Default initial image paths
const defaultSettings = {
  heroImage: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80",
  aboutBannerImage: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80",
  aboutStoryImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  founderImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  servicesBannerImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
  portfolioBannerImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
  processBannerImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  contactBannerImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
};

// @desc    Get website settings (creates default settings if database is empty)
// @route   GET /api/settings
// @access  Public
const getWebsiteSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      // Seed default configurations
      settings = new WebsiteSettings(defaultSettings);
      await settings.save();
      console.log("Seed Status: Created Default Website Settings Successfully.");
    }
    return res.status(200).json(settings);
  } catch (error) {
    console.error("Get Settings Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// @desc    Update website settings
// @route   PATCH /api/settings
// @access  Private/Admin
const updateWebsiteSettings = async (req, res) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings(defaultSettings);
    }

    const {
      heroImage,
      aboutBannerImage,
      aboutStoryImage,
      founderImage,
      servicesBannerImage,
      portfolioBannerImage,
      processBannerImage,
      contactBannerImage,
    } = req.body;

    if (heroImage !== undefined) settings.heroImage = heroImage;
    if (aboutBannerImage !== undefined) settings.aboutBannerImage = aboutBannerImage;
    if (aboutStoryImage !== undefined) settings.aboutStoryImage = aboutStoryImage;
    if (founderImage !== undefined) settings.founderImage = founderImage;
    if (servicesBannerImage !== undefined) settings.servicesBannerImage = servicesBannerImage;
    if (portfolioBannerImage !== undefined) settings.portfolioBannerImage = portfolioBannerImage;
    if (processBannerImage !== undefined) settings.processBannerImage = processBannerImage;
    if (contactBannerImage !== undefined) settings.contactBannerImage = contactBannerImage;

    settings.updatedAt = Date.now();
    await settings.save();

    return res.status(200).json(settings);
  } catch (error) {
    console.error("Update Settings Controller Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getWebsiteSettings,
  updateWebsiteSettings,
  defaultSettings, // Exposing defaults for auto-seeding in DB init
};
