import { Link } from 'react-router-dom';
import { useState } from 'react';
import Reveal from '../components/Reveal';
import './Home.css';

const services = [
  {
    icon: 'film',
    title: 'Ad Films',
    desc: 'Cinematic storytelling that captures attention and drives real impact.',
    path: '/services/ad-films',
  },
  {
    icon: 'megaphone',
    title: 'Social Media Marketing',
    desc: 'Creative strategies and content that builds brand presence and engages the right audience.',
    path: '/services/social-media-marketing',
  },
  {
    icon: 'calendar',
    title: 'Event Management',
    desc: 'End-to-end event solutions that create memorable experiences from start to finish.',
    path: '/services/event-management',
  },
];

const portfolio = [
  { title: 'Royal Wedding', tag: 'Event Planning', video: true },
  { title: 'Tech Conference 2025', tag: 'Corporate Event' },
  { title: 'Luxury Perfume Shoot', tag: 'Product Photography' },
  { title: 'Brand Film', tag: 'Promotional Video' },
  { title: 'Meta Ads Campaign', tag: 'Paid Advertising' },
];

const testimonials = [
  {
    quote: 'Maa Mantra Ventures turned our dream wedding into a beautiful reality. Every detail was perfect.',
    name: 'Priya Sharma',
    role: 'Bride',
  },
  {
    quote: 'Their corporate event management is top-notch. Professional, creative and highly reliable.',
    name: 'Ankit Verma',
    role: 'Marketing Head, TechNova',
  },
  {
    quote: 'The ad campaigns delivered great results! Our sales increased significantly within just weeks.',
    name: 'Rohit Mehta',
    role: 'Founder, StyleMart',
  },
  {
    quote: 'Stunning photography and cinematic videos. They truly understand the power of visual storytelling.',
    name: 'Neha Kapoor',
    role: 'Brand Manager',
  },
];

const logos = ['TATA', 'Coca-Cola', 'SAMSUNG', 'amazon', 'Mercedes-Benz', 'ZARA'];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const visibleCount = 4;
  const maxSlide = Math.max(0, portfolio.length - visibleCount);

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="container hero-inner">
          <Reveal>
            <span className="eyebrow">Maa Mantra Ventures</span>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="hero-title">
              Turning Ideas<br />
              into <span className="accent">Impactful</span><br />
              Experiences
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="hero-sub">
              We craft unforgettable events, powerful campaigns, stunning visuals
              and impactful stories that elevate brands and create lasting impressions.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="hero-actions">
              <Link to="/services/event-management" className="btn btn-primary">
                Explore Our Services
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link to="/portfolio" className="btn btn-outline">
                View Portfolio
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </Reveal>

          <div className="hero-visual">
            <div className="hero-frame">
              <div className="hero-lights" />
              <span className="hero-mmv">MMV</span>
              <div className="hero-stage" />
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-mouse"><div className="scroll-dot" /></div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">What We Do</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">
              Solutions That <span className="accent">Inspire</span>,<br />
              Experiences That <span className="accent">Last</span>.
            </h2>
          </Reveal>

          <div className="services-grid">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i + 1, 4)}>
                <Link to={s.path} className="service-card">
                  <div className="service-icon"><ServiceIcon name={s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="service-arrow">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <Reveal><span className="eyebrow">Featured Work</span></Reveal>
              <Reveal delay={1}>
                <h2 className="section-title">Moments We&rsquo;re <span className="accent">Proud</span> Of</h2>
              </Reveal>
            </div>
            <Reveal delay={2}>
              <Link to="/portfolio" className="btn btn-outline">
                View All Projects
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </Reveal>
          </div>

          <div className="portfolio-carousel">
            <button
              className="carousel-arrow left"
              onClick={() => setSlide((s) => Math.max(0, s - 1))}
              disabled={slide === 0}
              aria-label="Previous"
            >
              <svg viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            <div className="portfolio-track-wrap">
              <div
                className="portfolio-track"
                style={{ transform: `translateX(-${slide * (100 / visibleCount)}%)` }}
              >
                {portfolio.map((p) => (
                  <div className="portfolio-item" key={p.title}>
                    <div className="portfolio-thumb">
                      {p.video && (
                        <span className="portfolio-play">
                          <svg viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="#16130a" /></svg>
                        </span>
                      )}
                    </div>
                    <h4>{p.title}</h4>
                    <span>{p.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="carousel-arrow right"
              onClick={() => setSlide((s) => Math.min(maxSlide, s + 1))}
              disabled={slide === maxSlide}
              aria-label="Next"
            >
              <svg viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What Our Clients Say</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">
              Trusted by Brands,<br /><span className="accent">Loved</span> by Clients.
            </h2>
          </Reveal>

          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={Math.min(i + 1, 4)}>
                <div className="testimonial-card">
                  <svg className="quote-mark" viewBox="0 0 32 24" fill="none"><path d="M0 24V12.5C0 5 4.5 0.5 11 0v4.5C7 5.5 5 8 5 12h6v12H0zm16 0V12.5C16 5 20.5 0.5 27 0v4.5c-4 1-6 3.5-6 7h6v12H16z" fill="currentColor" /></svg>
                  <p>{t.quote}</p>
                  <div className="stars">★★★★★</div>
                  <div className="testimonial-person">
                    <div className="avatar" />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2}>
            <div className="logo-strip">
              {logos.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-inner">
          <Reveal>
            <span className="eyebrow">Ready to Create Something Amazing?</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">
              Let&rsquo;s Bring Your <span className="accent">Vision</span> to Life
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <Link to="/contact" className="btn btn-primary">
              Start Your Project
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ServiceIcon({ name }) {
  if (name === 'film') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 7h18v12H3V7z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 7l2-4h3l-2 4M9 7l2-4h3l-2 4M15 7l2-4h3l-2 4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.5 11l4 2.2-4 2.2v-4.4z" fill="currentColor" />
      </svg>
    );
  }
  if (name === 'megaphone') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 10v4h3l6 4V6L6 10H3z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 9a4 4 0 010 6M17 6a8 8 0 010 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="18" r="1.4" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9.5h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 13l1.2 2.4 2.6.4-1.9 1.9.4 2.6-2.3-1.2-2.3 1.2.4-2.6-1.9-1.9 2.6-.4z" fill="currentColor" />
    </svg>
  );
}
