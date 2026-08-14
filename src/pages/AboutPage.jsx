import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  User, 
  Code, 
  Brain, 
  Rocket, 
  Sparkles, 
  Layers, 
  Download, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { personalInfo } from '../data/personal';
import resumeFile from '../assets/Manish_Suryawanshi_Resume.pdf';
import cvFile from '../assets/manish 2026 CV.pdf';
import './AboutPage.css';

const AboutPage = () => {
  const pillars = [
    {
      icon: <Code size={26} />,
      title: "Full-Stack Web Architect",
      desc: "Deep proficiency in MERN Stack, Next.js, and Java backend microservices with scalable, clean architectures.",
      color: "var(--accent-primary)"
    },
    {
      icon: <Brain size={26} />,
      title: "AI SaaS & LLM Integrations",
      desc: "Crafting intelligent agents, RAG pipelines, fine-tuned models, and vector database search workflows.",
      color: "var(--accent-secondary)"
    },
    {
      icon: <Rocket size={26} />,
      title: "'Figure-it-Out' Mindset",
      desc: "Fast learner who thrives in ambiguity, solving complex bugs and transforming raw product concepts into reality.",
      color: "#f59e0b"
    },
    {
      icon: <Layers size={26} />,
      title: "Liquid Glass & Modern UI/UX",
      desc: "Obsessed with micro-animations, glassmorphism, responsive fluid typography, and 60fps rendering speeds.",
      color: "#10b981"
    }
  ];

  const highlights = [
    "Master of Computer Applications (MCA) at DES Pune University (2025 - 2027)",
    "Avishkar State-level Research Convention presenter",
    "Promptopia prompt engineering university finalist",
    "Lead web platform architect for university events (Soularc)",
    "Built 10+ end-to-end full stack and AI applications"
  ];

  return (
    <motion.div 
      className="page-container about-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <div className="section-pill-badge">
            <User size={14} />
            <span>Profile & Background</span>
          </div>
          <h1 className="section-title">The Mind Behind the Code</h1>
          <p className="section-subtitle">
            Full-stack engineer, AI builder, and digital architect crafting high-performance experiences with meticulous attention to detail.
          </p>
        </div>

        {/* Main Grid */}
        <div className="about-layout-grid">
          {/* Left Column: Bio & Story */}
          <div className="about-main-content">
            <div className="bio-card glass-card">
              <h2 className="bio-title">Hello, I'm <span className="gradient-text">{personalInfo.fullName}</span></h2>
              <p className="bio-lead">{personalInfo.about}</p>
              
              <div className="bio-location-tag">
                <MapPin size={16} /> Based in {personalInfo.socials.location}
              </div>
            </div>

            {/* Core Competencies / Pillars */}
            <h3 className="sub-heading">Engineering Pillars</h3>
            <div className="pillars-grid">
              {pillars.map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  className="pillar-card glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="pillar-icon-box" style={{ color: pillar.color, borderColor: `${pillar.color}40`, background: `${pillar.color}15` }}>
                    {pillar.icon}
                  </div>
                  <h4 className="pillar-title">{pillar.title}</h4>
                  <p className="pillar-desc">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Credentials & Download Assets */}
          <div className="about-side-column">
            {/* Quick Highlights */}
            <div className="highlights-box glass-card">
              <h3 className="side-title">
                <Sparkles size={18} className="side-title-icon" /> Fast Facts
              </h3>
              <ul className="highlights-list">
                {highlights.map((item, idx) => (
                  <li key={idx} className="highlight-item">
                    <CheckCircle2 size={16} className="highlight-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Documents / Resume Box */}
            <div className="documents-box glass-card">
              <h3 className="side-title">
                <FileText size={18} className="side-title-icon" /> Official Credentials
              </h3>
              <p className="doc-subtext">Download verified resume and comprehensive curriculum vitae.</p>
              
              <div className="doc-btns">
                <a href={resumeFile} download="Manish_Suryawanshi_Resume.pdf" className="btn btn-primary btn-block">
                  <Download size={16} /> Download Resume PDF
                </a>
                <a href={cvFile} download="Manish_Suryawanshi_CV.pdf" className="btn btn-secondary btn-block">
                  <FileText size={16} /> Download Complete CV
                </a>
              </div>
            </div>

            {/* Direct Connect CTA */}
            <div className="connect-card glass-card">
              <Zap size={24} className="connect-icon" />
              <h4 className="connect-title">Ready to build?</h4>
              <p className="connect-text">Let's discuss how we can engineer your next high-impact digital product.</p>
              <NavLink to="/contact" className="btn btn-secondary btn-block">
                Start Conversation <ArrowRight size={16} />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
