import { Outlet } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BackToTop from './BackToTop.jsx'
import ChatWidget from './ChatWidget.jsx'

// The "frame" shared by Home and About: top bar, header, footer, chat button.
// <Outlet /> is the empty slot where the current page is placed.
export default function Layout() {
  return (
    <>
      <TopBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      <BackToTop />
    </>
  )
}
