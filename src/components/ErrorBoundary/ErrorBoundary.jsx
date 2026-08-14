import React from 'react';
import { RefreshCw, Home, AlertTriangle, Sparkles } from 'lucide-react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Antigravity Catch - Application Error:", error, errorInfo);
  }

  handleReload = () => {
    window.sessionStorage.removeItem('page-has-been-force-refreshed');
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <div className="error-boundary-card glass-card">
            <div className="error-icon-box">
              <AlertTriangle size={42} className="error-icon" />
              <div className="error-glow"></div>
            </div>
            
            <div className="error-badge">
              <Sparkles size={13} />
              <span>Experience Interrupted</span>
            </div>

            <h1 className="error-title gradient-text">Something unexpected happened</h1>
            <p className="error-description">
              A temporary runtime or network anomaly occurred while loading this section.
              You can instantly reload or return safely to the home orbit.
            </p>

            <div className="error-actions">
              <button className="btn btn-primary" onClick={this.handleReload}>
                <RefreshCw size={16} /> Reload Experience
              </button>
              <button className="btn btn-secondary" onClick={this.handleGoHome}>
                <Home size={16} /> Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
