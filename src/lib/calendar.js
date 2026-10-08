// Helpers that turn the meeting into "add to calendar" links and files.

const pad = (n) => String(n).padStart(2, '0')

// 2026-11-07T07:00:00Z  ->  20261107T070000Z  (the format calendars expect)
function toCalDate(date) {
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  )
}

function getTimes(meeting) {
  const start = new Date(meeting.start)
  const end = new Date(start.getTime() + meeting.durationMinutes * 60000)
  return { start, end }
}

export function isUpcoming(meeting) {
  return new Date(meeting.start).getTime() > Date.now()
}

export function googleCalendarUrl(meeting) {
  const { start, end } = getTimes(meeting)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: meeting.title,
    details: meeting.description,
    location: meeting.location,
  })
  // Google wants the slash between the two dates left as it is
  return 'https://calendar.google.com/calendar/render?' + params.toString() + '&dates=' + toCalDate(start) + '/' + toCalDate(end)
}

export function outlookCalendarUrl(meeting) {
  const { start, end } = getTimes(meeting)
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: meeting.title,
    startdt: start.toISOString(),
    enddt: end.toISOString(),
    body: meeting.description,
    location: meeting.location,
  })
  return 'https://outlook.live.com/calendar/0/deeplink/compose?' + params.toString()
}

// Calendar files need commas, semicolons and line breaks "escaped".
const esc = (text) => String(text).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

export function buildIcs(meeting) {
  const { start, end } = getTimes(meeting)
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Trellis Foundation//Next Meet//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:' + toCalDate(start) + '-next-meet@trellis-foundation',
    'DTSTAMP:' + toCalDate(new Date()),
    'DTSTART:' + toCalDate(start),
    'DTEND:' + toCalDate(end),
    'SUMMARY:' + esc(meeting.title),
    'DESCRIPTION:' + esc(meeting.description),
    'LOCATION:' + esc(meeting.location),
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    'DESCRIPTION:' + esc(meeting.title),
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

// The .ics file opens in Apple Calendar, Google Calendar (Android), Outlook and most desktop calendars.
export function downloadIcs(meeting) {
  const blob = new Blob([buildIcs(meeting)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'trellis-next-meeting.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function formatMeetingDate(meeting) {
  const start = new Date(meeting.start)
  const end = new Date(start.getTime() + meeting.durationMinutes * 60000)
  const tz = meeting.timeZone
  const day = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: tz }).format(start)
  const time = (d) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(d)
  return { day, time: time(start) + ' – ' + time(end) }
}
