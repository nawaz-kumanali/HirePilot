import './App.scss'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { getUserMenuState } from './utility/userMenu'
import { useAppDispatch } from './store/hooks'
import { useEffect } from 'react'

function App() {

  const isUserMenuOpen = getUserMenuState()
  const dispatch = useAppDispatch();

  
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
