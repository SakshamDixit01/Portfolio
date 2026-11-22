import { useAudio } from '../hooks/useAudio';
import sakshamPhoto from '../assets/MYphoto.jpeg';

const githubUrl = 'https://github.com/SakshamDixit01';
const linkedInUrl = 'https://www.linkedin.com/in/saksham-dixit-951616381/';
const whatsAppUrl = 'https://wa.me/919277163720?text=Hi%20Saksham%2C%20I%20saw%20your%20portfolio%20and%20wanted%20to%20connect.';

export default function EngineeringTelemetry() {
  const { playHoverSound, playClickSound } = useAudio();

  return (
    <div className="telemetry-command-deck gsap-reveal font-mono">
      {/* Top Header Bar - Clean and Professional */}
      <div className="telemetry-header">
        <div className="telemetry-header-left">
          <span className="telemetry-live-dot" />
          <span className="telemetry-hud-tag">Current Activity & Profiles</span>
        </div>
        <span className="telemetry-hud-status">Learning in 2026 • Open to Internships</span>
      </div>

      {/* 3-Column Profile & Activity Grid */}
      <div className="telemetry-grid">
        {/* Card 1: What I'm Working On */}
        <div className="telemetry-card hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">CURRENT FOCUS</span>
            <span className="card-indicator">Learning</span>
          </div>
          <h3 className="telemetry-card-title">UI/UX Design & AI/ML</h3>
          <p className="telemetry-card-text text-gray">
            Exploring user-interface design, building programming foundations, and learning artificial intelligence and machine learning through practical projects.
          </p>
          <div className="telemetry-meta-row text-gray">
            <span>TOOLS & LANGUAGES:</span>
            <span className="meta-highlight">Python, JavaScript, HTML, CSS, SQL, VS Code</span>
          </div>
        </div>

        {/* Card 2: GitHub Projects */}
        <div className="telemetry-card hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">GITHUB CODE</span>
            <span className="card-indicator">5 Public Repositories</span>
          </div>
          <h3 className="telemetry-card-title">Learning Through Projects</h3>
          <p className="telemetry-card-text text-gray">
            Four code repositories cover a Code Quiz demo, a terminal-based expense tracker, a car-price prediction notebook, and introductory NumPy practice. The fifth repository contains this profile README.
          </p>
          <div className="telemetry-actions-list">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-btn hoverable"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <span>View GitHub Repositories</span>
              <span className="telemetry-arrow">↗</span>
            </a>
          </div>
        </div>

        {/* Card 3: LinkedIn Profile & Quick Contact */}
        <div className="telemetry-card telemetry-card-comms hoverable">
          <div className="telemetry-card-top">
            <span className="card-badge">PROFESSIONAL PROFILE</span>
            <span className="card-indicator">Internship Candidate</span>
          </div>

          {/* Clean LinkedIn Identity Preview */}
          <div className="linkedin-profile-preview">
            <img
              src={sakshamPhoto}
              alt="Saksham Dixit"
              className="linkedin-preview-avatar"
            />
            <div className="linkedin-preview-info">
              <div className="linkedin-preview-name">
                <span>Saksham Dixit</span>
                <span className="linkedin-check" title="Profile">↗</span>
              </div>
              <div className="linkedin-preview-role text-gray">
                B.Tech CSE (AI & ML) • Second Year
              </div>
            </div>
          </div>

          <p className="telemetry-card-text text-gray" style={{ marginBottom: '1rem' }}>
            Interested in learning opportunities, internships, and collaborative student projects.
          </p>

          <div className="telemetry-actions-list">
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-btn hoverable"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <span>Connect on LinkedIn</span>
              <span className="telemetry-arrow">↗</span>
            </a>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="telemetry-btn telemetry-btn-ping hoverable"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <span>Chat on WhatsApp</span>
              <span className="telemetry-arrow">💬</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
