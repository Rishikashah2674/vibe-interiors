import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>VIBE Interiors</h1>
          <p>Converting Dreams Into Reality</p>
          <Link to="/contact" className="hero-btn">
            Book Consultation
          </Link>
        </div>
      </div>

      <section className="about-preview">
        <div className="about-text">
          <p className="section-subtitle">About VIBE</p>
          <h2>Designing Spaces That Feel Like You</h2>

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
      </section>

      <section className="services-preview">
  <p className="section-subtitle">Our Services</p>
  <h2>What We Design</h2>

  <div className="services-grid">
    <div className="service-card">
      <h3>Residential Interiors</h3>
      <p>Elegant home interiors designed around your lifestyle and comfort.</p>
    </div>

    <div className="service-card">
      <h3>Modular Kitchen</h3>
      <p>Smart, stylish, and functional kitchen layouts for modern homes.</p>
    </div>

    <div className="service-card">
      <h3>Commercial Spaces</h3>
      <p>Professional interiors for offices, studios, shops, and workspaces.</p>
    </div>

    <div className="service-card">
      <h3>Renovation</h3>
      <p>Transform old spaces into fresh, beautiful, and useful interiors.</p>
    </div>

    <div className="service-card">
      <h3>3D Visualization</h3>
      <p>Preview your dream space clearly before execution begins.</p>
    </div>

    <div className="service-card">
      <h3>Turnkey Projects</h3>
      <p>Complete interior solutions from planning to final handover.</p>
    </div>
  </div>
</section>

<section className="projects-preview">
  <p className="section-subtitle">Featured Projects</p>
  <h2>Spaces We’ve Styled</h2>

  <div className="projects-grid">
    <div className="project-card">
      <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80" alt="Living Room" />
      <div className="project-info">
        <h3>Luxury Living Room</h3>
        <p>Residential Design</p>
      </div>
    </div>

    <div className="project-card">
      <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80" alt="Bedroom" />
      <div className="project-info">
        <h3>Modern Bedroom</h3>
        <p>Bedroom Interior</p>
      </div>
    </div>

    <div className="project-card">
      <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80" alt="Kitchen" />
      <div className="project-info">
        <h3>Elegant Kitchen</h3>
        <p>Modular Kitchen</p>
      </div>
    </div>

    <div className="project-card">
  <img
    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
    alt="Office Interior"
  />

  <div className="project-info">
    <h3>Modern Office Space</h3>
    <p>Commercial Interior</p>
  </div>
</div>
  </div>
</section>

<section className="why-section">
  <div className="why-left">
    <p className="section-subtitle">Why Choose Us</p>
    <h2>Why Clients Trust VIBE Interiors</h2>
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
</section>
    </>
  );
}

export default Home;