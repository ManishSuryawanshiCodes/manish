import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Compass, Home, ArrowRight, Code2, Sparkles } from 'lucide-react';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <motion.div 
      className="page-container not-found-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <div className="not-found-card glass-card">
          <div className="not-found-badge">
            <Sparkles size={14} />
            <span>Anomaly Detected</span>
          </div>

          <div className="error-404-glitch">
            <span className="code-digit">4</span>
            <div className="compass-portal">
              <Compass size={56} className="radar-icon" />
              <div className="radar-ping"></div>
            </div>
            <span className="code-digit">4</span>
          </div>

          <h1 className="not-found-title gradient-text">Coordinates Not Found</h1>
          <p className="not-found-desc">
            The pathway or cosmic sector you attempted to access does not exist or has shifted within this orbit.
          </p>

          <div className="not-found-actions">
            <NavLink to="/" className="btn btn-primary">
              <Home size={18} /> Return to Home Base
            </NavLink>
            <NavLink to="/projects" className="btn btn-secondary">
              <Code2 size={18} /> Explore Projects <ArrowRight size={16} />
            </NavLink>
          </div>

          <div className="quick-teleport-strip">
            <span>Quick Teleports:</span>
            <NavLink to="/about" className="teleport-link">About</NavLink>
            <span>•</span>
            <NavLink to="/skills" className="teleport-link">Skills</NavLink>
            <span>•</span>
            <NavLink to="/journey" className="teleport-link">Journey</NavLink>
            <span>•</span>
            <NavLink to="/contact" className="teleport-link">Contact</NavLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
