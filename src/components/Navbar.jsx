import { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
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
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { threshold: 0.35, rootMargin: '-90px 0px -45% 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((event, href) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
      >
        <a
          href="#home"
          onClick={(event) => handleNavClick(event, '#home')}
          className="nav-logo font-heading font-bold gradient-text"
        >
        Abhiraj Singh Portfolio
        </a>

        <ul className="nav-links-desktop nav-links" aria-label="Primary navigation">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={activeSection === id ? 'active' : ''}
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="nav-icon-button"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="#contact"
            onClick={(event) => handleNavClick(event, '#contact')}
            className="nav-cta"
          >
            Hire Me
          </a>

          <button
            className="nav-menu-button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <span
              className="nav-menu-line"
              style={{ transform: mobileOpen ? 'rotate(45deg) translateY(5px)' : 'none' }}
            />
            <span
              className="nav-menu-line"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="nav-menu-line"
              style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-5px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-navigation" className="mobile-menu">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');

            return (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === id ? 'active' : ''}
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href="#contact"
            className="mobile-menu-cta"
            onClick={(event) => handleNavClick(event, '#contact')}
          >
            Start a Project
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
