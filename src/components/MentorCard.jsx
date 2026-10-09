import { Link } from 'react-router-dom'

export default function MentorCard({ title, text, to }) {
  return (
    <div className="mcard">
      <div className="ic"></div>
      <h3>{title}</h3>
      <p>{text}</p>
      {to ? (
        <Link className="more" to={to}>Read More →</Link>
      ) : (
        <a className="more" href="#">Read More →</a>
      )}
    </div>
  )
}
