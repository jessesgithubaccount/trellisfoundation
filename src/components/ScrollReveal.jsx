import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const UP = ['main > section', 'main > article']

// Full-width coloured/picture sections just fade (sliding them would show gaps at the edges).
const FADE = ['main > section.hero', 'main > section.act']

export default function ScrollReveal() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches
    const canObserve = 'IntersectionObserver' in window
    if (reduce || !canObserve) return 

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.removeAttribute('data-reveal')
      el.removeAttribute('data-rv')
    })

    const targets = new Map()
    const add = (list, kind) =>
      document.querySelectorAll(list.join(',')).forEach((el) => {
        if (!targets.has(el)) targets.set(el, kind)
      })
    add(FADE, 'fade')
    add(UP, 'up')

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

      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    )

    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
