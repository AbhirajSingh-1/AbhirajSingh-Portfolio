import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

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
    icon: <Mail aria-hidden="true" />,
    href: 'mailto:abhi13062003@gmail.com',
    label: 'Email',
  },
];

const FloatingSocials = () => {
  return (
    <div className="floating-socials">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default FloatingSocials;
