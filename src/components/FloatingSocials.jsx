import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import { fadeUp, pressTap, staggerContainer } from '../utils/motion';

const socials = [
  {
    icon: <GithubIcon aria-hidden="true" />,
    href: 'https://github.com/AbhirajSingh-1',
    label: 'GitHub',
  },
  {
    icon: <LinkedinIcon aria-hidden="true" />,
    href: 'https://www.linkedin.com/in/abhirajsingh1306',
    label: 'LinkedIn',
  },
  {
    icon: <InstagramIcon aria-hidden="true" />,
    href: 'https://www.instagram.com/abhiiiraj.singh/',
    label: 'Instagram',
  },
  {
    icon: <Mail aria-hidden="true" size={17} />,
    href: 'mailto:abhi13062003@gmail.com',
    label: 'Email',
  },
];

const FloatingSocials = () => {
  return (
    <motion.div
      className="floating-socials"
      aria-label="Social links"
      variants={staggerContainer(0.08, 0.45)}
      initial="hidden"
      animate="show"
    >
      {socials.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target={social.label !== 'Email' ? '_blank' : undefined}
          rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
          aria-label={social.label}
          variants={fadeUp}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={pressTap}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default FloatingSocials;
