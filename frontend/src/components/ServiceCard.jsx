import React from "react";

function ServiceCard({ title, description, icon, image }) {
  return (
    <div className="service-card">
      {image ? (
        <div className="service-card-image-wrapper">
          <img src={image} alt={title} className="service-card-img" loading="lazy" />
        </div>
      ) : icon ? (
        <div className="service-icon" style={{ fontSize: "40px", color: "#b88a5a", marginBottom: "20px" }}>{icon}</div>
      ) : null}
      <div className="service-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;

