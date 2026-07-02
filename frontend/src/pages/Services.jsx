import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";

const servicesList = [
  {
    title: "Interior Design",
    description:
      "Personalized interiors that seamlessly blend aesthetics, functionality, and your unique lifestyle.",
    icon: "🏠"
  },
  {
    title: "Space Planning",
    description:
      "Smart layouts designed to maximize comfort, efficiency, and the full potential of every space.",
    icon: "📐"
  },
  {
    title: "Furniture & Material Selection",
    description:
      "Carefully curated materials, finishes, and furnishings that bring your vision to life.",
    icon: "🪑"
  },
  {
    title: "Lighting Design",
    description:
      "Thoughtfully planned lighting solutions that enhance ambiance, functionality, and architectural beauty.",
    icon: "💡"
  },
  {
    title: "Turnkey Execution",
    description:
      "End-to-end project management, ensuring a seamless journey from concept to completion.",
    icon: "🛠️"
  },
  {
    title: "Renovation & Transformation",
    description:
      "Reimagining existing spaces with innovative design solutions and timeless appeal.",
    icon: "🔨"
  },
  {
    title: "Design Consultation",
    description:
      "Professional guidance to help you make confident design decisions before execution.",
    icon: "💬"
  },
  {
    title: "Custom Kitchen Design",
    description:
      "Beautiful, ergonomic kitchens tailored to your cooking habits, storage needs, and lifestyle.",
    icon: "🍳"
  }
];


function Services() {
  const { settings } = useWebsiteSettings();
  return (
    <div className="services-page">

      {/* Header Banner */}
      <section
        className="page-header"
        style={{
          backgroundImage:
            `linear-gradient(rgba(47, 42, 37, 0.6), rgba(47, 42, 37, 0.75)), url("${settings.servicesBannerImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 6% 80px",
          textAlign: "center",
          color: "#f7efe6"
        }}
      >
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(36px, 5vw, 54px)",
            fontWeight: "400",
            marginBottom: "15px"
          }}
        >
          Our Design Services
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#d8b88c",
            textTransform: "uppercase",
            letterSpacing: "2px"
          }}
        >
          Transforming ordinary spaces into extraordinary experiences
        </p>

      </section>



      {/* Intro Section */}
      <section
        className="services-intro"
        style={{
          padding: "80px 6%",
          backgroundColor: "#f7efe6",
          textAlign: "center"
        }}
      >

        <p
          style={{
            fontSize: "18px",
            color: "#5a4a3f",
            maxWidth: "750px",
            margin: "0 auto",
            lineHeight: "1.8"
          }}
        >
          At VIBE Interiors, we offer custom end-to-end design services.
          From conceptual space planning to the final selection of
          accessories, we deliver functional luxury that reflects your
          distinct style.
        </p>

      </section>




      {/* Services Grid */}
      <section
        className="services-list-grid"
        style={{
          padding: "0 6% 90px",
          backgroundColor: "#f7efe6"
        }}
      >

        <div
          className="responsive-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px"
          }}
        >

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




      {/* Process CTA Section */}
      <section
        className="services-experience"
        style={{
          padding: "90px 6%",
          backgroundColor: "#fffaf5",
          textAlign: "center"
        }}
      >

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto"
          }}
        >

          <SectionTitle
            subtitle="Our Working Process"
            title="How We Execute Your Dream Design"
          />


          <p
            style={{
              fontSize: "17px",
              color: "#5a4a3f",
              lineHeight: "1.8",
              marginBottom: "35px"
            }}
          >
            Every project begins with understanding your unique lifestyle,
            requirements, and taste. We follow a structured, transparent
            6-step roadmap to make sure execution matches expectations
            seamlessly.
          </p>


          <Link
            to="/process"
            className="about-btn"
            style={{
              backgroundColor: "#b88a5a",
              color: "white",
              padding: "15px 40px",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 8px 20px rgba(184,138,90,0.3)"
            }}
          >
            Explore Our Process
          </Link>


        </div>

      </section>


    </div>
  );
}


export default Services;