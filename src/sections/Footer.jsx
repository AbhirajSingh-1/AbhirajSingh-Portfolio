import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from '../components/SocialIcons';

const navLinks = [
  { label: 'Home',      target: 'home' },
  { label: 'About',     target: 'about' },
  { label: 'Skills',    target: 'skills' },
  { label: 'Projects',  target: 'projects' },
  { label: 'Services',  target: 'services' },
  { label: 'Contact',   target: 'contact' },
];

const socialLinks = [
  { icon: GithubIcon,    href: 'https://github.com/AbhirajSingh-1',            label: 'GitHub' },
  { icon: LinkedinIcon,  href: 'https://www.linkedin.com/in/abhirajsingh1306',  label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/abhiiiraj.singh/',     label: 'Instagram' },
  { icon: WhatsappIcon,  href: 'https://wa.me/917782905151',                    label: 'WhatsApp' },
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
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand-mark" aria-hidden="true">AS</div>
            <p className="footer-brand-name">Abhiraj Singh</p>
            <p>Full Stack Developer &amp; Creative Web Designer</p>
            <p>Building fast, responsive web experiences that drive results.</p>

            <div className="footer-socials" style={{ marginTop: '1.25rem' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4>Quick Links</h4>
            <div className="footer-links">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4>Get In Touch</h4>
            <div className="footer-links">
              <a
                href="mailto:abhi13062003@gmail.com"
                style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}
              >
                abhi13062003@gmail.com
              </a>
              <a
                href="tel:+917782905151"
                style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}
              >
                +91 7782905151
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                style={{ color: 'var(--amber)', fontSize: '0.92rem', marginTop: '0.25rem' }}
              >
                Start a project →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© 2026 Abhiraj Singh. All rights reserved.</p>
          <p>Built with React &amp; Tailwind CSS.</p>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="scroll-top-button"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
