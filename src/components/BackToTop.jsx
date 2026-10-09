import { useEffect, useState } from 'react'

export default function BackToTop() {
  // State: "should the button be visible?"
  const [show, setShow] = useState(false)

  useEffect(() => {
    function onScroll() {
      setShow((window.pageYOffset || document.documentElement.scrollTop) > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function goTop() {
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button type="button" className={'to-top' + (show ? ' show' : '')} onClick={goTop} aria-label="Back to top" title="Back to top">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></svg>
    </button>
  )
}
