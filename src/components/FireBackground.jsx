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

    const COUNT = 600;

    // pre-render glow sprites once — avoids creating 1200+ gradient objects every frame
    function makeSprite(hue) {
      const s = document.createElement("canvas");
      s.width = 64; s.height = 64;
      const sctx = s.getContext("2d");
      const g = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, `rgba(${hue},0.9)`);
      g.addColorStop(0.15, `rgba(255,190,140,0.8)`);
      g.addColorStop(0.35, `rgba(${hue},0.5)`);
      g.addColorStop(1, `rgba(${hue},0)`);
      sctx.fillStyle = g;
      sctx.fillRect(0, 0, 64, 64);
      return s;
    }
    const sprites = [makeSprite("255,70,15"), makeSprite("255,100,28")];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth || canvas.parentElement?.clientWidth || 1;
      h = canvas.clientHeight || canvas.parentElement?.clientHeight || 1;
      if (w < 2 || h < 2) { w = Math.max(w, 2); h = Math.max(h, 2); }
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(initial, staggeredLife) {
      const originX = w * 0.06 + Math.random() * w * 0.14;
      const originY = h * 1.05 + Math.random() * 40;
      const maxLife = Math.random() * 420 + 340;
      return {
        x: initial ? originX + (Math.random() - 0.5) * w * 0.5 : originX,
        y: initial ? Math.random() * h * 1.3 - h * 0.15 : originY,
        r: Math.random() * 2.8 + 0.9,
        r0: 0,
        vy: Math.random() * 1.3 + 0.9,
        vyDecay: Math.random() * 0.005 + 0.0022,
        vx: Math.random() * 0.95 + 0.4,
        wobbleAmp: Math.random() * 0.7 + 0.25,
        wobbleSpeed: Math.random() * 0.03 + 0.015,
        phase: Math.random() * Math.PI * 2,
        life: staggeredLife != null ? staggeredLife : 0,
        maxLife,
        spriteIdx: Math.random() > 0.5 ? 0 : 1,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, () => {
        const p = spawn(true);
        p.life = Math.random() * p.maxLife; // stagger lifecycle phase — no mount-sync, no periodic gaps
        return p;
      });
      particles.forEach((p) => (p.r0 = p.r));
    }

    function tick() {
      try {
        ctx.clearRect(0, 0, w, h);

        ctx.fillStyle = "#040302";
        ctx.fillRect(0, 0, w, h);
        const glow = ctx.createRadialGradient(w * 0.82, h * 0.08, 0, w * 0.7, h * 0.25, Math.max(1, w * 0.85));
        glow.addColorStop(0, "rgba(170,22,10,0.6)");
        glow.addColorStop(0.4, "rgba(110,14,8,0.32)");
        glow.addColorStop(0.75, "rgba(60,8,6,0.14)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);

        const glow2 = ctx.createRadialGradient(w * 0.35, h * 0.6, 0, w * 0.35, h * 0.6, Math.max(1, w * 0.5));
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
          const fade = lifeRatio < 0.08 ? lifeRatio / 0.08 : 1 - Math.pow(Math.max(0, (lifeRatio - 0.08) / 0.92), 1.0);
          const alpha = Math.max(0, Math.min(1, fade)) * 1.0;
          const size = Math.max(0.3, p.r0 * (1 - lifeRatio * 0.4));
          const spriteSize = size * 9;

          ctx.globalAlpha = alpha;
          ctx.drawImage(sprites[p.spriteIdx], p.x - spriteSize / 2, p.y - spriteSize / 2, spriteSize, spriteSize);
          ctx.globalAlpha = 1;

          if (p.life >= p.maxLife || p.y < -30 || p.x > w + 60) {
            const fresh = spawn(false);
            Object.assign(p, fresh);
            p.r0 = p.r;
          }
        }
        heartbeat = Date.now();
      } catch (err) {
        // a bad frame (e.g. transient 0-size container) must never kill the loop
      }

      raf = requestAnimationFrame(tick);
    }

    let heartbeat = Date.now();
    let watchdog = setInterval(() => {
      // if no frame has run in 2.5s, the rAF chain died silently — force-restart it
      if (Date.now() - heartbeat > 2500) {
        cancelAnimationFrame(raf);
        heartbeat = Date.now();
        tick();
      }
    }, 2000);

    init();
    tick();
    window.addEventListener("resize", init);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        heartbeat = Date.now();
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(watchdog);
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
