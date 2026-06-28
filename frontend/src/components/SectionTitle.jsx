import React from "react";

function SectionTitle({ subtitle, title, align = "center" }) {
  return (
    <div className={`section-header align-${align}`} style={{ marginBottom: "50px", textAlign: align }}>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <h2 style={{ 
        fontSize: "clamp(30px, 4vw, 42px)", 
        color: "#2f2a25", 
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        marginTop: "10px",
        fontWeight: "400",
        letterSpacing: "1px"
      }}>{title}</h2>
      <div className="title-divider" style={{
        width: "60px",
        height: "2px",
        backgroundColor: "#b88a5a",
        margin: align === "center" ? "20px auto 0" : "20px 0 0",
        transition: "width 0.3s ease"
      }}></div>
    </div>
  );
}

export default SectionTitle;
