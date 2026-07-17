import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from '../components/SocialIcons';
import { fadeUp, pressTap, staggerContainer, viewportOnce } from '../utils/motion';

const navLinks = [
  { label: 'Home',     target: 'home'     },
  { label: 'About',    target: 'about'    },
  { label: 'Projects', target: 'projects' },
  { label: 'Services', target: 'services' },
  { label: 'Contact',  target: 'contact'  },
];

const socialLinks = [
  { icon: GithubIcon,    href: 'https://github.com/AbhirajSingh-1',             label: 'GitHub',    hoverClass: 'hover:bg-[#181717] hover:border-[#181717] hover:text-white' },
  { icon: LinkedinIcon,  href: 'https://www.linkedin.com/in/abhirajsingh1306',  label: 'LinkedIn',  hoverClass: 'hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:text-white' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/abhiiiraj.singh/',    label: 'Instagram', hoverClass: 'hover:bg-[#e4405f] hover:border-[#e4405f] hover:text-white' },
  { icon: WhatsappIcon,  href: 'https://wa.me/917782905151',                     label: 'WhatsApp',  hoverClass: 'hover:bg-[#25d366] hover:border-[#25d366] hover:text-white' },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Main grid ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 py-16 border-b border-white/10"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} className="space-y-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-black text-white text-sm font-black rounded-xl flex items-center justify-center shadow-md border border-white/10"
                whileHover={{ rotate: -8, scale: 1.08 }}
              >
                AS
              </motion.div>
              <span className="font-bold text-lg">Abhiraj Singh</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full Stack Developer & Creative Web Designer. Building fast, responsive web
              experiences that drive results.
            </p>

            {/* Socials */}
            <div className="flex gap-3 pt-1">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={pressTap}
                  className={`w-9 h-9 flex items-center justify-center border border-white/20 rounded-lg text-gray-400 transition-all duration-200 shadow-sm ${social.hoverClass}`}
                >
                  <social.icon size={15} aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <motion.button
                  key={link.target}
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                  whileHover={{ x: 5 }}
                  whileTap={pressTap}
                  className="text-left text-sm text-gray-400 hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={fadeUp}>
            <h4 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-5">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-3">
              <motion.a
                href="mailto:abhi13062003@gmail.com"
                whileHover={{ x: 5 }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                abhi13062003@gmail.com
              </motion.a>
              <motion.a
                href="tel:+917782905151"
                whileHover={{ x: 5 }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                +91 7782905151
              </motion.a>
              <motion.button
                type="button"
                onClick={() => scrollToSection('contact')}
                whileHover={{ x: 5 }}
                className="text-left text-sm text-white font-semibold hover:text-gray-300 hover:underline underline-offset-4 mt-1"
              >
                Start a project →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © 2026 Abhiraj Singh. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with React, Tailwind CSS & Framer Motion.
          </p>
        </div>
      </div>

      {/* ── Scroll to top ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={pressTap}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-indigo-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-colors border-0"
          >
            <ArrowUp size={18} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
