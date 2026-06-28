import React from "react";

function TestimonialCard({ name, role, text, rating = 5 }) {
  return (
    <div className="testimonial-card" style={{
      backgroundColor: "white",
      padding: "35px",
      borderRadius: "20px",
      border: "1px solid #ead7c2",
      boxShadow: "0 10px 25px rgba(184, 138, 90, 0.05)",
      textAlign: "left",
      position: "relative"
    }}>
      <div className="quote-mark" style={{
        fontSize: "80px",
        color: "rgba(184, 138, 90, 0.12)",
        position: "absolute",
        top: "-10px",
        left: "20px",
        fontFamily: "Georgia, serif",
        lineHeight: "1"
      }}>“</div>
      <div className="rating" style={{ color: "#b88a5a", marginBottom: "15px", position: "relative", zIndex: "1" }}>
        {"★".repeat(rating)}{"☆".repeat(5 - rating)}
      </div>
      <p style={{
        fontStyle: "italic",
        color: "#5a4a3f",
        fontSize: "16px",
        lineHeight: "1.7",
        marginBottom: "20px",
        position: "relative",
        zIndex: "1"
      }}>{text}</p>
      <div className="client-info">
        <h4 style={{ color: "#2f2a25", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{name}</h4>
        <span style={{ color: "#b88a5a", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>{role}</span>
      </div>
    </div>
  );
}

export default TestimonialCard;
