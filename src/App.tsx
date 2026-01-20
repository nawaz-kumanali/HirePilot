import { useEffect } from 'react';
import './App.scss'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { useAppSelector } from './store/hooks';

function App() {
  const mode = useAppSelector(state => state.theme.mode);

  useEffect(() => {
    const applyTheme = (currentMode: typeof mode) => {
      let isDark = currentMode === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };

    applyTheme(mode);
  }, [mode]);

  return (
    <div className='app-wrapper'>
      <Navbar />
      <div className="app-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App
