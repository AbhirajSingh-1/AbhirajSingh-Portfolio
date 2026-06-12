import { useEffect, useRef } from 'react';

/**
 * FlyingObjects — orbital ring animation
 *
 * Objects (rocket, jet, satellite) orbit along elliptical rings centred
 * on the hero-copy block.  Each ring is a subtle stroked ellipse.
 * A tapered smoke trail is rendered as a fading polyline behind each craft.
 */
export default function FlyingObjects({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    let animId;

    // ── Palette ─────────────────────────────────────────────────────────────
    // Muted accents — visible on both light and dark hero backgrounds
    const RINGS = [
      { body: '#7f77dd', smoke: ['#AFA9EC', '#C9C5F4', '#E4E2FA', 'transparent'] },
      { body: '#1D9E75', smoke: ['#5DCAA5', '#93DCC5', '#C0EEE1', 'transparent'] },
      { body: '#D85A30', smoke: ['#F0997B', '#F7BEA8', '#FAD9CC', 'transparent'] },
    ];

    // ── Craft drawing helpers ─────────────────────────────────────────────
    function drawRocket(ctx, size, color) {
      const s = size;
      ctx.beginPath();
      ctx.moveTo(s * 0.5, 0);
      ctx.bezierCurveTo(s * 0.5, -s * 0.25, s * 0.12, -s * 0.42, 0, -s * 0.5);
      ctx.bezierCurveTo(-s * 0.12, -s * 0.42, -s * 0.5, -s * 0.25, -s * 0.5, 0);
      ctx.lineTo(-s * 0.5, s * 0.3);
      ctx.lineTo(-s * 0.72, s * 0.5);
      ctx.lineTo(-s * 0.5, s * 0.32);
      ctx.lineTo(s * 0.5, s * 0.32);
      ctx.lineTo(s * 0.72, s * 0.5);
      ctx.lineTo(s * 0.5, s * 0.3);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      // porthole
      ctx.beginPath();
      ctx.arc(0, -s * 0.1, s * 0.11, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fill();
    }

    function drawJet(ctx, size, color) {
      const s = size;
      // fuselage
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.11, s * 0.48, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      // swept wings
      ctx.beginPath();
      ctx.moveTo(0, s * 0.08);
      ctx.lineTo(-s * 0.62, s * 0.36);
      ctx.lineTo(-s * 0.52, s * 0.2);
      ctx.lineTo(0, -s * 0.06);
      ctx.lineTo(s * 0.52, s * 0.2);
      ctx.lineTo(s * 0.62, s * 0.36);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      // tail fins
      ctx.beginPath();
      ctx.moveTo(0, s * 0.34);
      ctx.lineTo(-s * 0.26, s * 0.5);
      ctx.lineTo(-s * 0.09, s * 0.36);
      ctx.lineTo(s * 0.09, s * 0.36);
      ctx.lineTo(s * 0.26, s * 0.5);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }

    function drawSatellite(ctx, size, color) {
      const s = size;
      // body
      ctx.beginPath();
      ctx.roundRect(-s * 0.18, -s * 0.24, s * 0.36, s * 0.48, s * 0.05);
      ctx.fillStyle = color;
      ctx.fill();
      // solar panels
      const pw = s * 0.5, ph = s * 0.16;
      ctx.beginPath();
      ctx.rect(-s * 0.18 - pw, -s * 0.07, pw, ph);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.rect(s * 0.18, -s * 0.07, pw, ph);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.stroke();
      // antenna
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.24);
      ctx.lineTo(0, -s * 0.42);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -s * 0.42, s * 0.04, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    const CRAFTS = [drawRocket, drawJet, drawSatellite];

    // ── Smoke segment ─────────────────────────────────────────────────────
    // We store the last N positions of each object and draw a fading
    // tapered polyline — this looks like a real jet contrail.
    const TRAIL_LENGTH = 80; // number of history points

    // ── Orbital object ────────────────────────────────────────────────────
    class Orbiter {
      constructor(ringIndex) {
        this.ring = ringIndex;
        this._reset();
      }

      _reset() {
        // Centre the orbit on roughly the hero-copy block.
        // Hero copy is the left ~52% of the hero section.
        // We offset the ellipse centre slightly down from the top.
        this.cx = W * 0.265;         // horizontal centre of hero copy
        this.cy = H * 0.48;          // vertical centre

        // Each ring has different radii so they nest nicely
        const scale = 0.88 + this.ring * 0.22;
        this.rx = W * 0.20 * scale;  // horizontal semi-axis
        this.ry = H * 0.30 * scale;  // vertical semi-axis

        // Random start angle so they don't bunch up
        this.angle = (this.ring / 3) * Math.PI * 2 + Math.random() * 0.8;

        // Speed — outer rings move a touch slower
        this.speed = (0.0028 - this.ring * 0.0004) * (Math.random() > 0.5 ? 1 : -1);

        const palette = RINGS[this.ring % RINGS.length];
        this.bodyColor = palette.body;
        this.smokeColors = palette.smoke;

        this.drawFn = CRAFTS[this.ring % CRAFTS.length];
        this.size = 13 + this.ring * 2;
        this.alpha = 0.7 - this.ring * 0.08;

        this.history = [];           // circular trail positions
        this.delayFrames = this.ring * 45 + Math.floor(Math.random() * 30);
        this.active = false;
      }

      // Position on the ellipse at current angle
      _pos(angle) {
        return {
          x: this.cx + this.rx * Math.cos(angle),
          y: this.cy + this.ry * Math.sin(angle),
        };
      }

      update() {
        if (!this.active) {
          if (--this.delayFrames <= 0) this.active = true;
          return;
        }

        const { x, y } = this._pos(this.angle);
        this.history.unshift({ x, y });
        if (this.history.length > TRAIL_LENGTH) this.history.pop();

        this.angle += this.speed;
      }

      draw() {
        if (!this.active || this.history.length < 2) return;

        // ── Smoke trail ───────────────────────────────────────────
        // Draw from oldest → newest so newer segments are on top.
        // Taper: oldest = thin & transparent, newest = wider & more opaque.
        for (let i = this.history.length - 1; i >= 1; i--) {
          const t = 1 - i / this.history.length;        // 0 = oldest, 1 = newest
          const alpha = t * t * 0.55;
          const width = t * 3.5;

          // Colour interpolation across the smoke palette
          const paletteIdx = Math.min(
            Math.floor(t * (this.smokeColors.length - 1)),
            this.smokeColors.length - 2
          );
          const smokeColor = this.smokeColors[paletteIdx];

          ctx.beginPath();
          ctx.moveTo(this.history[i].x, this.history[i].y);
          ctx.lineTo(this.history[i - 1].x, this.history[i - 1].y);
          ctx.strokeStyle = smokeColor;
          ctx.lineWidth = width;
          ctx.lineCap = 'round';
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // ── Craft ─────────────────────────────────────────────────
        const { x, y } = this._pos(this.angle);

        // Heading = tangent of the ellipse
        const next = this._pos(this.angle + this.speed);
        const heading = Math.atan2(next.y - y, next.x - x);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(heading + Math.PI / 2); // nose forward
        ctx.globalAlpha = this.alpha;
        this.drawFn(ctx, this.size, this.bodyColor);
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      // Draw the ring path (subtle, dashed)
      drawRing() {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(this.cx, this.cy, this.rx, this.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = this.bodyColor;
        ctx.lineWidth = 0.6;
        ctx.globalAlpha = 0.1;
        ctx.setLineDash([6, 14]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────
    const orbiters = [0, 1, 2].map((i) => new Orbiter(i));

    function loop() {
      ctx.clearRect(0, 0, W, H);

      // Draw rings first (background)
      orbiters.forEach((o) => o.drawRing());

      // Then draw crafts + trails
      orbiters.forEach((o) => {
        o.update();
        o.draw();
      });

      animId = requestAnimationFrame(loop);
    }
    loop();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      // Re-centre orbits on resize
      orbiters.forEach((o) => o._reset());
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
      aria-hidden="true"
    />
  );
}