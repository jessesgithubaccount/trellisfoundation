import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ChatProvider } from './context/ChatContext.jsx'
import './styles.css'

// This is where React starts: find <div id="root"> and draw <App /> inside it.
// The "Providers" are like shared notice boards: any component below them
// can read the signed-in user (Auth) or open the chat (Chat) without
// having the info passed down by hand through every level.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
