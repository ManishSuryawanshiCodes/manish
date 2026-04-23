import React from 'react';
import { skillsData, learningGoals } from '../../data/skills';
import { Sparkles } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="skills reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">A collection of technologies I use to bring ideas to life.</p>
        </div>

        <div className="skills-grid">
          {skillsData.map((category, idx) => (
            <div key={idx} className="skill-category glass-card">
              <h3 className="category-title">{category.category}</h3>
              <div className="skills-tags">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="learning-section glass-card">
          <h3 className="learning-title">
            <Sparkles size={20} className="sparkle-icon" /> What I'm Learning Currently
          </h3>
          <div className="learning-grid">
            {learningGoals.map((goal, gIdx) => (
              <div key={gIdx} className="learning-item">
                <div className="learning-dot"></div>
                <span>{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
