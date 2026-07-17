import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { pressTap, softEase, spring } from '../utils/motion';

const navItems = [
  { label: 'Home',     href: '#home' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
];

const drawerLink = {
  hidden: { opacity: 0, x: 30 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.06 + i * 0.04, duration: 0.32, ease: softEase },
  }),
  exit: { opacity: 0, x: 30, transition: { duration: 0.16 } },
};

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen]     = useState(false);

  /* ── Scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = navItems.map((i) => i.href.replace('#', ''));
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.find((e) => e.isIntersecting);
        if (vis?.target?.id) setActiveSection(vis.target.id);
      },
      { threshold: 0.3, rootMargin: '-80px 0px -45% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  /* ── Lock body scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    setActiveSection(id);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* ── Desktop / Tablet Navbar ── */}
      <motion.nav
        aria-label="Primary navigation"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: softEase }}
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#faf7f2]/95 backdrop-blur-md border-b border-indigo-100/30 shadow-sm'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Go to top"
            whileHover={{ scale: 1.03 }}
            whileTap={pressTap}
            className="flex items-center gap-3 select-none"
          >
            <motion.span
              className="w-9 h-9 bg-black text-white text-sm font-black rounded-xl flex items-center justify-center shadow-sm"
              whileHover={{ rotate: -8 }}
              transition={spring}
            >
              AS
            </motion.span>
            <span className="font-bold text-gray-900 text-base hidden sm:block">Abhiraj Singh</span>
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" aria-label="Site sections">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const active = activeSection === id;
              return (
                <li key={item.href}>
                  <motion.a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    whileHover={{ y: -1 }}
                    whileTap={pressTap}
                    className={[
                      'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      active
                        ? 'text-black bg-gray-100'
                        : 'text-gray-500 hover:text-black hover:bg-gray-50',
                    ].join(' ')}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black"
                        transition={spring}
                      />
                    )}
                  </motion.a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={pressTap}
              className="hidden md:inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-100"
            >
              Hire Me
            </motion.a>

            {/* Hamburger */}
            <motion.button
              className="md:hidden p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              whileTap={pressTap}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#faf7f2] border-l border-indigo-100/30 shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={spring}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <span className="font-bold text-gray-900">Navigation</span>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  whileTap={pressTap}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Links */}
              <nav className="flex-1 p-5 flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const id = item.href.replace('#', '');
                  const active = activeSection === id;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      custom={i}
                      variants={drawerLink}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      whileTap={pressTap}
                      className={[
                        'px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                        active
                          ? 'bg-black text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-black',
                      ].join(' ')}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* CTA */}
              <div className="p-5 border-t border-gray-100">
                <motion.a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  custom={navItems.length}
                  variants={drawerLink}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  whileTap={pressTap}
                  className="block w-full text-center bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                >
                  Start a Project →
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
