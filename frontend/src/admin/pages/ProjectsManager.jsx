import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../admin.css";

const ProjectsManager = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null); // null for add, project object for edit
  const [formData, setFormData] = useState({
    title: "",
    category: "Residential",
    description: "",
    image: "",
    location: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/projects");
      if (res.data && res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Projects Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setCurrentProject(null);
    setFormData({
      title: "",
      category: "Residential",
      description: "",
      image: "",
      location: "",
    });
    setSelectedFile(null);
    setImagePreview("");
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      location: project.location,
    });
    setSelectedFile(null);
    setImagePreview(project.image.startsWith("/uploads/") ? `http://localhost:5000${project.image}` : project.image);
    setError("");
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle selected image file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only images are allowed (jpeg, jpg, png, webp).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds the 5MB limit.");
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const titleTrimmed = formData.title.trim();
    const categoryTrimmed = formData.category.trim();
    const descriptionTrimmed = formData.description.trim();
    const locationTrimmed = formData.location.trim();

    if (!titleTrimmed || !categoryTrimmed || !descriptionTrimmed || !locationTrimmed) {
      setError("Please fill in all fields.");
      return;
    }

    if (!currentProject && !selectedFile) {
      setError("Please choose a cover image for the new project.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      
      const data = new FormData();
      data.append("title", titleTrimmed);
      data.append("category", categoryTrimmed);
      data.append("description", descriptionTrimmed);
      data.append("location", locationTrimmed);
      
      if (selectedFile) {
        data.append("image", selectedFile);
      } else {
        data.append("image", formData.image);
      }

      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      if (currentProject) {
        await axios.put(`http://localhost:5000/api/projects/${currentProject._id}`, data, headers);
      } else {
        await axios.post("http://localhost:5000/api/projects", data, headers);
      }

      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error("Submit Project Error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (err) {
      console.error("Delete Project Error:", err);
      alert("Failed to delete project.");
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";
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
                <h2 className="admin-card-title">Manage Portfolio Projects</h2>
                <button onClick={openAddModal} className="admin-btn" style={{ width: "auto", padding: "10px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Plus size={18} /> Add New Project
                </button>
              </div>

              <div className="admin-table-container">
                {loading ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "#b88a5a" }}>
                    Loading projects...
                  </div>
                ) : projects.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#6e6259" }}>
                    No projects found. Click "Add New Project" to create one.
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Project Title</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Created Date</th>
                        <th style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => {
                        const imgUrl = project.image.startsWith("/uploads/") 
                          ? `http://localhost:5000${project.image}` 
                          : project.image;
                        return (
                          <tr key={project._id}>
                            <td>
                              <img 
                                src={imgUrl} 
                                alt={project.title} 
                                onError={handleImageError}
                                style={{ width: "65px", height: "45px", objectFit: "cover", borderRadius: "8px", border: "1px solid #ead7c2" }} 
                              />
                            </td>
                            <td style={{ fontWeight: "600" }}>{project.title}</td>
                            <td>{project.category}</td>
                            <td>{project.location}</td>
                            <td>{new Date(project.createdAt).toLocaleDateString("en-IN")}</td>
                            <td style={{ textAlign: "right" }}>
                              <div className="action-btn-group" style={{ justifyContent: "flex-end" }}>
                                <button onClick={() => openEditModal(project)} className="action-btn edit" title="Edit">
                                  <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="action-btn delete" title="Delete">
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

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                {currentProject ? "Edit Portfolio Project" : "Add New Project"}
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
              <div className="admin-form-group">
                <label>Project Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Elegant Sea-Facing Penthouse"
                  required 
                />
              </div>

              <div className="admin-form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="Residential">Residential</option>
                    <option value="Office">Office</option>
                    <option value="Bungalows">Bungalows</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label>Location</label>
                  <input 
                    type="text" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    placeholder="e.g. Worli, Mumbai" 
                    required 
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows="3"
                  placeholder="Describe design specifics, materials used..."
                  required
                ></textarea>
              </div>

              <div className="admin-form-group">
                <label>Project Cover Image</label>
                <div className="image-upload-preview">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Upload Preview" 
                      onError={handleImageError}
                      className="preview-box" 
                    />
                  ) : (
                    <div className="preview-box" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#b88a5a" }}>
                      <ImageIcon size={30} />
                    </div>
                  )}
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label className="upload-action-btn" style={{ margin: 0, display: "inline-block" }}>
                      Choose Image
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
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
                <button type="submit" className="btn-primary-flat" disabled={submitting}>
                  {submitting ? "Saving..." : (currentProject ? "Save Changes" : "Create Project")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
