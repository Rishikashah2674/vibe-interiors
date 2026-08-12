import React, { useState, useEffect } from "react";
import api, { getImageUrl } from "../../api";
import { Plus, Edit2, Trash2, X, Star, Image as ImageIcon } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../admin.css";

const TestimonialManager = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    review: "",
    rating: 5,
    image: "",
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await api.get("/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error("Fetch Testimonials Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setCurrentTestimonial(null);
    setFormData({
      name: "",
      role: "",
      review: "",
      rating: 5,
      image: "",
    });
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      review: testimonial.review,
      rating: testimonial.rating,
      image: testimonial.image,
    });
    setError("");
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (stars) => {
    setFormData({ ...formData, rating: stars });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    try {
      setUploading(true);
      setError("");
      const res = await api.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data && res.data.image) {
        setFormData({ ...formData, image: res.data.image });
      }
    } catch (err) {
      console.error("Upload Avatar Error:", err);
      setError(err.response?.data?.message || "File upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.role || !formData.review || !formData.image) {
      setError("Please fill in all fields and select a client image.");
      return;
    }

    try {
      if (currentTestimonial) {
        await api.put(`/testimonials/${currentTestimonial._id}`, formData);
      } else {
        await api.post("/testimonials", formData);
      }

      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      console.error("Submit Testimonial Error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      await api.delete(`/testimonials/${id}`);
      fetchTestimonials();
    } catch (err) {
      console.error("Delete Testimonial Error:", err);
      alert("Failed to delete testimonial.");
    }
  };

  return (
    <div className="admin-body">
      <div className="admin-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="admin-main-wrapper">
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <main className="admin-content">
            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title">Manage Client Testimonials</h2>
                <button onClick={openAddModal} className="admin-btn" style={{ width: "auto", padding: "10px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Plus size={18} /> Add Testimonial
                </button>
              </div>

              <div className="admin-table-container">
                {loading ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "#b88a5a" }}>
                    Loading testimonials...
                  </div>
                ) : testimonials.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#6e6259" }}>
                    No testimonials found. Click "Add Testimonial" to create one.
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Avatar</th>
                        <th>Client Name</th>
                        <th>Designation / Role</th>
                        <th>Rating</th>
                        <th>Review Snippet</th>
                        <th style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map((test) => {
                        const imgUrl = getImageUrl(test.image);
                        return (
                          <tr key={test._id}>
                            <td>
                              <img 
                                src={imgUrl} 
                                alt={test.name} 
                                style={{ width: "42px", height: "42px", objectFit: "cover", borderRadius: "50%", border: "1px solid #ead7c2" }} 
                              />
                            </td>
                            <td style={{ fontWeight: "600" }}>{test.name}</td>
                            <td>{test.role}</td>
                            <td>
                              <div style={{ display: "flex", color: "#ffb800", gap: "2px" }}>
                                {[...Array(test.rating)].map((_, i) => (
                                  <Star key={i} size={14} fill="#ffb800" />
                                ))}
                              </div>
                            </td>
                            <td style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {test.review}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <div className="action-btn-group" style={{ justifyContent: "flex-end" }}>
                                <button onClick={() => openEditModal(test)} className="action-btn edit" title="Edit">
                                  <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(test._id)} className="action-btn delete" title="Delete">
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Testimonial Dialog Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                {currentTestimonial ? "Edit Client Testimonial" : "Add Testimonial"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="modal-close">
                <X size={24} />
              </button>
            </div>

            {error && (
              <div style={{ color: "#d9534f", backgroundColor: "#fdf2f2", padding: "10px", borderRadius: "8px", border: "1px solid #d9534f", marginBottom: "15px", fontSize: "14px" }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="admin-form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label>Client Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Rahul Sharma"
                    required 
                  />
                </div>
                <div>
                  <label>Designation / Role</label>
                  <input 
                    type="text" 
                    name="role" 
                    value={formData.role} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Homeowner, Bandra" 
                    required 
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Rating Score</label>
                <div className="rating-selector">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <span 
                      key={stars} 
                      onClick={() => handleRatingChange(stars)}
                      className={`rating-star ${formData.rating >= stars ? "selected" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div className="admin-form-group">
                <label>Review Description</label>
                <textarea 
                  name="review" 
                  value={formData.review} 
                  onChange={handleInputChange} 
                  rows="4"
                  placeholder="Insert feedback message..."
                  required
                ></textarea>
              </div>

              <div className="admin-form-group">
                <label>Client Profile Picture</label>
                <div className="image-upload-preview">
                  {formData.image ? (
                    <img 
                      src={getImageUrl(formData.image)} 
                      alt="Upload Preview" 
                      className="preview-box" 
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <div className="preview-box" style={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#b88a5a" }}>
                      <ImageIcon size={30} />
                    </div>
                  )}
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="upload-action-btn" style={{ margin: 0, display: "inline-block" }}>
                      {uploading ? "Uploading..." : "Upload Photo"}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        style={{ display: "none" }} 
                      />
                    </label>
                    <span style={{ fontSize: "12px", color: "#6e6259" }}>Max 5MB. Formats: JPG, PNG, WEBP</span>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary-flat">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-flat" disabled={uploading}>
                  {currentTestimonial ? "Save Changes" : "Submit Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialManager;
