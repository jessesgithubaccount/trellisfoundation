import { Link, Navigate, useParams } from 'react-router-dom'
import Img from '../components/Img.jsx'
import SessionBlocks from '../components/SessionBlocks.jsx'
import { findProgramme } from '../data/programme.js'

export default function ProgrammePage() {
  const { slug } = useParams()
  const page = findProgramme(slug)
  if (!page) return <Navigate to="/" replace />

  return (
    <article className="ss-post">
      <div className="wrap">
        <Link to="/" className="ss-back">
          ← Back to home
        </Link>
        <div className="ss-meta">Our Programme</div>
        <h1>{page.title}</h1>
        <p className="ss-lead">{page.summary}</p>
        {page.image && (
          <div className="ss-cover">
            <Img name={page.slug} src={page.image} style={{ objectPosition: page.imagePosition }} alt="" />
          </div>
        )}
        <div className="ss-text">
          {page.sections.map((sec) => (
            <div key={sec.h}>
              <h2>{sec.h}</h2>
              <SessionBlocks blocks={sec.blocks} />
            </div>
          ))}
        </div>
        <Link to="/" className="ss-back">
          ← Back to home
        </Link>
      </div>
    </article>
  )
}
