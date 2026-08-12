import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import founder from "../assets/images/founder.jpeg";
import { useWebsiteSettings } from "../hooks/useWebsiteSettings";

function About() {
  const { settings } = useWebsiteSettings();
  return (
    <div className="about-page">

      {/* Subpage Header Banner */}
      <section
        className="page-header"
        style={{
          backgroundImage:
            `linear-gradient(rgba(47, 42, 37, 0.6), rgba(47, 42, 37, 0.75)), url("${settings.aboutBannerImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 6% 80px",
          textAlign: "center",
          color: "#f7efe6",
        }}
      >
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(36px, 5vw, 54px)",
            fontWeight: "400",
            marginBottom: "15px",
          }}
        >
          About VIBE Interiors
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#d8b88c",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Crafting spaces that resonate with luxury and style
        </p>
      </section>


      {/* Brand Story */}
      <section
        className="about-story"
        style={{
          padding: "90px 6%",
          backgroundColor: "#f7efe6",
        }}
      >

        <div
          className="responsive-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "center",
          }}
        >

          <div>

            <SectionTitle
              subtitle="Our Journey"
              title="The Story of VIBE Interiors"
              align="left"
            />


            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "#5a4a3f",
                marginBottom: "20px",
              }}
            >
              Vibe Interiors was founded on a simple belief—that great design
              goes beyond aesthetics. It should reflect your lifestyle, serve
              your needs, and stand the test of time.
            </p>


            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.8",
                color: "#5a4a3f",
              }}
            >
              Every project begins with understanding your vision and is
              brought to life through thoughtful planning, timeless design,
              and meticulous attention to detail. From homes and workspaces to
              luxury villas and bungalows, we create spaces that feel
              personal, purposeful, and uniquely yours.
            </p>

          </div>


          <div className="about-image-wrapper">

            <img
              src={settings.aboutStoryImage}
              alt="Luxury Living Space"
              style={{
                width: "100%",
                borderRadius: "24px",
                boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
              }}
            />

          </div>

        </div>

      </section>



      {/* Vision Mission Philosophy */}

      <section
        className="philosophy-section"
        style={{
          padding: "90px 6%",
          backgroundColor: "#fffaf5",
        }}
      >

        <SectionTitle
          subtitle="Core Values"
          title="What Drives Us"
        />


        <div
          className="responsive-grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "30px",
            marginTop: "40px",
          }}
        >

          {[
            {
              title: "Our Vision",
              text:
                "To create timeless spaces that inspire better living and become a benchmark for thoughtful, sustainable, and meaningful design.",
            },
            {
              title: "Our Mission",
              text:
                "To transform every client's vision into beautifully crafted interiors through creativity, transparency, quality, and a personalized design experience.",
            },
            {
              title: "Design Philosophy",
              text:
                "Great design is more than appearance—it shapes how a space feels, works, and supports daily life.",
            },
          ].map((item) => (

            <div
              key={item.title}
              style={{
                backgroundColor:"#f7efe6",
                padding:"40px 30px",
                borderRadius:"20px",
                border:"1px solid #ead7c2",
                textAlign:"center",
              }}
            >

              <h3
                style={{
                  fontFamily:"Georgia,serif",
                  color:"#b88a5a",
                  fontSize:"24px",
                  fontWeight:"400",
                }}
              >
                {item.title}
              </h3>


              <p
                style={{
                  color:"#5a4a3f",
                  lineHeight:"1.7",
                }}
              >
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </section>




      {/* Founder Section */}

      <section
        className="designer-intro"
        style={{
          padding:"90px 10%",
          backgroundColor:"#f7efe6",
        }}
      >

        <div
          className="responsive-grid"
          style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:"50px",
            alignItems:"center",
          }}
        >


          <div>

            <img
              src={founder || settings.founderImage}
              alt="Founder of VIBE Interiors"
              style={{
                width:"100%",
                maxWidth:"500px",
                height:"600px",
                objectFit:"cover",
                borderRadius:"24px",
                boxShadow:"0 15px 35px rgba(0,0,0,0.12)",
              }}
            />

          </div>



          <div>

            <SectionTitle
              subtitle="Meet the Founder"
              title="Priyanka Shah"
              align="left"
            />


            <p
              style={{
                color:"#b88a5a",
                letterSpacing:"2px",
                fontWeight:"600",
              }}
            >
              Founder & Principal Interior Designer
            </p>


            <p
              style={{
                fontSize:"17px",
                lineHeight:"1.8",
                color:"#5a4a3f",
              }}
            >
              "With over a decade of experience in interior design, I believe
              every space should reflect the people who live in it. My approach
              combines creativity, functionality, and thoughtful planning to
              create interiors that are timeless and personal."
            </p>


            <p
              style={{
                fontSize:"17px",
                lineHeight:"1.8",
                color:"#5a4a3f",
              }}
            >
              At Vibe Interiors, every project is an opportunity to transform
              a vision into a space that feels inspiring, meaningful, and
              uniquely yours.
            </p>


          </div>


        </div>

      </section>



      {/* Experience */}

      <section
        style={{
          padding:"80px 6%",
          backgroundColor:"#9b7b5c",
          color:"#f7efe6",
          textAlign:"center",
        }}
      >

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(4,1fr)",
            gap:"30px",
          }}
        >

          {[
            ["10+","Years Experience"],
            ["250+","Projects Completed"],
            ["99%","Happy Clients"],
            ["Bespoke", "Design Approach"],
          ].map((item)=>(

            <div key={item[1]}>

              <h2
                style={{
                  fontSize:"48px",
                  color:"#e9c9a7",
                  fontFamily:"Georgia,serif",
                }}
              >
                {item[0]}
              </h2>

              <p>{item[1]}</p>

            </div>

          ))}

        </div>

      </section>




      {/* CTA */}

      <section
        style={{
          padding:"80px 6%",
          textAlign:"center",
          backgroundColor:"#f7efe6",
        }}
      >

        <h2
          style={{
            fontFamily:"Georgia,serif",
          }}
        >
          Ready to curate your premium space?
        </h2>


        <p>
          Let's design a custom environment that fits your aesthetics and
          lifestyle beautifully.
        </p>


        <Link
          to="/contact"
          className="about-btn"
        >
          Book Free Consultation
        </Link>


      </section>


    </div>
  );
}

export default About;