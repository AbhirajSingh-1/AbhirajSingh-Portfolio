import { ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import SectionHeading from '../components/SectionHeading';
import { useRevealGroup } from '../hooks/useReveal';

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
  const gridRef = useRevealGroup({ threshold: 0.1 });

  return (
    <section id="profiles" className="section">
      <SectionHeading
        title="Connect With Me"
        overline="07 — Connect"
        subtitle="Find me on these platforms"
      />

      <div ref={gridRef} className="profile-grid">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          return (
            <div key={profile.name} className="profile-card-item glass-card reveal-item">
              <Icon
                className="profile-icon"
                style={{ color: profile.color }}
                aria-hidden="true"
              />

              <h3 className="profile-title font-heading">{profile.name}</h3>
              <p className="profile-username font-mono">{profile.username}</p>
              <p className="profile-description">{profile.description}</p>

              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-small"
              >
                Visit Profile
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Profiles;
