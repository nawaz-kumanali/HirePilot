import './App.scss'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {

 
  return (
    <div className='app-wrapper'>
      <Navbar />
      <div className="app-content">
      <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default App
