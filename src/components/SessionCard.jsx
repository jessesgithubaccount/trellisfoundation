import { Link } from 'react-router-dom'
import Img from './Img.jsx'

export default function SessionCard({ session, featured = false }) {
  const { slug, number, date, title, summary, image, imagePosition, sample } = session
  return (
    <article className={featured ? 'ss-card ss-featured' : 'ss-card'}>
      <Link to={`/sessions/${slug}`} className="ss-img" aria-label={title}>
        <Img name={slug} src={image} style={{ objectPosition: imagePosition }} alt="" />
      </Link>
      <div className="ss-body">
        <div className="ss-meta">
          Session {number}{date && ` · ${date}`}
          {sample && <em>Sample</em>}
        </div>
        <h3>
          <Link to={`/sessions/${slug}`}>{title}</Link>
        </h3>
        <p>{summary}</p>
        <Link to={`/sessions/${slug}`} className="ss-more">
          Read the recap →
        </Link>
      </div>
    </article>
  )
}
