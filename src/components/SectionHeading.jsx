import { motion } from 'framer-motion';
import { fadeUp, softEase, staggerContainer, viewportOnce } from '../utils/motion';

/**
 * SectionHeading
 * @param {string}  title         - Section title
 * @param {string}  subtitle      - Optional subtitle paragraph
 * @param {string}  overline      - Optional overline label (e.g. "01 — About")
 * @param {'center'|'left'} align - Text alignment (default: 'center')
 * @param {number}  gradientWord  - Index of the word to render in gradient (default: last word)
 */
const SectionHeading = ({
  title,
  subtitle,
  overline,
  align = 'center',
  gradientWord,
}) => {
  const words = title.split(' ');
  const highlightIndex = gradientWord !== undefined ? gradientWord : words.length - 1;
  const isCentered = align === 'center';

  return (
    <motion.div
      className={`section-heading ${isCentered ? 'text-center' : 'text-left'}`}
      variants={staggerContainer(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {overline && (
        <motion.span
          className={`section-overline ${isCentered ? 'justify-center mx-auto' : ''}`}
          variants={fadeUp}
        >
          {overline}
        </motion.span>
      )}

      <motion.h2 className="font-heading" variants={staggerContainer(0.035)}>
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { opacity: 0, y: 22, rotateX: 24 },
              show: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: { duration: 0.55, ease: softEase },
              },
            }}
          >
            {index === highlightIndex ? (
              <span className="gradient-text">{word}</span>
            ) : (
              word
            )}
            {index < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="section-heading-subtitle"
          style={{
            marginLeft: isCentered ? 'auto' : undefined,
            marginRight: isCentered ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
