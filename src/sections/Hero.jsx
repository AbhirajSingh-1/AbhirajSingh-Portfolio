import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ChevronDown, Mail } from 'lucide-react';
import { fadeUp, pressTap, softEase, staggerContainer } from '../utils/motion';
import heroProfileImage from '../assets/projects/ME1.webp';
import FlyingObjects from '../components/FlyingObjects';

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

const heroMedia = {
  hidden: {
    opacity: 0,
    x: 44,
    scale: 0.92,
    rotate: -2,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.85,
      ease: softEase,
    },
  },
};

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 180,
    damping: 22,
  });

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

  const handleCardMove = (event) => {
    if (shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetCardTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.section
      id="home"
      className="hero-section section-full"
      initial="hidden"
      animate="show"
      variants={staggerContainer(0.08, 0.1)}
    >
      {/* Flying objects animation */}
      {!shouldReduceMotion && <FlyingObjects />}
      
      <motion.div className="section hero-grid" variants={staggerContainer(0.1)}>
        <motion.div className="hero-copy" variants={staggerContainer(0.08)}>
           

          <motion.h1 className="hero-h1" variants={fadeUp}>
            Hi, I&apos;m{' '}
            <motion.span
              className="hero-name-gradient"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              Abhiraj Singh
            </motion.span>
          </motion.h1>

          <motion.h2 className="hero-subtitle" variants={fadeUp}>
            Full Stack Developer &amp; Creative Web Designer
          </motion.h2>

          <motion.div className="hero-role" variants={fadeUp} aria-live="polite">
            <span aria-label={`Currently: ${displayText}`}>{displayText}</span>
            <span className="typing-caret" aria-hidden="true" />
          </motion.div>

          <motion.p className="hero-description" variants={fadeUp}>
            I build fast, responsive, and visually polished web experiences
            for startups, businesses, agencies, and mission-driven teams.
          </motion.p>

          <motion.div className="hero-actions" variants={fadeUp}>
            <motion.a
              href="#projects"
              className="btn-primary"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={pressTap}
            >
              View Projects <ArrowRight size={17} aria-hidden="true" />
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-outline"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={pressTap}
            >
              Hire Me <Mail size={17} aria-hidden="true" />
            </motion.a>
          </motion.div>

          <motion.div className="hero-metrics" variants={staggerContainer(0.06)}>
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                className="hero-metric-item"
                variants={fadeUp}
                whileHover={{ y: -4 }}
              >
                <span className="hero-metric-value">{m.value}</span>
                <span className="hero-metric-label">{m.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero-media" variants={heroMedia}>
          <motion.div
            className="profile-card"
            onPointerMove={handleCardMove}
            onPointerLeave={resetCardTilt}
            style={{
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              transformPerspective: 1100,
            }}
            whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.015 }}
          >
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
           
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-cue"
        aria-label="Scroll to about section"
        initial={{ opacity: 0, y: -4, x: '-50%' }}
        animate={{ opacity: 1, y: [0, 8, 0], x: '-50%' }}
        transition={{
          opacity: { delay: 1.2, duration: 0.4 },
          y: { delay: 1.2, duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <span>Scroll</span>
        <ChevronDown size={16} aria-hidden="true" />
      </motion.a>
    </motion.section>
  );
}
