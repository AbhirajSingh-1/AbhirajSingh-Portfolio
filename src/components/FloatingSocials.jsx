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
    icon: <Mail aria-hidden="true" size={17} />,
    href: 'mailto:abhi13062003@gmail.com',
    label: 'Email',
  },
];

const FloatingSocials = () => {
  return (
    <div className="floating-socials" aria-label="Social links">
      {socials.map((social, i) => (
        <a
          key={social.label}
          href={social.href}
          target={social.label !== 'Email' ? '_blank' : undefined}
          rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
          aria-label={social.label}
          style={{
            animation: `fadeUp 0.5s ${0.1 + i * 0.08}s cubic-bezier(0.22, 1, 0.36, 1) both`,
          }}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default FloatingSocials;
