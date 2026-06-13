import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { pressTap, softEase, spring } from '../utils/motion';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const drawerLink = {
  hidden: { opacity: 0, x: 24 },
  show: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.08 + index * 0.045,
      duration: 0.34,
      ease: softEase,
    },
  }),
  exit: { opacity: 0, x: 24, transition: { duration: 0.18 } },
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { threshold: 0.35, rootMargin: '-90px 0px -45% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((event, href) => {
    event.preventDefault();
    const sectionId = href.replace('#', '');
    setActiveSection(sectionId);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  const renderNavLink = (item) => {
    const id = item.href.replace('#', '');

    return (
      <li key={item.href}>
        <motion.a
          href={item.href}
          className={activeSection === id ? 'active' : ''}
          onClick={(e) => handleNavClick(e, item.href)}
          whileHover={{ y: -1 }}
          whileTap={pressTap}
        >
          {item.label}
        </motion.a>
      </li>
    );
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        aria-label="Primary navigation"
        initial={{ opacity: 0, y: -24, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        transition={{ duration: 0.55, ease: softEase }}
      >
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="nav-logo"
          aria-label="Go to top"
          whileHover={{ scale: 1.02 }}
          whileTap={pressTap}
        >
          <motion.span
            className="nav-logo-mark"
            aria-hidden="true"
            whileHover={{ rotate: -6 }}
            transition={spring}
          >
            AS
          </motion.span>
          <span className="nav-logo-name">Abhiraj Singh</span>
        </motion.a>

        <ul className="nav-links-desktop nav-links" aria-label="Site sections">
          {navItems.map(renderNavLink)}
        </ul>

        <div className="nav-actions">
          <ul className="nav-links-mobile-quick nav-links" aria-label="Quick navigation">
            {navItems.slice(0, 3).map(renderNavLink)}
          </ul>

          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="nav-cta"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={pressTap}
          >
            Hire Me
          </motion.a>

          <motion.button
            className="nav-menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            whileTap={pressTap}
          >
            <span
              className="nav-menu-line"
              style={{ transform: mobileOpen ? 'rotate(45deg) translateY(5.5px)' : 'none' }}
            />
            <span className="nav-menu-line" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span
              className="nav-menu-line"
              style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-5.5px)' : 'none' }}
            />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-menu-backdrop"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            />

            <motion.div
              id="mobile-navigation"
              className="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={spring}
            >
              <motion.button
                className="mobile-menu-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                whileTap={pressTap}
              >
                <X size={18} />
              </motion.button>

              {navItems.map((item, index) => {
                const id = item.href.replace('#', '');

                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={activeSection === id ? 'active' : ''}
                    onClick={(e) => handleNavClick(e, item.href)}
                    custom={index}
                    variants={drawerLink}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    whileTap={pressTap}
                  >
                    {item.label}
                  </motion.a>
                );
              })}

              <motion.a
                href="#contact"
                className="mobile-menu-cta"
                onClick={(e) => handleNavClick(e, '#contact')}
                custom={navItems.length}
                variants={drawerLink}
                initial="hidden"
                animate="show"
                exit="exit"
                whileTap={pressTap}
              >
                Start a Project -&gt;
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
