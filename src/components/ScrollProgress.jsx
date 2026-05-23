import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const progressRef = useRef(null);
  const scrollableRef = useRef(0);

  useEffect(() => {
    const element = progressRef.current;
    if (!element) return undefined;

    let ticking = false;

    // Cache scrollable height to avoid repeated reads
    const updateScrollableHeight = () => {
      scrollableRef.current = document.documentElement.scrollHeight - window.innerHeight;
    };

    const updateProgress = () => {
      const scrollable = scrollableRef.current;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      element.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    updateScrollableHeight();
    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollableHeight);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollableHeight);
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />;
};

export default ScrollProgress;
