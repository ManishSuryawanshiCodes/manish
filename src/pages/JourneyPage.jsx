import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  Target, 
  Users, 
  Rocket, 
  Calendar, 
  Download, 
  FileText, 
  Sparkles, 
  ExternalLink,
  CheckCircle2,
  Building,
  ArrowRight
} from 'lucide-react';
import resumeFile from '../assets/Manish_Suryawanshi_Resume.pdf';
import cvFile from '../assets/manish 2026 CV.pdf';
import './JourneyPage.css';

const journeyData = [
  {
    type: 'Education',
    title: 'Master of Computer Applications (MCA)',
    organization: 'DES Pune University',
    period: '2025 - 2027',
    description: 'Pursuing advanced computing curriculum, AI research, distributed databases, and full-stack software architecture. PRN: 3542511013.',
    icon: <GraduationCap size={20} />,
    color: '#8b5cf6',
    highlights: ['Focus: Advanced Distributed Computing & AI', 'PRN: 3542511013', 'Location: Pune, Maharashtra']
  },
  {
    type: 'Research',
    title: 'Avishkar Research Convention Presenter',
    organization: 'State-Level Research Competition',
    period: 'Presenter',
    description: 'Conducted high-level academic research and presented innovative technical architectures at the prestigious Maharashtra state-level Avishkar research convention.',
    icon: <Award size={20} />,
    color: '#06b6d4',
    highlights: ['State-level technical paper & prototype presentation', 'Rigorous peer and judge review']
  },
  {
    type: 'Competition',
    title: 'Promptopia University Finalist',
    organization: 'DES Pune University AI League',
    period: 'Finalist',
    description: 'Reached top finalist standing in a competitive university-wide prompt engineering and LLM orchestration challenge.',
    icon: <Target size={20} />,
    color: '#f59e0b',
    highlights: ['Context window optimization', 'Multi-agent prompt reasoning strategies']
  },
  {
    type: 'Leadership',
    title: 'Event & Web Lead',
    organization: 'Team Soularc',
    period: 'Lead Coordinator',
    description: 'Spearheaded the technical web architecture and digital operations for massive campus events like Holi Soul 2026, managing live registrations and logistics.',
    icon: <Users size={20} />,
    color: '#10b981',
    highlights: ['Built event registration engine', 'Coordinated campus-wide tech workflows']
  },
  {
    type: 'Innovation',
    title: 'Startup Ideation & Pitching Recognition',
    organization: 'University Innovation Hub',
    period: 'Recognized Candidate',
    description: 'Awarded commendations for conceptualizing viable SaaS digital products and presenting robust business models.',
    icon: <Rocket size={20} />,
    color: '#ec4899',
    highlights: ['Full product breakdown & MVP roadmap', 'Go-to-market and AI automation strategy']
  }
];

const JourneyPage = () => {
  const [filter, setFilter] = useState('All');

  const filterOptions = ['All', 'Education', 'Research', 'Competition', 'Leadership', 'Innovation'];

  const filteredJourney = filter === 'All'
    ? journeyData
    : journeyData.filter(item => item.type === filter);

  return (
    <motion.div 
      className="page-container journey-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-pill-badge">
            <GraduationCap size={14} />
            <span>Milestones & Growth</span>
          </div>
          <h1 className="section-title">My Journey</h1>
          <p className="section-subtitle">
            A chronological timeline of academic achievements, state-level research, hackathons, and technical leadership roles.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="journey-filters-row">
          {filterOptions.map((opt) => (
            <button
              key={opt}
              className={`journey-filter-btn ${filter === opt ? 'active' : ''}`}
              onClick={() => setFilter(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="journey-timeline">
          {filteredJourney.map((item, idx) => (
            <motion.div 
              key={idx}
              className="timeline-entry"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="timeline-marker" style={{ color: item.color, borderColor: item.color }}>
                {item.icon}
              </div>

              <div className="timeline-card glass-card glass-card-hover">
                <div className="timeline-header-row">
                  <span className="timeline-badge" style={{ backgroundColor: `${item.color}18`, color: item.color, borderColor: `${item.color}40` }}>
                    {item.type}
                  </span>
                  <span className="timeline-period">
                    <Calendar size={14} /> {item.period}
                  </span>
                </div>

                <h3 className="timeline-entry-title">{item.title}</h3>
                <h4 className="timeline-entry-org">
                  <Building size={15} /> {item.organization}
                </h4>
                <p className="timeline-entry-desc">{item.description}</p>

                <div className="timeline-highlights">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="timeline-highlight-tag">
                      <CheckCircle2 size={13} style={{ color: item.color }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credentials & Download CTA Box */}
        <section className="credentials-cta-section">
          <div className="credentials-banner glass-card">
            <div className="credentials-content">
              <h2 className="credentials-title">Verified Credentials & Resumes</h2>
              <p className="credentials-desc">
                Review verified academic transcripts, technical project portfolios, and complete professional CV.
              </p>
            </div>
            <div className="credentials-actions">
              <a href={resumeFile} download="Manish_Suryawanshi_Resume.pdf" className="btn btn-primary">
                <Download size={16} /> Download Resume
              </a>
              <a href={cvFile} download="Manish_Suryawanshi_CV.pdf" className="btn btn-secondary">
                <FileText size={16} /> View Curriculum Vitae
              </a>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default JourneyPage;
