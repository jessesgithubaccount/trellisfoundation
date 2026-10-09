import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useChat } from '../context/ChatContext.jsx'

const EYE = (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
)
const EYE_OFF = (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /><path d="M4 4l16 16" /></svg>
)

const COPY = {
  in: {
    title: 'Welcome Back to Trellis',
    sub: 'Sign in to join the community chat and read the conversation from the very first message.',
    button: 'Sign In',
  },
  up: {
    title: 'Join Trellis',
    sub: 'Create your member account. You will need the mentor code you were given.',
    button: 'Create Account',
  },
  reset: {
    title: 'Reset Your Password',
    sub: 'Enter your email, a new password and your mentor code to reset your password.',
    button: 'Reset Password',
  },
}

export default function SignIn() {
  const { user, signIn, signUp, resetPassword } = useAuth()
  const { setIsOpen } = useChat()
  const navigate = useNavigate()
  const location = useLocation()

  const cameFrom = location.state?.from
  const backTo = cameFrom && cameFrom !== '/signin' ? cameFrom : '/'

  const [mode, setMode] = useState('in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState(null) // { text, ok }

  if (user) return <Navigate to={backTo} replace />

  const isUp = mode === 'up'
  const isReset = mode === 'reset'
  const copy = COPY[mode]

  function switchMode(next) {
    setMode(next)
    setMessage(null)
  }

  async function handleSubmit(e) {
    e.preventDefault() // stop the browser from reloading the page
    setMessage(null)

    let result
    if (isReset) result = await resetPassword({ email, password, code })
    else if (isUp) result = await signUp({ name, email, password, code })
    else result = await signIn({ email, password, remember })

    if (!result.ok) {
      setMessage({ text: result.error, ok: false })
      return
    }

    setPassword('')
    setCode('')

    if (isReset) {
      setMode('in')
      setMessage({ text: 'Password updated. You can now sign in.', ok: true })
      return
    }

    setIsOpen(true)
    navigate(backTo)
  }

  return (
    <section className="signin">
      <Link className="si-back" to="/">&larr; Back to site</Link>
      <div className="si-card">
        <div className="si-logo">
          <Link className="logo" to="/" aria-label="Trellis Foundation home">
            <img src="/assets/logo.webp" alt="Trellis" />
          </Link>
        </div>
        <h1>{copy.title}</h1>
        <p className="si-sub">{copy.sub}</p>

        <form className="si-f" onSubmit={handleSubmit} noValidate>
          {isUp && (
            <div>
              <label htmlFor="tcName">Full name<i>*</i></label>
              <input id="tcName" type="text" maxLength={30} placeholder="Type your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          )}

          <label htmlFor="tcEmail">Email<i>*</i></label>
          <input id="tcEmail" type="email" placeholder="Type your email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="tcPass">{isReset ? 'New password' : 'Password'}<i>*</i></label>
          <div className="si-pw">
            <input
              id="tcPass"
              type={showPassword ? 'text' : 'password'}
              placeholder="Type your password"
              autoComplete={isUp || isReset ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="si-eye" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? EYE : EYE_OFF}
            </button>
          </div>

          {(isUp || isReset) && (
            <div className="si-code">
              <label htmlFor="tcCode">Mentor code<i>*</i></label>
              <input id="tcCode" type="text" placeholder="Enter your mentor code" autoComplete="off" autoCapitalize="characters" value={code} onChange={(e) => setCode(e.target.value)} />
              <div className="si-hint">You cannot create an account without a valid mentor code. Ask your programme coordinator for yours.</div>
            </div>
          )}

          {mode === 'in' && (
            <div className="si-row">
              <label>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
              </label>
              <button type="button" className="si-forgot" onClick={() => switchMode('reset')}>Forgot Password?</button>
            </div>
          )}

          <div className="tc-err si-err" role="alert" style={message?.ok ? { color: '#0c8c5a' } : undefined}>
            {message?.text}
          </div>
          <button className="si-btn" type="submit">{copy.button}</button>
        </form>

        <div className="si-sw">
          {mode === 'in' ? (
            <>Don't have an account? <button type="button" className="si-link" onClick={() => switchMode('up')}>Sign Up</button></>
          ) : (
            <>
              {isReset ? 'Remembered it? ' : 'Already have an account? '}
              <button type="button" className="si-link" onClick={() => switchMode('in')}>Sign In</button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
