import { useState } from 'react'

// A grey placeholder picture, shown if a real image file is missing.
function placeholder(name) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9d5e6"/><stop offset="1" stop-color="#8fa4c2"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><text x="400" y="310" font-family="sans-serif" font-size="30" fill="#fff" text-anchor="middle">' +
    name +
    '</text></svg>'
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}

// Use <Img> instead of <img>. If the file fails to load, it swaps in the placeholder.
export default function Img({ name, src, alt = '', ...rest }) {
  const [currentSrc, setCurrentSrc] = useState(src)
  return <img {...rest} src={currentSrc} alt={alt} onError={() => setCurrentSrc(placeholder(name))} />
}
