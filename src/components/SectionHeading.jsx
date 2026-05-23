const SectionHeading = ({ title, subtitle, align = 'center', gradientWord }) => {
  const words = title.split(' ');
  const highlightIndex = gradientWord !== undefined ? gradientWord : words.length - 1;

  return (
    <div
      className={`section-heading ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <h2 className="font-heading" style={{ color: 'var(--text-primary)' }}>
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

      <div
        className={`section-heading-line ${align === 'center' ? 'mx-auto' : ''}`}
        style={{ background: 'var(--gradient-primary)' }}
      />

      {subtitle && (
        <p
          className="section-heading-subtitle"
          style={{
            color: 'var(--text-secondary)',
            marginLeft: align === 'center' ? 'auto' : undefined,
            marginRight: align === 'center' ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
