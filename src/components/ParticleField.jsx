import { useEffect, useRef } from 'react';

/**
 * Draws an interactive particle network on a canvas element.
 * Particles float freely and connect to neighbours with glowing lines.
 * Mouse proximity causes gentle repulsion.
 */
export default function ParticleField({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = (canvas.width  = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    let animId;
    const mouse = { x: W / 2, y: H / 2 };
    const COUNT = Math.floor((W * H) / 12000);
    const CONNECT_DIST = 140;
    const MOUSE_REPEL  = 100;

    /* Colour palette — indigo / cyan / purple */
    const COLOURS = ['#818CF8', '#38BDF8', '#C084FC', '#6EE7B7'];

    class Particle {
      constructor() { this.reset(true); }

      reset(init = false) {
        this.x  = Math.random() * W;
        this.y  = init ? Math.random() * H : -10;
        this.r  = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = Math.random() * 0.35 + 0.1;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        this.alpha  = Math.random() * 0.5 + 0.3;
      }

      update() {
        /* Gentle mouse repulsion */
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_REPEL) {
          const force = (MOUSE_REPEL - dist) / MOUSE_REPEL * 0.8;
          this.vx += (dx / dist) * force * 0.4;
          this.vy += (dy / dist) * force * 0.4;
        }

        /* Damping */
        this.vx *= 0.97;
        this.vy *= 0.97;

        this.x += this.vx;
        this.y += this.vy;

        if (this.y > H + 10 || this.x < -20 || this.x > W + 20) this.reset();
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.colour;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = this.colour;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur  = 0;
      }
    }

    const particles = Array.from({ length: COUNT }, () => new Particle());

    function drawLines() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const opacity = (1 - d / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = particles[i].colour;
            ctx.globalAlpha = opacity;
            ctx.lineWidth   = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawLines();
      animId = requestAnimationFrame(loop);
    }
    loop();

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize',    onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize',    onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
