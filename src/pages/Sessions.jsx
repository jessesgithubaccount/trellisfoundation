import { useState } from 'react'
import SessionCard from '../components/SessionCard.jsx'
import { SESSIONS } from '../data/sessions.js'

const KEY = 'trellis-sessions-view'

// Remember the visitor's choice (storage can be blocked, so never let it break the page).
function getSavedView() {
  try {
    return localStorage.getItem(KEY) === 'grid' ? 'grid' : 'list'
  } catch {
    return 'list'
  }
}

export default function Sessions() {
  const [view, setView] = useState(getSavedView)

  function choose(next) {
    setView(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <section className="ss-intro">
        <div className="wrap">
          <span className="pill">Sessions</span>
          <h2>
            How Our <em>Sessions</em> Went.
          </h2>
          <p>Read what happened at each mentoring session: the conversations, the lessons and the steps mentors and mentees took together.</p>
        </div>
      </section>

      <section className="ss-list">
        <div className="wrap">
          <div className="ss-bar">
            <h4 className="ss-label">Latest Sessions</h4>
            <div className="ss-toggle" role="group" aria-label="Choose how sessions are shown">
              <button type="button" aria-pressed={view === 'list'} onClick={() => choose('list')}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="1" y="2" width="14" height="3" rx="1" />
                  <rect x="1" y="6.5" width="14" height="3" rx="1" />
                  <rect x="1" y="11" width="14" height="3" rx="1" />
                </svg>
                List
              </button>
              <button type="button" aria-pressed={view === 'grid'} onClick={() => choose('grid')}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <rect x="1" y="1" width="6" height="6" rx="1.2" />
                  <rect x="9" y="1" width="6" height="6" rx="1.2" />
                  <rect x="1" y="9" width="6" height="6" rx="1.2" />
                  <rect x="9" y="9" width="6" height="6" rx="1.2" />
                </svg>
                Grid
              </button>
            </div>
          </div>
          <div className={view === 'grid' ? 'ss-grid is-grid' : 'ss-grid'}>
            {SESSIONS.map((s) => (
              <SessionCard key={s.slug} session={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
