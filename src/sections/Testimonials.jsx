import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { cardReveal, fadeIn, staggerContainer, viewportOnce } from '../utils/motion';

const testimonials = [
  {
    name: 'Sagar Anand',
    role: 'Portfolio Website Client',
    text: 'Abhiraj built an amazing portfolio website for me. It looks stunning, loads fast, and perfectly represents my personal brand. Highly recommend his work!',
    rating: 5,
    initial: 'S',
  },
  {
    name: 'Siddhartha Raj',
    role: 'TrikaStudio Founder',
    text: 'The AI-powered portfolio website feels premium, polished, and aligned with the kind of brand experience we wanted. Truly exceptional work.',
    rating: 5,
    initial: 'S',
  },
  {
    name: 'Sakshi Anand',
    role: 'NGO Founder',
    text: 'He understood our mission and created a clean, emotional website that communicates our cause clearly. Our donor engagement improved significantly.',
    rating: 5,
    initial: 'S',
  },
  {
    name: 'Roshan Rawat',
    role: 'Freepathshala NGO Founder',
    text: 'Working with Abhiraj was a great experience. The FreePathshala platform is well-designed, responsive, and makes donation pickup and tracking management simple.',
    rating: 5,
    initial: 'R',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-12 lg:py-16 bg-transparent border-b border-indigo-100/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          overline="Social Proof"
          title="Client Testimonials"
          subtitle="What people say about working with me"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {testimonials.map((t) => (
            <motion.article
              key={`${t.name}-${t.role}`}
              variants={cardReveal}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:border-gray-250 hover:shadow-black/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Large quote mark */}
              <motion.span
                className="absolute top-4 right-6 text-8xl font-black text-gray-100 leading-none select-none pointer-events-none group-hover:text-gray-200 transition-colors"
                aria-hidden="true"
                variants={fadeIn}
              >
                &ldquo;
              </motion.span>

              <p className="text-gray-600 leading-relaxed mb-6 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Stars */}
              <motion.div
                className="flex gap-1 mb-5"
                aria-label={`${t.rating} out of 5 stars`}
                variants={staggerContainer(0.05, 0.1)}
              >
                {Array.from({ length: t.rating }).map((_, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.4, rotate: -20 },
                      show:  { opacity: 1, scale: 1, rotate: 0 },
                    }}
                    transition={{ type: 'spring', stiffness: 360, damping: 18 }}
                  >
                    <Star size={15} className="fill-amber-400 text-amber-400" aria-hidden="true" />
                  </motion.span>
                ))}
              </motion.div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center text-sm font-black flex-shrink-0 shadow-sm">
                  {t.initial}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
