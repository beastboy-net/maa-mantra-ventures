import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import '../pages/Home.css';
import './Portfolio.css';

const categories = ['All', 'Events', 'Ad Films', 'Social Media'];

const projects = [
  { title: 'Royal Wedding', tag: 'Events', video: true },
  { title: 'Tech Conference 2025', tag: 'Events' },
  { title: 'Luxury Perfume Shoot', tag: 'Ad Films' },
  { title: 'Brand Film', tag: 'Ad Films', video: true },
  { title: 'Meta Ads Campaign', tag: 'Social Media' },
  { title: 'Festive Carousel Series', tag: 'Social Media' },
  { title: 'Product Launch Gala', tag: 'Events' },
  { title: 'Startup Brand Story', tag: 'Ad Films', video: true },
  { title: 'Influencer Collab Shoot', tag: 'Social Media' },
];

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter((p) => p.tag === active);

  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="Our Work"
        title="Moments We've"
        accent="Brought to Life"
        sub="A look at the events, films and campaigns we've crafted for brands and clients across India."
      />

      <section className="section" style={{ paddingTop: 50 }}>
        <div className="container">
          <Reveal>
            <div className="portfolio-filters">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`filter-pill ${active === c ? 'active' : ''}`}
                  onClick={() => setActive(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="portfolio-grid">
            {filtered.map((p, i) => (
              <Reveal key={p.title} delay={Math.min((i % 4) + 1, 4)}>
                <div className="portfolio-grid-item">
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
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
