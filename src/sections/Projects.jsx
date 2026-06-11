import { ExternalLink, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useRevealGroup } from '../hooks/useReveal';
import sikkimpalImg    from '../assets/projects/sikkimpal.webp';
import trikastudioImg  from '../assets/projects/trikastudio.webp';
import kashikeshavImg  from '../assets/projects/kashikeshav.webp';
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

export default function Projects() {
  const gridRef = useRevealGroup({ threshold: 0.05 });

  return (
    <section id="projects" className="section">
      <SectionHeading
        title="Featured Projects"
        overline="04 — Work"
        subtitle="Real-world projects I've built for clients and businesses"
      />

      <div ref={gridRef} className="projects-bento">
        {projects.map((project) => (
          <article key={project.title} className="project-card glass-card reveal-item group">

            {/* Image */}
            <div className="project-image">
              <img
                src={project.image}
                alt={project.title}
                width="900"
                height="506"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 540px, calc(100vw - 32px)"
              />
              {/* Hover overlay — links to live demo */}
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

            {/* Content */}
            <div className="project-content">
              <span className="project-type">{project.type}</span>

              <h3 className="project-title font-heading">{project.title}</h3>

              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {(project.liveDemo || project.github) && (
                <div className="project-links">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-small"
                    >
                      <ExternalLink size={15} aria-hidden="true" />
                      Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
