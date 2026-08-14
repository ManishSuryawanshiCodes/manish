import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  ExternalLink, 
  Sparkles, 
  Search, 
  Layers, 
  Play, 
  CheckCircle2, 
  Filter,
  Info
} from 'lucide-react';
import { projectsData } from '../data/projects';
import ProjectModal from '../components/ProjectModal/ProjectModal';
import './ProjectsPage.css';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = useMemo(() => {
    const rawCategories = projectsData.map(p => p.category);
    return ['All', ...Array.from(new Set(rawCategories))];
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.techStack.some(t => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <motion.div 
      className="page-container projects-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-pill-badge">
            <Code2 size={14} />
            <span>Showcase & Architecture</span>
          </div>
          <h1 className="section-title">The Project Orbit</h1>
          <p className="section-subtitle">
            A comprehensive catalog of intelligent web applications, AI SaaS platforms, mobile solutions, and high-fidelity clones.
          </p>
        </div>

        {/* Controls: Search + Categories */}
        <div className="projects-controls-bar">
          {/* Search Box */}
          <div className="projects-search-box glass-card">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Search by title, technology (e.g. React, Python, RAG)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="category-pills-row">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? projectsData.length 
                : projectsData.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="pill-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="projects-meta-bar">
          <p className="results-count">
            Showing <strong>{filteredProjects.length}</strong> of {projectsData.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="empty-projects glass-card">
            <Info size={36} className="empty-icon" />
            <h3>No projects found matching "{searchQuery}"</h3>
            <p>Try searching for a different keyword or resetting filters.</p>
            <button 
              className="btn btn-secondary"
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="projects-grid">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="project-item-card glass-card glass-card-hover"
                >
                  <div className="card-top-row">
                    <span className="project-category-tag">{project.category}</span>
                    <div className="project-quick-links">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="link-btn"
                          title="View Source Code on GitHub"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GithubIcon />
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="link-btn"
                          title="Live Demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="project-item-title">{project.title}</h3>
                  <p className="project-item-desc">{project.description}</p>

                  <div className="project-item-features">
                    <ul className="feature-bullets">
                      {project.features.slice(0, 3).map((f, fIdx) => (
                        <li key={fIdx}>
                          <Sparkles size={12} className="bullet-sparkle" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-item-techs">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-chip">{tech}</span>
                    ))}
                  </div>

                  <div className="project-card-footer">
                    <button 
                      className="details-btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      <span>Deep Dive & Specs</span>
                      <Play size={12} fill="currentColor" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Deep-Dive Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </motion.div>
  );
};

export default ProjectsPage;
