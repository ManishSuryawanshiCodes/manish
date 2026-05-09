import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import { useTheme } from './hooks/useTheme';
import { useScrollReveal } from './hooks/useScrollReveal';
import './App.css';
import Avatar3D from './components/Hero/Avatar3D';

function App() {
  const { theme, toggleTheme } = useTheme();
  useScrollReveal();

  return (
    <div className="app">
      <ParticleBackground />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      {/* 3D Avatar now accompanies the user globally */}
      <Avatar3D />

      <main>
        <Hero />
        <About />
        <Skills />
        <Resume />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
