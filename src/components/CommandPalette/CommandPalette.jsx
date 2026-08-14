import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Home, 
  User, 
  Code2, 
  Cpu, 
  GraduationCap, 
  Mail, 
  Moon, 
  Sun, 
  FileText, 
  ExternalLink,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import resumeFile from '../../assets/Manish_Suryawanshi_Resume.pdf';
import './CommandPalette.css';

const CommandPalette = ({ isOpen, onClose, theme, toggleTheme }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navItems = [
    { title: 'Home', icon: <Home size={18} />, type: 'Page', action: () => { navigate('/'); onClose(false); } },
    { title: 'About & Story', icon: <User size={18} />, type: 'Page', action: () => { navigate('/about'); onClose(false); } },
    { title: 'Projects Orbit', icon: <Code2 size={18} />, type: 'Page', action: () => { navigate('/projects'); onClose(false); } },
    { title: 'Skills & Arsenal', icon: <Cpu size={18} />, type: 'Page', action: () => { navigate('/skills'); onClose(false); } },
    { title: 'Journey & Experience', icon: <GraduationCap size={18} />, type: 'Page', action: () => { navigate('/journey'); onClose(false); } },
    { title: 'Contact Terminal', icon: <Mail size={18} />, type: 'Page', action: () => { navigate('/contact'); onClose(false); } },
  ];

  const actionItems = [
    { 
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, 
      icon: theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />, 
      type: 'Action', 
      action: () => { toggleTheme(); onClose(false); } 
    },
    { 
      title: 'Download Resume PDF', 
      icon: <FileText size={18} />, 
      type: 'Action', 
      action: () => { 
        window.open(resumeFile, '_blank'); 
        onClose(false); 
      } 
    }
  ];

  const projectItems = projectsData.map(p => ({
    title: p.title,
    subtitle: `${p.category} • ${p.techStack.slice(0, 3).join(', ')}`,
    icon: <Sparkles size={18} />,
    type: 'Project',
    action: () => {
      navigate('/projects');
      onClose(false);
    }
  }));

  const allItems = [...navItems, ...actionItems, ...projectItems];

  const filteredItems = query.trim() === ''
    ? allItems.slice(0, 8)
    : allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="cmd-k-backdrop" onClick={() => onClose(false)}>
        <motion.div 
          className="cmd-k-modal"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cmd-k-input-wrapper">
            <Search size={18} className="cmd-k-icon" />
            <input 
              ref={inputRef}
              type="text"
              className="cmd-k-input"
              placeholder="Type a command, page, or search project..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
              onKeyDown={handleKeyDown}
            />
            <span className="cmd-k-shortcut">ESC</span>
          </div>

          <div className="cmd-k-results">
            {filteredItems.length === 0 ? (
              <div className="cmd-k-empty">
                <p>No results found for "{query}"</p>
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <div 
                  key={idx}
                  className={`cmd-k-item ${selectedIndex === idx ? 'selected' : ''}`}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-k-item-left">
                    <span className="cmd-k-item-icon">{item.icon}</span>
                    <div className="cmd-k-item-info">
                      <span className="cmd-k-item-title">{item.title}</span>
                      {item.subtitle && <span className="cmd-k-item-sub">{item.subtitle}</span>}
                    </div>
                  </div>
                  <div className="cmd-k-item-right">
                    <span className="cmd-k-badge">{item.type}</span>
                    <ArrowRight size={14} className="cmd-k-arrow" />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cmd-k-footer">
            <div className="cmd-k-footer-keys">
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>esc</kbd> close</span>
            </div>
            <span className="cmd-k-footer-brand">Manish • Quick Hub</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
