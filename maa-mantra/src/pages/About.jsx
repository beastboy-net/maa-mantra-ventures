import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import './About.css';

const stats = [
  { num: '8+', label: 'Years of Experience' },
  { num: '250+', label: 'Events Delivered' },
  { num: '120+', label: 'Brand Partners' },
  { num: '40+', label: 'Team Specialists' },
];

const values = [
  { title: 'Creative First', desc: 'Every project starts with an idea worth telling, not a template.' },
  { title: 'Detail Obsessed', desc: 'We sweat the small things so your event or campaign never has to.' },
  { title: 'Results Driven', desc: 'Beautiful work that is also measured against real business outcomes.' },
  { title: 'Always On Time', desc: 'Deadlines and event dates are non-negotiable — we plan around them.' },
];

export default function About() {
  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="About Us"
        title="The Team Behind"
        accent="Your Brand Moments"
        sub="Maa Mantra Ventures is a creative studio crafting events, campaigns and visual stories that help brands connect with the people who matter most."
      />

      <section className="section">
        <div className="container about-grid">
          <Reveal>
            <div className="about-visual" />
          </Reveal>
          <Reveal delay={1}>
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                Built on Ideas, <span className="accent">Proven</span> by Execution
              </h2>
              <p className="about-text">
                What began as a small team of storytellers has grown into a full-service creative
                venture working with brands across weddings, corporate events, film and digital
                marketing. We believe the best experiences are designed with intention — every
                light, frame and post planned around the feeling we want people to walk away with.
              </p>
              <p className="about-text">
                Today, our team blends event producers, filmmakers, designers and marketers under
                one roof, so every project gets both creative ambition and flawless execution.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section about-stats-section">
        <div className="container">
          <div className="about-stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={Math.min(i + 1, 4)}>
                <div className="about-stat">
                  <span className="about-stat-num">{s.num}</span>
                  <span className="about-stat-label">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What Drives Us</span></Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">Our Core <span className="accent">Values</span></h2>
          </Reveal>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={Math.min(i + 1, 4)}>
                <div className="about-value-card">
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
