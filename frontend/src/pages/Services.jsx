import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";

function Services() {
  const servicesList = [
    {
      title: "Residential Interior Design",
      description: "Complete home interior styling from master plans to custom finishes. We craft bespoke living rooms, kitchens, bedrooms, and dining spaces tailored to your family's style.",
      icon: "🏡"
    },
    {
      title: "Commercial Interior Design",
      description: "Sophisticated styling for luxury retail outlets, high-end boutiques, reception areas, and hospitality spaces that communicate your brand's unique identity.",
      icon: "🏢"
    },
    {
      title: "Office Interiors",
      description: "Smart office layouts engineered to enhance employee productivity, health, and focus, while preserving a highly professional, modern luxury aesthetic.",
      icon: "💻"
    },
    {
      title: "Modular Kitchen Design",
      description: "German-standard, highly durable modular kitchens with custom layouts (L-shaped, parallel, island) incorporating smart storage and top-tier built-in appliances.",
      icon: "🍳"
    },
    {
      title: "Bedroom Design",
      description: "Serene bedroom sanctuaries utilizing warm lighting, custom-built beds, wardrobe units, and cozy textures designed for absolute relaxation.",
      icon: "🛏️"
    },
    {
      title: "Space Planning",
      description: "Strategic floor layouts designed to optimize foot flow, maximize natural light, and maximize practical space utility in compact or sprawling sites.",
      icon: "📐"
    },
    {
      title: "Furniture and Decor Selection",
      description: "Exclusive curation of bespoke lighting fixtures, luxury custom furniture, rugs, paintings, wall treatments, and accents to elevate your spaces.",
      icon: "🛋️"
    }
  ];

  return (
    <div className="services-page">
      {/* Header Banner */}
      <section className="page-header" style={{
        backgroundImage: 'linear-gradient(rgba(47, 42, 37, 0.6), rgba(47, 42, 37, 0.75)), url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 6% 80px",
        textAlign: "center",
        color: "#f7efe6"
      }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: "400", marginBottom: "15px" }}>
          Our Design Services
        </h1>
        <p style={{ fontSize: "18px", color: "#d8b88c", textTransform: "uppercase", letterSpacing: "2px" }}>
          Transforming ordinary layout spaces into extraordinary experiences
        </p>
      </section>

      {/* Intro section */}
      <section className="services-intro" style={{ padding: "80px 6%", backgroundColor: "#f7efe6", textAlign: "center" }}>
        <p style={{ fontSize: "18px", color: "#5a4a3f", maxW: "750px", margin: "0 auto", lineHeight: "1.8" }}>
          At VIBE Interiors, we offer custom end-to-end design services. From conceptual space planning to the final selection of accessories, we deliver functional luxury that reflects your distinct style.
        </p>
      </section>

      {/* Services Grid */}
      <section className="services-list-grid" style={{ padding: "0 6% 90px", backgroundColor: "#f7efe6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }} className="responsive-grid-3">
          {servicesList.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      {/* The Design Experience / Process link */}
      <section className="services-experience" style={{
        padding: "90px 6%", 
        backgroundColor: "#fffaf5", 
        textAlign: "center"
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <SectionTitle subtitle="Our Working Process" title="How We Execute Your Dream Design" />
          <p style={{ fontSize: "17px", color: "#5a4a3f", lineHeight: "1.8", marginBottom: "35px" }}>
            Every project begins with understanding your unique lifestyle, requirements, and taste. We follow a structured, transparent 6-step roadmap to make sure execution matches expectations seamlessly.
          </p>
          <Link to="/process" className="about-btn" style={{
            backgroundColor: "#b88a5a",
            color: "white",
            padding: "15px 40px",
            borderRadius: "50px",
            fontSize: "16px",
            fontWeight: "600",
            boxShadow: "0 8px 20px rgba(184, 138, 90, 0.3)"
          }}>
            Explore Our Process
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;