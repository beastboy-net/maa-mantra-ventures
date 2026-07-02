import { Link } from 'react-router-dom';
import { useState } from 'react';
import Reveal from '../components/Reveal';
import MMVHeroCanvas from '../components/MMVHeroCanvas';
import HeroWavesBg from '../components/HeroWavesBg';
import useSEO from '../hooks/useSEO';
import './Home.css';

const services = [
  { icon: 'calendar', title: 'Event Management', desc: 'Corporate Events, Weddings, Birthday Parties, Cultural Programs & Private Events.', path: '/services/event-management' },
  { icon: 'camera', title: 'Photography & Videography', desc: 'Event Coverage, Commercial Shoots, Reels & Promotional Videos.', path: '/services/ad-films' },
  { icon: 'brand', title: 'Brand Promotions', desc: 'Product Launches, Promotional Campaigns, Offline & Online Marketing.', path: '/services/social-media-marketing' },
];

import kudlaCover from '../assets/portfolio/kudla-kapi-habba/kudla-2.jpg';
import tenginaCover from '../assets/portfolio/tengina-habba/t2.jpg';
import tenginaCover2 from '../assets/portfolio/tengina-habba-2.jpg';
import kiaCover from '../assets/portfolio/kia-launch/k1.jpg';
import weddingCover from '../assets/portfolio/wedding-brijesh-rachitha/w2.jpg';
import sangeetCover from '../assets/portfolio/sangeet-prajwal-sweekruthi/s1.jpg';
import cateringCover from '../assets/portfolio/catering-bar/c1.jpg';
import jewelryCover from '../assets/portfolio/product-jewelry/j3.jpg';
import tvsLaunchCover from '../assets/portfolio/tvs-sai-radha-launch.jpg';
import snowmanCover from '../assets/portfolio/snowman-icecreams.jpg';
import skinnishCover from '../assets/portfolio/skinnish-launch.jpg';

const portfolio = [
  { title: 'Kudla Kapi Habba', tag: 'Cultural Event', video: false, image: kudlaCover, info: 'One of Mangalore\'s most celebrated cultural festivals, fully managed by our team.' },
  { title: 'Tengina Habba 2025', tag: 'Cultural Event', video: false, image: tenginaCover2, info: 'A coconut-themed celebration with immersive decor and brand activations.' },
  { title: 'TVS Sai Radha Launch', tag: 'Product Launch', video: false, image: tvsLaunchCover, info: 'Grand reveal event for TVS\'s latest scooter lineup at a premium mall venue.' },
  { title: 'Snow Man Icecreams', tag: 'Product Shoot', video: false, image: snowmanCover, info: 'Styled product photography crafted to make every scoop look irresistible.' },
  { title: 'Skinnish Grand Opening', tag: 'Product Launch', video: false, image: skinnishCover, info: 'Elegant floral-themed stage setup for a skincare brand\'s store launch.' },
  { title: 'Tengina Habba', tag: 'Cultural Event', video: false, image: tenginaCover, info: 'Where coconut meets culture — a festival blending tradition and fun.' },
  { title: 'Kia Connect & Care Launch', tag: 'Product Launch', video: false, image: kiaCover, info: 'High-energy automotive launch with live demos and press coverage.' },
  { title: 'Brijesh & Rachitha Wedding', tag: 'Wedding', video: false, image: weddingCover, info: 'Intimate wedding styled with warm lighting and personal touches.' },
  { title: 'Prajual & Sweekruthi Sangeet', tag: 'Wedding', video: false, image: sangeetCover, info: 'Vibrant sangeet night with custom staging and choreography support.' },
  { title: 'Catering & Bar Setup', tag: 'Catering', video: false, image: cateringCover, info: 'Full-service catering and bar design for a premium private event.' },
  { title: 'Bridal Jewelry Shoot', tag: 'Product Shoot', video: false, image: jewelryCover, info: 'Macro-detail jewelry photography for a bridal collection launch.' },
  { title: 'Corporate Award Night', tag: 'Corporate Event', video: true, info: 'A polished awards gala with stage production and live streaming.' },
];

const REVIEW_LINK = 'https://share.google/970PxJEuElhSyPL8K';

const testimonials = [
  { quote: 'Outstanding Event Management Team! Maa Mantra Ventures did an exceptional job organizing our event. Everything from the décor and coordination to timing and hospitality was handled perfectly.', name: 'Hrithik Poojari', role: 'Google Review', stars: 5 },
  { quote: 'Maa Mantra Ventures is truly a powerhouse of creativity and professionalism. Their ability to blend creativity with precision is remarkable, whether managing events, producing films, or curating social media content.', name: 'Niriksha Poojari', role: 'Google Review · Local Guide', stars: 5 },
  { quote: 'Working with Maa Mantra Ventures was an outstanding experience! Their team transformed our vision into a memorable and professionally executed event, handled flawlessly.', name: 'Sajesh Poojary', role: 'Google Review · Local Guide', stars: 5 },
  { quote: 'Their event management is top-notch! The branding, promotional reels, and overall coordination created so much hype and energy. Absolutely the best event organizers in the coastal region!', name: 'Prajwal Poojary', role: 'Google Review · Local Guide', stars: 5 },
  { quote: 'We had a great experience with this event management team. They were professional, well-organized, and handled everything smoothly. Highly recommended for a stress-free and memorable event!', name: 'Shivani Shivaji Rao', role: 'Google Review', stars: 5 },
  { quote: 'Maa Mantra Ventures is a one-stop solution for all event, vendor, and marketing needs — from social media and performance marketing to influencer campaigns, they handle everything with quality delivery.', name: 'Nidhi', role: 'Google Review · Local Guide', stars: 5 },
];

