import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera, Environment, ContactShadows, Float, Html } from '@react-three/drei';
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

  // Animation logic
  useEffect(() => {
    if (!actions) return;
    
    let nextAnim = 'Idle';
    if (isScrolling) {
      nextAnim = 'Walking';
    } else if (activeSection === 'contact') {
      nextAnim = 'Wave';
    } else if (activeSection === 'projects') {
      nextAnim = 'Dance';
    } else if (activeSection === 'skills') {
      nextAnim = 'Jump';
    }

    if (activeAnim !== nextAnim && actions[nextAnim]) {
      actions[activeAnim]?.fadeOut(0.5);
      actions[nextAnim].reset().fadeIn(0.5).play();
      setActiveAnim(nextAnim);
    }
  }, [isScrolling, activeSection, actions, activeAnim]);

  useFrame((state, delta) => {
    const mouse = state.mouse;
    
    // Head Tracking
    const head = scene.getObjectByName('Head');
    if (head) {
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouse.x * 0.4, 0.1);
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouse.y * 0.2, 0.1);
    }

    // Dynamic Floating/Wobble
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.3, 0.05);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, Math.sin(state.clock.elapsedTime) * 0.15, 0.1);
  });

  return (
    <group ref={group} scale={0.65} position={[0, -2, 0]}>
      <primitive object={scene} />
    </group>
  );
};

const Avatar3D = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const scrollTimeout = useRef();

  // Section Tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
    sections.forEach((id) => {
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
    home: "Welcome to my digital space! 🤖",
    about: "Let me tell you my story... 📖",
    skills: "Check out my technical arsenal! ⚡",
    projects: "I'm so proud of these builds! 🚀",
    resume: "Want to see my full history? 📄",
    contact: "Let's build something epic! ✉️"
  };

  return (
    <div className="fixed-avatar-container">
      <ErrorBoundary>
        <Canvas shadows dpr={[1, 2]} gl={{ alpha: true, antialias: true, shadowMapType: THREE.PCFShadowMap }}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
          
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -5, -10]} color="#7c3aed" intensity={1.5} />
          <pointLight position={[0, 5, 5]} color="#06b6d4" intensity={1} />
          
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
              <AvatarModel 
                scrollY={scrollY} 
                isScrolling={isScrolling} 
                activeSection={activeSection} 
              />
            </Float>
            <Environment preset="city" />
            <ContactShadows opacity={0.5} scale={10} blur={2.5} far={4.5} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
      
      <div className="avatar-interaction-bubble glass-card">
        <p>{sectionMessages[activeSection] || "Exploring..."}</p>
        <div className="bubble-tail"></div>
      </div>
    </div>
  );
};

export default Avatar3D;
