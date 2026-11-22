import HeroGlobeButton from './HeroGlobeButton';

export default function Hero() {
  return (
    <header className="container hero-container">
      <p className="hero-elem hero-subtitle font-mono uppercase">
        B.Tech CSE (AI & ML) Student • Internship Candidate
      </p>
      <h1 className="hero-elem hero-title-1 uppercase text-glow-intense glitch-wrapper" data-text="UI & UX">
        UI & UX
      </h1>
      <h1 className="hero-elem hero-title-2 uppercase">DESIGNER</h1>
      
      <div className="hero-elem hero-globe-wrapper">
        <HeroGlobeButton />
      </div>
    </header>
  );
}
