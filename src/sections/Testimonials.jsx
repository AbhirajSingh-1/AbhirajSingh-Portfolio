import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { cardHover, cardReveal, fadeIn, staggerContainer, viewportOnce } from '../utils/motion';

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
  return (
    <section id="testimonials" className="section">
      <SectionHeading
        title="Client Testimonials"
        subtitle="What people say about working with me"
      />

      <motion.div
        className="testimonial-grid"
        variants={staggerContainer(0.09)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {testimonials.map((testimonial) => (
          <motion.article
            key={`${testimonial.name}-${testimonial.role}`}
            className="testimonial-item glass-card"
            variants={cardReveal}
            whileHover={cardHover}
          >
            <motion.span
              className="testimonial-quote-mark"
              aria-hidden="true"
              variants={fadeIn}
            >
              &ldquo;
            </motion.span>

            <p className="testimonial-text">
              {testimonial.text}
            </p>

            <motion.div
              className="testimonial-rating"
              aria-label={`${testimonial.rating} out of 5 stars`}
              variants={staggerContainer(0.04, 0.1)}
            >
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.4, rotate: -18 },
                    show: { opacity: 1, scale: 1, rotate: 0 },
                  }}
                  transition={{ type: 'spring', stiffness: 360, damping: 18 }}
                >
                  <Star size={15} aria-hidden="true" />
                </motion.span>
              ))}
            </motion.div>

            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden="true">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p className="testimonial-author-name">{testimonial.name}</p>
                <span className="testimonial-author-role">{testimonial.role}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
