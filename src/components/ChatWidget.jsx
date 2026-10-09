import { useAuth } from '../context/AuthContext.jsx'
import { useChat } from '../context/ChatContext.jsx'
import ChatPanel from './ChatPanel.jsx'

export default function ChatWidget() {
  const { user } = useAuth()
  const { isOpen, openChat, closeChat } = useChat()

  if (isOpen && user) {
    return <ChatPanel onClose={closeChat} />
  }

  return (
    <button className="tc-tab" id="tcTab" type="button" aria-label="Open member chat" onClick={openChat}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /></svg>
      Chat
      <span className="tc-tip" role="tooltip">Want to share a message?</span>
    </button>
  )
}
