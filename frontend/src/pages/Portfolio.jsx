import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";

function Portfolio() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Luxury Living Room",
      category: "residential",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 2,
      title: "Modern Minimalist Bedroom",
      category: "bedroom",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 3,
      title: "Elegant Marble Kitchen",
      category: "kitchen",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 4,
      title: "Executive Conference Office",
      category: "office",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 5,
      title: "Cozy Penthouse Living Space",
      category: "residential",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 6,
      title: "U-Shaped Compact Modular Kitchen",
      category: "kitchen",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 7,
      title: "Creative Tech Workspace",
      category: "office",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: 8,
      title: "Master Suite with Custom Wardrobe",
      category: "bedroom",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="portfolio-page">
      {/* Header Banner */}
      <section className="page-header" style={{
        backgroundImage: 'linear-gradient(rgba(47, 42, 37, 0.6), rgba(47, 42, 37, 0.75)), url("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80")',
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
          {["all", "residential", "office", "kitchen", "bedroom"].map((category) => (
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
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id}
              image={project.image}
              title={project.title}
              category={project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Portfolio;