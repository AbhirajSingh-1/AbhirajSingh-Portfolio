import { useState } from 'react';
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
  { name: 'React.js', icon: ReactIcon, category: 'Frontend', color: '#61DAFB' },
  { name: 'JavaScript', icon: JavaScriptIcon, category: 'Frontend', color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: TailwindIcon, category: 'Frontend', color: '#06B6D4' },
  { name: 'GSAP', icon: GsapIcon, category: 'Frontend', color: '#88CE02' },
  { name: 'Framer Motion', icon: FramerMotionIcon, category: 'Frontend', color: '#BB4BFF' },
  { name: 'Node.js', icon: NodejsIcon, category: 'Backend', color: '#339933' },
  { name: 'Express.js', icon: ExpressIcon, category: 'Backend', color: '#94A3B8' },
  { name: 'MongoDB', icon: MongoDBIcon, category: 'Backend', color: '#47A248' },
  { name: 'REST APIs', icon: RestApiIcon, category: 'Backend', color: '#00D4FF' },
  { name: 'Responsive Design', icon: ResponsiveIcon, category: 'UI/UX & Design', color: '#FF6B9D' },
  { name: 'UI/UX Design', icon: UiUxIcon, category: 'UI/UX & Design', color: '#8B5CF6' },
  { name: 'API Integration', icon: ApiIcon, category: 'UI/UX & Design', color: '#22C55E' },
  { name: 'Git & GitHub', icon: GitIcon, category: 'Tools & Deployment', color: '#F05032' },
  { name: 'Firebase', icon: FirebaseIcon, category: 'Tools & Deployment', color: '#FFCA28' },
  { name: 'Vercel', icon: VercelIcon, category: 'Tools & Deployment', color: '#CBD5E1' },
  { name: 'Netlify', icon: NetlifyIcon, category: 'Tools & Deployment', color: '#00C7B7' },
];

function SkillCard({ skill }) {
  const Icon = skill.icon;

  return (
    <div className="skill-card glass-card">
      <Icon className="skill-icon" style={{ color: skill.color }} aria-hidden="true" />
      <span>{skill.name}</span>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="section">
      <SectionHeading title="My Skills" subtitle="Technologies and tools I use in production" />

      <div className="tab-list" role="tablist" aria-label="Skill categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`tab-button ${activeCategory === category ? 'active' : ''}`}
            aria-selected={activeCategory === category}
            role="tab"
          >
            {category}
          </button>
        ))}
      </div>

      <div
        key={activeCategory}
        className="skills-grid"
      >
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}
