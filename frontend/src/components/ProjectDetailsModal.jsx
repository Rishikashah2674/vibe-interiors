import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Folder, FileText, Compass, Layers, Briefcase } from "lucide-react";
import { getImageUrl } from "../api";

function ProjectDetailsModal({ project, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!project) return null;

  // Resolve images array
  const getFullUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";
    return getImageUrl(path);
  };

  const images = project.images && project.images.length > 0 
    ? project.images 
    : [project.image];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Mobile swipe support
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <div 
      className="project-modal-overlay" 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(15, 13, 11, 0.85)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "modalFadeIn 0.4s ease"
      }}
      onClick={onClose}
    >
      <div 
        className="project-modal-container"
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "1050px",
          maxHeight: "90vh",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.4)",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          position: "relative",
          animation: "modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            zIndex: 1010,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            color: "#2f2a25"
          }}
          className="modal-close-btn"
        >
          <X size={20} />
        </button>

        {/* Left Side: Images Section */}
        <div 
          style={{
            position: "relative",
            backgroundColor: "#171513",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            height: "100%",
            minHeight: "400px"
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={getFullUrl(images[currentIndex])} 
            alt={project.title} 
            onError={handleImageError}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              maxHeight: "650px",
              transition: "opacity 0.4s ease-in-out"
            }}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                style={{
                  position: "absolute",
                  left: "20px",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.3s",
                  zIndex: 2
                }}
                className="carousel-arrow"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: "20px",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.3s",
                  zIndex: 2
                }}
                className="carousel-arrow"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Indicators dots & count overlay */}
          <div 
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
              zIndex: 2
            }}
          >
            {images.length > 1 && images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: i === currentIndex ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: i === currentIndex ? "#b88a5a" : "rgba(255, 255, 255, 0.6)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>

          <div 
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              backgroundColor: "rgba(0,0,0,0.65)",
              color: "white",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.5px"
            }}
          >
            📷 {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Right Side: Info Section */}
        <div 
          style={{
            padding: "45px 35px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
            maxHeight: "650px",
            backgroundColor: "#fffaf5"
          }}
        >
          <div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "15px" }}>
              <span 
                style={{
                  backgroundColor: "rgba(184, 138, 90, 0.12)",
                  color: "#b88a5a",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <Folder size={13} /> {project.category}
              </span>
            </div>

            <h2 
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "36px",
                color: "#2f2a25",
                fontWeight: "400",
                lineHeight: "1.2",
                marginBottom: "20px"
              }}
            >
              {project.title}
            </h2>

            {/* Specifications */}
            <div 
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "20px 0",
                borderTop: "1px solid #ead7c2",
                borderBottom: "1px solid #ead7c2",
                marginBottom: "25px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5a4a3f" }}>
                <MapPin size={18} style={{ color: "#b88a5a" }} />
                <span style={{ fontSize: "15px" }}><strong>Location:</strong> {project.location}</span>
              </div>
              {project.designStyle && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5a4a3f" }}>
                  <Compass size={18} style={{ color: "#b88a5a" }} />
                  <span style={{ fontSize: "15px" }}><strong>Design Style:</strong> {project.designStyle}</span>
                </div>
              )}
              {project.materials && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5a4a3f" }}>
                  <Layers size={18} style={{ color: "#b88a5a" }} />
                  <span style={{ fontSize: "15px" }}><strong>Materials Used:</strong> {project.materials}</span>
                </div>
              )}
              {project.services && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#5a4a3f" }}>
                  <Briefcase size={18} style={{ color: "#b88a5a" }} />
                  <span style={{ fontSize: "15px" }}><strong>Services Provided:</strong> {project.services}</span>
                </div>
              )}
            </div>

            <h4 
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#b88a5a",
                marginBottom: "10px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <FileText size={14} /> Description
            </h4>
            <p 
              style={{
                color: "#5a4a3f",
                lineHeight: "1.8",
                fontSize: "15px",
                whiteSpace: "pre-line"
              }}
            >
              {project.description}
            </p>
          </div>

          <div style={{ marginTop: "35px" }}>
            <button 
              onClick={onClose}
              style={{
                width: "100%",
                padding: "15px 30px",
                borderRadius: "30px",
                backgroundColor: "#2f2a25",
                color: "#ffffff",
                border: "none",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 18px rgba(47, 42, 37, 0.15)"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#b88a5a"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#2f2a25"}
            >
              Close Showcase
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Modal Keyframe CSS animations */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (max-width: 868px) {
          .project-modal-container {
            grid-template-columns: 1fr !important;
            max-height: 95vh !important;
            overflow-y: auto !important;
          }
          .project-modal-container > div {
            max-height: none !important;
          }
          .modal-close-btn {
            background: #ffffff !important;
            top: 15px !important;
            right: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ProjectDetailsModal;
