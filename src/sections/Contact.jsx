import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Mail, Phone, Send, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from '../components/SocialIcons';
import SectionHeading from '../components/SectionHeading';
import {
  cardHover,
  fadeUp,
  pressTap,
  slideLeft,
  slideRight,
  spring,
  staggerContainer,
  viewportOnce,
} from '../utils/motion';

const contactDetails = [
  {
    icon: Mail,
    label: 'abhi13062003@gmail.com',
    href: 'mailto:abhi13062003@gmail.com',
  },
  {
    icon: Phone,
    label: '+91 7782905151',
    href: 'tel:+917782905151',
  },
];

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com/AbhirajSingh-1', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/abhirajsingh1306', label: 'LinkedIn' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/abhiiiraj.singh/', label: 'Instagram' },
  { icon: WhatsappIcon, href: 'https://wa.me/917782905151', label: 'WhatsApp' },
];

const emailjsConfig = {
  serviceId: 'service_xd3knck',
  templateId: 'template_izhtc9e',
  publicKey: 'Oh2ZJVifwgaL4g1H4',
};

const statusMotion = {
  initial: { opacity: 0, y: -12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.96 },
  transition: { duration: 0.28 },
};

const Contact = () => {
  const resetTimerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
    setStatus('sending');
    setFeedback('');

    const { serviceId, templateId, publicKey } = emailjsConfig;
    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setFeedback('Contact form is missing EmailJS configuration.');
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name.trim(),
          name: formData.name.trim(),
          from_email: formData.email.trim(),
          email: formData.email.trim(),
          reply_to: formData.email.trim(),
          subject: formData.subject.trim() || 'Portfolio enquiry',
          message: formData.message.trim(),
        },
        { publicKey }
      );

      setStatus('success');
      setFeedback('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });

      resetTimerRef.current = window.setTimeout(() => {
        setStatus('idle');
        setFeedback('');
      }, 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setFeedback('Unable to send your message right now. Please try again.');
    }
  };

  return (
    <section id="contact" className="section">
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind? Let's work together!"
      />

      <motion.div
        className="contact-grid"
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        <motion.div variants={slideLeft}>
          <motion.h3 className="contact-heading" variants={fadeUp}>
            Let&apos;s Build Something{' '}
            <span>Amazing</span>
          </motion.h3>
          <motion.p className="contact-subtext" variants={fadeUp}>
            Whether you need a sharp portfolio website, a powerful business
            platform, or an AI-integrated application, I&apos;m here to help
            bring your vision to life.
          </motion.p>

          <motion.div className="contact-detail-list" variants={staggerContainer(0.07)}>
            {contactDetails.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="contact-detail"
                variants={fadeUp}
                whileHover={{ x: 4 }}
              >
                <span className="contact-detail-icon">
                  <item.icon size={18} aria-hidden="true" />
                </span>
                <span>{item.label}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div className="contact-socials" variants={staggerContainer(0.05)}>
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="contact-social-link"
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={pressTap}
              >
                <social.icon aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={slideRight}>
          <motion.div
            className="contact-form-panel glass-card"
            whileHover={cardHover}
            transition={spring}
          >
            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div
                  key="success"
                  className="form-status form-status-success"
                  role="alert"
                  {...statusMotion}
                >
                  <div className="form-status-icon">
                    <Check size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <p>{feedback}</p>
                    <span>I&apos;ll get back to you soon.</span>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  key="error"
                  className="form-status form-status-error"
                  role="alert"
                  {...statusMotion}
                >
                  <div className="form-status-icon">
                    <AlertCircle size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <p>{feedback}</p>
                    <span>Check the form details and try again.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                aria-label="Your Name"
                className="form-input"
                required
                value={formData.name}
                onChange={handleChange}
                whileFocus={{ scale: 1.01 }}
              />
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="form-input"
                required
                value={formData.email}
                onChange={handleChange}
                whileFocus={{ scale: 1.01 }}
              />
              <motion.input
                type="text"
                name="subject"
                placeholder="Subject"
                aria-label="Subject"
                className="form-input"
                value={formData.subject}
                onChange={handleChange}
                whileFocus={{ scale: 1.01 }}
              />
              <motion.textarea
                name="message"
                placeholder="Tell me about your project..."
                aria-label="Your Message"
                className="form-input"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                whileFocus={{ scale: 1.01 }}
              />
              <motion.button
                type="submit"
                className="btn-primary form-submit"
                disabled={status === 'sending'}
                whileHover={status === 'sending' ? undefined : { y: -2, scale: 1.01 }}
                whileTap={status === 'sending' ? undefined : pressTap}
              >
                <span>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </span>
                <Send size={16} aria-hidden="true" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
