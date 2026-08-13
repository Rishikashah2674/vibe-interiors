import React, { useState, useEffect } from "react";
import api from "../../api";
import { Mail, Trash2, Eye, X, CheckCircle, RefreshCw } from "lucide-react";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import "../admin.css";

const ContactManager = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal detail states
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact");
      setContacts(res.data);
    } catch (err) {
      console.error("Fetch Contacts Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openDetailsModal = (contact) => {
    setSelectedContact(contact);
    setModalOpen(true);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/contact/${id}/status`, { status: newStatus });
      
      // Update local state smoothly
      setContacts(contacts.map(c => c._id === id ? { ...c, status: newStatus } : c));
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (err) {
      console.error("Status Change Error:", err);
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this consultation request?")) return;

    try {
      await api.delete(`/contact/${id}`);
      setModalOpen(false);
      fetchContacts();
    } catch (err) {
      console.error("Delete Contact Error:", err);
      alert("Failed to delete request.");
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
                <h2 className="admin-card-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Mail size={20} color="#b88a5a" /> Inquiries & Consultation Requests
                </h2>
                <button onClick={fetchContacts} className="action-btn" title="Refresh Inbox" style={{ padding: "8px", borderRadius: "50%" }}>
                  <RefreshCw size={18} />
                </button>
              </div>

              <div className="admin-table-container">
                {loading ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "#b88a5a" }}>
                    Loading inbox...
                  </div>
                ) : contacts.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#6e6259" }}>
                    Inboxes are empty. No consultation requests registered yet.
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Project Type</th>
                        <th>Budget</th>
                        <th>Submitted Date</th>
                        <th>Status</th>
                        <th style={{ textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact._id}>
                          <td style={{ fontWeight: "600" }}>{contact.name}</td>
                          <td>{contact.email}</td>
                          <td>{contact.phone}</td>
                          <td style={{ textTransform: "capitalize" }}>{contact.projectType}</td>
                          <td>
                            {contact.budget === "under-10l" && "Under ₹10L"}
                            {contact.budget === "10l-25l" && "₹10L - ₹25L"}
                            {contact.budget === "25l-50l" && "₹25L - ₹50L"}
                            {contact.budget === "above-50l" && "Above ₹50L"}
                          </td>
                          <td>{new Date(contact.createdAt).toLocaleDateString("en-IN")}</td>
                          <td>
                            <select 
                              value={contact.status} 
                              onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                              style={{ 
                                padding: "6px 12px", 
                                borderRadius: "20px", 
                                fontSize: "12px",
                                fontWeight: "600",
                                border: "1px solid var(--border-light)",
                                cursor: "pointer",
                                outline: "none",
                                backgroundColor: contact.status === "Pending" ? "#fef4ea" : contact.status === "Contacted" ? "#e6f6ff" : "#edfcf3",
                                color: contact.status === "Pending" ? "#c97f2c" : contact.status === "Contacted" ? "#0c72aa" : "#12824c",
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <div className="action-btn-group" style={{ justifyContent: "flex-end" }}>
                              <button onClick={() => openDetailsModal(contact)} className="action-btn edit" title="View Details">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => handleDelete(contact._id)} className="action-btn delete" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Details Modal */}
      {modalOpen && selectedContact && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Consultation Request Details</h3>
              <button onClick={() => setModalOpen(false)} className="modal-close">
                <X size={24} />
              </button>
            </div>

            <div className="modal-body-detail" style={{ fontSize: "15px", color: "#5a4a3f" }}>
              <div className="admin-form-row" style={{ marginBottom: "25px", borderBottom: "1px solid #ead7c2", paddingBottom: "20px" }}>
                <p><strong>Client Name:</strong><br /> {selectedContact.name}</p>
                <p><strong>Phone Number:</strong><br /> {selectedContact.phone}</p>
                <p><strong>Email Address:</strong><br /> {selectedContact.email}</p>
                <p><strong>Submitted On:</strong><br /> {new Date(selectedContact.createdAt).toLocaleString("en-IN")}</p>
                <p><strong>Project Category:</strong><br /> <span style={{ textTransform: "capitalize" }}>{selectedContact.projectType}</span></p>
                <p>
                  <strong>Estimated Budget:</strong><br /> 
                  {selectedContact.budget === "under-10l" && "Under ₹10 Lakhs"}
                  {selectedContact.budget === "10l-25l" && "₹10 Lakhs - ₹25 Lakhs"}
                  {selectedContact.budget === "25l-50l" && "₹25 Lakhs - ₹50 Lakhs"}
                  {selectedContact.budget === "above-50l" && "Above ₹50 Lakhs"}
                </p>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <strong style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: "#2f2a25" }}>Client Message / Requirements:</strong>
                <div style={{ backgroundColor: "#fffcf9", border: "1px solid #ead7c2", padding: "18px", borderRadius: "12px", marginTop: "10px", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                  {selectedContact.message}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <strong>Update Status:</strong>
                  <select 
                    value={selectedContact.status} 
                    onChange={(e) => handleStatusChange(selectedContact._id, e.target.value)}
                    style={{ 
                      padding: "8px 16px", 
                      borderRadius: "20px", 
                      fontSize: "13px",
                      fontWeight: "600",
                      border: "1px solid var(--border-light)",
                      outline: "none",
                      backgroundColor: selectedContact.status === "Pending" ? "#fef4ea" : selectedContact.status === "Contacted" ? "#e6f6ff" : "#edfcf3",
                      color: selectedContact.status === "Pending" ? "#c97f2c" : selectedContact.status === "Contacted" ? "#0c72aa" : "#12824c",
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <button 
                  type="button" 
                  onClick={() => handleDelete(selectedContact._id)} 
                  className="admin-btn"
                  style={{ width: "auto", backgroundColor: "#d9534f", padding: "10px 20px" }}
                >
                  Delete Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManager;
