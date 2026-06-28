import React from "react";

function ProjectCard({ image, title, category }) {
  return (
    <div className="project-card">
      <img src={image} alt={title} loading="lazy" />
      <div className="project-info">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
