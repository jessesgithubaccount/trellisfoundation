import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Makes each section of a page fade/slide in as the visitor scrolls down.
//
// How it works (think of a security guard watching the bottom of the screen):
//   1. After each page change we list the sections that should animate (see the lists below).
//   2. We hide them (data-reveal="wait").
//   3. An IntersectionObserver tells us when each one scrolls into view.
//   4. We switch it to data-reveal="in", and the CSS animation in styles.css plays once.
//
// Nothing in the page components needs to change.

// Only whole sections are animated (not the little pieces inside them),
// and the footer is left alone.

// Sections that slide up a little while fading in.
const UP = ['main > section', 'main > article']

// Full-width coloured/picture sections just fade (sliding them would show gaps at the edges).
const FADE = ['main > section.hero', 'main > section.act']

export default function ScrollReveal() {
  const { pathname } = useLocation()

  // useLayoutEffect runs before the browser paints, so content never flashes
  // visible and then disappears.
  useLayoutEffect(() => {
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
    const canObserve = 'IntersectionObserver' in window
    if (reduce || !canObserve) return // show everything normally

    // Start fresh: forget what the previous page did.
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.removeAttribute('data-reveal')
      el.removeAttribute('data-rv')
    })

    // Collect targets (a Map so an element matched twice is only added once).
    const targets = new Map()
    const add = (list, kind) =>
      document.querySelectorAll(list.join(',')).forEach((el) => {
        if (!targets.has(el)) targets.set(el, kind)
      })
    add(FADE, 'fade')
    add(UP, 'up')

    // If a target sits inside another target, only animate the outer one.
    const all = [...targets.keys()]
    const items = all.filter((el) => !all.some((other) => other !== el && other.contains(el)))

    items.forEach((el) => {
      el.setAttribute('data-reveal', 'wait')
      el.setAttribute('data-rv', targets.get(el))
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.setAttribute('data-reveal', 'in')
          io.unobserve(e.target)
        })
      },
      // Fire a little before the item reaches the very bottom of the screen.
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    )

    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
