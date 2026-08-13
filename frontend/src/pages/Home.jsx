import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { getImageUrl } from "../api";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import TestimonialCard from "../components/TestimonialCard";
import ProjectDetailsModal from "../components/ProjectDetailsModal";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";

function Home() {
  const { settings } = useWebsiteSettings();
  const [dbProjects, setDbProjects] = useState([]);
  const [dbTestimonials, setDbTestimonials] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Hardcoded fallback lists
  const fallbackServices = [
    {
      title: "Luxury Villas & Bungalows",
      description: "Bespoke interiors that combine elegance, comfort, and thoughtful planning—creating homes that are as unique as the people who live in them.",
      icon: "🏛️"
    },
    {
      title: "Residential Interiors",
      description: "Beautiful, functional homes designed to enhance everyday living, from apartments to family residences.",
      icon: "🏢"
    },
    {
      title: "Commercial Interiors",
      description: "Purpose-driven workspaces that strengthen your brand, inspire productivity, and create lasting impressions.",
      icon: "🏰"
    },
    {
      title: "Kitchen Design",
      description: "Thoughtfully designed kitchens that blend functionality, efficiency, and style—crafted to become the heart of your home.",
      icon: "🍳"
    },
    {
      title: "Renovation & Transformation",
      description: "Breathing new life into existing spaces through innovative design, smart planning, and timeless aesthetics.",
      icon: "🛋️"
    },
    {
      title: "Design Consultation",
      description: "Expert guidance on space planning, materials, lighting, layouts, and design decisions—helping you build with confidence.",
      icon: "💼"
    }
  ];

// fallbackProjects removed

  const fallbackTestimonials = [
    {
      name: "Rohan & Priya Sen",
      role: "Residential Client",
      text: "VIBE Interiors completely transformed our 3BHK apartment. Principal designer Rishika's attention to detail, material selection, and layout management was top-tier. Highly recommended!",
      rating: 5
    },
    {
      name: "Vivek Oberoi",
      role: "CEO, Nexus Labs",
      text: "The team delivered our corporate office ahead of schedule. The design perfectly balances workspaces and communication zones with a premium, corporate aesthetic.",
      rating: 5
    },
    {
      name: "Sneha Mehta",
      role: "Homeowner",
      text: "The modular kitchen design is incredibly smart. Storage is optimized beautifully, and the elegant gold accents fit perfectly with our premium luxury theme.",
      rating: 5
    }
  ];

  useEffect(() => {
    api.get("/projects")
      .then((res) => {
        if (res.data && res.data.success) {
          // Resolve relative upload paths against backend root URL
          const resolved = res.data.data.map(p => ({
            ...p,
            id: p._id,
            category: p.category,
            image: getImageUrl(p.image),
            images: p.images ? p.images.map(img => getImageUrl(img)) : []
          }));
          setDbProjects(resolved);
        }
      })
      .catch((err) => console.warn("Could not load projects from DB:", err.message));

    // Fetch testimonials from DB
    api.get("/testimonials")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // Resolve relative upload paths against backend root URL
          const resolved = res.data.map(t => ({
            ...t,
            image: getImageUrl(t.image)
          }));
          setDbTestimonials(resolved);
        }
      })
      .catch((err) => console.warn("Could not load testimonials from DB:", err.message));
  }, []);

  const projectsToDisplay = dbProjects.slice(0, 6);
  const testimonialsToDisplay = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="new-hero">
        <div className="container">
          <div className="hero-split-container">
            {/* Left Side: Content */}
            <div className="hero-left-content">
              <span className="hero-subtitle">Luxury Interior Design Studio</span>
              <h1 className="hero-title">
                Transforming Spaces Into Beautiful Experiences
              </h1>
              <p className="hero-text">
                We design elegant residential and commercial spaces that reflect your personality and lifestyle.
              </p>
              <div className="hero-actions">
                <Link to="/contact" className="btn-primary">
                  Book Consultation
                </Link>
                <Link to="/portfolio" className="btn-secondary">
                  View Projects
                </Link>
              </div>
            </div>

            {/* Right Side: Image with decorative frame */}
            <div className="hero-right-image">
              <div className="image-decor-border"></div>
              <img 
                src={settings.heroImage} 
                alt="Premium Interior Design Showcase" 
                className="hero-img-element"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS STRIP SECTION */}
      <section className="hero-stats-strip">
        <div className="container">
          <div className="stats-strip-container">
            <div className="stat-strip-item">
              <h4>10+</h4>
              <p>Years of Experience</p>
            </div>
            <div className="stat-strip-item">
              <h4>250+</h4>
              <p>Completed Projects</p>
            </div>
            <div className="stat-strip-item">
              <h4>99%</h4>
              <p>Happy Clients</p>
            </div>
            <div className="stat-strip-item">
              <h4>Bespoke</h4>
              <p>Design Approach</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="about-preview">
        <div className="container about-grid-container">
          <div className="about-text">
            <SectionTitle subtitle="About VIBE" title="Designing Spaces That Feel Like You" align="left" />
            <p>
              Every space tells a story, and the most meaningful ones are those that truly reflect the people who live and work in them.
            </p>
            <p>
              I believe great design begins with understanding you—your lifestyle, your aspirations, your habits, and the emotions you want your space to evoke. Rather than following trends, I create timeless interiors that are deeply personal, functional, and thoughtfully crafted.
              Because the best-designed space isn't the one that looks perfect—it's the one that feels like home.
            </p>
            <Link to="/about" className="about-btn">
              Learn More
            </Link>
          </div>

          <div className="about-image">
            <img
              src={settings.aboutStoryImage}
              alt="Elegant interior design"
            />
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="services-preview">
        <div className="container">
          <SectionTitle subtitle="Our Services" title="Crafting Spaces for Every Lifestyle " />
          <div className="services-grid">
            {fallbackServices.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
          <div style={{ marginTop: "40px" }}>
            <Link to="/services" className="about-btn">View All Services</Link>
          </div>
        </div>
      </section>

      {/* FEATURED PORTFOLIO */}
      <section className="projects-preview">
        <div className="container">
          <SectionTitle subtitle="Featured Projects" title="Spaces We’ve Styled" />
          <div className="projects-grid">
            {projectsToDisplay.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
          <div style={{ marginTop: "40px" }}>
            <Link to="/portfolio" className="about-btn">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">
        <div className="container why-grid-container">
          <div className="why-left">
            <SectionTitle subtitle="Why Choose Us" title="Why Clients Trust VIBE Interiors" align="left" />
            <p>
              We combine creativity, practical planning, and smooth execution to create
              interiors that are beautiful, comfortable, and made for your lifestyle.
            </p>
          </div>

          <div className="why-right">
            <div className="why-card">
              <span>01</span>
              <h3>Personalized Design Approach</h3>
              <p>Every project begins with understanding your lifestyle, vision, and aspirations. We create spaces that are uniquely yours, ensuring every detail reflects your personality and enhances the way you live.</p>
            </div>

            <div className="why-card">
              <span>02</span>
              <h3>Timeless & Functional Design</h3>
              <p>We believe great interiors should be beautiful today and relevant for years to come. Our designs combine elegance, functionality, and thoughtful planning to create spaces that stand the test of time.</p>
            </div>

            <div className="why-card">
              <span>03</span>
              <h3>Transparent Process</h3>
              <p>Trust is built through clear communication. From concept and budgeting to material selection and execution, we keep you informed at every stage, ensuring a smooth and confident design journey.</p>
            </div>

            <div className="why-card">
              <span>04</span>
              <h3>Attention to Detail & Quality</h3>
              <p>We believe excellence lies in the details. Every material, finish, and design element is carefully selected to achieve exceptional craftsmanship, lasting quality, and a refined final result.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <SectionTitle subtitle="Client Reviews" title="What Our Clients Say" />
          <div style={{ marginTop: "40px" }} className="responsive-grid-3">
            {testimonialsToDisplay.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                text={testimonial.review || testimonial.text}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" style={{
        backgroundImage: `linear-gradient(rgba(184, 138, 90, 0.65), rgba(47, 42, 37, 0.85)), url("${settings.contactBannerImage}")`
      }}>
        <div className="container">
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontFamily: "Georgia, serif", fontWeight: "400", marginBottom: "20px" }}>
              Ready to style your dream home?
            </h2>
            <p style={{ fontSize: "18px", color: "#f7efe6", lineHeight: "1.7", marginBottom: "35px" }}>
              Book your free layout and site consultation with Principal Designer Rishika Shah today. Let's create your perfect vibe together.
            </p>
            <Link to="/contact" className="btn-primary">
              Book Consultation Now
            </Link>
          </div>
        </div>
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

export default Home;