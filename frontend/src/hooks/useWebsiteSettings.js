import { useState, useEffect } from "react";
import axios from "axios";

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

export const useWebsiteSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/settings");
      if (response.data) {
        // Resolve local uploaded paths to absolute URLs
        const resolvedData = { ...response.data };
        Object.keys(resolvedData).forEach((key) => {
          if (
            typeof resolvedData[key] === "string" &&
            resolvedData[key].startsWith("/uploads/")
          ) {
            resolvedData[key] = `http://localhost:5000${resolvedData[key]}`;
          }
        });
        setSettings(resolvedData);
      }
      setError(null);
    } catch (err) {
      console.warn("Could not fetch settings, using local fallbacks:", err.message);
      setError(err);
      // Keep using defaultSettings as fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, error, refreshSettings: fetchSettings };
};
