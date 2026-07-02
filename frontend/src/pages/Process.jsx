import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";

function Process() {
  const { settings } = useWebsiteSettings();
  const steps = [
    {
      num: "01",
      title: "Discovery",
      subtitle: "Understanding Your Vision",
      description: "We begin by understanding your vision, lifestyle, requirements, and budget."
    },
    {
      num: "02",
      title: "Concept & Planning",
      subtitle: "Transforming Ideas Into Possibilities",
      description: "We develop creative concepts, layouts, and design ideas tailored to your space."
    },
    {
      num: "03",
      title: "Design Development",
      subtitle: "Crafting Every Detail With Precision",
      description: "Materials, finishes, furniture, lighting, and every detail are carefully selected to bring the concept to life."
    },
    {
      num: "04",
      title: "Execution",
      subtitle: "Bringing Designs To Life",
      description: "Our team coordinates every stage of the project with precision, quality, and attention to detail."
    },
    {
      num: "05",
      title: "Handover",
      subtitle: "Delivering Your Dream Space",
      description: "The final space is delivered with care—ready to be lived in, enjoyed, and admired."
    }
  ];

  return (
    <div className="process-page">
      {/* Header Banner */}
      <section className="page-header" style={{
        backgroundImage: `linear-gradient(rgba(47, 42, 37, 0.6), rgba(47, 42, 37, 0.75)), url("${settings.processBannerImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 6% 80px",
        textAlign: "center",
        color: "#f7efe6"
      }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: "400", marginBottom: "15px" }}>
          Our Design Process
        </h1>
        <p style={{ fontSize: "18px", color: "#d8b88c", textTransform: "uppercase", letterSpacing: "2px" }}>
          A seamless 6-step journey from concept to final key handover
        </p>
      </section>

      {/* Intro section */}
      <section className="process-intro" style={{ padding: "80px 6%", backgroundColor: "#f7efe6", textAlign: "center" }}>
        <p style={{ fontSize: "18px", color: "#5a4a3f", maxW: "750px", margin: "0 auto", lineHeight: "1.8" }}>
          Designing a space should be an exciting and stress-free experience. We have developed a meticulous workflow to keep the project on track, on budget, and exactly aligned with your design goals.
        </p>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" style={{ padding: "0 6% 100px", backgroundColor: "#f7efe6" }}>
        <div className="timeline-container" style={{
          position: "relative",
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "20px 0"
        }}>
          {/* Vertical line through timeline (Desktop only style) */}
          <div className="timeline-line" style={{
            position: "absolute",
            width: "2px",
            backgroundColor: "rgba(184, 138, 90, 0.3)",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)"
          }}></div>

          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={step.num}
                className={`timeline-item ${isLeft ? "left-item" : "right-item"}`}
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  width: "100%",
                  marginBottom: "50px",
                  position: "relative"
                }}
              >
                {/* Center dot/number badge */}
                <div className="timeline-badge" style={{
                  position: "absolute",
                  left: "50%",
                  top: "20px",
                  transform: "translateX(-50%)",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#b88a5a",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  border: "4px solid #f7efe6",
                  zIndex: "5",
                  boxShadow: "0 5px 15px rgba(184, 138, 90, 0.25)"
                }}>
                  {step.num}
                </div>

                {/* Card content */}
                <div className="timeline-content-card" style={{
                  width: "44%",
                  backgroundColor: "white",
                  padding: "35px",
                  borderRadius: "24px",
                  border: "1px solid #ead7c2",
                  boxShadow: "0 10px 25px rgba(184, 138, 90, 0.05)",
                  textAlign: "left"
                }}>
                  <span style={{
                    color: "#b88a5a", 
                    textTransform: "uppercase", 
                    letterSpacing: "1px", 
                    fontSize: "12px", 
                    fontWeight: "600",
                    display: "block",
                    marginBottom: "8px"
                  }}>{step.subtitle}</span>
                  <h3 style={{
                    fontFamily: "Georgia, serif", 
                    fontSize: "24px", 
                    color: "#2f2a25", 
                    marginBottom: "15px",
                    fontWeight: "400"
                  }}>{step.title}</h3>
                  <p style={{
                    color: "#5a4a3f", 
                    lineHeight: "1.7",
                    fontSize: "15px"
                  }}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="process-cta" style={{ padding: "90px 6%", backgroundColor: "#fffaf5", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", color: "#2f2a25", marginBottom: "20px", fontWeight: "400" }}>Let's Start Your Journey</h2>
        <p style={{ color: "#5a4a3f", fontSize: "17px", maxWidth: "600px", margin: "0 auto 35px", lineHeight: "1.7" }}>
          Schedule a consultation with principal designer Rishika Shah and start co-creating your beautiful interior.
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

export default Process;