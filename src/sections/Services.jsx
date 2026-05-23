import {
  Code,
  Layout,
  User,
  Briefcase,
  Heart,
  Smartphone,
  Zap,
  Layers,
  Gauge,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const services = [
  {
    title: 'Full Stack Web Development',
    description:
      'End-to-end web application development using MERN stack with scalable architecture and modern best practices.',
    icon: Code,
  },
  {
    title: 'Frontend Development',
    description:
      'Building responsive, performant, and visually stunning user interfaces with React.js, Tailwind CSS, and modern animation libraries.',
    icon: Layout,
  },
  {
    title: 'Portfolio Websites',
    description:
      'Creating premium personal and professional portfolio websites that showcase your work and impress potential clients.',
    icon: User,
  },
  {
    title: 'Business Websites',
    description:
      'Professional business websites with modern design, SEO optimization, and conversion-focused layouts.',
    icon: Briefcase,
  },
  {
    title: 'NGO & Social Impact',
    description:
      'Purpose-driven websites for NGOs and foundations with emotional design and donation integration capabilities.',
    icon: Heart,
  },
  {
    title: 'Responsive Web Design',
    description:
      'Mobile-first, pixel-perfect responsive designs that work flawlessly across all devices and screen sizes.',
    icon: Smartphone,
  },
  {
    title: 'UI/UX Design',
    description:
      'User-centric interface design with focus on usability, accessibility, and delightful user experiences.',
    icon: Layout,
  },
  {
    title: 'API Integration',
    description:
      'Seamless integration of third-party APIs, payment gateways, and backend services into your applications.',
    icon: Layers,
  },
  {
    title: 'AI-Integrated Applications',
    description:
      'Building intelligent web applications with AI-powered features, chatbots, and smart content generation.',
    icon: Zap,
  },
];

const Services = () => {
  return (
    <section id="services" className="section">
      <SectionHeading
        title="My Services"
        subtitle="What I can build for you"
      />

      <div className="service-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="service-card glass-card"
            >
              <div className="service-icon">
                <Icon aria-hidden="true" />
              </div>

              <h3
                className="service-title font-heading"
                style={{ color: 'var(--text-primary)' }}
              >
                {service.title}
              </h3>

              <p className="service-description">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
