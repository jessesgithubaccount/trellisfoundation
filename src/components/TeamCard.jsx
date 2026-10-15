const SOCIALS = [
  ['facebook', 'f', 'Facebook'],
  ['linkedin', 'in', 'LinkedIn'],
  ['pinterest', 'P', 'Pinterest'],
]

// Optional extras you can add to a team member in About.jsx:
// link, bio, facebook, linkedin, pinterest
export default function TeamCard({ name, role, photo, link, bio, ...rest }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const socials = SOCIALS.filter(([key]) => rest[key])

  return (
    <article className="team-card">
      <div className="team-photo">
        {photo ? <img src={photo} alt={name} loading="lazy" /> : <span aria-hidden="true">{initials}</span>}
      </div>
      <div className="team-tag">
        {link && (
          <a className="team-go" href={link} aria-label={'More about ' + name}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
          </a>
        )}
        <b>{name}</b>
        <small>{role}</small>
        {bio && <p>{bio}</p>}
        {socials.length > 0 && (
          <div className="team-social">
            {socials.map(([key, label, aria]) => (
              <a key={key} href={rest[key]} target="_blank" rel="noopener noreferrer" aria-label={aria}>{label}</a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
