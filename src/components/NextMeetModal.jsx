import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NEXT_MEETING } from '../data/meeting.js'
import { downloadIcs, formatMeetingDate, googleCalendarUrl, isUpcoming, outlookCalendarUrl } from '../lib/calendar.js'

export default function NextMeetModal({ onClose }) {
  const closeRef = useRef(null)
  const upcoming = isUpcoming(NEXT_MEETING)
  const when = upcoming ? formatMeetingDate(NEXT_MEETING) : null

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = oldOverflow
      opener?.focus?.()
    }
  }, [onClose])

  return createPortal(
    <div className="nm-overlay" onClick={onClose}>
      <div className="nm-modal" role="dialog" aria-modal="true" aria-label="Next meeting" onClick={(e) => e.stopPropagation()}>
        <button type="button" ref={closeRef} className="nm-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <span className="nm-eyebrow">
          Next Meet
          {upcoming && NEXT_MEETING.sample && <em>Sample</em>}
        </span>

        {upcoming ? (
          <>
            <div className="nm-when">
              <div className="nm-date">{when.day}</div>
              <div className="nm-time">{when.time}</div>
              <div className="nm-place">{NEXT_MEETING.location}</div>
            </div>

            <p className="nm-hint">Add this meeting to your calendar so you don’t miss it:</p>
            <div className="nm-actions">
              <button type="button" className="nm-btn nm-primary" onClick={() => downloadIcs(NEXT_MEETING)}>
                Add to my phone or computer calendar
              </button>
              <a className="nm-btn" href={googleCalendarUrl(NEXT_MEETING)} target="_blank" rel="noopener noreferrer">
                Google Calendar
              </a>
              <a className="nm-btn" href={outlookCalendarUrl(NEXT_MEETING)} target="_blank" rel="noopener noreferrer">
                Outlook
              </a>
            </div>
            <p className="nm-note">The first button downloads a calendar file. Open it and your phone or computer will offer to save the event (Apple Calendar, Android, Outlook and others).</p>
          </>
        ) : (
          <>
            <h3>Next meeting coming soon</h3>
            <p className="nm-hint">The date of the next meeting will be announced soon. Please check back.</p>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
