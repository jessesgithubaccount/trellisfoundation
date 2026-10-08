import { Link, Navigate, useParams } from 'react-router-dom'
import Img from '../components/Img.jsx'
import SessionBlocks from '../components/SessionBlocks.jsx'
import { findSession } from '../data/sessions.js'

// One full session recap. The web address /sessions/some-slug picks the recap.
export default function SessionPost() {
  const { slug } = useParams()
  const session = findSession(slug)
  if (!session) return <Navigate to="/sessions" replace />

  return (
    <article className="ss-post">
      <div className="wrap">
        <Link to="/sessions" className="ss-back">
          ← All sessions
        </Link>
        <div className="ss-meta">
          Session {session.number}{session.date && ` · ${session.date}`}
          {session.sample && <em>Sample</em>}
        </div>
        <h1>{session.title}</h1>
        <p className="ss-lead">{session.summary}</p>
        <div className="ss-cover">
          <Img name={session.slug} src={session.image} style={{ objectPosition: session.imagePosition }} alt="" />
        </div>
        <div className="ss-text">
          {session.sections.map((sec) => (
            <div key={sec.h}>
              <h2>{sec.h}</h2>
              <SessionBlocks blocks={sec.blocks} />
            </div>
          ))}
        </div>
        <Link to="/sessions" className="ss-back">
          ← Back to all sessions
        </Link>
      </div>
    </article>
  )
}
