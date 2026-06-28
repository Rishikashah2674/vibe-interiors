import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          <h2>VIBE Interiors</h2>
          <p>Converting Dreams Into Reality</p>
        </Link>
      </div>

      {/* Hamburger Icon */}
      <button 
        className={`hamburger ${isOpen ? "active" : ""}`} 
        onClick={toggleMenu} 
        aria-label="Toggle Navigation Menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <NavLink 
          to="/" 
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Home
        </NavLink>
        <NavLink 
          to="/about" 
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          About
        </NavLink>
        <NavLink 
          to="/services" 
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Services
        </NavLink>
        <NavLink 
          to="/portfolio" 
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Portfolio
        </NavLink>
        <NavLink 
          to="/process" 
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Process
        </NavLink>
        <NavLink 
          to="/contact" 
          onClick={closeMenu}
          className={({ isActive }) => isActive ? "active-link" : ""}
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;