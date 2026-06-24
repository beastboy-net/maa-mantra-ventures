import { Link } from 'react-router-dom';
import { useState } from 'react';
import Reveal from '../components/Reveal';
import MMVHeroCanvas from '../components/MMVHeroCanvas';
import './Home.css';

const services = [
  { icon: 'calendar', title: 'Event Management', desc: 'Corporate Events, Weddings, Birthday Parties, Cultural Programs & Private Events.', path: '/services/event-management' },
  { icon: 'stage', title: 'Stage & Show Management', desc: 'Live Shows, Celebrity Events, Award Functions, Launch Events.', path: '/services/event-management' },
  { icon: 'camera', title: 'Photography & Videography', desc: 'Event Coverage, Commercial Shoots, Reels & Promotional Videos.', path: '/services/ad-films' },
  { icon: 'megaphone', title: 'Advertising Solutions', desc: 'Digital Marketing, Banner Design, Hoardings, Print Ads & Promotional Materials.', path: '/services/social-media-marketing' },
  { icon: 'brand', title: 'Brand Promotions', desc: 'Product Launches, Promotional Campaigns, Offline & Online Marketing.', path: '/services/social-media-marketing' },
];

const portfolio = [
  { title: 'Kudla Kapi Habba', tag: 'Cultural Event', video: false },
  { title: 'Cashew Festival', tag: 'Community Event', video: false },
  { title: 'TVS Sai Radha Launch', tag: 'Product Launch', video: true },
  { title: 'Hero MotoCorp Activation', tag: 'Brand Activation', video: false },
  { title: 'Corporate Award Night', tag: 'Corporate Event', video: true },
];

const testimonials = [
  { quote: 'Maa Mantra Ventures turned our dream wedding into a beautiful reality. Every detail was perfect.', name: 'Priya Sharma', role: 'Bride' },
  { quote: 'Their event management for our product launch was top-notch. Professional, creative and highly reliable.', name: 'Ankit Verma', role: 'Marketing Head, TVS' },
  { quote: 'The Kudla Kapi Habba was a massive success. MMV handled every detail flawlessly.', name: 'Rohit Mehta', role: 'Event Organizer' },
  { quote: 'Stunning photography and cinematic videos. They truly understand the power of visual storytelling.', name: 'Neha Kapoor', role: 'Brand Manager' },
];

const logos = ['KIA', 'TVS', 'Hero MotoCorp', "McDonald's", 'Sun Network', 'BSTRA'];

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
          <Reveal><span className="eyebrow">Maa Mantra Ventures — Mangalore</span></Reveal>
          <Reveal delay={1}>
            <h1 className="hero-title">
              Creating <span className="accent">Experiences</span>,<br />
              Building <span className="accent">Brands</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="hero-sub">
              Mangalore's leading event management & brand promotions company.
              From grand stages to viral campaigns — we make every moment unforgettable.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                Start Your Project
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link to="/portfolio" className="btn btn-outline">
                View Our Work
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </Reveal>

          <div className="hero-visual">
            <MMVHeroCanvas />
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero-stats">
          <div className="container">
            <div className="hero-stats-inner">
              {[
                { num: '15+', label: 'Years in Digital Marketing' },
                { num: '2+', label: 'Years in Event Marketing' },
                { num: '500+', label: 'Projects Delivered' },
                { num: '100+', label: 'Happy Clients' },
              ].map((s) => (
                <div key={s.label} className="hero-stat">
                  <span className="hero-stat-num">{s.num}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
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
          <Reveal><span className="eyebrow">What We Do</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">
              Solutions That <span className="accent">Inspire</span>,<br />
              Experiences That <span className="accent">Last</span>.
            </h2>
          </Reveal>
          <div className="services-grid services-grid--5">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i + 1, 4)}>
                <Link to={s.path} className="service-card">
                  <div className="service-card__glow" />
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
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="section-head-row">
            <div>
              <Reveal><span className="eyebrow">Featured Work</span></Reveal>
              <Reveal delay={1}><h2 className="section-title">Moments We&rsquo;re <span className="accent">Proud</span> Of</h2></Reveal>
            </div>
            <Reveal delay={2}>
              <Link to="/portfolio" className="btn btn-outline">
                View All Projects
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </Reveal>
          </div>
          <div className="portfolio-carousel">
            <button className="carousel-arrow" onClick={() => setSlide(s => Math.max(0, s - 1))} disabled={slide === 0} aria-label="Previous">
              <svg viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="portfolio-track-wrap">
              <div className="portfolio-track" style={{ transform: `translateX(-${slide * (100 / visibleCount)}%)` }}>
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
            <button className="carousel-arrow" onClick={() => setSlide(s => Math.min(maxSlide, s + 1))} disabled={slide === maxSlide} aria-label="Next">
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
            <h2 className="section-title">Trusted by Brands,<br /><span className="accent">Loved</span> by Clients.</h2>
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
                    <div><strong>{t.name}</strong><span>{t.role}</span></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={2}>
            <div className="logo-strip">
              {logos.map(l => <span key={l}>{l}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-inner">
          <Reveal><span className="eyebrow">Ready to Create Something Amazing?</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Let&rsquo;s Bring Your <span className="accent">Vision</span> to Life</h2>
          </Reveal>
          <Reveal delay={2}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary">
                Start Your Project
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <a href="tel:+918660737223" className="btn btn-outline">
                Call Us Now
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ServiceIcon({ name }) {
  const icons = {
    calendar: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9.5h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    stage: <svg viewBox="0 0 24 24" fill="none"><path d="M2 18h20M5 18V10l7-6 7 6v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M9 18v-5h6v5" stroke="currentColor" strokeWidth="1.5" /></svg>,
    camera: <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5" /><path d="M9 7l1.5-3h3L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    megaphone: <svg viewBox="0 0 24 24" fill="none"><path d="M3 10v4h3l6 4V6L6 10H3z" stroke="currentColor" strokeWidth="1.5" /><path d="M14 9a4 4 0 010 6M17 6a8 8 0 010 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    brand: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
  };
  return icons[name] || icons.calendar;
}
