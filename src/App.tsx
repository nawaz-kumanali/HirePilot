import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { useAppSelector } from './store/hooks';
import PageTransition from './components/ui/PageTransition/PageTransition';

function App() {
  const mode = useAppSelector(state => state.theme.mode);
  const location = useLocation();

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
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default App
