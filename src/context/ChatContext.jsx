import { createContext, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'

// Another notice board: is the chat panel open, and how do I open it?
// The "Sign In" button on the Home page and the floating "Chat" button
// both need this, even though they live in different places.
const ChatContext = createContext(null)

export function ChatProvider({ children }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  function openChat() {
    if (!user) {
      // Not signed in yet: go to the Sign In page, and remember where we came from.
      navigate('/signin', { state: { from: location.pathname } })
      return
    }
    setIsOpen(true)
  }

  function closeChat() {
    setIsOpen(false)
  }

  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat, setIsOpen }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}
