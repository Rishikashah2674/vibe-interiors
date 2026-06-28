import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";

function About() {
  return (
    <div className="about-page">
      {/* Subpage Header Banner */}
      <section className="page-header" style={{
        backgroundImage: 'linear-gradient(rgba(47, 42, 37, 0.6), rgba(47, 42, 37, 0.75)), url("https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 6% 80px",
        textAlign: "center",
        color: "#f7efe6"
      }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: "400", marginBottom: "15px" }}>
          About VIBE Interiors
        </h1>
        <p style={{ fontSize: "18px", color: "#d8b88c", textTransform: "uppercase", letterSpacing: "2px" }}>
          Crafting spaces that resonate with luxury and style
        </p>
      </section>

      {/* Brand Story Section */}
      <section className="about-story" style={{ padding: "90px 6%", backgroundColor: "#f7efe6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="responsive-grid">
          <div>
            <SectionTitle subtitle="Our Journey" title="The Story of VIBE Interiors" align="left" />
            <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#5a4a3f", marginBottom: "20px" }}>
              Founded in 2018, VIBE Interiors started with a simple belief: a home should be a physical manifestation of its owner's soul. Over the years, we have grown from a small design studio to a full-service boutique interior design firm specializing in high-end residential and luxury commercial spaces.
            </p>
            <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#5a4a3f", marginBottom: "20px" }}>
              Our design philosophy is anchored in a deep appreciation for craftsmanship, texture, and spatial harmony. We do not just design rooms; we curate experiences, selecting custom furniture, art, and finishes that tell a cohesive and elegant story.
            </p>
          </div>
          <div className="about-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80" 
              alt="Luxury Living Space" 
              style={{ width: "100%", borderRadius: "24px", boxShadow: "0 15px 35px rgba(0,0,0,0.1)" }}
            />
          </div>
        </div>
      </section>

      {/* Vision, Mission, Philosophy */}
      <section className="philosophy-section" style={{ padding: "90px 6%", backgroundColor: "#fffaf5" }}>
        <SectionTitle subtitle="Core Values" title="What Drives Us" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", marginTop: "40px" }} className="responsive-grid-3">
          <div style={{ backgroundColor: "#f7efe6", padding: "40px 30px", borderRadius: "20px", border: "1px solid #ead7c2", textAlign: "center" }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "24px", color: "#b88a5a", marginBottom: "15px", fontWeight: "400" }}>Our Vision</h3>
            <p style={{ color: "#5a4a3f", lineHeight: "1.7", fontSize: "15px" }}>
              To be the premier choice for luxury, personalized interior designs, setting benchmarks in spatial innovation, sustainability, and elegant modern lifestyles.
            </p>
          </div>
          <div style={{ backgroundColor: "#f7efe6", padding: "40px 30px", borderRadius: "20px", border: "1px solid #ead7c2", textAlign: "center" }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "24px", color: "#b88a5a", marginBottom: "15px", fontWeight: "400" }}>Our Mission</h3>
            <p style={{ color: "#5a4a3f", lineHeight: "1.7", fontSize: "15px" }}>
              To craft customized residential and commercial environments of outstanding quality, prioritizing client aspirations, smart space planning, and meticulous detail.
            </p>
          </div>
          <div style={{ backgroundColor: "#f7efe6", padding: "40px 30px", borderRadius: "20px", border: "1px solid #ead7c2", textAlign: "center" }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "24px", color: "#b88a5a", marginBottom: "15px", fontWeight: "400" }}>Design Philosophy</h3>
            <p style={{ color: "#5a4a3f", lineHeight: "1.7", fontSize: "15px" }}>
              We believe in "functional luxury"—blending striking visual aesthetics with extreme convenience, utility, and timeless design longevity.
            </p>
          </div>
        </div>
      </section>

      {/* Designer Introduction */}
      <section className="designer-intro" style={{ padding: "90px 10%", backgroundColor: "#f7efe6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "5px", alignItems: "center" }} className="responsive-grid">
          <div className="about-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80" 
              alt="Lead Designer Priyanka Shah" 
              style={{ width: "500px", height: "600px", borderRadius: "24px", boxShadow: "0 15px 35px rgba(0,0,0,0.12)" }}
            />
          </div>
          <div>
            <SectionTitle subtitle="Meet the Founder" title="Priyanka Shah" align="left" />
            <p style={{ fontSize: "15px", textTransform: "uppercase", color: "#b88a5a", letterSpacing: "2px", fontWeight: "600", marginBottom: "20px" }}>
              Principal Designer & Founder
            </p>
            <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#5a4a3f", marginBottom: "20px" }}>
              "Every space has a story waiting to be told. My passion is to unlock that story and translate it into fine design. I work closely with our clients to capture their lifestyle, blending high fashion, art, and function into spaces they cherish."
            </p>
            <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#5a4a3f", marginBottom: "30px" }}>
              With over a decade of design experience and projects completed globally, Priyanka has established VIBE Interiors as a leading voice in minimal luxury interior design.
            </p>
            <div style={{ borderLeft: "4px solid #b88a5a", paddingLeft: "20px", fontStyle: "italic", fontSize: "16px", color: "#2f2a25" }}>
              "Luxury is not about spending money, it's about details, proportions, and feeling at ease in your space."
            </div>
          </div>
        </div>
      </section>

      {/* Experience Highlights / Metrics */}
      <section className="highlights-section" style={{
        padding: "80px 6%", 
        backgroundColor: "#9b7b5c", 
        color: "#f7efe6", 
        textAlign: "center"
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px" }} className="responsive-grid-4">
          <div>
            <h2 style={{ fontSize: "48px", color: "#e9c9a7", fontFamily: "Georgia, serif", fontWeight: "400" }}>10+</h2>
            <p style={{ color: "#c8b8aa", textTransform: "uppercase", letterSpacing: "1px", fontSize: "14px", marginTop: "10px" }}>Years Experience</p>
          </div>
          <div>
            <h2 style={{ fontSize: "48px", color: "#e9c9a7", fontFamily: "Georgia, serif", fontWeight: "400" }}>250+</h2>
            <p style={{ color: "#c8b8aa", textTransform: "uppercase", letterSpacing: "1px", fontSize: "14px", marginTop: "10px" }}>Projects Completed</p>
          </div>
          <div>
            <h2 style={{ fontSize: "48px", color: "#e9c9a7", fontFamily: "Georgia, serif", fontWeight: "400" }}>15+</h2>
            <p style={{ color: "#c8b8aa", textTransform: "uppercase", letterSpacing: "1px", fontSize: "14px", marginTop: "10px" }}>Design Awards</p>
          </div>
          <div>
            <h2 style={{ fontSize: "48px", color: "#e9c9a7", fontFamily: "Georgia, serif", fontWeight: "400" }}>99%</h2>
            <p style={{ color: "#c8b8aa", textTransform: "uppercase", letterSpacing: "1px", fontSize: "14px", marginTop: "10px" }}>Happy Clients</p>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="about-cta" style={{ padding: "80px 6%", textAlign: "center", backgroundColor: "#f7efe6" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", color: "#2f2a25", marginBottom: "20px", fontWeight: "400" }}>Ready to curate your premium space?</h2>
        <p style={{ color: "#5a4a3f", fontSize: "18px", maxWidth: "600px", margin: "0 auto 30px" }}>
          Let's design a custom environment that fits your aesthetics and lifestyle beautifully.
        </p>
        <Link to="/contact" className="about-btn" style={{
          backgroundColor: "#b88a5a",
          color: "white",
          padding: "15px 40px",
          borderRadius: "50px",
          fontSize: "16px",
          fontWeight: "600",
          boxShadow: "0 8px 20px rgba(184, 138, 90, 0.3)"
        }}>
          Book Free Consultation
        </Link>
      </section>
    </div>
  );
}

export default About;