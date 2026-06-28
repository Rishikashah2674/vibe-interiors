import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "residential",
    budget: "under-10l",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "residential",
      budget: "under-10l",
      message: ""
    });
  };

  return (
    <div className="contact-page">
      {/* Header Banner */}
      <section className="page-header" style={{
        backgroundImage: 'linear-gradient(rgba(47, 42, 37, 0.6), rgba(47, 42, 37, 0.75)), url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "100px 6% 80px",
        textAlign: "center",
        color: "#f7efe6"
      }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 5vw, 54px)", fontWeight: "400", marginBottom: "15px" }}>
          Contact VIBE Interiors
        </h1>
        <p style={{ fontSize: "18px", color: "#d8b88c", textTransform: "uppercase", letterSpacing: "2px" }}>
          Let's discuss how we can elevate your home or office environment
        </p>
      </section>

      {/* Grid containing Details & Form */}
      <section className="contact-section" style={{ padding: "90px 6%", backgroundColor: "#f7efe6" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px" }} className="responsive-grid">
          
          {/* Contact Information Column */}
          <div className="contact-info-col" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <SectionTitle subtitle="Get In Touch" title="Start a Project Conversation" align="left" />
            
            <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#5a4a3f", marginBottom: "40px" }}>
              Whether you are planning a complete residential overhaul, a modern kitchen remodel, or styling an executive workspace, we are excited to work with you. Fill out the form to request a callback or visit our design studio.
            </p>

            <div className="contact-details" style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "24px", color: "#b88a5a" }}>📍</span>
                <div>
                  <h4 style={{ color: "#2f2a25", fontSize: "18px", marginBottom: "5px" }}>Studio Address</h4>
                  <p style={{ color: "#5a4a3f", fontSize: "15px", lineHeight: "1.6" }}>
                    104, Luxury Plaza, Gold Crest Avenue, Mumbai, India
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "24px", color: "#b88a5a" }}>📞</span>
                <div>
                  <h4 style={{ color: "#2f2a25", fontSize: "18px", marginBottom: "5px" }}>Call Us</h4>
                  <p style={{ color: "#5a4a3f", fontSize: "15px", lineHeight: "1.6" }}>
                    +91 98765 43210<br />
                    +91 22 2345 6789
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "24px", color: "#b88a5a" }}>✉️</span>
                <div>
                  <h4 style={{ color: "#2f2a25", fontSize: "18px", marginBottom: "5px" }}>Email Us</h4>
                  <p style={{ color: "#5a4a3f", fontSize: "15px", lineHeight: "1.6" }}>
                    hello@vibeinteriors.com<br />
                    projects@vibeinteriors.com
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "24px", color: "#b88a5a" }}>⏰</span>
                <div>
                  <h4 style={{ color: "#2f2a25", fontSize: "18px", marginBottom: "5px" }}>Working Hours</h4>
                  <p style={{ color: "#5a4a3f", fontSize: "15px", lineHeight: "1.6" }}>
                    Monday - Saturday: 10:00 AM - 7:00 PM<br />
                    Sunday: By Appointment Only
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="contact-form-col">
            <div style={{
              backgroundColor: "white",
              padding: "45px",
              borderRadius: "24px",
              border: "1px solid #ead7c2",
              boxShadow: "0 15px 35px rgba(184, 138, 90, 0.08)"
            }}>
              <h3 style={{
                fontFamily: "Georgia, serif", 
                fontSize: "26px", 
                color: "#2f2a25", 
                marginBottom: "30px",
                fontWeight: "400"
              }}>Book a Design Consultation</h3>

              {submitted ? (
                <div style={{
                  backgroundColor: "#fffaf5",
                  border: "1px solid #ead7c2",
                  padding: "30px",
                  borderRadius: "15px",
                  textAlign: "center"
                }}>
                  <span style={{ fontSize: "48px", display: "block", marginBottom: "15px" }}>✨</span>
                  <h4 style={{ color: "#b88a5a", fontSize: "20px", marginBottom: "10px" }}>Thank You!</h4>
                  <p style={{ color: "#5a4a3f", lineHeight: "1.6" }}>
                    Your request has been successfully submitted. Our team will contact you within 24 hours to confirm your consultation schedule.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    style={{
                      marginTop: "20px",
                      background: "transparent",
                      border: "1px solid #b88a5a",
                      color: "#b88a5a",
                      padding: "8px 20px",
                      borderRadius: "20px",
                      cursor: "pointer"
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label htmlFor="name" style={{ fontSize: "14px", fontWeight: "600", color: "#2f2a25" }}>Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1px solid #ead7c2",
                        fontSize: "15px",
                        outline: "none",
                        backgroundColor: "#fffaf5",
                        color: "#2f2a25",
                        transition: "all 0.3s"
                      }}
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>

                  <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label htmlFor="email" style={{ fontSize: "14px", fontWeight: "600", color: "#2f2a25" }}>Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1px solid #ead7c2",
                          fontSize: "15px",
                          outline: "none",
                          backgroundColor: "#fffaf5",
                          color: "#2f2a25"
                        }}
                        placeholder="e.g. rahul@example.com"
                      />
                    </div>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label htmlFor="phone" style={{ fontSize: "14px", fontWeight: "600", color: "#2f2a25" }}>Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1px solid #ead7c2",
                          fontSize: "15px",
                          outline: "none",
                          backgroundColor: "#fffaf5",
                          color: "#2f2a25"
                        }}
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>

                  <div className="form-row-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label htmlFor="projectType" style={{ fontSize: "14px", fontWeight: "600", color: "#2f2a25" }}>Project Type</label>
                      <select 
                        id="projectType" 
                        name="projectType" 
                        value={formData.projectType}
                        onChange={handleChange}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1px solid #ead7c2",
                          fontSize: "15px",
                          outline: "none",
                          backgroundColor: "#fffaf5",
                          color: "#2f2a25"
                        }}
                      >
                        <option value="residential">Residential Interior</option>
                        <option value="kitchen">Modular Kitchen</option>
                        <option value="bedroom">Bedroom Design</option>
                        <option value="office">Office/Commercial</option>
                        <option value="other">Other/Renovation</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label htmlFor="budget" style={{ fontSize: "14px", fontWeight: "600", color: "#2f2a25" }}>Estimated Budget</label>
                      <select 
                        id="budget" 
                        name="budget" 
                        value={formData.budget}
                        onChange={handleChange}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "10px",
                          border: "1px solid #ead7c2",
                          fontSize: "15px",
                          outline: "none",
                          backgroundColor: "#fffaf5",
                          color: "#2f2a25"
                        }}
                      >
                        <option value="under-10l">Under ₹10 Lakhs</option>
                        <option value="10l-25l">₹10 Lakhs - ₹25 Lakhs</option>
                        <option value="25l-50l">₹25 Lakhs - ₹50 Lakhs</option>
                        <option value="above-50l">Above ₹50 Lakhs</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label htmlFor="message" style={{ fontSize: "14px", fontWeight: "600", color: "#2f2a25" }}>Message / Requirements</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="4" 
                      required 
                      value={formData.message}
                      onChange={handleChange}
                      style={{
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: "1px solid #ead7c2",
                        fontSize: "15px",
                        outline: "none",
                        backgroundColor: "#fffaf5",
                        color: "#2f2a25",
                        resize: "vertical"
                      }}
                      placeholder="Describe your vision, preferences or questions..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    style={{
                      backgroundColor: "#b88a5a",
                      color: "white",
                      border: "none",
                      padding: "15px 30px",
                      borderRadius: "50px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      marginTop: "10px",
                      boxShadow: "0 8px 20px rgba(184, 138, 90, 0.3)"
                    }}
                    className="submit-btn"
                  >
                    Submit Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Contact;