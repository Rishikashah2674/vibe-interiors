import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer" style={{
      backgroundColor: "#2f2a25",
      color: "#f7efe6",
      padding: "80px 6% 30px",
      fontSize: "15px",
      lineHeight: "1.8"
    }}>
      <div className="footer-container" style={{
        display: "grid",
        gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr",
        gap: "40px",
        marginBottom: "60px"
      }}>
        {/* Brand Section */}
        <div className="footer-brand">
          <h2 style={{
            fontSize: "26px",
            color: "#b88a5a",
            fontFamily: "Georgia, serif",
            letterSpacing: "1px",
            marginBottom: "15px"
          }}>VIBE Interiors</h2>
          <p style={{ color: "#d8b88c", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "20px" }}>
            Converting Dreams Into Reality
          </p>
          <p style={{ color: "#c8b8aa", maxWidth: "280px" }}>
            Premium interior design studio crafting luxury residential and commercial spaces that reflect your personality and style.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3 style={{
            fontSize: "18px",
            color: "#b88a5a",
            marginBottom: "20px",
            fontWeight: "500",
            fontFamily: "Georgia, serif"
          }}>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}><Link to="/" style={{ color: "#c8b8aa", transition: "color 0.3s" }}>Home</Link></li>
            <li style={{ marginBottom: "10px" }}><Link to="/about" style={{ color: "#c8b8aa", transition: "color 0.3s" }}>About Us</Link></li>
            <li style={{ marginBottom: "10px" }}><Link to="/services" style={{ color: "#c8b8aa", transition: "color 0.3s" }}>Services</Link></li>
            <li style={{ marginBottom: "10px" }}><Link to="/portfolio" style={{ color: "#c8b8aa", transition: "color 0.3s" }}>Portfolio</Link></li>
            <li style={{ marginBottom: "10px" }}><Link to="/process" style={{ color: "#c8b8aa", transition: "color 0.3s" }}>Our Process</Link></li>
            <li style={{ marginBottom: "10px" }}><Link to="/contact" style={{ color: "#c8b8aa", transition: "color 0.3s" }}>Contact</Link></li>
          </ul>
        </div>

        {/* Services Links */}
        <div className="footer-services">
          <h3 style={{
            fontSize: "18px",
            color: "#b88a5a",
            marginBottom: "20px",
            fontWeight: "500",
            fontFamily: "Georgia, serif"
          }}>Our Services</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px", color: "#c8b8aa" }}>Residential Design</li>
            <li style={{ marginBottom: "10px", color: "#c8b8aa" }}>Commercial & Office</li>
            <li style={{ marginBottom: "10px", color: "#c8b8aa" }}>Modular Kitchens</li>
            <li style={{ marginBottom: "10px", color: "#c8b8aa" }}>Bedroom Interiors</li>
            <li style={{ marginBottom: "10px", color: "#c8b8aa" }}>Space Planning</li>
            <li style={{ marginBottom: "10px", color: "#c8b8aa" }}>Turnkey Execution</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3 style={{
            fontSize: "18px",
            color: "#b88a5a",
            marginBottom: "20px",
            fontWeight: "500",
            fontFamily: "Georgia, serif"
          }}>Get In Touch</h3>
          <p style={{ color: "#c8b8aa", marginBottom: "15px" }}>
            <strong>Studio Address:</strong><br />
            104, Luxury Plaza, Gold Crest Avenue, Mumbai, India
          </p>
          <p style={{ color: "#c8b8aa", marginBottom: "15px" }}>
            <strong>Phone:</strong><br />
            +91 98765 43210
          </p>
          <p style={{ color: "#c8b8aa", marginBottom: "15px" }}>
            <strong>Email:</strong><br />
            hello@vibeinteriors.com
          </p>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="footer-bottom" style={{
        borderTop: "1px solid rgba(184, 138, 90, 0.2)",
        paddingTop: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <p style={{ color: "#a89a8f", margin: 0 }}>
          &copy; {new Date().getFullYear()} VIBE Interiors. All rights reserved.
        </p>
        <p style={{ color: "#a89a8f", margin: 0 }}>
          Designed with ❤️ for Premium Spaces.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
