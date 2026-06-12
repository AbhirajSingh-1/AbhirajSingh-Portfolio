import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from '../components/SocialIcons';
import { fadeUp, pressTap, staggerContainer, viewportOnce } from '../utils/motion';

const navLinks = [
  { label: 'Home', target: 'home' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Services', target: 'services' },
  { label: 'Contact', target: 'contact' },
];

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/AbhirajSingh-1', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/abhirajsingh1306', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/abhiiiraj.singh/', label: 'Instagram' },
  { icon: WhatsappIcon, href: 'https://wa.me/917782905151', label: 'WhatsApp' },
];

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <motion.footer
      className="site-footer"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerContainer(0.08)}
    >
      <div className="footer-inner">
        <motion.div className="footer-grid" variants={staggerContainer(0.1)}>
          <motion.div variants={fadeUp}>
            <motion.div
              className="footer-brand-mark"
              aria-hidden="true"
              whileHover={{ rotate: -6, scale: 1.06 }}
            >
              AS
            </motion.div>
            <p className="footer-brand-name">Abhiraj Singh</p>
            <p>Full Stack Developer &amp; Creative Web Designer</p>
            <p>Building fast, responsive web experiences that drive results.</p>

            <motion.div
              className="footer-socials"
              style={{ marginTop: '1.25rem' }}
              variants={staggerContainer(0.05)}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  variants={fadeUp}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={pressTap}
                >
                  <social.icon size={16} aria-hidden="true" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4>Quick Links</h4>
            <div className="footer-links">
              {navLinks.map((link) => (
                <motion.button
                  key={link.target}
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                  whileHover={{ x: 4 }}
                  whileTap={pressTap}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4>Get In Touch</h4>
            <div className="footer-links">
              <motion.a
                href="mailto:abhi13062003@gmail.com"
                style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}
                whileHover={{ x: 4, color: 'var(--amber)' }}
              >
                abhi13062003@gmail.com
              </motion.a>
              <motion.a
                href="tel:+917782905151"
                style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}
                whileHover={{ x: 4, color: 'var(--amber)' }}
              >
                +91 7782905151
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                style={{ color: 'var(--amber)', fontSize: '0.92rem', marginTop: '0.25rem' }}
                whileHover={{ x: 4 }}
                whileTap={pressTap}
              >
                Start a project -&gt;
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="footer-bottom" variants={fadeUp}>
          <p>Copyright 2026 Abhiraj Singh. All rights reserved.</p>
          <p>Built with React, Tailwind CSS, and Framer Motion.</p>
        </motion.div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            className="scroll-top-button"
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            whileHover={{ y: -4, scale: 1.06 }}
            whileTap={pressTap}
          >
            <ArrowUp size={20} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;
