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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

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
