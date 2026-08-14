import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Search, Sparkles } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme, onOpenCmdK }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Journey', path: '/journey' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar-container glass-card">
        <NavLink to="/" className="navbar-logo" aria-label="MANish Home">
          <div className="logo-spark-box">
            <Zap size={18} className="logo-spark-icon" />
          </div>
          <span className="logo-title">
            <span className="gradient-text">MAN</span>ish
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="navbar-nav-pill">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activePill"
                    className="active-pill-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="nav-item-text">{link.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Actions (Cmd+K + Theme + Mobile Menu) */}
        <div className="navbar-actions">
          <button 
            className="cmd-k-trigger-btn"
            onClick={onOpenCmdK}
            title="Open Command Palette (Ctrl+K)"
            aria-label="Search and command palette"
          >
            <Search size={15} />
            <span className="cmd-k-text">Search</span>
            <span className="cmd-k-tag">⌘K</span>
          </button>

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

          <button 
            className="mobile-hamburger-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-content glass-card">
              <div className="mobile-search-row">
                <button 
                  className="mobile-search-btn btn-secondary btn-block"
                  onClick={() => { setIsOpen(false); onOpenCmdK(); }}
                >
                  <Search size={16} /> Quick Search / Command (Ctrl+K)
                </button>
              </div>

              <ul className="mobile-nav-list">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink 
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <span>{link.name}</span>
                      <Sparkles size={16} className="mobile-sparkle" />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
