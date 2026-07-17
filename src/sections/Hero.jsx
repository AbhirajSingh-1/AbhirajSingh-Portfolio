import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Download, Mail } from 'lucide-react';
import heroImg from '../assets/projects/ME4.webp';
import resumePDF from '../assets/projects/Abhiraj_Singh_resume.pdf';

const roles = [
  'MERN Stack Developer',
  'Frontend Developer',
  'Freelance Web Developer',
  'Creative UI Designer',
];

function useTypewriter(words) {
  const [text, setText]         = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const delay   = deleting ? 30 : 65;
    const t = setTimeout(() => {
      if (!deleting && text.length < current.length) {
        setText(current.slice(0, text.length + 1));
      } else if (!deleting && text.length === current.length) {
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && text.length > 0) {
        setText(current.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words]);

  return text;
}

const staggerIn = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemIn = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const displayText = useTypewriter(roles);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-transparent pt-24 pb-6 overflow-hidden">
      {/* Premium floating background gradients */}
      <div className="absolute top-1/4 left-5 w-80 h-80 bg-amber-200/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-5 w-96 h-96 bg-amber-300/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/3 w-80 h-80 bg-orange-100/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* Left Copy Column */}
        <motion.div
          className="flex-1 space-y-6 max-w-xl"
          variants={staggerIn}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={itemIn}
            className="text-5xl sm:text-6xl lg:text-[4.2rem] font-black text-gray-900 leading-[1.05] tracking-tight"
          >
            Hi, I'm<br />
            <span className="text-indigo-600">
              Abhiraj Singh
            </span>
          </motion.h1>

          <motion.div
            variants={itemIn}
            aria-live="polite"
            className="text-xl lg:text-2xl font-bold text-gray-900 h-9 flex items-center gap-0.5"
          >
            <span className="text-gray-900">{displayText}</span>
            <span className="typing-caret text-black" aria-hidden="true" />
          </motion.div>

          <motion.p variants={itemIn} className="text-gray-900 text-lg font-medium leading-relaxed">
            I build fast, responsive, and visually polished web experiences for startups,
            businesses, agencies, and mission-driven teams.
          </motion.p>

          <motion.div variants={itemIn} className="flex flex-wrap gap-3 pt-1">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-sm shadow-lg shadow-indigo-200"
            >
              View Projects <ChevronRight size={15} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all text-sm"
            >
              Hire Me <Mail size={15} />
            </a>
            <a
              href={resumePDF}
              download="Abhiraj_Singh_Resume.pdf"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
              aria-label="Download Resume"
            >
              <Download size={15} /> Resume
            </a>
          </motion.div>

          {/* Metrics */}
          <motion.div variants={itemIn} className="flex gap-8 pt-5 border-t border-gray-100">
            {[
              { v: '15+', l: 'Projects', c: 'text-black' },
              { v: '5+',  l: 'Clients',  c: 'text-black' },
              { v: '13+', l: 'Technologies', c: 'text-black' },
            ].map((m) => (
              <div key={m.l}>
                <div className={`text-3xl font-black ${m.c}`}>{m.v}</div>
                <div className="text-sm text-gray-600 mt-0.5 font-semibold">{m.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Portrait Image */}
        <motion.div
          className="flex-shrink-0 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-white border border-gray-150 p-2.5 rounded-[2.2rem] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <img
              src={heroImg}
              alt="Abhiraj Singh portrait"
              className="w-64 h-80 sm:w-80 sm:h-96 lg:w-[330px] lg:h-[410px] object-cover rounded-[1.7rem]"
              width="330"
              height="410"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
