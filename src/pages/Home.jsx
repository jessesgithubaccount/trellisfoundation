import { Link } from 'react-router-dom'
import MentorCard from '../components/MentorCard.jsx'
import ContactForm from '../components/ContactForm.jsx'
import Img from '../components/Img.jsx'

const MENTOR_CARDS = [
  {
    title: 'Who Is A Mentor?',
    to: '/programme/who-is-a-mentor',
    text: 'A mentor is an experienced person who has walked the path before you. They listen, share what they have learned and help you see the options open to you.',
  },
  {
    title: 'What Is Mentorship?',
    to: '/programme/what-is-mentorship',
    text: 'Mentorship is a supportive relationship where a mentor and mentee meet regularly to talk through goals, share experience and agree on practical next steps.',
  },
  {
    title: 'Why Mentorship Matters',
    to: '/programme/why-mentorship-matters',
    text: 'The right guidance builds confidence, opens doors and helps young people make better choices about their studies, careers and future.',
  },
]

const STATS = [
  { value: '30+', label: 'Mentees', left: 60, top: 0 },
  { value: '1', label: 'Mentor', left: 0, top: 110 },
  { value: '10+', label: 'Meetups', left: 200, top: 120 },
  { value: '10+', label: 'Sessions', left: 80, top: 200 },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="txt">
            <span className="tag">Trellis Foundation</span>
            <h1>Growth Mentorship Programme</h1>
            <p>Through its Growth Mentorship programme, Trellis Foundation connects young people with mentors who support them in exploring their interests, building their networks and growing in their careers. Mentors and mentees meet to get to know each other, discuss their goals and take meaningful steps towards their growth.</p>
            <div className="btns">
              <Link className="btn" to="/about">Learn More</Link>
            </div>
          </div>
          <div className="pic">
            <div>
              <Img className="ph" name="hero" src="/assets/hero-group.webp" style={{ objectPosition: '50% 55%' }} alt="Tony and a group of mentees smiling together in a group selfie" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap center">
          <span className="tag">Our Mission</span>
          <h2>Grow With Guidance.</h2>
          <p style={{ fontSize: 12 }}>Many young people have the talent and ambition to succeed but lack a mentor. Our Growth Mentorship Programme offers guidance and helps young people take confident next steps.</p>
          <div className="cards3">
            {MENTOR_CARDS.map((card) => (
              <MentorCard key={card.title} title={card.title} text={card.text} to={card.to} />
            ))}
          </div>
        </div>
      </section>

      <section className="metrics">
        <div className="wrap">
          <div className="blobs">
            {STATS.map((s) => (
              <div className="blob" key={s.label} style={{ '--l': s.left + 'px', '--t': s.top + 'px' }}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div>
            <span className="tag">Our Progress</span>
            <h2>Real Growth, Real Impact.</h2>
            <p>We track how the programme is growing so we can see what works. From mentor matches to meetups, every number represents a young person getting closer to their goals.</p>
            <p>Feedback from mentors and mentees helps us keep improving the experience for everyone.</p>
            <div className="btns"><Link className="btn" to="/about">Learn More</Link></div>
          </div>
        </div>
      </section>

      <section className="act">
        <Img className="ph im" name="act-bg" src="/assets/act-bg.webp" alt="" />
        <div className="wrap">
          <div>
            <span className="tag">Join Our Community.</span>
            <h2>Grow With A Mentor.</h2>
          </div>
          <div>
            <p>Whether you are starting out or ready to give back, there is a place for you in our mentorship community. Take the first step today.</p>
          </div>
        </div>
      </section>

      <section className="msg">
        <div className="wrap">
          <div className="msg-card">
            <div className="msg-info">
              <span className="tag">Contact Us</span>
              <h2>Send Us A Message.</h2>
              <p>Have a question about the programme, becoming a mentor or joining as a mentee? Send us a message and we will get back to you.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}