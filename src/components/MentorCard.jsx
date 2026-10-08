import { Link } from 'react-router-dom'

// "props" are the order slip: { title, text, to } come from whoever uses <MentorCard />.
// If "to" is given, "Read More" opens that page. If not, it stays a plain placeholder link.
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
