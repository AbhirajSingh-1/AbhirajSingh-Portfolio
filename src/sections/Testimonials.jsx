import { Star } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useRevealGroup } from '../hooks/useReveal';

const testimonials = [
  {
    name: 'Sagar Anand',
    role: 'Portfolio Website Client',
    text: 'Abhiraj built an amazing portfolio website for me. It looks stunning, loads fast, and perfectly represents my personal brand. Highly recommend his work!',
    rating: 5,
  },
  {
    name: 'Siddhartha Raj',
    role: 'TrikaStudio Founder',
    text: 'The AI-powered portfolio website feels premium, polished, and aligned with the kind of brand experience we wanted.',
    rating: 5,
  },
  {
    name: 'Sakshi Anand',
    role: 'NGO Founder',
    text: 'He understood our mission and created a clean, emotional website that communicates our cause clearly.',
    rating: 5,
  },
  {
    name: 'Roshan Rawat',
    role: 'Freepathshala NGO Founder',
    text: 'Working with Abhiraj was a great experience. The FreePathshala platform is well-designed, responsive, and makes donation pickup and tracking management simple and efficient.',
    rating: 5,
  },
];

const Testimonials = () => {
  const gridRef = useRevealGroup({ threshold: 0.08 });

  return (
    <section id="testimonials" className="section">
      <SectionHeading
        title="Client Testimonials"
        overline="06 — Reviews"
        subtitle="What people say about working with me"
      />

      <div ref={gridRef} className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <article
            key={`${testimonial.name}-${testimonial.role}`}
            className="testimonial-item glass-card reveal-item"
          >
            {/* Decorative quote mark */}
            <span className="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>

            {/* Quote */}
            <p className="testimonial-text">
              {testimonial.text}
            </p>

            {/* Stars */}
            <div
              className="testimonial-rating"
              aria-label={`${testimonial.rating} out of 5 stars`}
            >
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} size={15} aria-hidden="true" />
              ))}
            </div>

            {/* Author */}
            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden="true">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="testimonial-author-name">{testimonial.name}</p>
                <span className="testimonial-author-role">{testimonial.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
