import React, { useState, useEffect } from "react";
import api from "../../api";
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Ruler } from "lucide-react";
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
    area: "",
  });
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Cover image file
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Additional images files
  const [selectedAdditionalFiles, setSelectedAdditionalFiles] = useState([]);
  const [existingAdditionalImages, setExistingAdditionalImages] = useState([]);
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const categoriesList = [
    "Residential",
    "Commercial",
    "Office",
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Hospitality",
    "Healthcare",
    "Retail",
    "Renovation",
    "Exterior",
    "Custom Design"
  ];

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/projects");
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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownOpen && !e.target.closest(".searchable-dropdown-container")) {
        setDropdownOpen(false);
        const isValid = categoriesList.includes(searchQuery);
        if (!isValid) {
          setSearchQuery(formData.category);
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen, searchQuery, formData.category]);

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category });
    setSearchQuery(category);
    setDropdownOpen(false);
  };

  const handleCategorySearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setDropdownOpen(true);
    const exactMatch = categoriesList.find(cat => cat.toLowerCase() === val.toLowerCase());
    if (exactMatch) {
      setFormData(prev => ({ ...prev, category: exactMatch }));
    }
  };

  const openAddModal = () => {
    setCurrentProject(null);
    setFormData({
      title: "",
      category: "Residential",
      description: "",
      image: "",
      location: "",
      area: "",
    });
    setSearchQuery("Residential");
    setSelectedFile(null);
    setImagePreview("");
    setSelectedAdditionalFiles([]);
    setExistingAdditionalImages([]);
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
      area: project.area || "",
    });

    setSearchQuery(project.category);
    setSelectedFile(null);
    setImagePreview(project.image.startsWith("/uploads/") ? `http://localhost:5000${project.image}` : project.image);
    
    // Set additional images (exclude cover image)
    const allImages = project.images || [];
    const additionals = allImages.filter(img => img !== project.image);
    setExistingAdditionalImages(additionals);
    setSelectedAdditionalFiles([]);

    setError("");
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  // Handle additional images selection
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      setError("Some files are not supported. Only images are allowed.");
      return;
    }

    const largeFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (largeFiles.length > 0) {
      setError("Some files exceed the 5MB size limit.");
      return;
    }

    setSelectedAdditionalFiles(prev => [...prev, ...files]);
    setError("");
  };

  const removeSelectedAdditionalFile = (idx) => {
    setSelectedAdditionalFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const removeExistingAdditionalImage = (path) => {
    setExistingAdditionalImages(prev => prev.filter(img => img !== path));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const titleTrimmed = formData.title.trim();
    const finalCategory = formData.category.trim();
    if (!categoriesList.includes(finalCategory)) {
      setError("Please select a valid category from the dropdown.");
      return;
    }
    const descriptionTrimmed = formData.description.trim();
    const locationTrimmed = formData.location.trim();
    const areaTrimmed = formData.area.trim();

    if (!titleTrimmed || !finalCategory || !descriptionTrimmed || !locationTrimmed) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!currentProject && !selectedFile) {
      setError("Please choose a cover image for the new project.");
      return;
    }

    try {
      setSubmitting(true);
      
      const data = new FormData();
      data.append("title", titleTrimmed);
      data.append("category", finalCategory);
      data.append("description", descriptionTrimmed);
      data.append("location", locationTrimmed);
      if (areaTrimmed) {
        data.append("area", areaTrimmed);
      }
      
      // Cover image
      if (selectedFile) {
        data.append("image", selectedFile);
      } else {
        data.append("image", formData.image);
      }

      // Existing additional images list (stringified)
      data.append("existingImages", JSON.stringify(existingAdditionalImages));

      // Append new additional files
      selectedAdditionalFiles.forEach(file => {
        data.append("images", file);
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (currentProject) {
        await api.put(`/projects/${currentProject._id}`, data, config);
      } else {
        await api.post("/projects", data, config);
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
    if (!window.confirm("Are you sure you want to delete this project? All associated showcase images will also be removed.")) return;

    try {
      await api.delete(`/projects/${id}`);
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
                        <th>Dimensions</th>
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
                            <td>{project.area || "—"}</td>
                            <td>{new Date(project.createdAt).toLocaleDateString("en-IN")}</td>
                            <td style={{ textAlign: "right" }}>
                              <div className="action-btn-group" style={{ justifyContext: "flex-end" }}>
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
          <div className="modal-content" style={{ maxWidth: "680px", maxHeight: "90vh", overflowY: "auto" }}>
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
                <label>Project Title *</label>
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
                <div className="searchable-dropdown-container" style={{ position: "relative" }}>
                  <label>Category *</label>
                  <input
                    type="text"
                    placeholder="Search or select category..."
                    value={searchQuery}
                    onChange={handleCategorySearchChange}
                    onFocus={() => setDropdownOpen(true)}
                    style={{ width: "100%" }}
                  />
                  {dropdownOpen && (
                    <div 
                      className="searchable-dropdown-menu"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#ffffff",
                        border: "1px solid #ead7c2",
                        borderRadius: "8px",
                        maxHeight: "180px",
                        overflowY: "auto",
                        zIndex: 1000,
                        boxShadow: "0 8px 24px rgba(47, 42, 37, 0.1)",
                        marginTop: "4px"
                      }}
                    >
                      {categoriesList.filter(cat => cat.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                        <div style={{ padding: "10px 15px", color: "#6e6259", fontSize: "14px" }}>
                          No categories match
                        </div>
                      ) : (
                        categoriesList
                          .filter(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((cat, idx) => (
                            <div
                              key={cat}
                              onClick={() => handleCategorySelect(cat)}
                              onMouseEnter={() => setHoveredIndex(idx)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              style={{
                                padding: "10px 15px",
                                cursor: "pointer",
                                fontSize: "14px",
                                color: formData.category === cat ? "#b88a5a" : "#2f2a25",
                                backgroundColor: formData.category === cat 
                                  ? "#fffaf5" 
                                  : (hoveredIndex === idx ? "#fffbf8" : "transparent"),
                                transition: "background-color 0.2s"
                              }}
                            >
                              {cat}
                            </div>
                          ))
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label>Location *</label>
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

              {/* Custom Category & Area Row */}
              <div className="admin-form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  {/* Custom Category input field removed */}
                </div>
                <div>
                  <label>Dimensions / Area (Optional)</label>
                  <input 
                    type="text" 
                    name="area" 
                    value={formData.area} 
                    onChange={handleInputChange} 
                    placeholder="e.g. 2800 sq.ft" 
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Description *</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows="3"
                  placeholder="Describe design specifics, materials used..."
                  required
                ></textarea>
              </div>

              {/* Cover Image Upload */}
              <div className="admin-form-group" style={{ borderBottom: "1px solid #ead7c2", paddingBottom: "20px" }}>
                <label>Project Cover Image *</label>
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
                      Choose Cover Image
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

              {/* Additional Images Upload Section */}
              <div className="admin-form-group" style={{ paddingTop: "10px" }}>
                <label>Additional Project Images (Optional)</label>
                
                {/* Previews Container */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "15px" }}>
                  {/* Render Existing Additional Images */}
                  {existingAdditionalImages.map((img, idx) => {
                    const fullUrl = img.startsWith("/uploads/") ? `http://localhost:5000${img}` : img;
                    return (
                      <div key={`existing-${idx}`} style={{ position: "relative", width: "85px", height: "85px" }}>
                        <img 
                          src={fullUrl} 
                          alt="Existing Showcase" 
                          onError={handleImageError}
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", border: "1px solid #ead7c2" }} 
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingAdditionalImage(img)}
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
                            backgroundColor: "#d9534f",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            fontSize: "11px",
                            fontWeight: "bold",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
                          }}
                          title="Remove Image"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}

                  {/* Render New Selected Files Previews */}
                  {selectedAdditionalFiles.map((file, idx) => {
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div key={`new-${idx}`} style={{ position: "relative", width: "85px", height: "85px" }}>
                        <img 
                          src={previewUrl} 
                          alt="New Upload Preview" 
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", border: "1px solid #b88a5a" }} 
                        />
                        <button
                          type="button"
                          onClick={() => removeSelectedAdditionalFile(idx)}
                          style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
                            backgroundColor: "#d9534f",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            fontSize: "11px",
                            fontWeight: "bold",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
                          }}
                          title="Remove Image"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label className="upload-action-btn" style={{ margin: 0, display: "inline-block", width: "auto" }}>
                    Upload Additional Images
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleAdditionalImagesChange} 
                      style={{ display: "none" }} 
                    />
                  </label>
                  <span style={{ fontSize: "12px", color: "#6e6259" }}>Upload up to 10 additional images. JPG, PNG, WEBP under 5MB.</span>
                </div>
              </div>

              <div className="form-actions" style={{ marginTop: "30px", borderTop: "1px solid #ead7c2", paddingTop: "20px" }}>
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
