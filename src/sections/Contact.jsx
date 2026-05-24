import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Check,
  Mail,
  Phone,
  Send,
  AlertCircle,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from '../components/SocialIcons';
import SectionHeading from '../components/SectionHeading';

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
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      }, 3000);
    } catch (error) {
      console.error('EmailJS send failed:', error);
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

      <div className="contact-grid">
        <div className="contact-copy">
          <h3 className="font-heading gradient-text">
            Let&apos;s Build Something Amazing
          </h3>
          <p>
            Whether you need a sharp portfolio website, a powerful business
            platform, or an AI-integrated application, I&apos;m here to help
            bring your vision to life.
          </p>

          <div className="contact-detail-list">
            {contactDetails.map((item) => (
              <a key={item.label} href={item.href} className="contact-detail">
                <span className="contact-detail-icon glass">
                  <item.icon size={18} aria-hidden="true" />
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="contact-socials">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="contact-social-link glass"
              >
                <social.icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="contact-form-panel glass-strong">
            {status === 'success' && (
              <div className="form-status form-status-success">
                <div className="form-status-icon">
                  <Check size={28} aria-hidden="true" />
                </div>
                <div>
                  <p>{feedback}</p>
                  <span>I&apos;ll get back to you soon.</span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="form-status form-status-error">
                <div className="form-status-icon">
                  <AlertCircle size={28} aria-hidden="true" />
                </div>
                <div>
                  <p>{feedback}</p>
                  <span>Check the form details and try again.</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                aria-label="Your Name"
                className="form-input"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="form-input"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                aria-label="Subject"
                className="form-input"
                value={formData.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                aria-label="Your Message"
                className="form-input"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn-primary form-submit"
                disabled={status === 'sending'}
              >
                <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                <Send size={16} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;