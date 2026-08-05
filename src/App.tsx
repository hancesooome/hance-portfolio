import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { Awards } from './pages/Awards';
import { Certificates } from './pages/Certificates';
import { Dashboard } from './pages/Dashboard';
import { BottomNav } from './components/BottomNav';
import { EASE_OUT_CUBIC, motionTimings, pageEnter } from './lib/motion';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.div
      key={location.pathname}
      initial={pageEnter.hidden}
      animate={pageEnter.visible}
      exit={pageEnter.exit}
      transition={{ duration: motionTimings.normal, ease: EASE_OUT_CUBIC }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  return (
    <Router>
      <MotionConfig reducedMotion="user">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow mobile-bottom-nav-space">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                <Route path="/awards" element={<PageWrapper><Awards /></PageWrapper>} />
                <Route path="/certificates" element={<PageWrapper><Certificates /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <BottomNav />
        </div>
      </MotionConfig>
    </Router>
  );
}
