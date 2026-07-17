import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight, Download, ExternalLink, Mail } from 'lucide-react';
import heroImg  from '../assets/projects/ME4.webp';
import resumePDF from '../assets/projects/Abhiraj_Singh_resume.pdf';
import sikkimpalImg    from '../assets/projects/sikkimpal.webp';
import trikastudioImg  from '../assets/projects/trikastudio.webp';
import kashikeshavImg  from '../assets/projects/kashikeshav.webp';
import houseofkashiImg  from '../assets/projects/houseofkashi.webp';

/* ─── Typewriter ─────────────────────────────── */
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
      if (!deleting && text.length < current.length) setText(current.slice(0, text.length + 1));
      else if (!deleting && text.length === current.length) setTimeout(() => setDeleting(true), 1200);
      else if (deleting && text.length > 0) setText(current.slice(0, text.length - 1));
      else { setDeleting(false); setWordIdx((i) => (i + 1) % words.length); }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words]);
  return text;
}

/* ─── Transition preset ──────────────────────── */
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir < 0 ? '60%' : '-60%', opacity: 0 }),
};
const slideTransition = { duration: 0.52, ease: [0.22, 1, 0.36, 1] };

/* ════════════════════════════════════════════════
   SLIDE 1 — HERO INTRO
════════════════════════════════════════════════ */
function IntroSlide() {
  const displayText = useTypewriter(roles);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 w-full min-h-[70vh] py-6">
      {/* Left content */}
      <motion.div
        className="flex-1 space-y-6 max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for projects
        </motion.div>

        <h1 className="text-5xl sm:text-6xl lg:text-[4.2rem] font-black text-gray-900 leading-[1.05] tracking-tight">
          Hi, I'm<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
            Abhiraj Singh
          </span>
        </h1>

        <div aria-live="polite" className="text-xl lg:text-2xl font-bold text-gray-500 h-9 flex items-center gap-0.5">
          <span className="text-gray-800">{displayText}</span>
          <span className="typing-caret text-indigo-500" aria-hidden="true" />
        </div>

        <p className="text-gray-500 text-lg leading-relaxed">
          I build fast, responsive, and visually polished web experiences for startups,
          businesses, agencies, and mission-driven teams.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <a href="#projects" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-sm shadow-lg shadow-indigo-200">
            View Projects <ChevronRight size={15} />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all text-sm">
            Hire Me <Mail size={15} />
          </a>
          <a href={resumePDF} download="Abhiraj_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
            aria-label="Download Resume"
          >
            <Download size={15} /> Resume
          </a>
        </div>

        <div className="flex gap-8 pt-2 border-t border-gray-100 pt-5">
          {[{ v: '15+', l: 'Projects', c: 'text-indigo-600' }, { v: '5+', l: 'Clients', c: 'text-purple-600' }, { v: '13+', l: 'Technologies', c: 'text-pink-500' }].map((m) => (
            <div key={m.l}>
              <div className={`text-3xl font-black ${m.c}`}>{m.v}</div>
              <div className="text-sm text-gray-400 mt-0.5">{m.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right image */}
      <motion.div
        className="flex-shrink-0 flex justify-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <div className="relative">
          {/* Gradient glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 rounded-3xl opacity-20 blur-xl" />
          <div className="absolute inset-0 border-4 border-indigo-300 rounded-3xl translate-x-4 translate-y-4 opacity-40" />
          <img
            src={heroImg}
            alt="Abhiraj Singh portrait"
            className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-[340px] lg:h-[420px] object-cover rounded-3xl shadow-2xl"
            width="340"
            height="420"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          {/* Floating tag */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-3 -right-4 bg-white border border-gray-100 rounded-2xl px-4 py-2 shadow-xl flex items-center gap-2"
          >
            <span className="text-base">👨‍💻</span>
            <span className="text-xs font-bold text-gray-700">Full Stack Dev</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-3 -left-4 bg-indigo-600 text-white rounded-2xl px-4 py-2 shadow-xl"
          >
            <span className="text-xs font-bold">Open to Work ✓</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   SLIDE 2 — VISUAL: MERN STACK DEVELOPER CARD
   Rich colored background with tech showcase
════════════════════════════════════════════════ */
function DevVisualSlide() {
  const codeLines = [
    { code: 'const developer = {', indent: 0, color: '#e2e8f0' },
    { code: "  name: 'Abhiraj Singh',", indent: 1, color: '#a78bfa' },
    { code: "  stack: ['React', 'Node', 'MongoDB'],", indent: 1, color: '#34d399' },
    { code: "  passion: 'Building great UX',", indent: 1, color: '#60a5fa' },
    { code: "  available: true, // ✓ hire me!", indent: 1, color: '#fbbf24' },
    { code: '};', indent: 0, color: '#e2e8f0' },
    { code: '', indent: 0, color: '' },
    { code: 'developer.build(yourIdea);', indent: 0, color: '#f472b6' },
  ];

  return (
    <div className="w-full min-h-[70vh] flex flex-col lg:flex-row items-center gap-10 py-6">
      {/* Left: Visual code editor mock */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Editor window */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 max-w-lg">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-xs text-gray-400 font-mono">developer.js</span>
          </div>
          {/* Code */}
          <div className="p-6 font-mono text-sm space-y-1">
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.1 }}
                className="flex gap-4"
              >
                <span className="text-gray-600 select-none w-4 text-right flex-shrink-0">{line.code ? i + 1 : ''}</span>
                <span style={{ color: line.color, paddingLeft: line.indent * 16 }}>
                  {line.code}
                </span>
              </motion.div>
            ))}
            <motion.div
              className="flex gap-4 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-gray-600 w-4" />
              <span className="text-green-400 text-xs">▶ Output: Your idea, built beautifully ✓</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right: Skills & Badges */}
      <motion.div
        className="flex-1 space-y-5"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-indigo-400">What I Work With</p>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Full Stack<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            MERN Developer
          </span>
        </h2>
        <p className="text-gray-500 leading-relaxed">
          Crafting end-to-end web applications with MongoDB, Express.js, React.js,
          and Node.js — from pixel-perfect UIs to scalable backend APIs.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { label: 'React.js', bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },
            { label: 'Node.js', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
            { label: 'MongoDB', bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
            { label: 'Express.js', bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' },
            { label: 'Tailwind CSS', bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-200' },
            { label: 'Framer Motion', bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
            { label: 'REST APIs', bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
            { label: 'Firebase', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' },
          ].map((t, i) => (
            <motion.span
              key={t.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${t.bg} ${t.text} ${t.border}`}
            >
              {t.label}
            </motion.span>
          ))}
        </div>

        <motion.a
          href="#skills"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-sm shadow-lg shadow-indigo-200 mt-2"
        >
          Explore My Stack <ChevronRight size={15} />
        </motion.a>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   SLIDE 3 — VISUAL: FEATURED PROJECTS SHOWCASE
════════════════════════════════════════════════ */
const featuredProjects = [
  { title: 'SikkimPal',    type: 'Tourism & Travel', img: sikkimpalImg,   url: 'https://sh1eldtech.vercel.app/',  color: 'from-green-400 to-emerald-600' },
  { title: 'TrikaStudio',  type: 'AI Digital Agency', img: trikastudioImg, url: 'https://www.trikastudio.in/',    color: 'from-purple-400 to-pink-600' },
  { title: 'House of Kashi', type: 'Wedding Portfolio', img: houseofkashiImg, url: 'https://house-of-kashi.vercel.app/', color: 'from-rose-400 to-orange-500' },
  { title: 'Kashi Keshav', type: 'NGO Website',      img: kashikeshavImg, url: 'https://www.kashikeshavchildcarefoundation.com/', color: 'from-blue-400 to-indigo-600' },
];

function ProjectsSlide() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col py-6">
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-indigo-400 mb-2">Portfolio</p>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
          Live Projects I've Built
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        {featuredProjects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 + i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-2"
          >
            <img
              src={p.img}
              alt={p.title}
              className="w-full h-44 lg:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${p.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
              <p className="text-xs font-medium opacity-80 uppercase tracking-wider">{p.type}</p>
              <h3 className="font-black text-base leading-tight">{p.title}</h3>
            </div>
            {/* Arrow icon on hover */}
            <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={13} className="text-white" />
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div className="text-center mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <a href="#projects" className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-900 hover:text-white transition-all text-sm">
          View All Projects <ChevronRight size={15} />
        </a>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   SLIDE 4 — VISUAL: UI/UX & DESIGN CAPABILITIES
════════════════════════════════════════════════ */
function DesignSlide() {
  const designItems = [
    { label: 'Responsive Design',   icon: '📱', desc: 'Works on every device', color: 'border-l-4 border-cyan-400' },
    { label: 'Modern Animations',   icon: '✨', desc: 'Framer Motion & GSAP',  color: 'border-l-4 border-purple-400' },
    { label: 'Performance First',   icon: '⚡', desc: 'Fast load times',        color: 'border-l-4 border-yellow-400' },
    { label: 'Clean UI Systems',    icon: '🎨', desc: 'Tailwind CSS & Design',  color: 'border-l-4 border-pink-400' },
    { label: 'SEO Optimised',       icon: '🔍', desc: 'Built-in best practices', color: 'border-l-4 border-green-400' },
    { label: 'Accessible',          icon: '♿', desc: 'WCAG friendly markup',    color: 'border-l-4 border-orange-400' },
  ];

  return (
    <div className="w-full min-h-[70vh] flex flex-col lg:flex-row items-center gap-12 py-6">
      {/* Left */}
      <motion.div className="flex-1 space-y-5" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-pink-500">UI/UX & Frontend</p>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Crafting Beautiful<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
            Digital Experiences
          </span>
        </h2>
        <p className="text-gray-500 leading-relaxed">
          Every pixel matters. I design and build interfaces that are not just
          visually stunning but also intuitive, accessible, and blazing fast.
        </p>

        {/* Progress bars */}
        <div className="space-y-3 pt-2">
          {[
            { label: 'React / Frontend', pct: 92, color: 'bg-cyan-500' },
            { label: 'UI/UX Design',     pct: 85, color: 'bg-pink-500' },
            { label: 'Backend / APIs',   pct: 80, color: 'bg-green-500' },
            { label: 'Performance',      pct: 88, color: 'bg-yellow-500' },
          ].map((skill) => (
            <div key={skill.label}>
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                <span>{skill.label}</span>
                <span>{skill.pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.pct}%` }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right: Feature cards */}
      <motion.div className="flex-1 grid grid-cols-2 gap-3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        {designItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.07 }}
            className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${item.color}`}
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-bold text-gray-900 text-sm">{item.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   SLIDE 5 — VISUAL: DEVELOPER STATS & JOURNEY
════════════════════════════════════════════════ */
function StatsSlide() {
  const timeline = [
    { year: '2023', event: 'Started my BTech journey', icon: '🎓', color: 'bg-indigo-500' },
    { year: '2024', event: 'Learned new development skills & core concepts', icon: '📚', color: 'bg-purple-500' },
    { year: '2025', event: 'Full stack web development journey', icon: '💻', color: 'bg-pink-500' },
    { year: '2026', event: 'Successful project deliveries for clients', icon: '🎯', color: 'bg-green-500' },
  ];

  return (
    <div className="w-full min-h-[70vh] flex flex-col lg:flex-row items-center gap-12 py-6">
      {/* Left: Stats grid */}
      <motion.div className="flex-1 space-y-5" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-green-500">By the Numbers</p>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          The Developer<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500">
            Behind the Code
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-4 pt-2">
          {[
            { v: '15+', l: 'Projects Built', icon: '🛠️', c: 'from-indigo-50 to-indigo-100 border-indigo-200' },
            { v: '5+',  l: 'Happy Clients',  icon: '😊', c: 'from-green-50 to-green-100 border-green-200' },
            { v: '13+', l: 'Technologies',   icon: '💻', c: 'from-purple-50 to-purple-100 border-purple-200' },
            { v: '3+',  l: 'Years Coding',   icon: '🚀', c: 'from-orange-50 to-orange-100 border-orange-200' },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className={`bg-gradient-to-br ${s.c} border rounded-2xl p-5`}
            >
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-3xl font-black text-gray-900">{s.v}</div>
              <div className="text-sm text-gray-600 mt-0.5 font-medium">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right: Timeline */}
      <motion.div className="flex-1 space-y-4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">My Journey</p>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-purple-400 to-green-400" />
          <div className="space-y-5">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex gap-5 items-start"
              >
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm z-10`}>
                  {item.icon}
                </div>
                <div className="pt-1.5">
                  <span className="text-xs font-bold text-gray-400 block">{item.year}</span>
                  <p className="text-gray-800 font-semibold text-sm leading-snug">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN CAROUSEL CONTROLLER
════════════════════════════════════════════════ */
const SLIDES = [
  { id: 'intro',    label: 'Hello',    Component: IntroSlide    },
  { id: 'stack',    label: 'Stack',    Component: DevVisualSlide },
  { id: 'projects', label: 'Projects', Component: ProjectsSlide },
  { id: 'design',   label: 'Design',   Component: DesignSlide   },
  { id: 'journey',  label: 'Journey',  Component: StatsSlide    },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);

  const goTo = useCallback((idx) => {
    setDir(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const goNext = useCallback(() => {
    setDir(1);
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const goPrev = useCallback(() => {
    setDir(-1);
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const { Component } = SLIDES[current];

  return (
    <section id="home" className="relative bg-white pt-16 flex flex-col">
      {/* Slide content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="w-full"
          >
            <Component />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="py-8 px-5 flex items-center justify-center gap-5">
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="p-3 rounded-full border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Carousel slides">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}: ${slide.label}`}
              onClick={() => goTo(i)}
              className={[
                'transition-all duration-300 rounded-full',
                i === current ? 'w-8 h-2.5 bg-indigo-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-500',
              ].join(' ')}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          aria-label="Next slide"
          className="p-3 rounded-full border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Slide counter + label */}
      <div className="absolute bottom-4 right-6 flex items-center gap-2 text-xs text-gray-400 font-medium">
        <span className="font-bold text-indigo-500">{SLIDES[current].label}</span>
        <span className="tabular-nums">{String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}
