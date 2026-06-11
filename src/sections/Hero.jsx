import { useEffect, useState } from 'react';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import heroProfileImage from '../assets/projects/ME1.webp';

const roles = [
  'MERN Stack Developer',
  'Frontend Developer',
  'Freelance Web Developer',
  'Creative UI Designer',
];

const metrics = [
  { value: '15+', label: 'Projects' },
  { value: '5+', label: 'Client Builds' },
  { value: '13+', label: 'Technologies' },
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex]     = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const delay = isDeleting ? 30 : 60;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        return;
      }
      if (!isDeleting) {
        window.setTimeout(() => setIsDeleting(true), 1000);
        return;
      }
      if (displayText.length > 0) {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
        return;
      }
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero-section section-full">
      <div className="section hero-grid">

        {/* ── Left: Copy ── */}
        <div className="hero-copy">


          {/* Headline */}
          <h1 className="hero-h1">
            Hi, I&apos;m{' '}
            <span className="hero-name-gradient">
              Abhiraj Singh
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="hero-subtitle">
            Full Stack Developer &amp; Creative Web Designer
          </h2>

          {/* Typing role */}
          <div className="hero-role" aria-live="polite">
            <span aria-label={`Currently: ${displayText}`}>{displayText}</span>
            <span className="typing-caret" aria-hidden="true" />
          </div>

          {/* Description */}
          <p className="hero-description">
            I build fast, responsive, and visually polished web experiences
            for startups, businesses, agencies, and mission-driven teams.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Projects <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-outline">
              Hire Me <Mail size={17} aria-hidden="true" />
            </a>
          </div>

          {/* Metrics */}
          <div className="hero-metrics">
            {metrics.map((m, i) => (
              <div key={m.label} className="hero-metric-item">
                <span className="hero-metric-value">{m.value}</span>
                <span className="hero-metric-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Profile Card ── */}
        <div className="hero-media">
          <div className="profile-card">
            <img
              src={heroProfileImage}
              alt="Abhiraj Singh portrait"
              width="960"
              height="1200"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 40vw"
            />
          </div>
        </div>

      </div>

      {/* Scroll cue */}
      <a href="#about" className="scroll-cue" aria-label="Scroll to about section">
        <span>Scroll</span>
        <ChevronDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
