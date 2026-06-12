export const softEase = [0.22, 1, 0.36, 1];

export const viewportOnce = {
  once: true,
  amount: 0.18,
  margin: '0px 0px -80px 0px',
};

export const spring = {
  type: 'spring',
  stiffness: 220,
  damping: 24,
  mass: 0.9,
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: softEase,
    },
  },
};

export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: softEase,
    },
  },
};

export const slideLeft = {
  hidden: {
    opacity: 0,
    x: -36,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: softEase,
    },
  },
};

export const slideRight = {
  hidden: {
    opacity: 0,
    x: 36,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: softEase,
    },
  },
};

export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      ease: softEase,
    },
  },
};

export const cardHover = {
  y: -8,
  scale: 1.015,
  transition: spring,
};

export const pressTap = {
  scale: 0.98,
};
