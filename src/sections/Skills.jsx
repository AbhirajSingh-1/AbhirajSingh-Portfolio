import { useState, useEffect, useRef } from 'react';
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

const categories = ['All', 'Frontend', 'Backend', 'UI/UX & Design', 'Tools & Deployment'];

const skillsData = [
  { name: 'React.js',         icon: ReactIcon,       category: 'Frontend',           color: '#61DAFB' },
  { name: 'JavaScript',       icon: JavaScriptIcon,  category: 'Frontend',           color: '#F7DF1E' },
  { name: 'Tailwind CSS',     icon: TailwindIcon,    category: 'Frontend',           color: '#06B6D4' },
  { name: 'GSAP',             icon: GsapIcon,        category: 'Frontend',           color: '#88CE02' },
  { name: 'Framer Motion',    icon: FramerMotionIcon,category: 'Frontend',           color: '#BB4BFF' },
  { name: 'Node.js',          icon: NodejsIcon,      category: 'Backend',            color: '#339933' },
  { name: 'Express.js',       icon: ExpressIcon,     category: 'Backend',            color: '#94A3B8' },
  { name: 'MongoDB',          icon: MongoDBIcon,     category: 'Backend',            color: '#47A248' },
  { name: 'REST APIs',        icon: RestApiIcon,     category: 'Backend',            color: '#00D4FF' },
  { name: 'Responsive',       icon: ResponsiveIcon,  category: 'UI/UX & Design',    color: '#FF6B9D' },
  { name: 'UI/UX Design',     icon: UiUxIcon,        category: 'UI/UX & Design',    color: '#8B5CF6' },
  { name: 'API Integration',  icon: ApiIcon,         category: 'UI/UX & Design',    color: '#22C55E' },
  { name: 'Git & GitHub',     icon: GitIcon,         category: 'Tools & Deployment', color: '#F05032' },
  { name: 'Firebase',         icon: FirebaseIcon,    category: 'Tools & Deployment', color: '#FFCA28' },
  { name: 'Vercel',           icon: VercelIcon,      category: 'Tools & Deployment', color: '#CBD5E1' },
  { name: 'Netlify',          icon: NetlifyIcon,     category: 'Tools & Deployment', color: '#00C7B7' },
];

function SkillCard({ skill }) {
  const Icon = skill.icon;
  return (
    <div className="skill-card glass-card reveal-item">
      <Icon
        className="skill-icon"
        style={{ color: skill.color }}
        aria-hidden="true"
      />
      <span>{skill.name}</span>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useRef(null);

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  // Re-animate items whenever the filtered list changes (tab switch or first load)
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Mark all items as hidden via a CSS class — avoids forced synchronous reflow
    const items = Array.from(grid.querySelectorAll('.reveal-item'));
    items.forEach((el) => {
      el.classList.remove('reveal-active');
      el.style.transitionDelay = '0ms';
      // Add a class that instantly hides without triggering layout
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
    });

    // Double rAF: first frame lets React/browser paint the hidden state,
    // second frame triggers the CSS transitions — no synchronous reflow needed
    let id1 = requestAnimationFrame(() => {
      let id2 = requestAnimationFrame(() => {
        items.forEach((el, i) => {
          el.style.transitionDelay = `${i * 55}ms`;
          el.style.opacity = '';
          el.style.transform = '';
          el.classList.add('reveal-active');
        });
      });
      return () => cancelAnimationFrame(id2);
    });

    return () => cancelAnimationFrame(id1);
  }, [filteredSkills]);

  return (
    <section id="skills" className="section">
      <SectionHeading
        title="My Skills"
        overline="03 — Skills"
        subtitle="Technologies and tools I use in production"
      />

      {/* Tab filters */}
      <div className="tab-list" role="tablist" aria-label="Skill categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={`tab-button ${activeCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div
        ref={gridRef}
        className="skills-grid"
        role="tabpanel"
        aria-label={`${activeCategory} skills`}
      >
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}
