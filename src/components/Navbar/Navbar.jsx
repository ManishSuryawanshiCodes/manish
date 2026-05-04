import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useActiveSection } from '../../hooks/useActiveSection';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(['home', 'about', 'skills', 'projects', 'resume', 'contact']);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Resume', href: '#resume', id: 'resume' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-card' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo">
          <Zap size={24} className="logo-icon" fill="currentColor" />
          <span className="gradient-text">M</span>anish
        </a>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className={activeSection === link.id ? 'active' : ''}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-controls">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button className="menu-btn glass-card" onClick={() => setIsOpen(!isOpen)} style={{ padding: '8px', display: 'flex' }}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isOpen ? 'open glass-card' : ''}`}>
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className={activeSection === link.id ? 'active' : ''}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
