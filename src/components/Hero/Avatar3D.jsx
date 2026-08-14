import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera, Environment, ContactShadows, Preload } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { 
  Bot, 
  Minimize2, 
  Maximize2, 
  Sparkles, 
  X, 
  Zap, 
  Volume2
} from 'lucide-react';
import * as THREE from 'three';

// Safe Error Boundary for 3D Context
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) {
    console.warn("Avatar3D context error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// 3D Holographic Base Pedestal
const HolographicPedestal = () => {
  const ringRef = useRef();

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.015;
    }
  });

  return (
    <group position={[0, -2.48, 0]}>
      {/* Outer Rotating Energy Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.3, 32]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.35} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      {/* Inner Glowing Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[1.0, 32]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          transparent 
          opacity={0.15} 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  );
};

const AvatarModel = ({ currentAnim, isScrolling, onClickAvatar }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb');
  const { actions } = useAnimations(animations, group);
  
  const [activeAnim, setActiveAnim] = useState('Idle');
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!actions) return;
    const targetAnim = isScrolling ? 'Walking' : currentAnim;
    
    if (activeAnim !== targetAnim && actions[targetAnim]) {
      actions[activeAnim]?.fadeOut(0.35);
      actions[targetAnim].reset().fadeIn(0.35).play();
      setActiveAnim(targetAnim);
    }
  }, [currentAnim, isScrolling, actions, activeAnim]);

  useFrame((state) => {
    if (!group.current) return;
    const mouse = state.mouse;
    const time = state.clock.getElapsedTime();
    
    // Head Tracking
    const head = scene.getObjectByName('Head');
    if (head) {
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouse.x * 0.4, 0.08);
      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouse.y * 0.2, 0.08);
    }

    // Side oscillation
    group.current.rotation.y = Math.sin(time * 0.4) * 0.15 + mouse.x * 0.15;

    // Physics float
    const floatOffset = isScrolling ? 0.25 : Math.sin(time * 1.6) * 0.12;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, floatOffset - 2.5, 0.08);
    
    // Breathing scale
    const baseScale = isMobile ? 0.65 : 0.72;
    const breathingScale = baseScale + Math.sin(time * 2) * 0.005;
    group.current.scale.set(breathingScale, breathingScale, breathingScale);
  });

  return (
    <group 
      ref={group} 
      position={[0, -2.5, 0]}
      onClick={onClickAvatar}
    >
      <primitive object={scene} />
      <HolographicPedestal />
    </group>
  );
};

const Avatar3D = () => {
  const isInitialMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMinimized, setIsMinimized] = useState(isInitialMobile);
  const [showBubble, setShowBubble] = useState(false);
  const [activeGesture, setActiveGesture] = useState('Wave');
  const [customMessage, setCustomMessage] = useState("Hi! I'm April, MANish's AI companion! 👋");
  const location = useLocation();
  const scrollTimeout = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Update gesture and dialog on route change
  useEffect(() => {
    let anim = 'Idle';
    let msg = "Hi! I'm April, MANish's AI companion! 👋";

    switch (location.pathname) {
      case '/':
        anim = 'Wave';
        msg = "Welcome to MANish's Orbit! 👋";
        break;
      case '/about':
        anim = 'ThumbsUp';
        msg = "Explore MANish's story & mindset! 💡";
        break;
      case '/projects':
        anim = 'Dance';
        msg = "Check out these full-stack builds! 🚀";
        break;
      case '/skills':
        anim = 'Jump';
        msg = "An optimized technical arsenal! ⚡";
        break;
      case '/journey':
        anim = 'Yes';
        msg = "Milestones & verified credentials! 🎓";
        break;
      case '/contact':
        anim = 'Wave';
        msg = "Let's build something epic together! ✉️";
        break;
      default:
        anim = 'Idle';
        msg = "Scanning environment...";
    }

    setActiveGesture(anim);
    setCustomMessage(msg);
    
    // Only auto-show bubble on desktop so it doesn't block mobile screen
    if (window.innerWidth >= 768) {
      setShowBubble(true);
      const timer = setTimeout(() => {
        if (anim !== 'Idle') setActiveGesture('Idle');
        setShowBubble(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const triggerEmote = (gestureName, message) => {
    setActiveGesture(gestureName);
    setCustomMessage(message);
    setShowBubble(true);

    setTimeout(() => {
      setActiveGesture('Idle');
    }, 3500);
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    const randomGestures = [
      { anim: 'Wave', msg: "Hey there! Having fun exploring? 👋" },
      { anim: 'Dance', msg: "Let's celebrate clean code! 💃" },
      { anim: 'Jump', msg: "High energy, zero latency! ⚡" },
      { anim: 'ThumbsUp', msg: "MANish is ready for new challenges! 👍" },
      { anim: 'Yes', msg: "100% committed to engineering excellence! ✨" }
    ];
    const pick = randomGestures[Math.floor(Math.random() * randomGestures.length)];
    triggerEmote(pick.anim, pick.msg);
  };

  return (
    <>
      {/* Minimized Floating FAB (Clean & Non-obstructive) */}
      {isMinimized ? (
        <div className="avatar-minimized-fab-wrapper">
          <button 
            className="avatar-fab-btn glass-card"
            onClick={() => setIsMinimized(false)}
            title="Open 3D AI Companion (April)"
            aria-label="Open 3D AI Companion April"
          >
            <div className="fab-avatar-pulse"></div>
            <Bot size={20} className="fab-bot-icon" />
            <span className="fab-text">April AI</span>
          </button>
        </div>
      ) : (
        /* Full 3D Companion Dock */
        <div className="fixed-avatar-container">
          {/* Action Header / Controls */}
          <div className="avatar-top-controls">
            <div className="avatar-emote-bar glass-card">
              <button 
                onClick={() => triggerEmote('Wave', "April says hi! 👋")} 
                title="Wave Gesture" 
                className="emote-pill-btn"
              >
                👋
              </button>
              <button 
                onClick={() => triggerEmote('Dance', "Grooving to clean code! 💃")} 
                title="Dance Gesture" 
                className="emote-pill-btn"
              >
                💃
              </button>
              <button 
                onClick={() => triggerEmote('Jump', "Powering up! ⚡")} 
                title="Jump" 
                className="emote-pill-btn"
              >
                ⚡
              </button>
              <button 
                onClick={() => triggerEmote('ThumbsUp', "Top-tier quality approved! 👍")} 
                title="Thumbs Up" 
                className="emote-pill-btn"
              >
                👍
              </button>
            </div>

            <button 
              className="avatar-toggle-btn glass-card"
              onClick={() => setIsMinimized(true)}
              title="Minimize Companion"
              aria-label="Minimize 3D avatar companion"
            >
              <Minimize2 size={16} />
            </button>
          </div>

          {/* 3D WebGL Canvas */}
          <div className="avatar-canvas-wrapper">
            <ErrorBoundary>
              <Canvas 
                shadows 
                dpr={[1, 1.5]} 
                gl={{ 
                  alpha: true, 
                  antialias: true, 
                  powerPreference: "high-performance",
                  preserveDrawingBuffer: false 
                }}
                camera={{ position: [0, 0, 9], fov: 35 }}
                aria-label="3D Interactive Robot Avatar named April"
              >
                <ambientLight intensity={1.1} />
                <directionalLight position={[5, 10, 7]} intensity={1.8} castShadow />
                <pointLight position={[-8, -4, -6]} color="#8b5cf6" intensity={2.2} />
                <pointLight position={[6, -2, 6]} color="#06b6d4" intensity={2.0} />
                <pointLight position={[0, 4, -5]} color="#f43f5e" intensity={1.2} />
                
                <Suspense fallback={null}>
                  <AvatarModel 
                    currentAnim={activeGesture}
                    isScrolling={isScrolling} 
                    onClickAvatar={handleAvatarClick}
                  />
                  <Environment preset="city" />
                  <ContactShadows opacity={0.4} scale={8} blur={2.2} far={4} />
                  <Preload all />
                </Suspense>
              </Canvas>
            </ErrorBoundary>
          </div>

          {/* Speech Bubble */}
          {showBubble && (
            <div 
              className="avatar-interaction-bubble glass-card"
              onClick={() => setShowBubble(false)}
              title="Click to dismiss"
            >
              <div className="bubble-sparkle-row">
                <Sparkles size={12} className="bubble-spark" />
                <span className="bubble-tag">APRIL AI</span>
              </div>
              <p>{customMessage}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Avatar3D;
