import { useState } from 'react'
import { CONTACT_EMAIL } from '../data/site.js'

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' }

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [note, setNote] = useState({ text: '', kind: '' })

  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  function onSubmit(e) {
    e.preventDefault()
    const name = values.name.trim()
    const email = values.email.trim()
    const phone = values.phone.trim()
    const subject = values.subject.trim()
    const message = values.message.trim()

    if (!name || !email || !message) {
      setNote({ text: 'Please fill in your name, email and message.', kind: 'err' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNote({ text: 'Please enter a valid email address.', kind: 'err' })
      return
    }
    if (!CONTACT_EMAIL) {
      setNote({ text: 'Sending is not set up yet. Please try again later.', kind: 'err' })
      return
    }
    const body = message + '\n\nFrom: ' + name + '\nEmail: ' + email + (phone ? '\nPhone: ' + phone : '')
    window.location.href =
      'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject || 'Message from the Trellis Foundation website') +
      '&body=' + encodeURIComponent(body)
    setNote({ text: 'Thank you. Your email app should open so you can send your message.', kind: 'ok' })
  }

  return (
    <form className="msg-f" onSubmit={onSubmit} noValidate>
      <div className="fld">
        <label htmlFor="msgName">Your Name</label>
        <input id="msgName" name="name" type="text" placeholder="Your full name" autoComplete="name" required value={values.name} onChange={update} />
      </div>
      <div className="msg-row">
        <div className="fld">
          <label htmlFor="msgEmail">Email</label>
          <input id="msgEmail" name="email" type="email" placeholder="you@example.com" autoComplete="email" required value={values.email} onChange={update} />
        </div>
        <div className="fld">
          <label htmlFor="msgPhone">Phone <small>(optional)</small></label>
          <input id="msgPhone" name="phone" type="tel" placeholder="Your phone number" autoComplete="tel" value={values.phone} onChange={update} />
        </div>
      </div>
      <div className="fld">
        <label htmlFor="msgSubject">Subject</label>
        <input id="msgSubject" name="subject" type="text" placeholder="What is your message about?" value={values.subject} onChange={update} />
      </div>
      <div className="fld">
        <label htmlFor="msgText">Your Message</label>
        <textarea id="msgText" name="message" placeholder="Write your message here" required value={values.message} onChange={update} />
      </div>
      <button type="submit" className="btn">
        Send Message
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
      </button>
      <p className={'msg-note' + (note.kind ? ' ' + note.kind : '')} role="status" aria-live="polite">{note.text}</p>
    </form>
  )
}
