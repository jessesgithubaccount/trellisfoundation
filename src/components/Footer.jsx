import { Link } from 'react-router-dom'
import SocialIcons from './SocialIcons.jsx'

export default function Footer() {
  return (
    <>
      <footer>
        <div className="wrap">
          <div>
            <Link className="logo" to="/"><img src="/assets/logo-footer.webp" alt="Trellis" /></Link>
            <p>Trellis Foundation supports young people as they grow, connecting them with mentors and peers to explore interests, build networks and grow in their careers.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/sessions">Sessions</Link></li>
            </ul>
          </div>
          <div>
            <h4>Our Programme</h4>
            <ul>
              <li><Link to="/programme/who-is-a-mentor">Who Is A Mentor?</Link></li>
              <li><Link to="/programme/what-is-mentorship">What Is Mentorship?</Link></li>
              <li><Link to="/programme/why-mentorship-matters">Why Mentorship Matters</Link></li>
            </ul>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className="soc soc-f">
              <SocialIcons gradientId="ig-footer" />
            </div>
          </div>
        </div>
      </footer>
      <div className="copy">© 2026 TRELLIS FOUNDATION.</div>
    </>
  )
}
