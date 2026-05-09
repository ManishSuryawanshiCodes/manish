import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { skillsData, learningGoals } from '../../data/skills';
import { Sparkles, Brain, Cpu, Rocket, Database, Layers, Cloud, Code2, Terminal, Globe, Zap } from 'lucide-react';
import './Skills.css';

const SkillCard = ({ category, skills, index }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getIcon = (idx) => {
    const icons = [
      <Brain size={32} strokeWidth={1.5} />,
      <Layers size={32} strokeWidth={1.5} />,
      <Terminal size={32} strokeWidth={1.5} />,
      <Database size={32} strokeWidth={1.5} />,
      <Globe size={32} strokeWidth={1.5} />,
      <Cloud size={32} strokeWidth={1.5} />,
      <Rocket size={32} strokeWidth={1.5} />
    ];
    return icons[idx % icons.length];
  };

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseMove={handleMouseMove}
      className="group h-full"
    >
      <div className="premium-card">
        <div 
          className="card-glow" 
          style={{ 
            left: mousePos.x - 100, 
            top: mousePos.y - 100 
          }} 
        />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="category-icon-wrapper"
            >
              {getIcon(index)}
            </motion.div>
            <div className="text-right">
              <span className="block text-[10px] font-black text-[var(--text-muted)] tracking-[5px] uppercase opacity-40">
                SYSTEM
              </span>
              <span className="block text-[10px] font-black text-cyan-500 tracking-[3px] uppercase">
                0{index + 1}
              </span>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-8 group-hover:text-cyan-400 transition-colors leading-tight">
            {category}
          </h3>

          <div className="skills-grid-internal flex-grow">
            {skills.map((skill, sIdx) => (
              <motion.span 
                key={sIdx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 211, 238, 0.15)' }}
                transition={{ duration: 0.3, delay: 0.1 + (sIdx * 0.03) }}
                className="skill-tag-premium"
              >
                {skill}
              </motion.span>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="skills">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[5%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/5 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[5%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[140px]"></div>
      </div>

      <div className="skills-container">
        <div className="skills-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full mb-8">
              <Zap size={14} className="text-cyan-400 fill-cyan-400" />
              <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[3px]">Performance Engine</span>
            </div>
            <h2 className="skills-title">
              Technical <span className="title-accent">Arsenal</span>
            </h2>
            <p className="skills-subtitle">
              A meticulously engineered infrastructure of languages, frameworks, and tools 
              optimized for building the next generation of digital excellence.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillsData.map((category, idx) => (
            <SkillCard 
              key={idx} 
              category={category.category} 
              skills={category.skills} 
              index={idx} 
            />
          ))}
        </div>

        {/* Frontier Tech Section Redesigned */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="frontier-container"
        >
          <div className="frontier-inner">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-yellow-400/10 text-yellow-400 rounded-2xl text-xs font-black uppercase tracking-[3px] mb-8 border border-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.05)]">
                <Sparkles size={16} className="fill-yellow-400" /> Frontier Tech
              </div>
              <h3 className="text-5xl font-black text-[var(--text-primary)] mb-6 leading-tight">
                Architecting <br />
                <span className="text-cyan-400">The Future</span>
              </h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-md">
                Continuous research into emerging paradigms, focusing on AI-native 
                workflows and scalable cloud architectures.
              </p>
            </div>
            
            <div className="frontier-goals">
              {learningGoals.map((goal, gIdx) => (
                <motion.div 
                  key={gIdx}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="goal-card group/goal"
                >
                  <div className="goal-icon-wrapper group-hover/goal:bg-cyan-500 group-hover/goal:text-white transition-all duration-300">
                    <Code2 size={24} />
                  </div>
                  <span className="text-base font-bold text-[var(--text-primary)] group-hover/goal:text-white transition-colors">
                    {goal}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
