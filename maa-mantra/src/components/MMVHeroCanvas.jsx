import { useRef, useState } from 'react';
import './MMVHeroCanvas.css';
import mmvLogo from '../assets/mmv_logo.png';

export default function MMVHeroCanvas() {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [backIdx, setBackIdx] = useState(0);
  const lastTapRef = useRef(0);
  const rafRef = useRef(null);
  const pendingRef = useRef(null);

  const BACK_MESSAGES = [
    { l1: 'Crafting Moments,', l2: 'Creating Memories' },
    { l1: 'Turning Visions,', l2: 'Into Celebrations' },
    { l1: 'Every Event,', l2: 'A Story Worth Telling' },
    { l1: 'Precision Planning,', l2: 'Flawless Execution' },
    { l1: 'Bold Ideas,', l2: 'Brilliant Brands' },
    { l1: 'Grand Stages,', l2: 'Greater Impact' },
    { l1: 'Where Strategy,', l2: 'Meets Spectacle' },
    { l1: 'From Concept,', l2: 'To Curtain Call' },
    { l1: 'Loud Campaigns,', l2: 'Lasting Impressions' },
    { l1: 'Your Vision,', l2: 'Our Mission' },
    { l1: 'Passion Driven,', l2: 'Detail Obsessed' },
    { l1: 'Mangalore Roots,', l2: 'Limitless Reach' },
    { l1: 'Big Dreams,', l2: 'Bigger Delivery' },
    { l1: 'Events That,', l2: 'Move People' },
  ];

  function handleCardTap() {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      setFlipped(f => {
        const next = !f;
        if (next) setBackIdx(i => (i + 1) % BACK_MESSAGES.length);
        return next;
      });
      lastTapRef.current = 0;
      resetTilt();
    } else {
      lastTapRef.current = now;
    }
  }

  function resetTilt() {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (card) {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.classList.remove('mmv-card--active');
    }
    if (glow) glow.style.opacity = '0';
  }

  function applyTilt() {
    const card = cardRef.current;
    const glow = glowRef.current;
    const p = pendingRef.current;
    rafRef.current = null;
    if (!card || !glow || !p) return;

    const { x, y, cx, cy } = p;
    const rotateY = ((x - cx) / cx) * 7;
    const rotateX = -((y - cy) / cy) * 7;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
    card.classList.add('mmv-card--active');
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.opacity = '1';
  }

  function handleMouseMove(e) {
    if (flipped) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    pendingRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      cx: rect.width / 2,
      cy: rect.height / 2,
    };
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(applyTilt);
    }
  }

  function handleMouseLeave() {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    resetTilt();
  }

  function handleTouchStart(e) {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow || flipped) return;

    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    card.classList.add('mmv-card--active');
    card.style.transform = 'scale(0.98)';

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.opacity = '1';

    const ripple = document.createElement('div');
    ripple.className = 'mmv-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  }

  function handleTouchEnd() {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    card.style.transform = 'scale(1)';
    card.classList.remove('mmv-card--active');
    setTimeout(() => { glow.style.opacity = '0'; }, 400);
  }

  return (
    <div id="mmv-hero-slot" className="mmv-canvas-wrap">
      <div
        className={`mmv-flip-inner${flipped ? ' mmv-flipped' : ''}`}
        onClick={handleCardTap}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div
          ref={cardRef}
          className="mmv-card-inner mmv-flip-front"
          style={{ pointerEvents: flipped ? 'none' : 'auto' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="mmv-canvas-dots" />
          <div className="mmv-diag mmv-diag--tl" />
          <div className="mmv-diag mmv-diag--br" />
          <div className="mmv-bracket mmv-bracket--tr" />
          <div className="mmv-bracket mmv-bracket--bl" />
          <div ref={glowRef} className="mmv-glow-cursor" />

          <img src={mmvLogo} alt="MMV Logo" className="mmv-mark" style={{ width: '90px', height: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }} />

          <div className="mmv-canvas-text">
            <span className="mmv-canvas-initials">MMV</span>
            <div className="mmv-line-accent" />
            <span className="mmv-canvas-name">Maa Mantra Ventures</span>
          </div>

          <div className="mmv-canvas-stage" />
        </div>

        <div className="mmv-card-inner mmv-flip-back" style={{ pointerEvents: flipped ? 'auto' : 'none' }}>
          <div className="mmv-canvas-dots" />
          <div className="mmv-flip-back-content">
            <span className="mmv-canvas-initials" style={{ fontSize: 'clamp(20px, 2.6vw, 26px)' }}>{BACK_MESSAGES[backIdx].l1}</span>
            <span className="mmv-canvas-initials" style={{ fontSize: 'clamp(20px, 2.6vw, 26px)' }}>{BACK_MESSAGES[backIdx].l2}</span>
            <div className="mmv-line-accent" />
            <span className="mmv-canvas-name">Maa Mantra Ventures — Mangalore</span>
          </div>
        </div>
      </div>
    </div>
  );
}
