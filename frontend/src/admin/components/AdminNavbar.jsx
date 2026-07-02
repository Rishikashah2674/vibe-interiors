import React from "react";
import { Menu, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const AdminNavbar = ({ toggleSidebar }) => {
  const location = useLocation();

  // Get admin name from cache
  const adminJson = localStorage.getItem("adminUser");
  const adminName = adminJson ? JSON.parse(adminJson).name : "Administrator";

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Dashboard Overview";
      case "/admin/projects":
        return "Projects Portfolio Manager";
      case "/admin/contacts":
        return "Inquiries & Consultations";
      case "/admin/testimonials":
        return "Testimonials Manager";
      case "/admin/settings":
        return "Dynamic Image Settings";
      default:
        return "Admin Portal";
    }
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-left">
        <button onClick={toggleSidebar} className="admin-sidebar-toggle">
          <Menu size={24} />
        </button>
        <span className="admin-nav-title">{getPageTitle()}</span>
      </div>

      <div className="admin-nav-right">
        <div className="admin-user-profile">
          <div className="admin-avatar">
            <User size={18} />
          </div>
          <span className="admin-user-name">{adminName}</span>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
