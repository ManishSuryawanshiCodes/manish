import React from 'react';
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button 
      className="theme-toggle glass-card" 
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="sun-icon" />
      ) : (
        <Moon size={20} className="moon-icon" />
      )}
    </button>
  );
};

export default ThemeToggle;
