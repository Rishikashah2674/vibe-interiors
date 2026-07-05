import React, { useState, useEffect } from "react";
import axios from "axios";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";

function Portfolio() {
  const { settings } = useWebsiteSettings();
  const [filter, setFilter] = useState("all");
  const [dbProjects, setDbProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then((res) => {
        if (res.data && res.data.success) {
          const resolved = res.data.data.map(p => ({
            id: p._id,
            title: p.title,
            category: p.category.toLowerCase(),
            image: p.image.startsWith("/uploads/") ? `http://localhost:5000${p.image}` : p.image
          }));
          setDbProjects(resolved);
        }
      })
      .catch((err) => console.warn("Could not load projects from DB:", err.message));
  }, []);

  const projectsToDisplay = dbProjects;

  // Filter logic
  const filteredProjects = filter === "all"
    ? projectsToDisplay
    : projectsToDisplay.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  // Dynamic filter tags based on available categories
  const categories = ["all", "residential", "office", "kitchen", "bedroom", "bungalows", "commercial"];

  return (
    <div className="portfolio-page">
      {/* Header Banner */}
      <section className="page-header" style={{
        backgroundImage: `linear-gradient(rgba(47, 42, 37, 0.6), rgba(47, 42, 37, 0.75)), url("${settings.portfolioBannerImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 6% 80px",
        textAlign: "center",
        color: "#f7efe6"
      }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: "400", marginBottom: "15px" }}>
          Our Design Portfolio
        </h1>
        <p style={{ fontSize: "18px", color: "#d8b88c", textTransform: "uppercase", letterSpacing: "2px" }}>
          A showcase of curated residential and commercial projects
        </p>
      </section>

      {/* Gallery Section */}
      <section className="portfolio-gallery-section" style={{ padding: "80px 6%", backgroundColor: "#f7efe6" }}>
        
        {/* Filter Navigation */}
        <div className="filter-nav" style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "15px", 
          marginBottom: "50px", 
          flexWrap: "wrap" 
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              style={{
                background: filter === category ? "#b88a5a" : "transparent",
                color: filter === category ? "white" : "#2f2a25",
                border: "1px solid #b88a5a",
                padding: "10px 25px",
                borderRadius: "30px",
                fontSize: "15px",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: filter === category ? "0 5px 15px rgba(184, 138, 90, 0.25)" : "none"
              }}
              className="filter-btn"
            >
              {category === "all" ? "Show All" : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }} className="responsive-grid-3">
          {filteredProjects.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#6e6259" }}>
              No projects found in this category.
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                image={project.image}
                title={project.title}
                category={project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Portfolio;