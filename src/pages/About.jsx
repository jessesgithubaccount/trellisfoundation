import Img from '../components/Img.jsx'
import TeamCard from '../components/TeamCard.jsx'

const VIDEO_URL = '#'

const FEATURES = [
  {
    title: 'Connect With Mentors',
    text: 'Meet experienced people who have walked the path before you and can guide your next steps.',
    icon: 'M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM4 20c0-3.3 3.6-5 8-5s8 1.7 8 5',
  },
  {
    title: 'Build Your Network',
    text: 'Meetups and a peer community that help you make connections and open new doors.',
    icon: 'M12 5a2 2 0 1 0 0 .01M5 17a2 2 0 1 0 0 .01M19 17a2 2 0 1 0 0 .01M11 7l-5 8M13 7l5 8M7 17h10',
    dark: true,
  },
  {
    title: 'Grow Your Career',
    text: 'Set goals, explore your interests and take practical steps towards the future you want.',
    icon: 'M4 18l6-6 4 4 6-8M15 8h5v5',
  },
]

const TEAM = [
  { name: 'Tony Muiyuro', role: 'Founder', photo: '/assets/tony.webp' },
  { name: 'Michael', role: 'Team Lead', photo: '/assets/michael.webp' },
]

export default function About() {
  return (
    <>
      <section className="ab-intro">
        <div className="wrap">
          <div className="ab-top">
            <div>
              <span className="pill">About Us</span>
              <h2>
                <em>Growth Mentorship</em> For Young People.
              </h2>
            </div>
            <p>
              Trellis Foundation supports young people the way a trellis supports a growing plant. Many have the talent and ambition to succeed but lack someone who has walked the path before them, so we connect them with mentors who offer guidance and open doors.
            </p>
            <p>
              Mentors and mentees meet to get to know each other, talk through goals and agree on practical steps, while our community of peers keeps everyone encouraged along the way.
            </p>
          </div>

          <div className="ab-feats">
            {FEATURES.map((f) => (
              <div className="ab-feat" key={f.title}>
                <span className={f.dark ? 'ab-ic dark' : 'ab-ic'}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={f.icon} />
                  </svg>
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ab-media">
            <div className="ab-big">
              <Img name="about-main" src="/assets/act-bg.webp" alt="A mentor reaching out a hand to help a mentee up" />
            </div>
            <a className="ab-video" href={VIDEO_URL} target="_blank" rel="noopener noreferrer" aria-label="Watch the video on YouTube">
              <Img name="about-video" src="/assets/hero.webp" style={{ objectPosition: '50% 40%' }} alt="" />
              <span className="ab-play" aria-hidden="true">
                <svg viewBox="0 0 68 48">
                  <path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3S12.8.3 7.5 1.7a8.5 8.5 0 0 0-6 6C0 13 0 24 0 24s0 11 1.5 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C68 35 68 24 68 24s0-11-1.5-16.3z" fill="#f00" />
                  <path d="M27 34.3 44.7 24 27 13.7z" fill="#fff" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="ab-team">
        <div className="wrap center">
          <span className="pill">Our Team</span>
          <h2>
            Meet Our <em>Team</em>
          </h2>
          <p>The people behind Trellis Foundation, working to help young people connect, network and grow.</p>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <TeamCard key={m.name} index={i} {...m} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
