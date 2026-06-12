import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import SectionHeading from '../components/SectionHeading';
import { cardHover, cardReveal, pressTap, spring, staggerContainer, viewportOnce } from '../utils/motion';

const profiles = [
  {
    name: 'GitHub',
    username: '@AbhirajSingh-1',
    description:
      'Open source projects, code repositories, and development contributions.',
    url: 'https://github.com/AbhirajSingh-1',
    icon: GithubIcon,
    color: '#8b949e',
  },
  {
    name: 'LinkedIn',
    username: 'abhirajsingh1306',
    description:
      'Professional network, career updates, and industry connections.',
    url: 'https://www.linkedin.com/in/abhirajsingh1306',
    icon: LinkedinIcon,
    color: '#0a66c2',
  },
  {
    name: 'Instagram',
    username: '@abhiiiraj.singh',
    description:
      'Creative work, design inspiration, and behind-the-scenes content.',
    url: 'https://www.instagram.com/abhiiiraj.singh/',
    icon: InstagramIcon,
    color: '#e4405f',
  },
];

const Profiles = () => {
  return (
    <section id="profiles" className="section">
      <SectionHeading
        title="Connect With Me"
        subtitle="Find me on these platforms"
      />

      <motion.div
        className="profile-grid"
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
              className="profile-card-item glass-card"
              variants={cardReveal}
              whileHover={cardHover}
            >
              <motion.div whileHover={{ scale: 1.14, rotate: -4 }} transition={spring}>
                <Icon
                  className="profile-icon"
                  style={{ color: profile.color }}
                  aria-hidden="true"
                />
              </motion.div>

              <h3 className="profile-title font-heading">{profile.name}</h3>
              <p className="profile-username font-mono">{profile.username}</p>
              <p className="profile-description">{profile.description}</p>

              <motion.a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-small"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={pressTap}
              >
                Visit Profile
                <ExternalLink size={14} aria-hidden="true" />
              </motion.a>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Profiles;
