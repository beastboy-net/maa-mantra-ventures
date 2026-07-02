import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import useSEO from '../hooks/useSEO';
import '../pages/Home.css';
import './Portfolio.css';

import productAdVideo from '../assets/portfolio/product-ad-highlight.mp4';
import kudlaCover from '../assets/portfolio/main-gallery/kudla-kapi-habba.jpg';
import birthdayCover from '../assets/portfolio/main-gallery/birthday-backdrop.jpg';
import treatCounterCover from '../assets/portfolio/main-gallery/birthday-treat-counter.jpg';
import independenceCover from '../assets/portfolio/main-gallery/independence-day-activation.jpg';
import tenginaCover from '../assets/portfolio/main-gallery/tengina-habba-fountain.jpg';
import conferenceCover from '../assets/portfolio/main-gallery/conference-stage.jpg';
import mandapCover from '../assets/portfolio/main-gallery/wedding-mandap-corridor.jpg';
import catererCover from '../assets/portfolio/main-gallery/betel-leaf-catering.jpg';
import floralMandapCover from '../assets/portfolio/main-gallery/floral-mandap.jpg';
import tvsCover from '../assets/portfolio/main-gallery/tvs-bike-launch.jpg';
import icecreamCover from '../assets/portfolio/main-gallery/coconut-icecream.jpg';

const categories = ['All', 'Events', 'Ad Films', 'Social Media', 'Product Shoots'];

const projects = [
  { title: 'Product Ad Highlight', tag: 'Ad Films', video: true, src: productAdVideo, isVideo: true },
  { title: 'Kudla Kapi Habba Coffee Corner', tag: 'Events', image: kudlaCover },
  { title: "Shiyana's 5th Birthday Celebration", tag: 'Events', image: birthdayCover },
  { title: 'Birthday Treat Counter', tag: 'Events', image: treatCounterCover },
  { title: 'Independence Day Mall Activation', tag: 'Events', image: independenceCover },
  { title: 'Tengina Habba Coconut Fountain', tag: 'Events', image: tenginaCover },
  { title: 'Conference Stage Setup', tag: 'Events', image: conferenceCover },
  { title: 'Wedding Mandap Floral Corridor', tag: 'Events', image: mandapCover },
  { title: 'Traditional Betel Leaf Catering', tag: 'Events', image: catererCover },
  { title: 'Floral Mandap Decor', tag: 'Events', image: floralMandapCover },
  { title: 'TVS Sai Radha Bike Launch', tag: 'Ad Films', image: tvsCover },
  { title: 'Coconut Icecream Product Shoot', tag: 'Product Shoots', image: icecreamCover },
];

export default function Portfolio() {
  useSEO(
    'Our Portfolio | Maa Mantra Ventures',
    'Explore events, ad films and campaigns crafted by Maa Mantra Ventures — weddings, product launches, cultural festivals and brand activations.'
  );
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
              <Reveal key={p.title} delay={Math.min((i % 4) + 1, 4)} className="reveal-scale">
                <div className="portfolio-grid-item">
                  <div className="portfolio-thumb">
                    {p.isVideo ? (
                      <video
                        src={p.src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                      />
                    ) : p.image ? (
                      <img src={p.image} alt={p.title} loading="lazy" />
                    ) : null}
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
