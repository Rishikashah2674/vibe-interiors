import React, { useState, useEffect } from "react";
import { MapPin, Folder, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

function ProjectCard({ project, image, title, category, onViewDetails }) {
  // Graceful fallback to support individual props (e.g. from Home page)
  const pTitle = project ? project.title : title;
  const pCategory = project ? project.category : category;
  const pLocation = project ? project.location : "";
  const pArea = project ? project.area : "";
  const pDescription = project ? project.description : "";

  // Prepare images array
  const backendUrl = "http://localhost:5000";
  const getFullUrl = (path) => {
    if (!path) return "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";
    return path.startsWith("/uploads/") ? `${backendUrl}${path}` : path;
  };

  const pImages = project && project.images && project.images.length > 0
    ? project.images
    : [project ? project.image : image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isHovered || pImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, pImages.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + pImages.length) % pImages.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % pImages.length);
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
      setCurrentIndex((prev) => (prev + 1) % pImages.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + pImages.length) % pImages.length);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";
  };

  return (
    <div 
      className="premium-property-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid #ead7c2",
        boxShadow: "0 10px 30px rgba(47, 42, 37, 0.04)",
        display: "flex",
        flexDirection: "column",
        height: "520px",
        width: "100%",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "pointer"
      }}
      onClick={() => onViewDetails && onViewDetails(project)}
    >
      {/* 1. Image Slider Section (62% height) */}
      <div 
        style={{
          height: "62%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#171513"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={getFullUrl(pImages[currentIndex])} 
          alt={pTitle} 
          loading="lazy" 
          onError={handleImageError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }}
        />

        {/* Carousel controls (visible on hover or if touch device) */}
        {pImages.length > 1 && (
          <div className="carousel-navigation-arrows">
            <button 
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                color: "#2f2a25",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                zIndex: 5,
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
              }}
              className="slider-arrow"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNext}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                color: "#2f2a25",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                zIndex: 5,
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
              }}
              className="slider-arrow"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Small Image Counter overlay */}
        <div 
          style={{
            position: "absolute",
            bottom: "14px",
            right: "14px",
            backgroundColor: "rgba(47, 42, 37, 0.8)",
            backdropFilter: "blur(4px)",
            color: "#fffaf5",
            padding: "4px 10px",
            borderRadius: "30px",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            zIndex: 4,
            border: "1px solid rgba(255, 255, 255, 0.15)"
          }}
        >
          <span>📷</span>
          <span>{pImages.length}</span>
        </div>

        {/* Dot Indicators */}
        {pImages.length > 1 && (
          <div 
            style={{
              position: "absolute",
              bottom: "14px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "6px",
              zIndex: 4
            }}
          >
            {pImages.map((_, i) => (
              <span 
                key={i}
                style={{
                  width: i === currentIndex ? "16px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: i === currentIndex ? "#b88a5a" : "rgba(255, 255, 255, 0.5)",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Info Section (38% height) */}
      <div 
        style={{
          padding: "20px 22px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          backgroundColor: "#ffffff",
          zIndex: 2
        }}
      >
        <div>
          {/* Category & Area */}
          <div 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: "8px" 
            }}
          >
            <span 
              style={{
                color: "#b88a5a",
                fontSize: "12px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <Folder size={12} />
              {pCategory}
            </span>
          </div>

          {/* Project Title */}
          <h3 
            style={{
              fontSize: "20px",
              color: "#2f2a25",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: "500",
              lineHeight: "1.25",
              marginBottom: "8px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {pTitle}
          </h3>

          {/* Location */}
          {pLocation && (
            <div 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "5px", 
                color: "#6e6259",
                fontSize: "13px",
                marginBottom: "8px"
              }}
            >
              <MapPin size={13} style={{ color: "#b88a5a" }} />
              <span>{pLocation}</span>
            </div>
          )}

          {/* Short Description */}
          {pDescription && (
            <p 
              style={{
                color: "#6e6259",
                fontSize: "13.5px",
                lineHeight: "1.5",
                marginBottom: "0px",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {pDescription}
            </p>
          )}
        </div>

        {/* View Details Button */}
        {onViewDetails && (
          <div 
            style={{ 
              display: "flex", 
              justifyContent: "flex-end",
              marginTop: "5px"
            }}
          >
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#2f2a25",
                fontSize: "14px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 0",
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderBottom: "1px solid transparent"
              }}
              className="card-details-btn"
            >
              View Details
              <ArrowRight size={14} style={{ transition: "transform 0.3s" }} className="arrow-icon" />
            </button>
          </div>
        )}
      </div>

      {/* Scoped hover overrides */}
      <style>{`
        .premium-property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(184, 138, 90, 0.15) !important;
        }
        .premium-property-card:hover .card-details-btn {
          color: #b88a5a !important;
        }
        .premium-property-card:hover .arrow-icon {
          transform: translateX(4px);
          color: #b88a5a;
        }
        .carousel-navigation-arrows {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .premium-property-card:hover .carousel-navigation-arrows {
          opacity: 1;
        }
        .slider-arrow:hover {
          background-color: #b88a5a !important;
          color: #ffffff !important;
        }
        @media (max-width: 768px) {
          .carousel-navigation-arrows {
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ProjectCard;
