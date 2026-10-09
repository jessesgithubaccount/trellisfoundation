import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import NextMeetModal from './NextMeetModal.jsx'

const navClass = ({ isActive }) => (isActive ? 'on' : '')

export default function Header() {
  const [meetOpen, setMeetOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    const onResize = () => window.innerWidth > 860 && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  return (
    <header className={menuOpen ? 'menu-open' : ''}>
      <div className="wrap">
        <Link className="logo" to="/">
          <img src="/assets/logo.webp" alt="Trellis" />
        </Link>
        <nav id="site-nav" className={menuOpen ? 'open' : ''} aria-label="Main">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/about" className={navClass}>About Us</NavLink>
          <NavLink to="/sessions" className={navClass}>Sessions</NavLink>
        </nav>
        <div className="hdr-actions">
          <button type="button" className="meet" onClick={() => setMeetOpen(true)} aria-haspopup="dialog">
            Next Meet
          </button>
          <button
            type="button"
            className="burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
      {meetOpen && <NextMeetModal onClose={() => setMeetOpen(false)} />}
    </header>
  )
}
