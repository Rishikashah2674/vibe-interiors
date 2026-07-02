import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Briefcase, 
  Mail, 
  MessageSquare, 
  Users,
  ArrowRight,
  Clock 
} from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AdminNavbar from "./components/AdminNavbar";
import StatCard from "./components/StatCard";
import "./admin.css";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    testimonials: 0,
    clients: 0,
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const authHeader = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch stats counts
        const [projRes, contactRes, testRes] = await Promise.all([
          axios.get("http://localhost:5000/api/projects"),
          axios.get("http://localhost:5000/api/contact", authHeader),
          axios.get("http://localhost:5000/api/testimonials"),
        ]);

        const uniqueClientEmails = new Set();
        contactRes.data.forEach((c) => uniqueClientEmails.add(c.email.toLowerCase()));
        testRes.data.forEach((t) => uniqueClientEmails.add(t.name.toLowerCase()));

        setStats({
          projects: projRes.data.length,
          contacts: contactRes.data.length,
          testimonials: testRes.data.length,
          clients: Math.max(uniqueClientEmails.size, 14), // Derived unique or minimum base
        });

        // Set recent 5 contacts
        setRecentContacts(contactRes.data.slice(0, 5));
      } catch (error) {
        console.error("Dashboard Fetch Data Error:", error);
        setError("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-body">
      <div className="admin-layout">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="admin-main-wrapper">
          <AdminNavbar toggleSidebar={toggleSidebar} />

          <main className="admin-content">
            {loading ? (
              <div style={{ textAlign: "center", padding: "50px", color: "#b88a5a", fontSize: "18px" }}>
                Loading data...
              </div>
            ) : error ? (
              <div style={{ color: "#d9534f", backgroundColor: "#fdf2f2", padding: "20px", borderRadius: "12px", border: "1px solid #d9534f", textAlign: "center", fontSize: "16px", margin: "20px 0" }}>
                ⚠️ {error}
              </div>
            ) : (
              <>
                {/* Stats Section */}
                <div className="admin-stats-grid">
                  <StatCard
                    title="Total Projects"
                    value={stats.projects}
                    icon={<Briefcase size={24} />}
                  />
                  <StatCard
                    title="Consultation Requests"
                    value={stats.contacts}
                    icon={<Mail size={24} />}
                  />
                  <StatCard
                    title="Testimonials"
                    value={stats.testimonials}
                    icon={<MessageSquare size={24} />}
                  />
                  <StatCard
                    title="Active Clients"
                    value={stats.clients}
                    icon={<Users size={24} />}
                  />
                </div>

                {/* Recent Inquiries List */}
                <div className="admin-card">
                  <div className="admin-card-header">
                    <h2 className="admin-card-title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Clock size={18} color="#b88a5a" /> Recent Consultation Requests
                    </h2>
                    <Link 
                      to="/admin/contacts" 
                      style={{ 
                        color: "#b88a5a", 
                        textDecoration: "none", 
                        fontSize: "14px", 
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                      }}
                    >
                      View All Inbox <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div className="admin-table-container">
                    {recentContacts.length === 0 ? (
                      <div style={{ padding: "30px", textAlign: "center", color: "#6e6259" }}>
                        No consultation requests in the inbox yet.
                      </div>
                    ) : (
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Client Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Project Type</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentContacts.map((contact) => (
                            <tr key={contact._id}>
                              <td style={{ fontWeight: "600" }}>{contact.name}</td>
                              <td>{contact.email}</td>
                              <td>{contact.phone}</td>
                              <td style={{ textTransform: "capitalize" }}>{contact.projectType}</td>
                              <td>{new Date(contact.createdAt).toLocaleDateString("en-IN")}</td>
                              <td>
                                <span className={`status-badge ${contact.status.toLowerCase()}`}>
                                  {contact.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
