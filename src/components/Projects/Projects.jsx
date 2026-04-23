import React, { useState } from 'react';
import { ExternalLink, Layers, Play, Code2, Sparkles } from 'lucide-react';
import { projectsData } from '../../data/projects';
import './Projects.css';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(projectsData.map(p => p.category))];
  
  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Project Orbit</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Transforming complex ideas into scalable, production-ready solutions.</p>
        </div>

        <div className="project-filters">
          {categories.map((cat, idx) => (
            <button 
              key={idx} 
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card glass-card">
              <div className="project-header">
                <div className="project-icon-box glass-card">
                  <Code2 size={24} />
                </div>
                <div className="project-links">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link-icon">
                    <GithubIcon />
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-icon">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <div className="project-info">
                <div className="project-meta">
                  <span className="project-cat">{project.category}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                <div className="project-features">
                  <h4 className="features-label">Key Features:</h4>
                  <ul className="features-list">
                    {project.features.slice(0, 3).map((feature, fIdx) => (
                      <li key={fIdx}>
                        <Sparkles size={12} className="feature-sparkle" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-tech-stack">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-chip">{tech}</span>
                  ))}
                </div>

                <div className="project-action">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-view-btn">
                    Explore Project <Play size={14} fill="currentColor" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
