import { useState, useEffect, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';
import {
  WebArchitectureCanvas,
  CodeQuizFlowCanvas,
  CarPricePredictionCanvas,
  SmartExpenseTrackerCanvas
} from './TimelineVisualizers';
import MaskedTitle from './MaskedTitle';

export default function Timeline() {
  const { playHoverSound, playClickSound } = useAudio();
  const [activeEpochIndex, setActiveEpochIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const epochs = [
    {
      epoch: '01',
      date: '2026 • CODING START',
      stageLabel: 'STAGE 01',
      category: 'THE BEGINNING',
      dockLabel: 'FOUNDATIONS',
      title: 'Starting with Programming',
      headline: 'Building the Basics Step by Step',
      summary:
        'Started coding in 2026 and began building a foundation in programming and web technologies. Current learning includes Python, JavaScript, HTML, CSS, and SQL, alongside introductory NumPy practice.',
      metrics: [
        { label: 'STARTED', value: '2026' },
        { label: 'PROGRAMMING', value: 'Python & JavaScript' },
        { label: 'WEB BASICS', value: 'HTML & CSS' }
      ],
      techStack: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL', 'VS Code'],
      Visualizer: WebArchitectureCanvas
    },
    {
      epoch: '02',
      date: '2026 • PROJECT PRACTICE',
      stageLabel: 'STAGE 02',
      category: 'LEARNING PLATFORM',
      dockLabel: 'CODE QUIZ',
      title: 'Code Quiz',
      headline: 'A Multiple-Choice Programming Learning Demo',
      summary:
        'Working on Code Quiz, a demo platform where students can practise programming languages through multiple-choice questions. The public repository contains a Flask application, templates, static frontend files, and a SQLite database.',
      metrics: [
        { label: 'PROJECT', value: 'Code Quiz' },
        { label: 'BACKEND', value: 'Flask' },
        { label: 'DATABASE', value: 'SQLite' }
      ],
      techStack: ['Python', 'Flask', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
      Visualizer: CodeQuizFlowCanvas
    },
    {
      epoch: '03',
      date: '2026 • MACHINE LEARNING PRACTICE',
      stageLabel: 'STAGE 03',
      category: 'NOTEBOOK PROJECT',
      dockLabel: 'CAR PRICES',
      title: 'Car Price Prediction',
      headline: 'Exploring a Used-Car Price Prediction Task',
      summary:
        'Exploring a car-price prediction notebook shared through GitHub and Google Colab. The repository focuses on the used-car price prediction topic and provides a notebook-based project for learning and experimentation.',
      metrics: [
        { label: 'PROJECT', value: 'Car Price Prediction' },
        { label: 'FORMAT', value: 'Jupyter Notebook' },
        { label: 'PLATFORM', value: 'Google Colab' }
      ],
      techStack: ['Python', 'Jupyter Notebook', 'Google Colab', 'Machine Learning'],
      Visualizer: CarPricePredictionCanvas
    },
    {
      epoch: '04',
      date: '2026 • PYTHON PROJECT',
      stageLabel: 'STAGE 04',
      category: 'STUDENT-FOCUSED TOOL',
      dockLabel: 'EXPENSES',
      title: 'Smart Expense Tracker',
      headline: 'Recording Shared Expenses for Students',
      summary:
        'Built as a terminal-based Python project for students living in hostels and shared rooms. The repository keeps expense, group, and settlement records in local JSON files. A web or app version is a future direction, not a current public deployment.',
      metrics: [
        { label: 'PROJECT', value: 'Smart Expense Tracker' },
        { label: 'CURRENT FORMAT', value: 'Terminal / CLI' },
        { label: 'LOCAL DATA', value: 'JSON Files' }
      ],
      techStack: ['Python', 'JSON', 'Command Line', 'File Handling'],
      Visualizer: SmartExpenseTrackerCanvas
    }
  ];

  // Auto-running loop across 4 stages (pauses on hover so user can read)
  useEffect(() => {
    // Keep touch users in control of the stage so there is time to read it.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveEpochIndex((prev) => (prev + 1) % epochs.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, epochs.length]);

  // Move button controls (loops infinitely in both directions)
  const handleNext = useCallback(() => {
    playClickSound();
    setActiveEpochIndex((prev) => (prev + 1) % epochs.length);
  }, [epochs.length, playClickSound]);

  const handlePrev = useCallback(() => {
    playClickSound();
    setActiveEpochIndex((prev) => (prev - 1 + epochs.length) % epochs.length);
  }, [epochs.length, playClickSound]);

  const goToEpoch = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= epochs.length) return;
    playClickSound();
    setActiveEpochIndex(targetIndex);
  }, [epochs.length, playClickSound]);

  // Keyboard Arrow navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section className="container timeline-section" id="experience">
      {/* Aligned Section Header matching #about, #work, #skills */}
      <div className="timeline-header">
        <div className="gsap-reveal">
          <MaskedTitle text="Learning Journey" />
          <div className="divider" />
        </div>
        <div className="timeline-header-meta font-mono">
          <div className="timeline-meta-pill">
            <span className={`meta-pulse-dot ${isPaused ? 'is-paused' : ''}`} />
            <span className="meta-pill-text">
              STAGE 0{activeEpochIndex + 1}/04 • {isPaused ? 'INTERACTIVE' : 'AUTO-RUNNING'}
            </span>
          </div>
          <div className="timeline-jump-strip">
            {epochs.map((ep, i) => (
              <button
                key={ep.epoch}
                type="button"
                onClick={() => goToEpoch(i)}
                onMouseEnter={playHoverSound}
                className={`timeline-jump-pill hoverable ${activeEpochIndex === i ? 'is-active' : ''}`}
                aria-label={`Jump to stage 0${i + 1}`}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Stage Slider with Side Navigation Arrows & Auto-running Loop */}
      <div
        className="timeline-stage-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          type="button"
          className="timeline-side-arrow timeline-arrow-prev hoverable font-mono"
          onClick={handlePrev}
          onMouseEnter={playHoverSound}
          aria-label="Previous phase"
          title="Previous stage"
        >
          ‹
        </button>

        <div className="timeline-carousel-shell">
          <div
            className="timeline-cards-track"
            style={{ transform: `translateX(-${activeEpochIndex * 100}%)` }}
          >
            {epochs.map((item, idx) => {
              const Visualizer = item.Visualizer;
              const isActive = activeEpochIndex === idx;

              return (
                <div
                  key={item.epoch}
                  className={`timeline-card-slide ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => {
                    if (!isActive) playHoverSound();
                  }}
                >
                  {/* Stage Container Card */}
                  <div className="timeline-stage-card hoverable">
                    {/* Left Pane: Narrative & Technical Telemetry */}
                    <div className="timeline-narrative-pane">
                      <div className="stage-topbar font-mono">
                        <div className="stage-topbar-left">
                          <span className="stage-badge uppercase">{item.category}</span>
                          <span className="stage-date uppercase">{item.date}</span>
                        </div>
                        <span className="stage-step-tag text-gray">{item.stageLabel}</span>
                      </div>

                      <div className="stage-title-wrap">
                        <h3 className="stage-title uppercase text-glow">{item.title}</h3>
                        <div className="stage-headline font-mono text-gray uppercase">{item.headline}</div>
                      </div>

                      <p className="stage-summary text-gray">{item.summary}</p>

                      {/* Telemetry Metrics Grid */}
                      <div className="stage-metrics-grid font-mono">
                        {item.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="stage-metric-box">
                            <span className="metric-lbl text-gray">{m.label}</span>
                            <span className="metric-val">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills matching .skill-pill */}
                      <div className="stage-tech-pills font-mono">
                        {item.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="stage-pill">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Pane: Original Interactive Visualizer */}
                    <div className="timeline-visual-pane">
                      <div className="visualizer-header font-mono">
                        <span className="visualizer-indicator" />
                        <span className="visualizer-title">LIVE SYSTEM VISUALIZER</span>
                        <span className="visualizer-status text-gray">{isActive ? 'ACTIVE' : 'IDLE'}</span>
                      </div>
                      <div className="visualizer-canvas-container">
                        <Visualizer isActive={isActive} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="timeline-side-arrow timeline-arrow-next hoverable font-mono"
          onClick={handleNext}
          onMouseEnter={playHoverSound}
          aria-label="Next phase"
          title="Next stage"
        >
          ›
        </button>
      </div>

      <div className="timeline-footer font-mono text-gray">
        <span>LEARNING IN PUBLIC</span>
        <span>2026 • PRESENT</span>
      </div>
    </section>
  );
}
