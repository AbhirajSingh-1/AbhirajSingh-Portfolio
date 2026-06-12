import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import {
  cardHover,
  cardReveal,
  fadeUp,
  slideLeft,
  staggerContainer,
  viewportOnce,
} from '../utils/motion';
import aboutImage from '../assets/projects/ME2.webp';

const stats = [
  { target: 15, suffix: '+', label: 'Projects Completed' },
  { target: 5, suffix: '+', label: 'Client Projects' },
  { target: 13, suffix: '+', label: 'Technologies Used' },
  { target: 10, suffix: '+', label: 'Responsive Websites' },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.55 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return undefined;

    if (shouldReduceMotion) return undefined;

    const controls = animate(0, target, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setCount(Math.round(value)),
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, target]);

  return (
    <span ref={ref}>
      {shouldReduceMotion && isInView ? target : count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading
        title="About Me"
         
        subtitle="Focused on fast, responsive, and polished web experiences"
      />

      <motion.div
        className="about-grid"
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div
          className="about-image-panel"
          variants={slideLeft}
          whileHover={{ y: -8, rotate: -1.2, scale: 1.01 }}
        >
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
          <motion.div
            className="about-image-overlay"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <p className="about-image-kicker">About me</p>
            <strong>Clean builds, thoughtful interfaces, reliable delivery</strong>
          </motion.div>
        </motion.div>

        <motion.div className="about-copy-wrapper" variants={staggerContainer(0.08)}>
          <motion.p variants={fadeUp}>
            I&apos;m a Full Stack Developer and Creative Web Designer who enjoys
            turning ideas into reliable, scalable, and visually clean digital products.
          </motion.p>
          <motion.p variants={fadeUp}>
            My work centres on React.js, MERN Stack, REST APIs, AI integrations,
            and modern UI systems that feel smooth without becoming heavy.
          </motion.p>
          <motion.p variants={fadeUp}>
            I build responsive websites for startups, businesses, NGOs, and
            agencies with a practical focus on speed, accessibility, and clear
            user journeys.
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className="stats-grid"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="stat-card glass-card"
            variants={cardReveal}
            whileHover={cardHover}
          >
            <div className="stat-value">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} />
            </div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
