import React, { useState, useEffect } from "react";
import api from "../../api";
import { Users, Plus, Edit2, Key, Trash2, X, RefreshCw } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../admin.css";

const AdminManager = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Notifications
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Logged-in admin info
  const [currentUser, setCurrentUser] = useState(null);

  // Modals visibility
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  // Form states
  const [addForm, setAddForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    id: "",
    name: "", // to display in title
    newPassword: "",
    confirmPassword: "",
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Retrieve current logged in user from localStorage
  useEffect(() => {
    const adminJson = localStorage.getItem("adminUser");
    if (adminJson) {
      try {
        const parsed = JSON.parse(adminJson);
        setCurrentUser(parsed);
      } catch (err) {
        console.error("Error parsing adminUser from localStorage:", err);
      }
    }
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/admin");
      setAdmins(res.data);
    } catch (err) {
      console.error("Fetch Admins Error:", err);
      setError("Failed to retrieve administrators list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Show success alert and clear after 4 seconds
  const triggerSuccess = (message) => {
    setSuccess(message);
    setError("");
    setTimeout(() => {
      setSuccess("");
    }, 4000);
  };

  // Add Admin handler
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = addForm;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post(
        "/admin",
        { name: name.trim(), email: email.trim(), password }
      );

      setAddModalOpen(false);
      setAddForm({ name: "", email: "", password: "", confirmPassword: "" });
      triggerSuccess(res.data.message || "Administrator added successfully.");
      fetchAdmins();
    } catch (err) {
      console.error("Add Admin Error:", err);
      setError(err.response?.data?.message || "Failed to add administrator.");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit Admin handler
  const handleEditClick = (admin) => {
    setEditForm({
      id: admin._id,
      name: admin.name,
      email: admin.email,
    });
    setError("");
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { id, name, email } = editForm;

    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.put(
        `/admin/${id}`,
        { name: name.trim(), email: email.trim() }
      );

      setEditModalOpen(false);
      triggerSuccess(res.data.message || "Administrator details updated successfully.");
      fetchAdmins();
    } catch (err) {
      console.error("Edit Admin Error:", err);
      setError(err.response?.data?.message || "Failed to update administrator.");
    } finally {
      setSubmitting(false);
    }
  };

  // Change Password handler
  const handlePasswordClick = (admin) => {
    setPasswordForm({
      id: admin._id,
      name: admin.name,
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
    setPasswordModalOpen(true);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { id, newPassword, confirmPassword } = passwordForm;

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.patch(
        `/admin/${id}/password`,
        { newPassword }
      );

      setPasswordModalOpen(false);
      triggerSuccess(res.data.message || "Password updated successfully.");
    } catch (err) {
      console.error("Change Password Error:", err);
      setError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Admin handler
  const handleDeleteClick = async (admin) => {
    const adminId = admin._id;

    // Safety check 1: Prevent self-deletion
    const currentLoggedInId = currentUser?.id || currentUser?._id;
    if (currentLoggedInId === adminId) {
      alert("Safety Rule: You cannot delete your own logged-in account.");
      return;
    }

    // Safety check 2: Prevent deleting the last remaining admin
    if (admins.length <= 1) {
      alert("Safety Rule: Cannot delete the last remaining administrator.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete administrator "${admin.name}"?`)) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const res = await api.delete(`/admin/${adminId}`);
      triggerSuccess(res.data.message || "Administrator deleted successfully.");
      fetchAdmins();
    } catch (err) {
      console.error("Delete Admin Error:", err);
      setError(err.response?.data?.message || "Failed to delete administrator.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-body">
      <div className="admin-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="admin-main-wrapper">
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <main className="admin-content">
            {/* Alerts */}
            {error && (
              <div
                style={{
                  color: "#d9534f",
                  backgroundColor: "#fdf2f2",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid #d9534f",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div
                style={{
                  color: "#12824c",
                  backgroundColor: "#edfcf3",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid #12824c",
                  marginBottom: "20px",
                  fontSize: "14px",
                }}
              >
                ✓ {success}
              </div>
            )}

            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Users size={20} color="#b88a5a" /> Manage Administrators
                </h2>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={fetchAdmins}
                    className="action-btn"
                    title="Refresh List"
                    style={{ padding: "8px", borderRadius: "50%" }}
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setAddForm({ name: "", email: "", password: "", confirmPassword: "" });
                      setError("");
                      setAddModalOpen(true);
                    }}
                    className="admin-btn"
                    style={{ width: "auto", padding: "10px 20px", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <Plus size={18} /> Add New Admin
                  </button>
                </div>
              </div>

              <div className="admin-table-container">
                {loading ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "#b88a5a" }}>
                    Loading administrators...
                  </div>
                ) : admins.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#6e6259" }}>
                    No administrators found.
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Created Date</th>
                        <th style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map((admin) => {
                        const isSelf = (currentUser?.id || currentUser?._id) === admin._id;
                        return (
                          <tr key={admin._id}>
                            <td style={{ fontWeight: "600" }}>
                              {admin.name} {isSelf && <span style={{ fontSize: "11px", color: "#b88a5a", backgroundColor: "#fff5eb", padding: "2px 8px", borderRadius: "10px", marginLeft: "8px", border: "1px solid #ead7c2" }}>You</span>}
                            </td>
                            <td>{admin.email}</td>
                            <td>{new Date(admin.createdAt).toLocaleDateString("en-IN")}</td>
                            <td style={{ textAlign: "right" }}>
                              <div className="action-btn-group" style={{ justifyContent: "flex-end", gap: "8px" }}>
                                <button
                                  onClick={() => handleEditClick(admin)}
                                  className="action-btn edit"
                                  title="Edit Details"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => handlePasswordClick(admin)}
                                  className="action-btn edit"
                                  title="Change Password"
                                  style={{ color: "#8a6d3b", borderColor: "#faebcc" }}
                                >
                                  <Key size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(admin)}
                                  className={`action-btn delete ${isSelf ? "disabled" : ""}`}
                                  title={isSelf ? "You cannot delete yourself" : "Delete Admin"}
                                  disabled={isSelf}
                                  style={isSelf ? { opacity: 0.4, cursor: "not-allowed" } : {}}
                                >
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

      {/* Add Admin Modal */}
      {addModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add New Administrator</h3>
              <button onClick={() => setAddModalOpen(false)} className="modal-close" disabled={submitting}>
                <X size={24} />
              </button>
            </div>

            {error && (
              <div style={{ color: "#d9534f", backgroundColor: "#fdf2f2", padding: "10px", borderRadius: "8px", border: "1px solid #d9534f", marginBottom: "15px", fontSize: "14px" }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleAddSubmit}>
              <div className="admin-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="admin-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  placeholder="e.g. johndoe@vibeinteriors.co.in"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="admin-form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    value={addForm.password}
                    onChange={(e) => setAddForm({ ...addForm, password: e.target.value })}
                    placeholder="Min 8 chars"
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    value={addForm.confirmPassword}
                    onChange={(e) => setAddForm({ ...addForm, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="btn-secondary-flat"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-flat" disabled={submitting}>
                  {submitting ? "Adding..." : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {editModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit Administrator</h3>
              <button onClick={() => setEditModalOpen(false)} className="modal-close" disabled={submitting}>
                <X size={24} />
              </button>
            </div>

            {error && (
              <div style={{ color: "#d9534f", backgroundColor: "#fdf2f2", padding: "10px", borderRadius: "8px", border: "1px solid #d9534f", marginBottom: "15px", fontSize: "14px" }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleEditSubmit}>
              <div className="admin-form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>

              <div className="admin-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                  disabled={submitting}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="btn-secondary-flat"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-flat" disabled={submitting}>
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {passwordModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Change Password for {passwordForm.name}</h3>
              <button onClick={() => setPasswordModalOpen(false)} className="modal-close" disabled={submitting}>
                <X size={24} />
              </button>
            </div>

            {error && (
              <div style={{ color: "#d9534f", backgroundColor: "#fdf2f2", padding: "10px", borderRadius: "8px", border: "1px solid #d9534f", marginBottom: "15px", fontSize: "14px" }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit}>
              <div className="admin-form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="Min 8 chars"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="admin-form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="Repeat new password"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="btn-secondary-flat"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary-flat" disabled={submitting}>
                  {submitting ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManager;
