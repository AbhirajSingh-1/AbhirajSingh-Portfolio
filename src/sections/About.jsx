import { useCallback, useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, animate } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import {
  ReactIcon,
  JavaScriptIcon,
  TailwindIcon,
  NodejsIcon,
  MongoDBIcon,
  ExpressIcon,
  GitIcon,
  FirebaseIcon,
  VercelIcon,
  FramerMotionIcon,
  GsapIcon,
  RestApiIcon,
} from '../components/TechIcons';
import SectionHeading from '../components/SectionHeading';
import aboutImg from '../assets/projects/ME1.webp';
import { pressTap, softEase, spring, viewportOnce } from '../utils/motion';

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.55 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) { setCount(target); return; }
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Slide 1: Bio & Stats ─── */
const stats = [
  { target: 15, suffix: '+', label: 'Projects Completed' },
  { target: 5,  suffix: '+', label: 'Client Projects' },
  { target: 13, suffix: '+', label: 'Technologies Used' },
  { target: 10, suffix: '+', label: 'Responsive Websites' },
];

function BioSlide() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full min-h-[50vh]">
      {/* Image */}
      <div className="flex justify-center lg:justify-start">
        <div className="relative inline-block">
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-2xl translate-x-5 translate-y-5 opacity-10" />
          <div className="absolute inset-0 border-2 border-indigo-600 rounded-2xl translate-x-2.5 translate-y-2.5 opacity-20" />
          <motion.img
            src={aboutImg}
            alt="Abhiraj Singh working"
            className="relative w-64 h-80 sm:w-72 sm:h-90 lg:w-80 lg:h-[400px] object-cover rounded-2xl shadow-xl"
            width="320"
            height="400"
            loading="lazy"
            decoding="async"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          />
          <div className="absolute -bottom-5 -right-5 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl px-5 py-3 shadow-xl">
            <p className="text-xs text-indigo-200 font-medium">Full Stack</p>
            <p className="font-bold text-sm">Developer</p>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="space-y-5">
        <h3 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight tracking-tight">
          Clean builds, thoughtful interfaces,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            reliable delivery
          </span>
        </h3>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
          I'm a Full Stack Developer and Creative Web Designer who enjoys turning ideas into
          reliable, scalable, and visually clean digital products.
        </p>
        
        {/* Stats inline grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-white to-indigo-50/30 border border-indigo-100/55 rounded-xl p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="text-2xl font-black text-indigo-600">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 2: Tech Stack ─── */
const techs = [
  { Icon: ReactIcon,        name: 'React.js',       color: '#61DAFB' },
  { Icon: JavaScriptIcon,   name: 'JavaScript',     color: '#F7DF1E' },
  { Icon: TailwindIcon,     name: 'Tailwind CSS',   color: '#06B6D4' },
  { Icon: NodejsIcon,       name: 'Node.js',        color: '#339933' },
  { Icon: MongoDBIcon,      name: 'MongoDB',        color: '#47A248' },
  { Icon: ExpressIcon,      name: 'Express.js',     color: '#94A3B8' },
  { Icon: GitIcon,          name: 'Git & GitHub',   color: '#F05032' },
  { Icon: FirebaseIcon,     name: 'Firebase',       color: '#FFCA28' },
  { Icon: VercelIcon,       name: 'Vercel',         color: '#555' },
  { Icon: FramerMotionIcon, name: 'Framer Motion',  color: '#BB4BFF' },
  { Icon: GsapIcon,         name: 'GSAP',           color: '#88CE02' },
  { Icon: RestApiIcon,      name: 'REST APIs',      color: '#00D4FF' },
];

function StackSlide() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full min-h-[50vh]">
      {/* Code Editor Visual */}
      <div className="w-full">
        <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-3 text-[11px] text-gray-500 font-mono">developer.js</span>
          </div>
          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm space-y-2 overflow-x-auto leading-relaxed select-none">
            <div className="flex gap-4">
              <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">1</span>
              <span><span className="text-pink-500 font-semibold">const</span> <span className="text-blue-400">developer</span> = &#123;</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">2</span>
              <span>&nbsp;&nbsp;<span className="text-purple-400">name</span>: <span className="text-emerald-400">'Abhiraj Singh'</span>,</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">3</span>
              <span>&nbsp;&nbsp;<span className="text-purple-400">role</span>: <span className="text-emerald-400">'Full Stack Developer'</span>,</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">4</span>
              <span>&nbsp;&nbsp;<span className="text-purple-400">stack</span>: [<span className="text-emerald-400">'React'</span>, <span className="text-emerald-400">'Node'</span>, <span className="text-emerald-400">'MongoDB'</span>],</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">5</span>
              <span>&nbsp;&nbsp;<span className="text-purple-400">passion</span>: <span className="text-emerald-400">'Premium UI &amp; Performance'</span>,</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">6</span>
              <span>&nbsp;&nbsp;<span className="text-purple-400">available</span>: <span className="text-amber-500">true</span> <span className="text-gray-500">// open to hire! ✓</span></span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">7</span>
              <span>&#125;;</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">8</span>
              <span className="text-gray-600"></span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-700 select-none w-4 text-right flex-shrink-0">9</span>
              <span><span className="text-blue-400">developer</span>.<span className="text-yellow-400">build</span>(<span className="text-blue-300">yourIdea</span>);</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges and text */}
      <div className="space-y-4">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-500">Skills Overview</p>
        <h4 className="text-2xl font-black text-gray-900 leading-tight">My Stack &amp; Tools</h4>
        <p className="text-gray-500 text-sm leading-relaxed">
          I build modular, clean backend architectures integrated with interactive, performant frontends.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
          {techs.map(({ Icon, name, color }) => (
            <div key={name} className="flex flex-col items-center gap-1.5 p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-indigo-200 transition-colors group cursor-default">
              <Icon className="w-6 h-6 transition-transform group-hover:scale-110" style={{ color }} />
              <span className="text-[10px] font-bold text-gray-500 text-center leading-none">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Slide 3: UI/UX & Design ─── */
const designItems = [
  { label: 'Responsive Design',   icon: '📱', desc: 'Flawless mobile layouts', color: 'border-l-4 border-cyan-500' },
  { label: 'Modern Animations',   icon: '✨', desc: 'Smooth user interactions', color: 'border-l-4 border-purple-500' },
  { label: 'Performance First',   icon: '⚡', desc: 'Fast pages, SEO rank',    color: 'border-l-4 border-yellow-500' },
  { label: 'Clean Design Systems', icon: '🎨', desc: 'Pre-styled components',  color: 'border-l-4 border-pink-500' },
];

function DesignSlide() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full min-h-[50vh]">
      {/* Content */}
      <div className="space-y-5">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-500">Design Philosophy</p>
        <h4 className="text-2xl font-black text-gray-900 leading-tight">User-First Digital Design</h4>
        <p className="text-gray-500 text-sm leading-relaxed">
          I focus on details like micro-animations, loading speeds, and accessibility, ensuring your digital presence is beautiful, fast, and functional.
        </p>

        <div className="space-y-3.5">
          {[
            { label: 'React / Frontend', pct: 92, color: 'bg-cyan-500' },
            { label: 'UI/UX Design',     pct: 85, color: 'bg-pink-500' },
            { label: 'Performance',      pct: 88, color: 'bg-yellow-500' },
          ].map((skill) => (
            <div key={skill.label}>
              <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                <span>{skill.label}</span>
                <span>{skill.pct}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.pct}%` }}
                  viewport={viewportOnce}
                  transition={{ duration: 1, ease: softEase }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid items */}
      <div className="grid grid-cols-2 gap-3">
        {designItems.map((item) => (
          <div
            key={item.label}
            className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all ${item.color}`}
          >
            <div className="text-xl mb-1.5">{item.icon}</div>
            <div className="font-bold text-gray-900 text-xs sm:text-sm">{item.label}</div>
            <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Slide 4: Journey Timeline ─── */
const timeline = [
  { year: '2023', event: 'Started my BTech journey', icon: '🎓', color: 'bg-indigo-500' },
  { year: '2024', event: 'Learned development skills & core concepts', icon: '📚', color: 'bg-purple-500' },
  { year: '2025', event: 'Full stack web development journey', icon: '💻', color: 'bg-pink-500' },
  { year: '2026', event: 'Successful project deliveries for clients', icon: '🎯', color: 'bg-green-500' },
];

function TimelineSlide() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full min-h-[50vh]">
      {/* Description */}
      <div className="space-y-4">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-500">My Story</p>
        <h4 className="text-2xl font-black text-gray-900 leading-tight">Timeline &amp; Milestones</h4>
        <p className="text-gray-500 text-sm leading-relaxed">
          Tracing my growth from learning programming fundamentals to executing real-world commercial platforms for business owners, travel agents, and social groups.
        </p>
        <div className="grid grid-cols-2 gap-3 pt-1">
          {[
            { v: '15+', l: 'Projects Completed' },
            { v: '3+',  l: 'Years of Coding' },
          ].map((item) => (
            <div key={item.l} className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
              <div className="text-xl font-black text-gray-900">{item.v}</div>
              <div className="text-[11px] text-gray-500 font-medium mt-0.5 leading-tight">{item.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-1 bottom-1 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-green-500" />
        <div className="space-y-4 relative">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex gap-4 items-start"
            >
              <div className={`w-9 h-9 ${item.color} rounded-xl flex items-center justify-center text-sm flex-shrink-0 shadow-sm z-10 text-white`}>
                {item.icon}
              </div>
              <div className="pt-1 select-none">
                <span className="text-[10px] font-bold text-gray-400 block tracking-wide">{item.year}</span>
                <p className="text-gray-800 font-bold text-sm leading-tight mt-0.5">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Carousel Content Definition ─── */
const SLIDES = [
  { id: 'bio',      label: 'About Me',   Component: BioSlide      },
  { id: 'stack',    label: 'Tech Stack', Component: StackSlide    },
  { id: 'design',   label: 'Design',     Component: DesignSlide   },
  { id: 'timeline', label: 'My journey', Component: TimelineSlide },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '50%' : '-50%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir < 0 ? '50%' : '-50%', opacity: 0 }),
};
const slideTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

export default function About() {
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
    const timer = setInterval(goNext, 10000);
    return () => clearInterval(timer);
  }, [goNext]);

  const { Component } = SLIDES[current];

  return (
    <section id="about" className="pt-4 pb-16 lg:pt-6 lg:pb-20 bg-transparent border-b border-indigo-100/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          overline="Who I Am"
          title="About Me"
          subtitle="Explore my background, development stack, design philosophies, and coding journey."
        />

        {/* Carousel Container - No Box style, Full Width */}
        <div className="relative overflow-hidden w-full">
          
          {/* Navigation Buttons inside header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
            {/* Quick slide toggles */}
            <div className="flex items-center gap-1">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  className={[
                    'px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200',
                    i === current
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                      : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50',
                  ].join(' ')}
                >
                  {slide.label}
                </button>
              ))}
            </div>

            {/* Next/Prev Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="p-2 rounded-xl border border-gray-250 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={goNext}
                aria-label="Next slide"
                className="p-2 rounded-xl border border-gray-250 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Animating Slide Display */}
          <div className="relative min-h-[460px] flex items-center overflow-hidden">
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

          {/* Slide progress counter */}
          <div className="absolute bottom-4 right-0 text-xs text-gray-400 font-semibold select-none">
            {current + 1} / {SLIDES.length}
          </div>

        </div>
      </div>
    </section>
  );
}
