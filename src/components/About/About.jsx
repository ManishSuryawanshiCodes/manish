import React from 'react';
import { User, Code, Rocket, Award, Brain, Zap } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">The Architect Behind the Code</h2>
          <div className="title-underline"></div>
        </div>

        <div className="about-grid">
          <div className="about-visual">
            <div className="about-image-wrapper glass-card">
              <div className="about-placeholder-icon">
                <Brain size={120} strokeWidth={1} className="floating-icon" />
              </div>
              <div className="about-stat glass-card">
                <Zap size={20} className="stat-icon" />
                <div>
                  <p className="stat-val">10+</p>
                  <p className="stat-lab">Projects Built</p>
                </div>
              </div>
            </div>
            <div className="about-deco-circle"></div>
          </div>

          <div className="about-content">
            <h3 className="about-subtitle">Who is Manish?</h3>
            <div className="about-bio">
              <p>{personalInfo.about}</p>
            </div>
            
            <div className="about-highlights">
              <div className="highlight-card glass-card">
                <div className="highlight-icon-box">
                  <Code size={24} />
                </div>
                <div>
                  <h4>Full-Stack Expert</h4>
                  <p>MERN, Java & Python</p>
                </div>
              </div>
              
              <div className="highlight-card glass-card">
                <div className="highlight-icon-box">
                  <Rocket size={24} />
                </div>
                <div>
                  <h4>AI Innovator</h4>
                  <p>LLMs & RAG Systems</p>
                </div>
              </div>
            </div>

            <div className="about-cta-box">
              <a href="#contact" className="btn btn-primary">Start a Conversation</a>
              <div className="about-availability">
                <div className="pulse-dot"></div>
                <span>Available for New Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
