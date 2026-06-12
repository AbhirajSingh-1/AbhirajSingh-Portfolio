import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import {
  cardHover,
  cardReveal,
  pressTap,
  softEase,
  spring,
  staggerContainer,
  viewportOnce,
} from '../utils/motion';
import sikkimpalImg from '../assets/projects/sikkimpal.webp';
import trikastudioImg from '../assets/projects/trikastudio.webp';
import kashikeshavImg from '../assets/projects/kashikeshav.webp';
import freepathshalaImg from '../assets/projects/freepathshala.webp';

const projects = [
  {
    title: 'SikkimPal',
    type: 'Tourism & Travel Website',
    description:
      'A modern tourism and travel platform for Sikkim that helps tourists explore destinations, hotels, travel information, and local experiences with an engaging and responsive interface.',
    image: sikkimpalImg,
    tags: ['React.js', 'Responsive Design', 'Travel Platform', 'Modern UI'],
    liveDemo: 'https://sh1eldtech.vercel.app/',
    github: null,
  },
  {
    title: 'TrikaStudio',
    type: 'AI-Powered Digital Agency',
    description:
      'A premium modern portfolio website for TrikaStudio showcasing AI-powered digital experiences including AI advertising, hyper-realistic 3D visuals, AI avatars, social media branding, and performance marketing.',
    image: trikastudioImg,
    tags: ['AI Integration', 'Premium Design', 'Digital Agency', '3D Visuals'],
    liveDemo: 'https://www.trikastudio.in/',
    github: null,
  },
  {
    title: 'Kashi Keshav Child Care Foundation',
    type: 'NGO Website',
    description:
      'A professional NGO website built for a child care foundation to showcase their mission, activities, donation initiatives, and social impact with a clean and emotional design.',
    image: kashikeshavImg,
    tags: ['NGO', 'Responsive', 'Emotional Design', 'Social Impact'],
    liveDemo: 'https://www.kashikeshavchildcarefoundation.com/',
    github: null,
  },
  {
    title: 'FreePathshala',
    type: 'Educational Platform',
    description:
      'A web-based platform for managing donation pickups, recyclable scrap tracking, and revenue analytics with a real-time dashboard. Built with React.js, Node.js, Express.js, and Firebase.',
    image: freepathshalaImg,
    tags: ['Education', 'React.js', 'Firebase', 'Node.js'],
    liveDemo: null,
    github: null,
  },
];

const projectCard = {
  ...cardReveal,
  hover: {
    ...cardHover,
    transition: spring,
  },
};

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHeading
        title="Featured Projects"
        subtitle="Real-world projects I've built for clients and businesses"
      />

      <motion.div
        className="projects-bento"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {projects.map((project) => (
          <motion.article
            key={project.title}
            className="project-card glass-card group"
            variants={projectCard}
            whileHover="hover"
          >
            <div className="project-image">
              <motion.img
                src={project.image}
                alt={project.title}
                width="900"
                height="506"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 540px, calc(100vw - 32px)"
                variants={{
                  hover: {
                    scale: 1.07,
                    transition: { duration: 0.55, ease: softEase },
                  },
                }}
              />
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-image-overlay"
                  aria-label={`View ${project.title} live`}
                >
                  <span>
                    View Project <ArrowUpRight size={16} />
                  </span>
                </a>
              )}
            </div>

            <div className="project-content">
              <span className="project-type">{project.type}</span>

              <h3 className="project-title font-heading">{project.title}</h3>

              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ y: -2, scale: 1.04 }}
                    transition={spring}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {(project.liveDemo || project.github) && (
                <div className="project-links">
                  {project.liveDemo && (
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-small"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={pressTap}
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
