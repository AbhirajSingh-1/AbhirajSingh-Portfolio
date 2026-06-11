import { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import FloatingSocials from './components/FloatingSocials';

import Hero from './sections/Hero';
import About from './sections/About';
// Lazy load sections below the fold
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Services = lazy(() => import('./sections/Services'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Profiles = lazy(() => import('./sections/Profiles'));
const Contact = lazy(() => import('./sections/Contact'));
import Footer from './sections/Footer';

// Fallback component for lazy sections
const SectionLoader = () => <div style={{ minHeight: '100px' }} />;

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <ScrollProgress />
      <FloatingSocials />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />
        <About />
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Profiles />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;
