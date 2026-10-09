import Img from './Img.jsx'
export default function VideoThumb({ name, src }) {
  return (
    <div className="thumb">
      <Img className="ph" name={name} src={src} alt="" />
      <span className="play">
        <svg viewBox="0 0 68 48" aria-label="YouTube">
          <path d="M66.5 7.7a8.5 8.5 0 0 0-6-6C55.2.3 34 .3 34 .3S12.8.3 7.5 1.7a8.5 8.5 0 0 0-6 6C0 13 0 24 0 24s0 11 1.5 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C68 35 68 24 68 24s0-11-1.5-16.3z" fill="#f00" />
          <path d="M27 34.3 44.7 24 27 13.7z" fill="#fff" />
        </svg>
      </span>
    </div>
  )
}
