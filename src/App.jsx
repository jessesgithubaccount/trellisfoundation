import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Sessions from './pages/Sessions.jsx'
import SessionPost from './pages/SessionPost.jsx'
import ProgrammePage from './pages/ProgrammePage.jsx'
import SignIn from './pages/SignIn.jsx'
import ScrollReveal from './components/ScrollReveal.jsx'

// Whenever the page (the "room") changes, jump back to the top.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// The router is like the signs on the doors of a building:
//   "/"        -> Home room
//   "/about"   -> About room
//   "/sessions"       -> list of session recaps
//   "/sessions/:slug" -> one full recap
//   "/programme/:slug" -> one "Our Programme" page (e.g. Who Is A Mentor?)
//   "/signin"  -> Sign In room (it has its own look, so no header/footer)
export default function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollReveal />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="sessions/:slug" element={<SessionPost />} />
          <Route path="programme/:slug" element={<ProgrammePage />} />
        </Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
