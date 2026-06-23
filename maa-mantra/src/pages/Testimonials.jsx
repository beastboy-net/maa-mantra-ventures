import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import './Home.css';

const testimonials = [
  { quote: 'Maa Mantra Ventures turned our dream wedding into a beautiful reality. Every detail was perfect.', name: 'Priya Sharma', role: 'Bride' },
  { quote: 'Their corporate event management is top-notch. Professional, creative and highly reliable.', name: 'Ankit Verma', role: 'Marketing Head, TechNova' },
  { quote: 'The ad campaigns delivered great results! Our sales increased significantly within just weeks.', name: 'Rohit Mehta', role: 'Founder, StyleMart' },
  { quote: 'Stunning photography and cinematic videos. They truly understand the power of visual storytelling.', name: 'Neha Kapoor', role: 'Brand Manager' },
  { quote: 'From planning to execution, the team handled everything with professionalism and warmth.', name: 'Sanjay Iyer', role: 'CEO, Iyer Constructions' },
  { quote: 'Our social media engagement doubled within two months of working with them.', name: 'Divya Reddy', role: 'Founder, Reddy Organics' },
];

export default function Testimonials() {
  return (
    <div className="page-enter">
      <PageHeader
        eyebrow="Client Stories"
        title="Trusted by Brands,"
        accent="Loved by Clients"
        sub="Real feedback from the people and businesses we've had the privilege to work with."
      />

      <section className="section" style={{ paddingTop: 50 }}>
        <div className="container">
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={Math.min((i % 4) + 1, 4)}>
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
        </div>
      </section>
    </div>
  );
}
