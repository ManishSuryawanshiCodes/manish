import React from 'react';
import { Briefcase, GraduationCap, Calendar, Award, Rocket, Users, Target, Download, FileText } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import resumeFile from '../../assets/Manish_Suryawanshi_Resume.pdf';
import cvFile from '../../assets/manish 2026 CV.pdf';
import './Resume.css';

const journeyData = [
  {
    type: 'education',
    title: 'Master of Computer Applications (MCA)',
    organization: 'DES Pune University',
    period: '2025 - 2027',
    description: 'Currently pursuing MCA with a focus on advanced computing and AI research. PRN: 3542511013.',
    icon: <GraduationCap size={18} />,
    color: '#7c3aed'
  },
  {
    type: 'achievement',
    title: 'Avishkar Research Convention',
    organization: 'State-level Competition',
    period: 'Research Presenter',
    description: 'Conducted and presented innovative technical research at the prestigious state-level Avishkar competition.',
    icon: <Award size={18} />,
    color: '#06b6d4'
  },
  {
    type: 'achievement',
    title: 'Promptopia Finalist',
    organization: 'University Competition',
    period: 'Finalist',
    description: 'Reached the finals of a highly competitive university-wide prompt engineering competition.',
    icon: <Target size={18} />,
    color: '#fbbf24'
  },
  {
    type: 'leadership',
    title: 'Event & Web Lead',
    organization: 'Team Soularc',
    period: 'Lead',
    description: 'Spearheaded web platform planning and organizational logistics for large-scale campus events like Holi Soul 2026.',
    icon: <Users size={18} />,
    color: '#10b981'
  },
  {
    type: 'achievement',
    title: 'Startup Ideation Recognition',
    organization: 'Innovation Hub',
    period: 'Recognized Candidate',
    description: 'Recognized for strong project pitching and the ability to translate technical builds into viable business concepts.',
    icon: <Rocket size={18} />,
    color: '#ef4444'
  }
];

const Resume = () => {
  return (
    <section id="resume" className="resume reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">My Journey</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">A timeline of my academic path, achievements, and leadership roles.</p>
        </div>

        <div className="timeline">
          {journeyData.map((item, idx) => (
            <div key={idx} className={`timeline-item ${idx % 2 !== 0 ? 'alt' : ''}`}>
              <div className="timeline-dot glass-card" style={{ color: item.color }}>
                {item.icon}
              </div>
              
              <div className="timeline-content glass-card">
                <div className="timeline-date" style={{ color: item.color }}>
                  <Calendar size={14} /> {item.period}
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <h4 className="timeline-org">{item.organization}</h4>
                <p className="timeline-desc">{item.description}</p>
                <div className="timeline-badge" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                  {item.type}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="resume-cta">
          <a href={resumeFile} download="Manish_Suryawanshi_Resume.pdf" className="btn btn-primary">
            <Download size={18} /> Download Resume
          </a>
          <a href={cvFile} download="Manish_Suryawanshi_CV.pdf" className="btn btn-secondary">
            <FileText size={18} /> View Full CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resume;
