function Item({ item }) {
  if (typeof item === 'string') return <li>{item}</li>
  return (
    <li>
      <strong>{item.t}</strong>
      {item.d && <span className="ss-desc">{item.d}</span>}
      {item.sub && (
        <ul>
          {item.sub.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

function Block({ block }) {
  if (block.h) return <h3>{block.h}</h3>
  if (block.p) return <p>{block.p}</p>
  if (block.quote) return <blockquote className="ss-quote">{block.quote}</blockquote>
  if (block.key) return <div className="ss-key">{block.key}</div>
  if (block.ol)
    return (
      <ol className="ss-list-items">
        {block.ol.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </ol>
    )
  if (block.ul)
    return (
      <ul className="ss-list-items">
        {block.ul.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </ul>
    )
  return null
}

export default function SessionBlocks({ blocks }) {
  return (
    <>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </>
  )
}
