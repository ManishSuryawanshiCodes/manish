import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Brain, 
  Layers, 
  Terminal, 
  Database, 
  Globe, 
  Cloud, 
  Rocket, 
  Sparkles, 
  Zap, 
  Code2, 
  CheckCircle2,
  Workflow
} from 'lucide-react';
import { skillsData, learningGoals } from '../data/skills';
import './SkillsPage.css';

const SkillsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const getIcon = (idx) => {
    const icons = [
      <Terminal size={24} />,
      <Layers size={24} />,
      <Globe size={24} />,
      <Database size={24} />,
      <Brain size={24} />,
      <Cloud size={24} />,
      <Workflow size={24} />
    ];
    return icons[idx % icons.length];
  };

  const filteredCategories = activeTab === 'All'
    ? skillsData
    : skillsData.filter(cat => cat.category.toLowerCase().includes(activeTab.toLowerCase()));

  const tabOptions = ['All', 'Programming', 'Frontend', 'Backend', 'Databases', 'AI', 'Cloud'];

  return (
    <motion.div 
      className="page-container skills-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-pill-badge">
            <Cpu size={14} />
            <span>Technical Infrastructure</span>
          </div>
          <h1 className="section-title">Technical Arsenal</h1>
          <p className="section-subtitle">
            A meticulously curated matrix of modern programming languages, full-stack frameworks, AI engineering tools, and cloud infrastructure.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="skills-systems-grid">
          {skillsData.map((category, idx) => (
            <motion.div 
              key={idx}
              className="skill-system-card glass-card glass-card-hover"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <div className="system-card-header">
                <div className="system-icon-box">
                  {getIcon(idx)}
                </div>
                <div className="system-meta">
                  <span className="system-tag">ENGINEERING</span>
                  <span className="system-index">SYS_0{idx + 1}</span>
                </div>
              </div>

              <h3 className="system-category-title">{category.category}</h3>

              <div className="system-skills-chips">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-badge-item">
                    <span className="skill-dot"></span>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Frontier Tech Roadmap */}
        <motion.section 
          className="frontier-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="frontier-card glass-card">
            <div className="frontier-left">
              <div className="frontier-pill">
                <Sparkles size={14} />
                <span>Active Research & Learning</span>
              </div>
              <h2 className="frontier-title">
                Architecting <br />
                <span className="gradient-text">The Future</span>
              </h2>
              <p className="frontier-desc">
                Continuous deep exploration into bleeding-edge AI models, autonomous agent frameworks, distributed system architectures, and mobile ecosystems.
              </p>
            </div>

            <div className="frontier-goals-grid">
              {learningGoals.map((goal, gIdx) => (
                <div key={gIdx} className="frontier-goal-item glass-card">
                  <div className="goal-icon-box">
                    <Rocket size={18} />
                  </div>
                  <div className="goal-text-content">
                    <h4 className="goal-title">{goal}</h4>
                    <span className="goal-status">In Progress • Active Focus</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default SkillsPage;
