import { useEffect, useState } from 'react';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import heroProfileImage from '../assets/projects/ME1.webp';

const roles = [
  'MERN Stack Developer',
  'Frontend Developer',
  'Freelance Web Developer',
  'Creative UI Designer',
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const delay = isDeleting ? 34 : 64;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        return;
      }

      if (!isDeleting) {
        window.setTimeout(() => setIsDeleting(true), 900);
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
        <div className="hero-copy">
          <p className="eyebrow">
            Available for freelance projects
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            Hi, I&apos;m{' '}
            <span className="hero-name gradient-text">
              <span className="hero-name-word">Abhiraj</span>
              {' '}
              <span className="hero-name-word">Singh</span>
            </span>
          </h1>

          <h2 className="hero-subtitle text-lg sm:text-xl lg:text-2xl">
            Full Stack Developer &amp; Creative Web Designer
          </h2>

          <div className="hero-role">
            <span className="gradient-text">{displayText}</span>
            <span className="typing-caret" aria-hidden="true" />
          </div>

          <p className="hero-description">
            I build fast, responsive, and visually polished web experiences for
            startups, businesses, agencies, and mission-driven teams.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              View Projects <ArrowRight aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-outline">
              Hire Me <Mail aria-hidden="true" />
            </a>
          </div>

          <div className="hero-metrics">
            <span>15+ projects</span>
            <span>5+ client builds</span>
            <span>MERN + UI/UX</span>
          </div>
        </div>

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

      <a href="#about" className="scroll-cue" aria-label="Scroll to about section">
        <span>Scroll</span>
        <ChevronDown aria-hidden="true" />
      </a>
    </section>
  );
}
