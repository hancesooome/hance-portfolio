import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { cn } from '../types';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Playground', path: '/playground' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
      scrolled ? "bg-midnight/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-display font-bold text-white tracking-tighter">
          HANCE<span className="text-orange-vibrant">.</span>DAGONDON
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                "text-sm font-medium transition-colors hover:text-orange-vibrant",
                isActive ? "text-orange-vibrant" : "text-warm-gray/70"
              )}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-midnight border-b border-white/5 p-6 md:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-lg font-medium transition-colors",
                  isActive ? "text-orange-vibrant" : "text-warm-gray/70"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-midnight border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="text-2xl font-display font-bold text-white tracking-tighter mb-6 block">
            HANCE<span className="text-orange-vibrant">.</span>DAGONDON
          </Link>
          <p className="text-warm-gray/50 max-w-sm mb-8">
            Designing with intention. Building with feeling. Supporting with empathy.
            A multi-disciplinary approach to modern digital experiences.
          </p>
          <div className="flex space-x-4">
            <a href="https://x.com/hancesoome" target="_blank" rel="noopener noreferrer" className="text-warm-gray/50 hover:text-orange-vibrant transition-colors"><Twitter size={20} /></a>
            <a href="http://github.com/hancesooome" target="_blank" rel="noopener noreferrer" className="text-warm-gray/50 hover:text-orange-vibrant transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/hancesome/" target="_blank" rel="noopener noreferrer" className="text-warm-gray/50 hover:text-orange-vibrant transition-colors"><Linkedin size={20} /></a>
            <a href="https://www.instagram.com/hancesoome/" target="_blank" rel="noopener noreferrer" className="text-warm-gray/50 hover:text-orange-vibrant transition-colors"><Instagram size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold mb-6 uppercase tracking-widest text-xs">Navigation</h4>
          <ul className="space-y-4">
            <li><Link to="/work" className="text-warm-gray/50 hover:text-white transition-colors text-sm">Work</Link></li>
            <li><Link to="/about" className="text-warm-gray/50 hover:text-white transition-colors text-sm">About</Link></li>
            <li><Link to="/services" className="text-warm-gray/50 hover:text-white transition-colors text-sm">Services</Link></li>
            <li><Link to="/playground" className="text-warm-gray/50 hover:text-white transition-colors text-sm">Playground</Link></li>
            <li><Link to="/dashboard" className="text-warm-gray/50 hover:text-white transition-colors text-sm">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold mb-6 uppercase tracking-widest text-xs">Contact</h4>
          <ul className="space-y-4">
            <li className="text-warm-gray/50 text-sm">hancedagondon@gmail.com</li>
            <li className="text-warm-gray/50 text-sm">Based in the Digital Ether</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center text-xs text-warm-gray/30">
        <p>© {new Date().getFullYear()} Vibe & Logic. All rights reserved.</p>
        <p className="mt-2 md:mt-0 italic">"Designed with intention. Built with feeling."</p>
      </div>
    </footer>
  );
};
