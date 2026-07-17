import {
  Code, Layout, User, Briefcase, Heart, Smartphone, Zap, Layers, Gauge,
} from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { cardReveal, spring, staggerContainer, viewportOnce } from '../utils/motion';

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
      'Professional business websites with modern design, SEO optimisation, and conversion-focused layouts.',
    icon: Briefcase,
  },
  {
    title: 'NGO and Social Impact',
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
    icon: Gauge,
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

export default function Services() {
  return (
    <section id="services" className="py-12 lg:py-16 bg-transparent border-b border-indigo-100/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          overline="What I Do"
          title="My Services"
          subtitle="What I can build for you"
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer(0.075)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardReveal}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={spring}
                className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:border-indigo-200 hover:shadow-indigo-50/50 transition-all duration-300"
              >
                {/* Icon circle */}
                <motion.div
                  className="w-12 h-12 flex items-center justify-center bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl mb-5 group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm"
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  transition={spring}
                >
                  <Icon size={20} aria-hidden="true" className="group-hover:text-white transition-colors" />
                </motion.div>

                <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
