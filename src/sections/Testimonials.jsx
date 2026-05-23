import { MessageCircle, Star } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const testimonials = [
  {
    name: 'Subham Kashyap',
    role: 'Sh1eld tech infosec solutions CEO',
    text: 'Abhiraj delivered an exceptional tourism website that captures the beauty of Sikkim with a responsive, modern interface.',
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
    text: 'Working with Abhiraj was a great experience. The FreePathshala platform is well-designed, responsive, and makes donation pickup and tracking management simple and efficient for users.',
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

      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <article
            key={`${testimonial.name}-${testimonial.role}`}
            className="testimonial-item glass-card"
          >
            <MessageCircle className="testimonial-icon" aria-hidden="true" />

            <p className="testimonial-text">&ldquo;{testimonial.text}&rdquo;</p>

            <div className="testimonial-rating" aria-label={`${testimonial.rating} star rating`}>
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star key={index} size={16} aria-hidden="true" />
              ))}
            </div>

            <div className="testimonial-author">
              <div className="testimonial-avatar" aria-hidden="true">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <p>{testimonial.name}</p>
                <span>{testimonial.role}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
