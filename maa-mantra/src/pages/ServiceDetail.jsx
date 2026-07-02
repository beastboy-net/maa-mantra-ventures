import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import HeroWavesBg from '../components/HeroWavesBg';
import useSEO from '../hooks/useSEO';
import './Home.css';
import './ServiceDetail.css';

export default function ServiceDetail({ data }) {
  const { eyebrow, title, accent, intro, heroIcon, features, process, gallery, faqs, otherServices } = data;
  useSEO(
    `${title} ${accent} | Maa Mantra Ventures`,
    typeof intro === 'string' ? intro.slice(0, 160) : `${eyebrow} services by Maa Mantra Ventures, Mangalore.`
  );

  return (
    <div className="page-enter">
      <section className="svc-hero">
        <div className="svc-hero-glow" />
        <HeroWavesBg />
        <div className="container svc-hero-inner">
          <Reveal>
            <Link to="/" className="svc-breadcrumb">
              <svg viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back to Home
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <Reveal delay={2}>
            <h1 className="svc-title">
              {title} <span className="accent">{accent}</span>
            </h1>
          </Reveal>
          <Reveal delay={3}>
            <p className="svc-intro">{intro}</p>
          </Reveal>
          <Reveal delay={4}>
            <Link to="/contact" className="btn btn-primary">
              Get a Free Consultation
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </Reveal>
        </div>
        <div className="svc-hero-icon">{heroIcon}</div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What&rsquo;s Included</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Everything You Need, <span className="accent">Handled</span></h2>
          </Reveal>
          <div className="svc-features-grid">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={Math.min(i + 1, 4)} className="reveal-rotate">
                <div className="svc-feature-card">
                  <div className="svc-feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section svc-process-section">
        <div className="container">
          <Reveal><span className="eyebrow">How We Work</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Our <span className="accent">Process</span></h2>
          </Reveal>
          <div className="svc-process-list">
            {process.map((step, i) => (
              <Reveal key={step.title} delay={Math.min(i + 1, 4)}>
                <div className="svc-process-step">
                  <span className="svc-process-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {gallery && (
        <section className="section">
          <div className="container">
            <Reveal><span className="eyebrow">Recent Work</span></Reveal>
            <Reveal delay={1}>
              <h2 className="section-title">See It In <span className="accent">Action</span></h2>
            </Reveal>
            <div className="svc-gallery-grid">
              {gallery.map((g, i) => {
                /* support old format (plain string), image items, and video items */
                const item = typeof g === 'string' ? { title: g, image: null, video: null } : g;
                return (
                  <Reveal key={item.title} delay={Math.min(i + 1, 4)} className="reveal-scale">
                    <div className="svc-gallery-item">
                      {item.video && (
                        <video
                          src={item.video}
                          poster={item.image || undefined}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      )}
                      {!item.video && item.image && <img src={item.image} alt={item.title} loading="lazy" />}
                      <span>{item.title}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">Common Questions</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Frequently Asked</h2>
          </Reveal>
          <div className="svc-faq-list">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={Math.min(i + 1, 4)}>
                <FaqItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section svc-other">
        <div className="container">
          <Reveal><span className="eyebrow">Explore More</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Other <span className="accent">Services</span></h2>
          </Reveal>
          <div className="svc-other-grid">
            {otherServices.map((s, i) => (
              <Reveal key={s.path} delay={Math.min(i + 1, 4)}>
                <Link to={s.path} className="svc-other-card">
                  <h3>{s.title}</h3>
                  <span className="service-arrow">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <Reveal className="reveal-rotate"><h2 className="section-title">Ready to Start Your <span className="accent">{title}</span> Project?</h2></Reveal>
          <Reveal delay={1}>
            <Link to="/contact" className="btn btn-primary">
              Let&rsquo;s Talk
              <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <details className="svc-faq-item">
      <summary>
        {q}
        <svg viewBox="0 0 16 16" fill="none"><path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </summary>
      <p>{a}</p>
    </details>
  );
}
