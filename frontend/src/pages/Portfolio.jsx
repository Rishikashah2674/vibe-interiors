import React, { useState, useEffect } from "react";
import api, { getImageUrl } from "../api";
import SectionTitle from "../components/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import ProjectDetailsModal from "../components/ProjectDetailsModal";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";

function Portfolio() {
  const { settings } = useWebsiteSettings();
  const [filter, setFilter] = useState("all");
  const [dbProjects, setDbProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/projects")
      .then((res) => {
        if (res.data && res.data.success) {
          const resolved = res.data.data.map(p => ({
            ...p,
            id: p._id,
            // Keep category original casing
            category: p.category,
            // Resolve relative upload paths against backend root URL
            image: getImageUrl(p.image),
            images: p.images ? p.images.map(img => getImageUrl(img)) : []
          }));
          setDbProjects(resolved);
        }
      })
      .catch((err) => console.warn("Could not load projects from DB:", err.message))
      .finally(() => setLoading(false));
  }, []);

  // Dynamic active categories based on approved list in exact order
  const APPROVED_CATEGORIES = [
    "Residential",
    "Commercial",
    "Office",
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Hospitality",
    "Healthcare",
    "Retail",
    "Renovation",
    "Exterior",
    "Custom Design"
  ];

  const activeCategories = APPROVED_CATEGORIES.filter(cat =>
    dbProjects.some(p => p.category && p.category.toLowerCase().trim() === cat.toLowerCase().trim())
  );
  const categories = ["all", ...activeCategories];

  // Filter projects by active category (case-insensitive)
  const filteredProjects = filter === "all"
    ? dbProjects
    : dbProjects.filter(p => p.category.toLowerCase().trim() === filter.toLowerCase().trim());

  return (
    <div className="portfolio-page" style={{ backgroundColor: "#fffaf5", minHeight: "100vh" }}>
      {/* Header Banner */}
      <section className="page-header" style={{
        backgroundImage: `linear-gradient(rgba(15, 13, 11, 0.7), rgba(15, 13, 11, 0.85)), url("${settings.portfolioBannerImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "120px 6% 90px",
        textAlign: "center",
        color: "#f7efe6"
      }}>
        <h1 style={{ 
          fontFamily: "'Cormorant Garamond', Georgia, serif", 
          fontSize: "clamp(40px, 6vw, 60px)", 
          fontWeight: "300", 
          marginBottom: "15px",
          letterSpacing: "1px",
          color: "#ffffff"
        }}>
          Our Design Portfolio
        </h1>
        <p style={{ 
          fontSize: "15px", 
          color: "#b88a5a", 
          textTransform: "uppercase", 
          letterSpacing: "3px",
          fontWeight: "600"
        }}>
          A showcase of curated luxury spaces
        </p>
      </section>

      {/* Gallery Section */}
      <section className="portfolio-gallery-section" style={{ padding: "80px 6%", backgroundColor: "#fffaf5" }}>
        
        {/* Dynamic Filter Navigation */}
        <div className="filter-nav" style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "12px", 
          marginBottom: "60px", 
          flexWrap: "wrap" 
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              style={{
                background: filter === category ? "#b88a5a" : "#ffffff",
                color: filter === category ? "#ffffff" : "#2f2a25",
                border: filter === category ? "1px solid #b88a5a" : "1px solid #ead7c2",
                padding: "12px 28px",
                borderRadius: "30px",
                fontSize: "14px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: filter === category 
                  ? "0 8px 20px rgba(184, 138, 90, 0.3)" 
                  : "0 4px 10px rgba(47, 42, 37, 0.02)"
              }}
              className="filter-btn"
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px", color: "#b88a5a", fontSize: "18px" }}>
            Loading luxury showcase...
          </div>
        ) : (
          <div className="responsive-grid-3">
            {filteredProjects.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "80px 40px", color: "#6e6259", backgroundColor: "#ffffff", borderRadius: "18px", border: "1px solid #ead7c2" }}>
                <p style={{ fontSize: "18px", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", marginBottom: "10px" }}>
                  No luxury projects found in this category.
                </p>
                <p style={{ fontSize: "14px", color: "#b88a5a" }}>Please check back later or view other categories.</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  onViewDetails={setSelectedProject}
                />
              ))
            )}
          </div>
        )}
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}

export default Portfolio;