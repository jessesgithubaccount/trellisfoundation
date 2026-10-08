// All the "saving and loading" lives in this one file.
//
// IMPORTANT: this is a learning/demo setup. Everything is saved inside the
// visitor's own browser (localStorage), so:
//   - two different people can NOT see each other's chat messages
//   - the mentor code below is visible to anyone who opens the site's code
// For a real launch, replace the ChatStore functions with a real backend
// (e.g. Supabase or Firebase). Nothing else in the app needs to change.

export const K = {
  msgs: 'trellis_chat_messages',
  users: 'trellis_chat_users',
  sess: 'trellis_chat_session',
}

export const MENTOR_CODES = ['TRELLIS-MENTOR-2026']

export function isValidMentorCode(code) {
  const wanted = code.trim().toUpperCase()
  return MENTOR_CODES.some((c) => c.toUpperCase() === wanted)
}

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// These are "async" so they behave like a real server call would.
export const ChatStore = {
  getMessages: async () => read(K.msgs, []),
  addMessage: async (message) => {
    const all = read(K.msgs, [])
    all.push(message)
    write(K.msgs, all)
  },
  getUsers: async () => read(K.users, {}),
  saveUser: async (email, user) => {
    const all = read(K.users, {})
    all[email] = user
    write(K.users, all)
  },
}

// --- Who is signed in right now ("session") ---
export function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem(K.sess) || localStorage.getItem(K.sess)) || null
  } catch {
    return null
  }
}

export function saveSession(user, remember) {
  clearSession()
  // "Remember me" keeps you signed in after closing the browser.
  ;(remember ? localStorage : sessionStorage).setItem(K.sess, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(K.sess)
  sessionStorage.removeItem(K.sess)
}

// Turns a password into a scrambled string so we never store the real one.
export async function hashPassword(text) {
  try {
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('trellis:' + text))
    return Array.from(new Uint8Array(bytes))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    let h = 5381
    for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0
    return 'f' + h
  }
}
