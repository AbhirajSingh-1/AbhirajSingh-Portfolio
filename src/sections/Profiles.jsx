import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import SectionHeading from '../components/SectionHeading';
import { cardReveal, pressTap, spring, staggerContainer, viewportOnce } from '../utils/motion';

const profiles = [
  {
    name: 'GitHub',
    username: '@AbhirajSingh-1',
    description: 'Open source projects, code repositories, and development contributions.',
    url: 'https://github.com/AbhirajSingh-1',
    icon: GithubIcon,
    bg: '#f6f8fa',
    border: '#d0d7de',
    brandColor: '#181717',
    hoverShadow: 'hover:shadow-black/5 hover:border-[#181717]/30',
    buttonStyle: 'text-black border-gray-200 hover:bg-black hover:border-black hover:text-white',
  },
  {
    name: 'LinkedIn',
    username: 'abhirajsingh1306',
    description: 'Professional network, career updates, and industry connections.',
    url: 'https://www.linkedin.com/in/abhirajsingh1306',
    icon: LinkedinIcon,
    bg: '#eef4fb',
    border: '#c3d9f0',
    brandColor: '#0a66c2',
    hoverShadow: 'hover:shadow-blue-500/5 hover:border-[#0a66c2]/30',
    buttonStyle: 'text-[#0a66c2] border-[#c3d9f0] hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:text-white',
  },
  {
    name: 'Instagram',
    username: '@abhiiiraj.singh',
    description: 'Creative work, design inspiration, and behind-the-scenes content.',
    url: 'https://www.instagram.com/abhiiiraj.singh/',
    icon: InstagramIcon,
    bg: '#fdf2f5',
    border: '#f5ccd9',
    brandColor: '#e4405f',
    hoverShadow: 'hover:shadow-pink-500/5 hover:border-[#e4405f]/30',
    buttonStyle: 'text-[#e4405f] border-[#f5ccd9] hover:bg-[#e4405f] hover:border-[#e4405f] hover:text-white',
  },
];

export default function Profiles() {
  return (
    <section id="profiles" className="py-12 lg:py-16 bg-transparent border-b border-indigo-100/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          overline="Get Social"
          title="Connect With Me"
          subtitle="Find me on these platforms"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {profiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <motion.div
                key={profile.name}
                variants={cardReveal}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={spring}
                className={`group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col ${profile.hoverShadow}`}
              >
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-all duration-300"
                  style={{ background: profile.bg, borderColor: profile.border, color: profile.brandColor }}
                  whileHover={{ scale: 1.12, rotate: -5 }}
                  transition={spring}
                >
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </motion.div>

                <h3 className="text-lg font-black text-gray-900 mb-1">{profile.name}</h3>
                <p className="text-sm font-mono text-gray-400 mb-3">{profile.username}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">
                  {profile.description}
                </p>

                <motion.a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 3 }}
                  whileTap={pressTap}
                  className={`inline-flex items-center justify-center gap-2 text-sm font-bold border-2 px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm ${profile.buttonStyle}`}
                >
                  Visit Profile <ExternalLink size={13} aria-hidden="true" />
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
