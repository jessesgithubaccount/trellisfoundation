import { Outlet } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BackToTop from './BackToTop.jsx'
import ChatWidget from './ChatWidget.jsx'

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
