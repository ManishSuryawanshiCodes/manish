import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Download, 
  Terminal, 
  Code2, 
  Cpu, 
  Zap, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FolderGit2
} from 'lucide-react';
import { personalInfo } from '../data/personal';
import { projectsData } from '../data/projects';
import { useTypewriter } from '../hooks/useTypewriter';
import resumeFile from '../assets/Manish_Suryawanshi_Resume.pdf';
import './HomePage.css';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const HomePage = () => {
  const typedText = useTypewriter(personalInfo.roles);
  const featuredProjects = projectsData.slice(0, 3);

  const stats = [
    { label: "Projects Completed", value: "10+" },
    { label: "Core Languages", value: "6+" },
    { label: "AI & RAG Frameworks", value: "5+" },
    { label: "Engineering Dedication", value: "100%" }
  ];

  return (
    <motion.div 
      className="page-container home-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <motion.div 
              className="hero-badge glass-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="pulse-indicator"></div>
              <Sparkles size={14} className="badge-sparkle" />
              <span>Available for High-Impact Roles & AI Projects</span>
            </motion.div>

            <motion.h1 
              className="hero-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I am <span className="gradient-text">{personalInfo.fullName}</span>
            </motion.h1>

            <motion.div 
              className="hero-roles-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="role-typed">{typedText}</span>
              <span className="role-cursor">|</span>
            </motion.div>

            <motion.p 
              className="hero-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {personalInfo.tagline} Transforming ambitious concepts into scalable, AI-driven digital ecosystems with high-performance code and fluid interfaces.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="hero-cta-group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <NavLink to="/projects" className="btn btn-primary">
                Explore Project Orbit <ArrowRight size={18} />
              </NavLink>
              <a 
                href={resumeFile} 
                download="Manish_Suryawanshi_Resume.pdf" 
                className="btn btn-secondary"
              >
                <Download size={18} /> Download Resume
              </a>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="hero-social-strip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="social-pill glass-card">
                <GithubIcon /> <span>GitHub</span>
              </a>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill glass-card">
                <LinkedinIcon /> <span>LinkedIn</span>
              </a>
              <div className="location-pill glass-card">
                <span>📍 Pune, Maharashtra, India</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="stat-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="stat-number gradient-text">{stat.value}</h3>
                <p className="stat-name">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="featured-section">
          <div className="section-header">
            <div className="section-pill-badge">
              <FolderGit2 size={14} />
              <span>Selected Work</span>
            </div>
            <h2 className="section-title">Featured Innovations</h2>
            <p className="section-subtitle">
              A glimpse into my latest full-stack architecture, AI SaaS applications, and responsive systems.
            </p>
          </div>

          <div className="featured-grid">
            {featuredProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                className="featured-card glass-card glass-card-hover"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="featured-card-top">
                  <span className="featured-tag">{project.category}</span>
                  <div className="featured-links">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub">
                      <GithubIcon />
                    </a>
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="Live Demo">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="featured-title">{project.title}</h3>
                <p className="featured-desc">{project.description}</p>

                <div className="featured-techs">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-chip">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="featured-cta">
            <NavLink to="/projects" className="btn btn-secondary">
              View All 10+ Projects in Orbit <ArrowRight size={16} />
            </NavLink>
          </div>
        </section>

        {/* Interactive Developer Mindset Terminal Glance */}
        <section className="mindset-section">
          <div className="mindset-card glass-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title">manish@developer-engine: ~</span>
            </div>
            <div className="terminal-body">
              <p className="cmd-line"><span className="prompt">$</span> manish --philosophy</p>
              <p className="cmd-response">
                "Massive 'figure-it-out' mentality. I engineer scalable backends, design liquid-glass UIs, and embed AI intelligence directly into everyday workflows."
              </p>
              <p className="cmd-line"><span className="prompt">$</span> manish --current-focus</p>
              <p className="cmd-response highlight">
                [ Advanced MERN Stack, AI SaaS Automation, RAG Architecture, React Native ]
              </p>
            </div>
          </div>
        </section>

        {/* Quick Contact Banner */}
        <section className="home-banner-section">
          <div className="banner-card glass-card">
            <div className="banner-content">
              <h2 className="banner-title">Have a project in mind?</h2>
              <p className="banner-desc">
                Let's collaborate on building high-performance web experiences and intelligent AI systems.
              </p>
            </div>
            <div className="banner-actions">
              <NavLink to="/contact" className="btn btn-primary">
                Initialize Transmission <ArrowRight size={18} />
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default HomePage;
