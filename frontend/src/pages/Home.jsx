import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import TestimonialCard from "../components/TestimonialCard";

function Home() {
  const services = [
    {
      title: "Luxury Homes",
      description: "Bespoke high-end residential spaces crafted with custom finishes, premium materials, and sophisticated proportions.",
      icon: "🏛️"
    },
    {
      title: "Apartments",
      description: "Smart and space-optimized luxury apartment layouts, blending high-end styling with practical, modern comfort.",
      icon: "🏢"
    },
    {
      title: "Bungalows",
      description: "Spacious and luxurious interiors crafted for independent homes, combining elegance, comfort, and timeless design.",
      icon: "🏰"
    },
    {
      title: "Living Rooms",
      description: "Grand lounge environments designed with custom-tailored seating, signature media walls, and statement lighting.",
      icon: "🛋️"
    },
    {
      title: "Modular Kitchens",
      description: "Sleek and highly functional modern kitchen modules built with state-of-the-art storage hardware and high-performance surfaces.",
      icon: "🍳"
    },
    {
      title: "Office Interiors",
      description: "Professional workspaces designed to improve productivity while reflecting your brand identity.",
      icon: "💼"
    }
  ];

  const projects = [
    {
      title: "Luxury Living Room",
      category: "Living Rooms",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Modern Bedroom",
      category: "Bedrooms",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Modular Kitchen",
      category: "Modular Kitchens",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Luxury Bungalow",
      category: "Bungalows",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Corporate Office",
      category: "Office Interiors",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Complete Home Interior",
      category: "Luxury Homes",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const testimonials = [
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
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1000&q=80" 
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
              VIBE Interiors creates elegant, functional, and personalized spaces
              that reflect your lifestyle, comfort, and dreams.
            </p>
            <p>
              From home interiors to renovation and space planning, we focus on
              beautiful designs with practical execution.
            </p>
            <Link to="/about" className="about-btn">
              Learn More
            </Link>
          </div>

          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80"
              alt="Elegant interior design"
            />
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="services-preview">
        <div className="container">
          <SectionTitle subtitle="Our Services" title="What We Design" />
          <div className="services-grid">
            {services.map((service, index) => (
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
            {projects.map((project, index) => (
              <ProjectCard 
                key={index}
                image={project.image}
                title={project.title}
                category={project.category}
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
              <h3>Personalized Designs</h3>
              <p>Every design is planned according to your taste, lifestyle, and space.</p>
            </div>

            <div className="why-card">
              <span>02</span>
              <h3>Premium Quality</h3>
              <p>Quality materials, elegant finishes, and long-lasting results.</p>
            </div>

            <div className="why-card">
              <span>03</span>
              <h3>Smart Space Planning</h3>
              <p>Every corner is used beautifully, practically, and comfortably.</p>
            </div>

            <div className="why-card">
              <span>04</span>
              <h3>End-to-End Execution</h3>
              <p>From concept to final handover, everything is handled smoothly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <SectionTitle subtitle="Client Reviews" title="What Our Clients Say" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", marginTop: "40px" }} className="responsive-grid-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                text={testimonial.text}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta" style={{
        backgroundImage: 'linear-gradient(rgba(184, 138, 90, 0.65), rgba(47, 42, 37, 0.85)), url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80")'
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
    </div>
  );
}

export default Home;