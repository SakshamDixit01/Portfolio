import sakshamPhoto from '../assets/MYphoto.jpeg';
import EngineeringTelemetry from './EngineeringTelemetry';
import Timeline from './Timeline';
import MaskedTitle from './MaskedTitle';

export default function About() {
  return (
    <div className="about-page-wrapper">
      {/* 1. Core Background & Engineering Philosophy */}
      <section id="about" className="container about-intro-section">
        <div className="about-grid">
          <div className="gsap-reveal">
            <MaskedTitle number="1." text="About Me" />
            <div className="divider" />
            <p className="text-gray about-text">
              I’m Saksham Dixit, a second-year B.Tech Computer Science Engineering student specializing in AI & ML at Shri Ramswaroop Memorial University (2025–2029), with a current CGPA of 8.50. I started coding in 2026 and am building my foundations in Python, JavaScript, SQL, HTML, and CSS. I have completed 15+ certificates and participated in 3+ hackathons. Alongside coding, I am interested in UI/UX design and creating clear, user-friendly interfaces. I enjoy exploring AI and machine learning concepts and applying what I learn through practical projects.
            </p>
            <div className="font-mono text-gray skill-list text-sm">
              <p><span style={{ color: '#fff' }}></span> Programming: Python & JavaScript</p>
              <p><span style={{ color: '#fff' }}></span> Web: HTML, CSS & responsive layouts</p>
              <p><span style={{ color: '#fff' }}></span> Data: SQL, NumPy practice & AI/ML exploration</p>
              <p><span style={{ color: '#fff' }}></span> Tools: VS Code, Canva, Git & GitHub</p>
            </div>
          </div>

          <div className="abstract-box hoverable gsap-reveal">
            <div className="about-photo-wrapper">
              <img
                src={sakshamPhoto}
                alt="Saksham Dixit - Computer Science Engineering student"
                className="about-photo-img"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Profile, Learning Activity & Contact Channels */}
        <EngineeringTelemetry />
      </section>

      {/* 2. Interactive Learning Journey (Auto-looping + Move Buttons) */}
      <Timeline />
    </div>
  );
}
