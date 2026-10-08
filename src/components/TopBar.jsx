import SocialIcons from './SocialIcons.jsx'

export default function TopBar() {
  return (
    <div className="top">
      <div className="wrap">
        <div>
          <span><b>✆</b>Contact: +254 792 475571</span>
        </div>
        <div className="soc">
          <span className="soc-label">Follow Us On:</span>
          <SocialIcons gradientId="ig-top" />
        </div>
      </div>
    </div>
  )
}
