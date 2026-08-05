import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { House, FolderGit2, BriefcaseBusiness, Award, UserRound } from 'lucide-react';
import { EASE_OUT_CUBIC, spring, motionTimings } from '../lib/motion';

const ITEMS = [
  { id: 'home', label: 'Home', path: '/', Icon: House },
  { id: 'projects', label: 'Projects', path: '/work', Icon: FolderGit2 },
  { id: 'services', label: 'Services', path: '/services', Icon: BriefcaseBusiness },
  { id: 'certs', label: 'Certificates', path: '/certificates', Icon: Award },
  { id: 'about', label: 'About', path: '/about', Icon: UserRound },
];

export const BottomNav: React.FC = () => {
  const { pathname } = useLocation();
  const [active, setActive] = useState<string>(() => {
    const match = ITEMS.find(i => i.path === pathname);
    return match ? match.id : 'home';
  });

  const [hidden, setHidden] = useState(false);
  const lastY = useRef<number>(0);

  useEffect(() => {
    // update active based on pathname
    const match = ITEMS.find(i => i.path === pathname);
    setActive(match ? match.id : 'home');
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) < 10) return; // ignore tiny movements
      if (y > lastY.current && y > 80) {
        // scrolling down
        setHidden(true);
      } else {
        // scrolling up
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.nav
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, transition: { ...spring } }}
          exit={{ opacity: 0, y: 40, transition: { duration: motionTimings.fast } }}
          role="navigation"
          aria-label="Mobile bottom navigation"
          className="md:hidden fixed left-1/2 -translate-x-1/2 bottom-6 z-70"
          style={{
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <div
            className="bottom-nav-glass grid grid-cols-5 items-center px-4 py-2 rounded-full"
            style={{
              minWidth: 320,
              maxWidth: '92vw',
              gap: 0,
              paddingLeft: 12,
              paddingRight: 12,
              paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 8px)`
            }}
          >
            {ITEMS.map((item) => {
              const Icon = item.Icon;
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  className="relative flex flex-col items-center justify-center w-full min-w-0 px-1 py-2"
                  onClick={() => {
                    // ensure smooth scroll to top on navigation
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="flex items-center justify-center w-10 h-10">
                    <Icon size={20} className={isActive ? 'text-orange-vibrant' : 'text-warm-gray/60'} />
                  </div>
                  <span className={`text-[11px] mt-1 text-center leading-none ${isActive ? 'text-orange-vibrant font-semibold' : 'text-warm-gray/50'}`}>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="bottom-nav-active"
                      className="absolute left-1/2 -translate-x-1/2 bottom-1 w-7 h-0.5 bg-orange-vibrant rounded-full"
                        initial={{ opacity: 0, scaleX: 0.6 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.22, ease: EASE_OUT_CUBIC }}
                        style={{ boxShadow: '0 6px 18px rgba(255,87,34,0.18)', transformOrigin: 'center' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default BottomNav;
