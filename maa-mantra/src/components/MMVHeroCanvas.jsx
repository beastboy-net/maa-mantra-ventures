import { useRef } from 'react';
import './MMVHeroCanvas.css';

export default function MMVHeroCanvas() {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateY = ((x - cx) / cx) * 7;
    const rotateX = -((y - cy) / cy) * 7;

    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.015)`;
    card.classList.add('mmv-card--active');

    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
    glow.style.opacity = '1';
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    card.classList.remove('mmv-card--active');
    glow.style.opacity = '0';
  }

  function handleTouchStart(e) {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

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
        ref={cardRef}
        className="mmv-card-inner"
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

        <svg className="mmv-mark" viewBox="0 0 100 80">
          <path d="M10 8 L10 60 Q10 68 18 68 L34 68 L34 60 L20 60 L20 24 L50 50 L80 24 L80 60 L66 60 L66 68 L82 68 Q90 68 90 60 L90 8 L50 40 Z" />
          <polygon className="mmv-diamond" points="50,18 58,28 50,38 42,28" />
        </svg>

        <div className="mmv-canvas-text">
          <span className="mmv-canvas-initials">MMV</span>
          <div className="mmv-line-accent" />
          <span className="mmv-canvas-name">Maa Mantra Ventures</span>
        </div>

        <div className="mmv-canvas-stage" />
      </div>
    </div>
  );
}
