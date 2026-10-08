// One team card: photo (or initials if there is no photo yet),
// with the name and role underneath.
export default function TeamCard({ name, role, photo }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="team-card">
      <div className="team-photo">
        {photo ? <img src={photo} alt={name} loading="lazy" /> : <span aria-hidden="true">{initials}</span>}
      </div>
      <div className="team-tag">
        <b>{name}</b>
        <small>{role}</small>
      </div>
    </article>
  )
}
