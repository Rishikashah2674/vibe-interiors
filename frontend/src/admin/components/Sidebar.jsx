import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Mail, 
  MessageSquare, 
  Image, 
  LogOut,
  Users,
  X 
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Projects Portfolio",
      path: "/admin/projects",
      icon: <Briefcase size={20} />
    },
    {
      name: "Consultation Inbox",
      path: "/admin/contacts",
      icon: <Mail size={20} />
    },
    {
      name: "Testimonials",
      path: "/admin/testimonials",
      icon: <MessageSquare size={20} />
    },
    {
      name: "Website Images",
      path: "/admin/settings",
      icon: <Image size={20} />
    },
    {
      name: "Admin Users",
      path: "/admin/admins",
      icon: <Users size={20} />
    }
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <div className="admin-sidebar-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="admin-sidebar-logo">
          VIBE <span>Admin</span>
        </div>
        <button 
          onClick={toggleSidebar} 
          className="admin-sidebar-toggle"
          style={{ display: "block", color: "white", padding: 0 }}
        >
          <X size={20} />
        </button>
      </div>

      <ul className="admin-sidebar-menu">
        {menuItems.map((item) => (
          <li 
            key={item.name} 
            className={`admin-menu-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => {
              if (window.innerWidth <= 992) {
                toggleSidebar(); // Close sidebar drawer on click in mobile
              }
            }}
          >
            <Link to={item.path}>
              {item.icon}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="admin-sidebar-footer">
        <li className="admin-menu-item" style={{ listStyle: "none" }}>
          <button onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </li>
      </div>
    </aside>
  );
};

export default Sidebar;
