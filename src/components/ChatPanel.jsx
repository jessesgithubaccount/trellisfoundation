import { Fragment, useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { ChatStore, K } from '../lib/chatStore.js'

const EMOJIS = '😀 😂 😍 😊 😎 🥳 😢 😮 👍 👏 🙌 🙏 💪 ❤️ 🔥 ✨ 🎉 🌱 🌟 📚 💡 🤝 👋 😅 🤔 😇 🥰 😉 🙂 🎓 🏆 🌍'.split(' ')

const fmtDay = (t) =>
  new Date(t).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
const fmtTime = (t) => new Date(t).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
const signature = (list) => list.length + ':' + (list.length ? list[list.length - 1].id : '')

export default function ChatPanel({ onClose }) {
  const { user, signOut } = useAuth()

  // State = the things this panel needs to remember.
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [pending, setPending] = useState(null) // an image waiting to be sent
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null) // a big image being viewed

  // Refs = a handle on a real element on the page (or a value that doesn't redraw the screen).
  const msgsRef = useRef(null)
  const inputRef = useRef(null)
  const fileRef = useRef(null)
  const stickToBottom = useRef(true)

  // Effect 1: load messages now, then check again every 4 seconds
  // and whenever another browser tab saves a message.
  useEffect(() => {
    let alive = true
    async function load() {
      const list = await ChatStore.getMessages()
      if (alive) setMessages((prev) => (signature(prev) === signature(list) ? prev : list))
    }
    load()
    const timer = setInterval(load, 4000)
    function onStorage(e) {
      if (e.key === K.msgs) load()
    }
    window.addEventListener('storage', onStorage)
    return () => {
      alive = false
      clearInterval(timer)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  // Effect 2: when new messages arrive, scroll down (if you were already near the bottom).
  const lastId = messages.length ? messages[messages.length - 1].id : ''
  useEffect(() => {
    const el = msgsRef.current
    if (el && stickToBottom.current) el.scrollTop = el.scrollHeight
  }, [messages.length, lastId])

  function onScroll() {
    const el = msgsRef.current
    stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80
  }

  // Effect 3: the Escape key closes the big image first, then the chat.
  useEffect(() => {
    function onKey(e) {
      if (e.key !== 'Escape') return
      if (lightbox) setLightbox(null)
      else onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightbox, onClose])

  async function send() {
    const body = text.trim()
    if (!body && !pending) return
    const message = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      email: user.email,
      name: user.name,
      text: body,
      img: pending,
      ts: Date.now(),
    }
    try {
      await ChatStore.addMessage(message)
    } catch {
      alert('Could not save the message. Storage may be full — try a smaller image.')
      return
    }
    setText('')
    clearPending()
    setEmojiOpen(false)
    stickToBottom.current = true
    setMessages(await ChatStore.getMessages())
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  function insertEmoji(emoji) {
    const input = inputRef.current
    const start = input.selectionStart ?? text.length
    const end = input.selectionEnd ?? start
    setText(text.slice(0, start) + emoji + text.slice(end))
    input.focus()
    const pos = start + emoji.length
    requestAnimationFrame(() => input.setSelectionRange(pos, pos))
  }

  function clearPending() {
    setPending(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  // Shrinks the chosen picture (max 800px) so it fits in browser storage.
  function onFileChosen(e) {
    const file = e.target.files[0]
    if (!file) return
    if (!/^image\//.test(file.type)) {
      alert('Please choose an image file.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, 800 / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const g = canvas.getContext('2d')
        g.fillStyle = '#fff'
        g.fillRect(0, 0, canvas.width, canvas.height)
        g.drawImage(img, 0, 0, canvas.width, canvas.height)
        setPending(canvas.toDataURL('image/jpeg', 0.72))
        inputRef.current.focus()
      }
      img.onerror = () => alert('That image could not be read.')
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  function handleSignOut() {
    signOut()
    onClose()
  }

  return (
    <>
      <section className="tc-panel" id="tcPanel" aria-label="Member chat">
        <div className="tc-head">
          <div>
            <b>Trellis Community Chat</b>
            <small>Signed in as {user.name}</small>
          </div>
          <div>
            <button type="button" onClick={handleSignOut}>Sign out</button>
            <button type="button" className="tc-x" onClick={onClose} aria-label="Close chat">&times;</button>
          </div>
        </div>

        <div className="tc-chat">
          <div className="tc-msgs" ref={msgsRef} onScroll={onScroll} aria-live="polite">
            {messages.length === 0 ? (
              <div className="tc-empty">No messages yet. Be the first to say hello! 👋</div>
            ) : (
              // .map() turns a list of data into a list of things on screen.
              // "key" helps React tell the items apart.
              messages.map((m, i) => {
                const newDay = i === 0 || new Date(m.ts).toDateString() !== new Date(messages[i - 1].ts).toDateString()
                return (
                  <Fragment key={m.id}>
                    {newDay && <div className="tc-day">{fmtDay(m.ts)}</div>}
                    <div className={'tc-m' + (m.email === user.email ? ' me' : '')}>
                      <div className="tc-who">{m.name}</div>
                      <div className="tc-bub">
                        {m.text && <span>{m.text}</span>}
                        {m.img && <img src={m.img} alt={'Image shared by ' + m.name} onClick={() => setLightbox(m.img)} />}
                      </div>
                      <div className="tc-time">{fmtTime(m.ts)}</div>
                    </div>
                  </Fragment>
                )
              })
            )}
          </div>

          <div className="tc-compose">
            {emojiOpen && (
              <div className="tc-emo">
                {EMOJIS.map((x) => (
                  <button key={x} type="button" aria-label={'Insert ' + x} onClick={() => insertEmoji(x)}>{x}</button>
                ))}
              </div>
            )}
            {pending && (
              <div className="tc-pv">
                <img src={pending} alt="Selected image" />
                <button type="button" onClick={clearPending} aria-label="Remove image">&times;</button>
              </div>
            )}
            <div className="tc-row">
              <button type="button" className="tc-ic" aria-label="Add emoji" onClick={() => setEmojiOpen(!emojiOpen)}>😊</button>
              <button type="button" className="tc-ic" aria-label="Upload image" onClick={() => fileRef.current.click()}>
                <svg viewBox="0 0 24 24"><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" /></svg>
              </button>
              <input type="file" ref={fileRef} accept="image/*" hidden onChange={onFileChosen} />
              {/* A "controlled input": what you see always comes from the `text` state. */}
              <input
                type="text"
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Write a message…"
                maxLength={1000}
                autoComplete="off"
                aria-label="Message"
                autoFocus
              />
              <button type="button" className="tc-ic tc-send" aria-label="Send" onClick={send}>
                <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="tc-lb" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" />
        </div>
      )}
    </>
  )
}
