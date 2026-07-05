import React from "react";

function ProjectCard({ image, title, category }) {
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <div className="project-card">
      <img 
        src={image} 
        alt={title} 
        loading="lazy" 
        onError={handleImageError} 
      />
      <div className="project-info">
        <h3>{title}</h3>
        <p>{category}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
