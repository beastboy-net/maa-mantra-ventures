import { useEffect, useRef, useState } from 'react';
import './IntroSplash.css';

const SESSION_KEY = 'mmv_intro_played';

export default function IntroSplash() {
  const [shouldRender, setShouldRender] = useState(false);
  const [phase, setPhase] = useState('init'); // init -> in -> hold -> moving -> done
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(SESSION_KEY);
    if (alreadyPlayed) {
      setShouldRender(false);
      return;
    }
    setShouldRender(true);
    sessionStorage.setItem(SESSION_KEY, '1');

    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setPhase('in'), 80);
    const t2 = setTimeout(() => setPhase('hold'), 650);
    const t3 = setTimeout(() => animateToSlot(), 1700);
    const t4 = setTimeout(() => setPhase('done'), 2900);
    const t5 = setTimeout(() => {
      document.body.style.overflow = '';
    }, 2950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function animateToSlot() {
    const slot = document.getElementById('mmv-hero-slot');
    const wrap = wrapRef.current;
    if (!slot || !wrap) {
      setPhase('moving');
      return;
    }

    const slotRect = slot.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();

    const scale = slotRect.width / wrapRect.width;
    const currentCenterX = wrapRect.left + wrapRect.width / 2;
    const currentCenterY = wrapRect.top + wrapRect.height / 2;
    const targetCenterX = slotRect.left + slotRect.width / 2;
    const targetCenterY = slotRect.top + slotRect.height / 2;
    const dx = targetCenterX - currentCenterX;
    const dy = targetCenterY - currentCenterY;

    wrap.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    setPhase('moving');
  }

  if (!shouldRender || phase === 'done') return null;

  return (
    <div className={`intro-splash ${phase === 'moving' ? 'intro-splash--fading' : ''}`}>
      <div ref={wrapRef} className="intro-card-wrap">
        <div ref={cardRef} className="intro-card">
          <div className="intro-vlines" />
          <div className="intro-diag intro-diag--tl" />
          <div className="intro-diag intro-diag--br" />
          <div className="intro-bracket intro-bracket--tr" />
          <div className="intro-bracket intro-bracket--bl" />

          <svg
            className={`intro-mark ${phase !== 'init' ? 'intro-mark--in' : ''}`}
            viewBox="0 0 100 80"
          >
            <path d="M10 8 L10 60 Q10 68 18 68 L34 68 L34 60 L20 60 L20 24 L50 50 L80 24 L80 60 L66 60 L66 68 L82 68 Q90 68 90 60 L90 8 L50 40 Z" />
            <polygon className="intro-diamond" points="50,18 58,28 50,38 42,28" />
          </svg>

          <span className={`intro-mmv-text ${phase !== 'init' ? 'intro-mmv-text--in' : ''}`}>
            MMV
          </span>
          <div className={`intro-line ${phase !== 'init' ? 'intro-line--in' : ''}`} />
        </div>
      </div>

      <div className={`intro-tagline ${phase === 'hold' ? 'intro-tagline--in' : ''}`}>
        Maa Mantra Ventures
      </div>
    </div>
  );
}
