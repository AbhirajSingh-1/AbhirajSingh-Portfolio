import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';

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
  const ref = useReveal({ threshold: 0.2 });
  const words = title.split(' ');
  const highlightIndex = gradientWord !== undefined ? gradientWord : words.length - 1;
  const isCentered = align === 'center';

  return (
    <div
      ref={ref}
      className={`section-heading reveal ${isCentered ? 'text-center' : 'text-left'}`}
    >
      {/* Overline */}
      {overline && (
        <span className={`section-overline ${isCentered ? 'justify-center mx-auto' : ''}`}>
          {overline}
        </span>
      )}

      {/* Title */}
      <h2 className="font-heading">
        {words.map((word, index) => (
          <span key={index}>
            {index === highlightIndex ? (
              <span className="gradient-text">{word}</span>
            ) : (
              word
            )}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="section-heading-subtitle"
          style={{
            marginLeft: isCentered ? 'auto' : undefined,
            marginRight: isCentered ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
