import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { cardReveal, pressTap, softEase, spring, staggerContainer, viewportOnce } from '../utils/motion';
import sikkimpalImg    from '../assets/projects/sikkimpal.webp';
import trikastudioImg  from '../assets/projects/trikastudio.webp';
import kashikeshavImg  from '../assets/projects/kashikeshav.webp';
import freepathshalaImg from '../assets/projects/freepathshala.webp';
import houseofkashiImg  from '../assets/projects/houseofkashi.webp';

const projects = [
  {
    title: 'SikkimPal',
    type: 'Tourism & Travel Website',
    description:
      'A modern tourism and travel platform for Sikkim that helps tourists explore destinations, hotels, travel information, and local experiences with an engaging and responsive interface.',
    image: sikkimpalImg,
    tags: ['React.js', 'Responsive Design', 'Travel Platform', 'Modern UI'],
    liveDemo: 'https://sh1eldtech.vercel.app/',
  },
  {
    title: 'TrikaStudio',
    type: 'AI-Powered Digital Agency',
    description:
      'A premium modern portfolio website for TrikaStudio showcasing AI-powered digital experiences including AI advertising, hyper-realistic 3D visuals, AI avatars, and performance marketing.',
    image: trikastudioImg,
    tags: ['AI Integration', 'Premium Design', 'Digital Agency', '3D Visuals'],
    liveDemo: 'https://www.trikastudio.in/',
  },
  {
    title: 'Kashi Keshav Child Care Foundation',
    type: 'NGO Website',
    description:
      'A professional NGO website built for a child care foundation to showcase their mission, donation initiatives, and social impact with a clean and emotional design.',
    image: kashikeshavImg,
    tags: ['NGO', 'Responsive', 'Emotional Design', 'Social Impact'],
    liveDemo: 'https://www.kashikeshavchildcarefoundation.com/',
  },
  {
    title: 'FreePathshala',
    type: 'Educational Platform',
    description:
      'A web-based platform for managing donation pickups, recyclable scrap tracking, and revenue analytics with a real-time dashboard. Built with React.js, Node.js, Express.js, and Firebase.',
    image: freepathshalaImg,
    tags: ['Education', 'React.js', 'Firebase', 'Node.js'],
    liveDemo: null,
  },
  {
    title: 'House of Kashi',
    type: 'Wedding Portfolio Website',
    description:
      'A stunning wedding portfolio site capturing beautiful ceremonies and cherished memories with an elegant, gallery-rich design built for couples and wedding photographers.',
    image: houseofkashiImg,
    tags: ['React.js', 'Vite.js', 'Tailwind CSS', 'Wedding Portfolio'],
    liveDemo: 'https://house-of-kashi.vercel.app/',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-12 lg:py-16 bg-transparent border-b border-indigo-100/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          overline="My Work"
          title="Featured Projects"
          subtitle="Real-world projects I've built for clients and businesses"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={cardReveal}
              whileHover={{ y: -6 }}
              transition={spring}
              className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-52 bg-gray-100">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-700"
                  width="900"
                  height="506"
                  loading="lazy"
                  decoding="async"
                  variants={{
                    hover: { scale: 1.06, transition: { duration: 0.5, ease: softEase } },
                  }}
                />

                {/* Overlay on hover */}
                {project.liveDemo && (
                  <motion.a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} live`}
                    className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="flex items-center gap-2 text-white font-semibold text-sm border border-white/60 rounded-xl px-5 py-2.5 hover:bg-white hover:text-black transition-colors">
                      View Project <ArrowUpRight size={16} />
                    </span>
                  </motion.a>
                )}
              </div>

              {/* Content */}
              <div className="p-7">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {project.type}
                </span>

                <h3 className="text-xl font-black text-gray-900 mt-2 mb-3 tracking-tight">
                  {project.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ y: -2, scale: 1.04 }}
                      transition={spring}
                      className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 hover:text-indigo-800 transition-colors cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* CTA */}
                {project.liveDemo && (
                  <motion.a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    whileTap={pressTap}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-4 transition-all"
                  >
                    Live Demo <ArrowUpRight size={15} />
                  </motion.a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
