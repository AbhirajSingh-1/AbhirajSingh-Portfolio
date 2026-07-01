import { lazy, Suspense } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import FloatingSocials from './components/FloatingSocials';

import Hero from './sections/Hero';

// All below-fold sections lazy-loaded for best FCP/LCP
const About       = lazy(() => import('./sections/About'));
const Skills      = lazy(() => import('./sections/Skills'));
const Projects    = lazy(() => import('./sections/Projects'));
const Services    = lazy(() => import('./sections/Services'));
const Testimonials= lazy(() => import('./sections/Testimonials'));
const Profiles    = lazy(() => import('./sections/Profiles'));
const Contact     = lazy(() => import('./sections/Contact'));
const Footer      = lazy(() => import('./sections/Footer'));

// Minimal height placeholder while lazy section loads
const SectionLoader = () => <div style={{ minHeight: '60px' }} />;

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <FloatingSocials />
      <Navbar />

      <main>
        {/* Hero is eager — it IS the LCP element */}
        <Hero />

        {/* Single Suspense boundary for all below-fold content */}
        <Suspense fallback={<SectionLoader />}>
          <About />
          <Skills />
          <Projects />
          <Services />
          <Testimonials />
          <Profiles />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </MotionConfig>
  );
}

export default App;
