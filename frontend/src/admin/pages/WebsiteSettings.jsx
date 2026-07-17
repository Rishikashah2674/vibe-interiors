import React, { useState, useEffect } from "react";
import api from "../../api";
import { Save, Image as ImageIcon, CheckCircle, RefreshCw } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../admin.css";

const WebsiteSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const [settings, setSettings] = useState({
    heroImage: "",
    aboutBannerImage: "",
    aboutStoryImage: "",
    founderImage: "",
    servicesBannerImage: "",
    portfolioBannerImage: "",
    processBannerImage: "",
    contactBannerImage: "",
  });

  const [uploadingField, setUploadingField] = useState(""); // Stores field name currently uploading

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/settings");
      setSettings(res.data);
    } catch (err) {
      console.error("Fetch Settings Error:", err);
      setError("Could not load website configurations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleFieldUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      setUploadingField(fieldName);
      setError("");
      const res = await api.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data && res.data.image) {
        setSettings({ ...settings, [fieldName]: res.data.image });
      }
    } catch (err) {
      console.error(`Upload error on ${fieldName}:`, err);
      setError(`Failed to upload ${fieldName} image.`);
    } finally {
      setUploadingField("");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    setSaving(true);

    try {
      await api.patch("/settings", settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Save settings error:", err);
      setError("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const fieldsConfig = [
    { label: "Home: Hero Right Showcase Image", field: "heroImage" },
    { label: "About Page: Header Banner Background", field: "aboutBannerImage" },
    { label: "About Page: Story Section Picture", field: "aboutStoryImage" },
    { label: "About Page: Founder Photo", field: "founderImage" },
    { label: "Services Page: Header Banner Background", field: "servicesBannerImage" },
    { label: "Portfolio Page: Header Banner Background", field: "portfolioBannerImage" },
    { label: "Process Page: Header Banner Background", field: "processBannerImage" },
    { label: "Contact Page: Header Banner Background", field: "contactBannerImage" },
  ];

  return (
    <div className="admin-body">
      <div className="admin-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="admin-main-wrapper">
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <main className="admin-content">
            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title">Manage Website Banners & Images</h2>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={fetchSettings} className="action-btn" title="Refresh Settings" style={{ padding: "8px", borderRadius: "50%" }}>
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#b88a5a" }}>
                  Loading settings configuration...
                </div>
              ) : (
                <form onSubmit={handleSave} style={{ padding: "30px" }}>
                  {success && (
                    <div style={{ color: "#12824c", backgroundColor: "#edfcf3", padding: "12px", borderRadius: "10px", border: "1px solid #12824c", marginBottom: "25px", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                      <CheckCircle size={18} /> Website banner configurations saved successfully!
                    </div>
                  )}

                  {error && (
                    <div style={{ color: "#d9534f", backgroundColor: "#fdf2f2", padding: "12px", borderRadius: "10px", border: "1px solid #d9534f", marginBottom: "25px", fontSize: "14px" }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }} className="responsive-grid">
                    {fieldsConfig.map((item) => {
                      const value = settings[item.field];
                      const resolvedUrl = value 
                        ? (value.startsWith("/uploads/") ? `http://localhost:5000${value}` : value)
                        : "";
                      return (
                        <div key={item.field} style={{ border: "1px solid #ead7c2", borderRadius: "16px", padding: "20px", backgroundColor: "#fffdfb" }}>
                          <h4 style={{ margin: "0 0 15px 0", fontSize: "14px", fontWeight: "600", color: "#2f2a25" }}>
                            {item.label}
                          </h4>
                          
                          <div className="image-upload-preview" style={{ marginBottom: 0 }}>
                            {resolvedUrl ? (
                              <img src={resolvedUrl} alt={item.label} className="preview-box" />
                            ) : (
                              <div className="preview-box" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#b88a5a" }}>
                                <ImageIcon size={24} />
                              </div>
                            )}

                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <label className="upload-action-btn" style={{ margin: 0, display: "inline-block" }}>
                                {uploadingField === item.field ? "Uploading..." : "Replace Image"}
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={(e) => handleFieldUpload(e, item.field)} 
                                  disabled={uploadingField !== ""}
                                  style={{ display: "none" }} 
                                />
                              </label>
                              <span style={{ fontSize: "11px", color: "#6e6259" }}>Relative Path: {value || "Not Set"}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: "40px", borderTop: "1px solid #ead7c2", paddingTop: "30px", display: "flex", justifyContent: "flex-end" }}>
                    <button 
                      type="submit" 
                      className="admin-btn" 
                      disabled={saving || uploadingField !== ""} 
                      style={{ width: "auto", padding: "12px 35px", display: "flex", alignItems: "center", gap: "10px" }}
                    >
                      <Save size={18} /> {saving ? "Saving Changes..." : "Save Website Settings"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSettings;
