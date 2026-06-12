import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ReactIcon,
  JavaScriptIcon,
  TailwindIcon,
  GsapIcon,
  FramerMotionIcon,
  NodejsIcon,
  ExpressIcon,
  MongoDBIcon,
  RestApiIcon,
  ResponsiveIcon,
  UiUxIcon,
  ApiIcon,
  GitIcon,
  FirebaseIcon,
  VercelIcon,
  NetlifyIcon,
} from '../components/TechIcons';
import SectionHeading from '../components/SectionHeading';
import { pressTap, softEase, spring, staggerContainer, viewportOnce } from '../utils/motion';

const categories = ['All', 'Frontend', 'Backend', 'UI/UX & Design', 'Tools & Deployment'];

const skillsData = [
  { name: 'React.js', icon: ReactIcon, category: 'Frontend', color: '#61DAFB' },
  { name: 'JavaScript', icon: JavaScriptIcon, category: 'Frontend', color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: TailwindIcon, category: 'Frontend', color: '#06B6D4' },
  { name: 'GSAP', icon: GsapIcon, category: 'Frontend', color: '#88CE02' },
  { name: 'Framer Motion', icon: FramerMotionIcon, category: 'Frontend', color: '#BB4BFF' },
  { name: 'Node.js', icon: NodejsIcon, category: 'Backend', color: '#339933' },
  { name: 'Express.js', icon: ExpressIcon, category: 'Backend', color: '#94A3B8' },
  { name: 'MongoDB', icon: MongoDBIcon, category: 'Backend', color: '#47A248' },
  { name: 'REST APIs', icon: RestApiIcon, category: 'Backend', color: '#00D4FF' },
  { name: 'Responsive', icon: ResponsiveIcon, category: 'UI/UX & Design', color: '#FF6B9D' },
  { name: 'UI/UX Design', icon: UiUxIcon, category: 'UI/UX & Design', color: '#8B5CF6' },
  { name: 'API Integration', icon: ApiIcon, category: 'UI/UX & Design', color: '#22C55E' },
  { name: 'Git & GitHub', icon: GitIcon, category: 'Tools & Deployment', color: '#F05032' },
  { name: 'Firebase', icon: FirebaseIcon, category: 'Tools & Deployment', color: '#FFCA28' },
  { name: 'Vercel', icon: VercelIcon, category: 'Tools & Deployment', color: '#CBD5E1' },
  { name: 'Netlify', icon: NetlifyIcon, category: 'Tools & Deployment', color: '#00C7B7' },
];

const skillVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.9,
  },
  show: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.035,
      duration: 0.5,
      ease: softEase,
    },
  }),
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.88,
    transition: { duration: 0.2, ease: softEase },
  },
};

function SkillCard({ skill, index }) {
  const Icon = skill.icon;

  return (
    <motion.div
      layout
      custom={index}
      className="skill-card glass-card"
      variants={skillVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -8, scale: 1.04, rotate: -1 }}
      whileTap={pressTap}
    >
      <Icon
        className="skill-icon"
        style={{ color: skill.color }}
        aria-hidden="true"
      />
      <span>{skill.name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <SectionHeading
        title="My Skills"
       
        subtitle="Technologies and tools I use in production"
      />

      <motion.div
        className="tab-list"
        role="tablist"
        aria-label="Skill categories"
        variants={staggerContainer(0.04)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <motion.button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category)}
              className={`tab-button ${isActive ? 'active' : ''}`}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.42 } },
              }}
              whileHover={{ y: -2 }}
              whileTap={pressTap}
            >
              {isActive && (
                <motion.span
                  layoutId="active-skill-category"
                  className="tab-button-active-bg"
                  transition={spring}
                />
              )}
              <span className="tab-button-label">{category}</span>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div
        layout
        className="skills-grid"
        role="tabpanel"
        aria-label={`${activeCategory} skills`}
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
