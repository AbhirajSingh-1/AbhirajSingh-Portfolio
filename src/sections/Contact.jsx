import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Mail, Phone, Send, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from '../components/SocialIcons';
import SectionHeading from '../components/SectionHeading';
import { fadeUp, pressTap, slideLeft, slideRight, spring, staggerContainer, viewportOnce } from '../utils/motion';

const contactDetails = [
  { icon: Mail,  label: 'abhi13062003@gmail.com', href: 'mailto:abhi13062003@gmail.com' },
  { icon: Phone, label: '+91 7782905151',          href: 'tel:+917782905151' },
];

const socialLinks = [
  { icon: GithubIcon,    href: 'https://github.com/AbhirajSingh-1',                label: 'GitHub',    hoverClass: 'hover:bg-[#181717] hover:border-[#181717] hover:text-white' },
  { icon: LinkedinIcon,  href: 'https://www.linkedin.com/in/abhirajsingh1306',    label: 'LinkedIn',  hoverClass: 'hover:bg-[#0a66c2] hover:border-[#0a66c2] hover:text-white' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/abhiiiraj.singh/',      label: 'Instagram', hoverClass: 'hover:bg-[#e4405f] hover:border-[#e4405f] hover:text-white' },
  { icon: WhatsappIcon,  href: 'https://wa.me/917782905151',                       label: 'WhatsApp',  hoverClass: 'hover:bg-[#25d366] hover:border-[#25d366] hover:text-white' },
];

const emailjsConfig = {
  serviceId:  'service_xd3knck',
  templateId: 'template_izhtc9e',
  publicKey:  'Oh2ZJVifwgaL4g1H4',
};

export default function Contact() {
  const resetTimerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus]     = useState('idle');   // idle | sending | success | error
  const [feedback, setFeedback] = useState('');

  useEffect(() => () => { if (resetTimerRef.current) clearTimeout(resetTimerRef.current); }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resetTimerRef.current) { clearTimeout(resetTimerRef.current); resetTimerRef.current = null; }
    setStatus('sending');
    setFeedback('');

    const { serviceId, templateId, publicKey } = emailjsConfig;
    if (!serviceId || !templateId || !publicKey) {
      setStatus('error'); setFeedback('Contact form is missing EmailJS configuration.'); return;
    }

    try {
      await emailjs.send(serviceId, templateId, {
        from_name:  formData.name.trim(),
        name:       formData.name.trim(),
        from_email: formData.email.trim(),
        email:      formData.email.trim(),
        reply_to:   formData.email.trim(),
        subject:    formData.subject.trim() || 'Portfolio enquiry',
        message:    formData.message.trim(),
      }, { publicKey });

      setStatus('success');
      setFeedback('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      resetTimerRef.current = setTimeout(() => { setStatus('idle'); setFeedback(''); }, 4500);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setFeedback('Unable to send your message right now. Please try again.');
    }
  };

  const inputBase =
    'w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition-all duration-200';

  return (
    <section id="contact" className="py-12 lg:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          overline="Contact"
          title="Get In Touch"
          subtitle="Have a project in mind? Let's work together!"
        />

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          {/* ── Left – info ── */}
          <motion.div variants={slideLeft} className="space-y-8">
            <div>
              <h3 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-3">
                Let's Build Something{' '}
                <span className="underline underline-offset-4 decoration-black/20">Amazing</span>
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Whether you need a sharp portfolio website, a powerful business platform, or an
                AI-integrated application, I'm here to help bring your vision to life.
              </p>
            </div>

            {/* Contact details */}
            <motion.div className="space-y-3" variants={staggerContainer(0.07)}>
              {contactDetails.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={fadeUp}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm bg-gray-50 hover:bg-white transition-all duration-200 group"
                >
                  <span className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all duration-200 flex-shrink-0">
                    <item.icon size={17} aria-hidden="true" className="text-gray-600 group-hover:text-white transition-colors" />
                  </span>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div variants={staggerContainer(0.05)}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    variants={fadeUp}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={pressTap}
                    className={`w-11 h-11 flex items-center justify-center border border-gray-200 rounded-xl text-gray-600 transition-all duration-200 shadow-sm ${social.hoverClass}`}
                  >
                    <social.icon size={18} aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right – form ── */}
          <motion.div variants={slideRight}>
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-7 lg:p-9">
              {/* Status banner */}
              <AnimatePresence mode="wait">
                {(status === 'success' || status === 'error') && (
                  <motion.div
                    key={status}
                    role="alert"
                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className={[
                      'flex items-start gap-3 rounded-xl p-4 mb-5 text-sm',
                      status === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800',
                    ].join(' ')}
                  >
                    <span className="mt-0.5 flex-shrink-0">
                      {status === 'success'
                        ? <Check size={18} />
                        : <AlertCircle size={18} />}
                    </span>
                    <div>
                      <p className="font-semibold">{feedback}</p>
                      <p className="text-xs mt-0.5 opacity-75">
                        {status === 'success'
                          ? "I'll get back to you soon."
                          : 'Check the form details and try again.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    aria-label="Your Name"
                    className={inputBase}
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
                    className={inputBase}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <motion.input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  aria-label="Subject"
                  className={inputBase}
                  value={formData.subject}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  aria-label="Your Message"
                  className={`${inputBase} resize-none`}
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                />

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={status === 'sending' ? undefined : { y: -2, scale: 1.01 }}
                  whileTap={status === 'sending' ? undefined : pressTap}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-indigo-100"
                >
                  <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
                  <Send size={16} aria-hidden="true" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
