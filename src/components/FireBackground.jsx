import React, { useRef, useEffect } from "react";

/**
 * FireBackground — drop-in ember/fire particle background.
 * Renders ONLY a <canvas> sized to its parent. Put it as the
 * first child inside a position:relative wrapper; everything
 * else in that wrapper stacks above it automatically via z-index.
 */
export default function FireBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, raf;
    let particles = [];

    const COUNT = 260;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(initial) {
      const originX = w * 0.06 + Math.random() * w * 0.14;
      const originY = h * 1.05 + Math.random() * 40;
      return {
        x: initial ? originX + (Math.random() - 0.5) * w * 0.5 : originX,
        y: initial ? Math.random() * h * 1.3 - h * 0.15 : originY,
        r: Math.random() * 2.1 + 0.6,
        r0: 0,
        vy: Math.random() * 1.3 + 0.9,
        vyDecay: Math.random() * 0.005 + 0.0022,
        vx: Math.random() * 0.55 + 0.18,
        wobbleAmp: Math.random() * 0.7 + 0.25,
        wobbleSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: Math.random() * 620 + 480,
        hue: Math.random() > 0.5 ? "255,70,15" : "255,100,28",
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, () => spawn(true));
      particles.forEach((p) => (p.r0 = p.r));
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#040302";
      ctx.fillRect(0, 0, w, h);
      const glow = ctx.createRadialGradient(w * 0.82, h * 0.08, 0, w * 0.7, h * 0.25, w * 0.85);
      glow.addColorStop(0, "rgba(170,22,10,0.6)");
      glow.addColorStop(0.4, "rgba(110,14,8,0.32)");
      glow.addColorStop(0.75, "rgba(60,8,6,0.14)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      const glow2 = ctx.createRadialGradient(w * 0.35, h * 0.6, 0, w * 0.35, h * 0.6, w * 0.5);
      glow2.addColorStop(0, "rgba(90,12,6,0.12)");
      glow2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.life++;
        p.phase += p.wobbleSpeed;
        p.vy = Math.max(0.15, p.vy - p.vyDecay);
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.phase) * p.wobbleAmp * 0.05;

        const lifeRatio = p.life / p.maxLife;
        const fade = lifeRatio < 0.08 ? lifeRatio / 0.08 : 1 - Math.pow(Math.max(0, (lifeRatio - 0.08) / 0.92), 1.4);
        const alpha = Math.max(0, Math.min(1, fade)) * 1.0;
        const size = p.r0 * (1 - lifeRatio * 0.4);

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 6);
        g.addColorStop(0, `rgba(${p.hue},${alpha * 0.5})`);
        g.addColorStop(1, `rgba(${p.hue},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,190,140,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -30 || p.x > w + 20) {
          const fresh = spawn(false);
          Object.assign(p, fresh);
          p.r0 = p.r;
        }
      }

      raf = requestAnimationFrame(tick);
    }

    init();
    tick();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
