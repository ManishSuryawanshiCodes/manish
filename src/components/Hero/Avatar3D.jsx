import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera, Environment, ContactShadows, Float, Html, Preload } from '@react-three/drei';
import * as THREE from 'three';

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const AvatarModel = ({ scrollY, isScrolling, activeSection }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb');
  const { actions, names } = useAnimations(animations, group);
  
  const [activeAnim, setActiveAnim] = useState('Idle');

  // Initial greeting as April
  useEffect(() => {
    if (actions && actions['Wave']) {
      actions['Wave'].reset().fadeIn(0.5).play();
      setTimeout(() => {
        actions['Wave'].fadeOut(0.5);
        actions['Idle'].reset().fadeIn(0.5).play();
        setActiveAnim('Idle');
      }, 3000);
    }
  }, [actions]);

  // Enhanced Animation Logic
  useEffect(() => {
    if (!actions || activeAnim === 'Wave' && actions['Wave'].isRunning()) return;
    
    let nextAnim = 'Idle';
    if (isScrolling) {
      nextAnim = 'Walking';
    } else if (activeSection === 'projects') {
      nextAnim = 'Dance';
    } else if (activeSection === 'skills') {
      nextAnim = 'Jump';
    } else if (activeSection === 'contact') {
      nextAnim = 'Wave';
    } else if (activeSection === 'about') {
      nextAnim = 'ThumbsUp';
    }

    if (activeAnim !== nextAnim && actions[nextAnim]) {
      actions[activeAnim]?.fadeOut(0.5);
      actions[nextAnim].reset().fadeIn(0.5).play();
      setActiveAnim(nextAnim);
    }
  }, [isScrolling, activeSection, actions, activeAnim]);

  useFrame((state, delta) => {
    const mouse = state.mouse;
    const time = state.clock.getElapsedTime();
    
    // 1. Head Tracking (Intelligence)
    const head = scene.getObjectByName('Head');
    if (head) {
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouse.x * 0.4, 0.1);
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouse.y * 0.2, 0.1);
    }

    // 2. Side-by-side Smooth Oscillation
    group.current.rotation.y = Math.sin(time * 0.4) * 0.15 + mouse.x * 0.2;

    // 3. Dynamic Physics-based Movement
    const floatHeight = isScrolling ? 0.35 : Math.sin(time * 1.8) * 0.12;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, floatHeight - 2.6, 0.1);
    
    // 4. Subtle "Breathing" Scale Effect
    const breathingScale = 0.7 + Math.sin(time * 2) * 0.005;
    group.current.scale.set(breathingScale, breathingScale, breathingScale);
  });

  return (
    <group ref={group} scale={0.7} position={[0, -2.5, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const Avatar3D = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollTimeout = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    ['home', 'about', 'skills', 'projects', 'resume', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const sectionMessages = {
    home: "Hi! I'm April, Manish's AI Assistant 👋",
    about: "I've helped Manish build amazing things! 🤖",
    skills: "This arsenal is quite impressive! ⚡",
    projects: "Shall we dance for these builds? 💃",
    resume: "Manish's journey is truly unique 📄",
    contact: "Send a message to my creator! ✉️"
  };

  return (
    <div className="fixed-avatar-container">
      <ErrorBoundary>
        <Canvas 
          shadows 
          dpr={[1, 1.5]} 
          gl={{ 
            alpha: true, 
            antialias: true, 
            powerPreference: "high-performance",
            preserveDrawingBuffer: true 
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
          <pointLight position={[-10, -5, -10]} color="#7c3aed" intensity={2} />
          
          <Suspense fallback={null}>
            <AvatarModel scrollY={scrollY} isScrolling={isScrolling} activeSection={activeSection} />
            <Environment preset="city" />
            <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} />
            <Preload all />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
      <div className="avatar-interaction-bubble glass-card">
        <p>{sectionMessages[activeSection] || "Scanning..."}</p>
        <div className="bubble-tail"></div>
      </div>
    </div>
  );
};

export default Avatar3D;
