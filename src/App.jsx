import { useState, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import Avatar3D from './components/Hero/Avatar3D';
import CommandPalette from './components/CommandPalette/CommandPalette';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { lazyWithRetry } from './utils/lazyWithRetry';

import { useTheme } from './hooks/useTheme';
import './App.css';

// Code-split pages with chunk-failure resilience & automatic retry
const HomePage = lazyWithRetry(() => import('./pages/HomePage'));
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage'));
const ProjectsPage = lazyWithRetry(() => import('./pages/ProjectsPage'));
const SkillsPage = lazyWithRetry(() => import('./pages/SkillsPage'));
const JourneyPage = lazyWithRetry(() => import('./pages/JourneyPage'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage'));

// Sleek glass page loader fallback
const PageLoader = () => (
  <div className="page-loader-wrapper">
    <div className="page-loader-spinner"></div>
    <span className="page-loader-text">Loading Experience...</span>
  </div>
);

function App() {
  const { theme, toggleTheme } = useTheme();
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const location = useLocation();

  return (
    <ErrorBoundary>
      <div className="app" data-theme={theme}>
        {/* 60fps Ambient Particle Background */}
        <ParticleBackground />

        {/* Modern Floating Header Navbar */}
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onOpenCmdK={() => setIsCmdKOpen(true)} 
        />

        {/* Interactive 3D Robot Assistant (April) with Safe Fallbacks */}
        <Avatar3D />

        {/* Global Quick Command & Search Palette (Ctrl + K) */}
        <CommandPalette 
          isOpen={isCmdKOpen} 
          onClose={setIsCmdKOpen} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />

        {/* Main Routed Content with Fluid Animated Page Transitions & Lazy Loading */}
        <main>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/skills" element={<SkillsPage />} />
                  <Route path="/journey" element={<JourneyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </ErrorBoundary>
        </main>

        {/* Modern Glass Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
