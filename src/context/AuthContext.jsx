import { createContext, useContext, useState } from 'react'
import {
  ChatStore,
  getSession,
  saveSession,
  clearSession,
  hashPassword,
  isValidMentorCode,
} from '../lib/chatStore.js'

// A "context" is like a notice board in the lobby. Anyone in the building
// can walk up and read it, so we don't have to hand the info from person
// to person. This one holds: who is signed in, and the sign-in actions.
const AuthContext = createContext(null)

const fail = (error) => ({ ok: false, error })

function checkEmailAndPassword(email, password) {
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Enter a valid email address.'
  if (password.length < 6) return 'Password must be at least 6 characters.'
  return null
}

export function AuthProvider({ children }) {
  // State: the app's memory. Starts as whoever was already signed in (or null).
  const [user, setUser] = useState(getSession)

  function startSession(newUser, remember) {
    saveSession(newUser, remember)
    setUser(newUser)
  }

  async function signIn({ email, password, remember }) {
    email = email.trim().toLowerCase()
    const problem = checkEmailAndPassword(email, password)
    if (problem) return fail(problem)

    const users = await ChatStore.getUsers()
    const found = users[email]
    const hash = await hashPassword(email + password)
    if (!found || found.hash !== hash) return fail('Incorrect email or password.')

    startSession({ email, name: found.name }, remember)
    return { ok: true }
  }

  async function signUp({ name, email, password, code }) {
    name = name.trim()
    email = email.trim().toLowerCase()
    if (!name) return fail('Please enter your name.')
    const problem = checkEmailAndPassword(email, password)
    if (problem) return fail(problem)
    if (!code.trim()) return fail('Please enter your mentor code. You cannot sign up without one.')
    if (!isValidMentorCode(code)) return fail('That mentor code is not valid, so we cannot create your account.')

    const users = await ChatStore.getUsers()
    if (users[email]) return fail('That email is already registered. Please sign in.')

    const hash = await hashPassword(email + password)
    await ChatStore.saveUser(email, { name, hash, joined: Date.now() })
    startSession({ email, name }, true)
    return { ok: true }
  }

  async function resetPassword({ email, password, code }) {
    email = email.trim().toLowerCase()
    const problem = checkEmailAndPassword(email, password)
    if (problem) return fail(problem)
    if (!code.trim()) return fail('Please enter your mentor code to reset your password.')
    if (!isValidMentorCode(code)) return fail('That mentor code is not valid.')

    const users = await ChatStore.getUsers()
    if (!users[email]) return fail('We could not find an account with that email.')

    const hash = await hashPassword(email + password)
    await ChatStore.saveUser(email, { name: users[email].name, hash, joined: users[email].joined })
    return { ok: true }
  }

  function signOut() {
    clearSession()
    setUser(null)
  }

  const value = { user, signIn, signUp, resetPassword, signOut }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// A shortcut so any component can write:  const { user } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}
