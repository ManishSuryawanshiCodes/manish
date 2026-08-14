import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Clock
} from 'lucide-react';
import { personalInfo } from '../data/personal';
import './ContactPage.css';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const ContactPage = () => {
  const [state, handleSubmit] = useForm("xeevvznl");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  if (state.succeeded) {
    return (
      <motion.div 
        className="page-container contact-page"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="container">
          <div className="contact-success-box glass-card">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={80} className="success-icon" />
            </div>
            <h1 className="success-heading gradient-text">Transmission Received!</h1>
            <p className="success-message">
              Your message has been beamed directly to Manish's inbox. Expect a response through the communication channels within 24 hours.
            </p>
            <div className="success-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Send Another Transmission
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="page-container contact-page"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-pill-badge">
            <Mail size={14} />
            <span>Connection Terminal</span>
          </div>
          <h1 className="section-title">Get In Touch</h1>
          <p className="section-subtitle">
            Have a project, job opportunity, or groundbreaking AI idea? Let's discuss how we can build it together.
          </p>
        </div>

        <div className="contact-layout-grid">
          {/* Left Column: Direct Info & Availability */}
          <div className="contact-info-column">
            <div className="status-badge-card glass-card">
              <div className="status-indicator-dot"></div>
              <div className="status-text-info">
                <h4>Available for Opportunities</h4>
                <p>Open for full-time roles, freelance projects & AI consulting</p>
              </div>
            </div>

            <div className="contact-details-card glass-card">
              <h3 className="hub-title">Direct Relays</h3>

              {/* Email */}
              <div className="relay-item">
                <div className="relay-icon-box">
                  <Mail size={18} />
                </div>
                <div className="relay-info">
                  <span className="relay-label">Email Address</span>
                  <a href={`mailto:${personalInfo.socials.email}`} className="relay-value">
                    {personalInfo.socials.email}
                  </a>
                </div>
                <button 
                  className="copy-action-btn"
                  onClick={() => copyToClipboard(personalInfo.socials.email, 'email')}
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={16} className="copied-check" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone */}
              <div className="relay-item">
                <div className="relay-icon-box">
                  <Phone size={18} />
                </div>
                <div className="relay-info">
                  <span className="relay-label">Direct Phone</span>
                  <a href={`tel:${personalInfo.socials.phone}`} className="relay-value">
                    {personalInfo.socials.phone}
                  </a>
                </div>
                <button 
                  className="copy-action-btn"
                  onClick={() => copyToClipboard(personalInfo.socials.phone, 'phone')}
                  title="Copy phone number to clipboard"
                >
                  {copiedPhone ? <Check size={16} className="copied-check" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Location */}
              <div className="relay-item">
                <div className="relay-icon-box">
                  <MapPin size={18} />
                </div>
                <div className="relay-info">
                  <span className="relay-label">Location</span>
                  <span className="relay-value">{personalInfo.socials.location}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="contact-social-row">
                <a 
                  href={personalInfo.socials.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-btn glass-card"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon /> <span>GitHub</span>
                </a>
                <a 
                  href={personalInfo.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-btn glass-card"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon /> <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* SLA Card */}
            <div className="sla-card glass-card">
              <Clock size={20} className="sla-icon" />
              <div>
                <h4>Response SLA Guarantee</h4>
                <p>Messages received via this terminal are acknowledged within 24 hours.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="contact-form-column">
            <form className="transmission-form glass-card" onSubmit={handleSubmit}>
              <div className="form-head">
                <h3 className="form-title">
                  <Sparkles size={20} className="form-head-icon" /> Transmit Message
                </h3>
                <p className="form-desc">Fill in the fields below to dispatch an encrypted message.</p>
              </div>

              <div className="form-inputs-grid">
                <div className="input-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="e.g. Satoshi Nakamoto" 
                    required 
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} className="error-text" />
                </div>

                <div className="input-group">
                  <label htmlFor="email">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="e.g. name@company.com" 
                    required 
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="error-text" />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="subject">Subject / Purpose</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="e.g. Full-Stack Role / AI Project Collaboration" 
                  required 
                />
                <ValidationError prefix="Subject" field="subject" errors={state.errors} className="error-text" />
              </div>

              <div className="input-group">
                <label htmlFor="message">Message Payload</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  placeholder="Tell me about your project scope, goals, or timeline..." 
                  required
                ></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} className="error-text" />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block submit-btn"
                disabled={state.submitting}
              >
                {state.submitting ? (
                  <span>Transmitting Payload...</span>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
