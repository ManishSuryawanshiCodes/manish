import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera, Environment, ContactShadows, Preload } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { Sparkles, Bot } from 'lucide-react';
import * as THREE from 'three';

// Safe Error Boundary for 3D Context
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, errorInfo) {
    console.warn("Avatar3D error:", error, errorInfo);
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
        <ringGeometry args={[1.05, 1.25, 32]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.35} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      {/* Inner Glowing Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[0.95, 32]} />
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

  useEffect(() => {
    if (!actions) return;
    const targetAnim = isScrolling ? 'Walking' : currentAnim;
    
    if (activeAnim !== targetAnim && actions[targetAnim]) {
      actions[activeAnim]?.fadeOut(0.3);
      actions[targetAnim].reset().fadeIn(0.3).play();
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
    group.current.rotation.y = Math.sin(time * 0.4) * 0.12 + mouse.x * 0.12;

    // Physics float
    const floatOffset = isScrolling ? 0.2 : Math.sin(time * 1.6) * 0.1;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, floatOffset - 2.45, 0.08);
    
    // Subtle breathing scale
    const baseScale = 0.72;
    const breathingScale = baseScale + Math.sin(time * 2) * 0.005;
    group.current.scale.set(breathingScale, breathingScale, breathingScale);
  });

  return (
    <group 
      ref={group} 
      position={[0, -2.45, 0]}
      onClick={onClickAvatar}
    >
      <primitive object={scene} />
      <HolographicPedestal />
    </group>
  );
};

const Avatar3D = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [activeGesture, setActiveGesture] = useState('Idle');
  const [customMessage, setCustomMessage] = useState("April AI");
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
    let msg = "April AI";

    switch (location.pathname) {
      case '/':
        anim = 'Wave';
        msg = "Hi! I'm April 👋";
        break;
      case '/about':
        anim = 'ThumbsUp';
        msg = "About MANish 💡";
        break;
      case '/projects':
        anim = 'Dance';
        msg = "Explore Builds 🚀";
        break;
      case '/skills':
        anim = 'Jump';
        msg = "Tech Stack ⚡";
        break;
      case '/journey':
        anim = 'Yes';
        msg = "Milestones 🎓";
        break;
      case '/contact':
        anim = 'Wave';
        msg = "Say Hello ✉️";
        break;
      default:
        anim = 'Idle';
        msg = "April AI";
    }

    setActiveGesture(anim);
    setCustomMessage(msg);
    setShowBubble(true);

    const timer = setTimeout(() => {
      if (anim !== 'Idle') setActiveGesture('Idle');
      setShowBubble(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const triggerEmote = (gestureName, message) => {
    setActiveGesture(gestureName);
    setCustomMessage(message);
    setShowBubble(true);

    setTimeout(() => {
      setActiveGesture('Idle');
      setShowBubble(false);
    }, 3200);
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    const randomGestures = [
      { anim: 'Wave', msg: "Hey there! 👋" },
      { anim: 'Dance', msg: "Clean code! 💃" },
      { anim: 'Jump', msg: "High energy! ⚡" },
      { anim: 'ThumbsUp', msg: "Top tier! 👍" }
    ];
    const pick = randomGestures[Math.floor(Math.random() * randomGestures.length)];
    triggerEmote(pick.anim, pick.msg);
  };

  return (
    <div className="compact-avatar-dock">
      {/* Speech Bubble / Badge */}
      {showBubble && (
        <div 
          className="compact-avatar-bubble glass-card"
          onClick={() => setShowBubble(false)}
          title="Click to dismiss"
        >
          <Sparkles size={11} className="bubble-spark" />
          <span>{customMessage}</span>
        </div>
      )}

      {/* 3D Canvas Container */}
      <div className="compact-canvas-box" onClick={handleAvatarClick} title="Click April to interact!">
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
            camera={{ position: [0, 0, 8.5], fov: 35 }}
            aria-label="3D Avatar Companion April"
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 10, 7]} intensity={1.8} />
            <pointLight position={[-6, -3, -5]} color="#8b5cf6" intensity={2.2} />
            <pointLight position={[6, -2, 5]} color="#06b6d4" intensity={2.0} />
            
            <Suspense fallback={null}>
              <AvatarModel 
                currentAnim={activeGesture}
                isScrolling={isScrolling} 
                onClickAvatar={handleAvatarClick}
              />
              <Environment preset="city" />
              <ContactShadows opacity={0.35} scale={6} blur={2} far={3.5} />
              <Preload all />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Mini Emote Action Strip */}
      <div className="compact-emote-strip glass-card">
        <button 
          onClick={(e) => { e.stopPropagation(); triggerEmote('Wave', "April says hi! 👋"); }} 
          title="Wave" 
          className="mini-emote-btn"
        >
          👋
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); triggerEmote('Dance', "Dancing! 💃"); }} 
          title="Dance" 
          className="mini-emote-btn"
        >
          💃
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); triggerEmote('Jump', "Power Up! ⚡"); }} 
          title="Jump" 
          className="mini-emote-btn"
        >
          ⚡
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); triggerEmote('ThumbsUp', "Approved! 👍"); }} 
          title="Thumbs Up" 
          className="mini-emote-btn"
        >
          👍
        </button>
      </div>
    </div>
  );
};

export default Avatar3D;
