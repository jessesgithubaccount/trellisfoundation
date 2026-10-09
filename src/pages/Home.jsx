import { Link } from 'react-router-dom'
import MentorCard from '../components/MentorCard.jsx'
import VideoThumb from '../components/VideoThumb.jsx'
import Img from '../components/Img.jsx'
import { useChat } from '../context/ChatContext.jsx'

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
  { value: '60', label: 'Mentees', left: 60, top: 0 },
  { value: '24', label: 'Mentors', left: 0, top: 110 },
  { value: '10+', label: 'Meetups', left: 200, top: 120 },
  { value: '120', label: 'Sessions', left: 80, top: 200 },
]

export default function Home() {
  const { openChat } = useChat()

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
              <a
                className="donate"
                href="/signin"
                onClick={(e) => {
                  e.preventDefault()
                  openChat()
                }}
              >
                Sign In
              </a>
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
          <p style={{ fontSize: 12 }}>Many young people have the talent and ambition to succeed but lack someone who has walked the path before them. Our Growth Mentorship Programme pairs mentees with experienced mentors who offer guidance, open doors and help them take confident next steps.</p>
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

      <section>
        <div className="wrap">
          <div className="center">
            <span className="tag">Testimonials</span>
            <h2>Hear From Our Mentors And Mentees.</h2>
            <p style={{ fontSize: 12 }}>Read how the programme has helped young people explore their interests, build connections and take meaningful steps in their careers.</p>
          </div>
          <div className="tm">
            <VideoThumb name="testimonial" src="/assets/testimonial.webp" />
            <div>
              <div className="who">
                <Img className="who-photo" name="tony" src="/assets/tony.webp" alt="Tony Muiyuro" />
                <div><b>Tony Muiyuro</b><small>Mentor</small></div>
              </div>
              <blockquote>Meeting my mentee each month has been rewarding. Seeing them set goals and reach them makes every conversation worthwhile.</blockquote>
              <div className="dots"><i></i><i></i><i></i></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}