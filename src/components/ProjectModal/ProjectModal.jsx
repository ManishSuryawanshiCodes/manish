import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, CheckCircle2, Cpu, ShieldCheck, Layers } from 'lucide-react';
import './ProjectModal.css';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="project-modal-backdrop" onClick={onClose}>
        <motion.div 
          className="project-modal-content glass-card"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="modal-category-badge">
              <Sparkles size={14} className="badge-sparkle" />
              <span>{project.category}</span>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <h2 className="modal-title gradient-text">{project.title}</h2>
            <p className="modal-description">{project.description}</p>

            <div className="modal-section">
              <h4 className="modal-section-title">
                <ShieldCheck size={16} /> Architectural Highlights & Features
              </h4>
              <div className="modal-features-grid">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="modal-feature-item glass-card">
                    <CheckCircle2 size={16} className="feature-check" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h4 className="modal-section-title">
                <Cpu size={16} /> Tech Stack & Tooling
              </h4>
              <div className="modal-tech-list">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <GithubIcon /> Source Code
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                <ExternalLink size={16} /> Launch Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
