import React from 'react';
import { Download, ExternalLink, Sparkles } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import { useTypewriter } from '../../hooks/useTypewriter';
import './Hero.css';

const Hero = () => {
  const typedText = useTypewriter(personalInfo.roles);

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge glass-card">
            <Sparkles size={16} className="sparkle-icon" />
            <span>Available for Hire</span>
          </div>
          
          <p className="hero-greeting">Hi, I am</p>
          <h1 className="hero-name gradient-text">{personalInfo.fullName}</h1>
          <h2 className="hero-role">
            <span className="typed-text">{typedText}</span>
            <span className="cursor">|</span>
          </h2>
          
          <p className="hero-tagline">{personalInfo.tagline}</p>
          
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">
              The Project Orbit <ExternalLink size={20} />
            </a>
            <a href="/resume.pdf" className="btn btn-secondary" download>
              Get Resume <Download size={20} />
            </a>
          </div>

          <div className="hero-social-quick">
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="quick-link">Github</a>
            <span className="sep">•</span>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="quick-link">LinkedIn</a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-blob-container">
            <div className="hero-blob"></div>
            <div className="hero-image-card glass-card">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Manish" 
                alt="Manish Avatar" 
                className="hero-avatar"
              />
              <div className="hero-tag-badge glass-card">
                <p>Based in Pune</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <div className="mouse-icon">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