import logoWestCoastMotors from '../assets/clients/00_west-coast-motors.png';
import logoWestCoastJewels from '../assets/clients/01_west-coast-jewels.png';
import logoSunUserNetwork from '../assets/clients/02_sun-user-network.png';
import logoSaiRadhaTvs from '../assets/clients/03_sai-radha-tvs.png';
import logoCaratlane from '../assets/clients/04_caratlane.png';
import logoYenepoya from '../assets/clients/05_yenepoya.png';
import logoFizaNexus from '../assets/clients/06_fiza-nexus.png';
import logoKtmMangalore from '../assets/clients/07_ktm-mangalore.png';
import logoJayalakshmi from '../assets/clients/08_jayalakshmi.png';
import logoSareePalace from '../assets/clients/09_saree-palace.png';
import logoLaerdal from '../assets/clients/10_laerdal.png';
import logoChemmanurJewellers from '../assets/clients/11_chemmanur-jewellers.png';
import logoGlAcharyaJewellers from '../assets/clients/12_g-l-acharya-jewellers.png';
import logoRohanCorporation from '../assets/clients/13_rohan-corporation.png';
import logoInLandGroup from '../assets/clients/14_in-land-group.png';
import logoCatca from '../assets/clients/15_catca.png';

const logos = [
  { name: 'West Coast Motors', img: logoWestCoastMotors },
  { name: 'West Coast Jewels', img: logoWestCoastJewels },
  { name: 'SUN User Network', img: logoSunUserNetwork },
  { name: 'Sai Radha TVS', img: logoSaiRadhaTvs },
  { name: 'CaratLane', img: logoCaratlane },
  { name: 'Yenepoya', img: logoYenepoya },
  { name: 'Fiza Nexus', img: logoFizaNexus },
  { name: 'KTM Mangalore', img: logoKtmMangalore },
  { name: 'Jayalakshmi', img: logoJayalakshmi },
  { name: 'Saree Palace', img: logoSareePalace },
  { name: 'Laerdal', img: logoLaerdal },
  { name: 'Chemmanur Jewellers', img: logoChemmanurJewellers },
  { name: 'G L Acharya Jewellers', img: logoGlAcharyaJewellers },
  { name: 'Rohan Corporation', img: logoRohanCorporation },
  { name: 'In-Land Group', img: logoInLandGroup },
  { name: 'CATCA', img: logoCatca },
];

export default function Home() {
  useSEO(
    'Maa Mantra Ventures | Events, Ad Films & Social Media Marketing',
    'Mangalore-based event management, ad films and social media marketing agency. Corporate events, weddings, brand promotions and creative campaigns.'
  );
  const [slide, setSlide] = useState(0);
  const visibleCount = 4;
  const maxSlide = Math.max(0, portfolio.length - visibleCount);

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <HeroWavesBg />
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
                {portfolio.map((p, i) => (
                  <div key={p.title} className="portfolio-item portfolio-item--animate" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="portfolio-thumb">
                      {p.image && (
                        <img src={p.image} alt={p.title} className="portfolio-thumb-img" />
                      )}
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
              <Reveal key={t.name} delay={Math.min(i + 1, 4)} className="reveal-blur">
                <a
                  href={REVIEW_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="testimonial-card"
                  style={{ display: 'block', textDecoration: 'none' }}
                  aria-label={`Read ${t.name}'s full review on Google`}
                >
                  <svg className="quote-mark" viewBox="0 0 32 24" fill="none"><path d="M0 24V12.5C0 5 4.5 0.5 11 0v4.5C7 5.5 5 8 5 12h6v12H0zm16 0V12.5C16 5 20.5 0.5 27 0v4.5c-4 1-6 3.5-6 7h6v12H16z" fill="currentColor" /></svg>
                  <p>{t.quote}</p>
                  <div className="stars">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
                  <div className="testimonial-person">
                    <div className="avatar" />
                    <div><strong>{t.name}</strong><span>{t.role}</span></div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal delay={2}>
            <div className="clients-block">
              <span className="eyebrow clients-eyebrow">Our Clients</span>
              <div className="logo-strip">
                <div className="logo-track">
                  {[...logos, ...logos].map((l, i) => (
                    <div className="client-logo" key={l.name + i}>
                      <span className="client-logo-circle">
                        <img src={l.img} alt={l.name} loading="lazy" />
                      </span>
                      <span className="client-logo-name">{l.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container cta-inner">
          <Reveal><span className="eyebrow">Ready to Create Something Amazing?</span></Reveal>
          <Reveal delay={1} className="reveal-rotate">
            <h2 className="section-title">Let&rsquo;s Bring Your <span className="accent">Vision</span> to Life</h2>
          </Reveal>
          <Reveal delay={2}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-primary">
                Start Your Project
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <a href="tel:+918904011860" className="btn btn-outline">
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
