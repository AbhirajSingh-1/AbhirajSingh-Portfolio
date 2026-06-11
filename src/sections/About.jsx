import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { useReveal, useRevealGroup } from '../hooks/useReveal';
import aboutImage from '../assets/projects/ME2.webp';

const stats = [
  { target: 15, suffix: '+', label: 'Projects Completed' },
  { target: 5,  suffix: '+', label: 'Client Projects' },
  { target: 13, suffix: '+', label: 'Technologies Used' },
  { target: 10, suffix: '+', label: 'Responsive Websites' },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setCount(target);
          return;
        }

        const duration = 1300;
        const startTime = performance.now();
        let frameId;

        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const imageRef  = useReveal({ threshold: 0.15 });
  const copyRef   = useRevealGroup({ threshold: 0.1 });
  const statsRef  = useRevealGroup({ threshold: 0.1 });

  return (
    <section id="about" className="section">
      <SectionHeading
        title="About Me"
        overline="02 — About"
        subtitle="Focused on fast, responsive, and polished web experiences"
      />

      <div className="about-grid">
        {/* Image panel */}
        <div ref={imageRef} className="about-image-panel reveal">
          <img
            src={aboutImage}
            alt="Abhiraj Singh working on a web project"
            width="960"
            height="1200"
            loading="lazy"
            decoding="async"
            className="about-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
          />
          <div className="about-image-overlay">
            <p className="about-image-kicker">About me</p>
            <strong>Clean builds, thoughtful interfaces, reliable delivery</strong>
          </div>
        </div>

        {/* Copy */}
        <div ref={copyRef} className="about-copy-wrapper">
          <p className="reveal-item">
            I&apos;m a Full Stack Developer and Creative Web Designer who enjoys
            turning ideas into reliable, scalable, and visually clean digital products.
          </p>
          <p className="reveal-item">
            My work centres on React.js, MERN Stack, REST APIs, AI integrations,
            and modern UI systems that feel smooth without becoming heavy.
          </p>
          <p className="reveal-item">
            I build responsive websites for startups, businesses, NGOs, and
            agencies with a practical focus on speed, accessibility, and clear
            user journeys.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card glass-card reveal-item">
            <div className="stat-value">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
