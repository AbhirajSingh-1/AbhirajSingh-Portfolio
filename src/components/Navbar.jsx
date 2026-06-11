import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen]   = useState(false);

  /* Scroll detection */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Active section detection */
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

  /* Lock body scroll when mobile menu is open */
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

  return (
    <>
      {/* ── Main Navbar ── */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="nav-logo"
          aria-label="Go to top"
        >
          <span className="nav-logo-mark" aria-hidden="true">AS</span>
          <span className="nav-logo-name">Abhiraj Singh</span>
        </a>

        {/* Desktop links */}
        <ul className="nav-links-desktop nav-links" aria-label="Site sections">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === id ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="nav-actions">
          {/* Mobile quick links — 3 visible on small screens */}
          <ul className="nav-links-mobile-quick nav-links" aria-label="Quick navigation">
            {navItems.slice(0, 3).map((item) => {
              const id = item.href.replace('#', '');
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={activeSection === id ? 'active' : ''}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="nav-icon-button"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="nav-cta"
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            className="nav-menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
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
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="mobile-menu-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div id="mobile-navigation" className="mobile-menu" role="dialog" aria-modal="true">
            {/* Close button */}
            <button
              className="mobile-menu-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={activeSection === id ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              href="#contact"
              className="mobile-menu-cta"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Start a Project →
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
