import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { personalInfo } from '../../data/personal';
import './Contact.css';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Contact = () => {
  const [state, handleSubmit] = useForm("xeevvznl");

  if (state.succeeded) {
    return (
      <section id="contact" className="contact reveal">
        <div className="container">
          <div className="contact-success-wrapper glass-card">
            <div className="success-icon-box">
              <CheckCircle2 size={100} className="success-check-icon" />
              <div className="success-glow"></div>
            </div>
            <h2 className="success-title gradient-text">Transmission Successful!</h2>
            <p className="success-desc">
              Your message has been beamed to Manish's headquarters. 
              Expect a response through the subspace relays shortly.
            </p>
            <div className="success-actions">
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Beam Another Message
              </button>
              <a href="#projects" className="btn btn-secondary">
                Explore Projects <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">Let's discuss your next project or a potential collaboration.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-subtitle">Connection Hub</h3>
            <p className="contact-info-text">
              I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="info-list">
              <div className="info-item">
                <div className="info-icon glass-card">
                  <Mail size={20} />
                </div>
                <div className="info-details">
                  <span>Email</span>
                  <p>{personalInfo.socials.email}</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon glass-card">
                  <Phone size={20} />
                </div>
                <div className="info-details">
                  <span>Phone</span>
                  <p>{personalInfo.socials.phone}</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon glass-card">
                  <MapPin size={20} />
                </div>
                <div className="info-details">
                  <span>Location</span>
                  <p>{personalInfo.socials.location}</p>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" className="social-link glass-card">
                <GithubIcon />
              </a>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link glass-card">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" name="name" id="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" name="email" id="email" placeholder="john@example.com" required />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="error-msg" />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" placeholder="Project Inquiry" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" rows="5" placeholder="Tell me more about your vision..." required></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} className="error-msg" />
              </div>
              
              <button type="submit" className="btn btn-primary btn-block transmit-btn" disabled={state.submitting}>
                {state.submitting ? (
                  <span className="loading-state">
                    <div className="spinner"></div> Transmitting...
                  </span>
                ) : (
                  <>
                    Transmit Message <Send size={18} className="send-icon" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
