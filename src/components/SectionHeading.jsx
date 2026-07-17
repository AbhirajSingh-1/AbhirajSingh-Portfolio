import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '../utils/motion';

export default function SectionHeading({ overline, title, subtitle }) {
  return (
    <motion.div
      className="text-center mb-16 lg:mb-20"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {overline && (
        <motion.p
          variants={fadeUp}
          className="text-xs font-bold tracking-[0.3em] uppercase text-black mb-3"
        >
          {overline}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="text-4xl md:text-5xl font-black text-gray-900 mb-5 tracking-tight leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
