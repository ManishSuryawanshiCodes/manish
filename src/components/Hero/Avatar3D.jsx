import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { Sparkles, Bot } from 'lucide-react';
import * as THREE from 'three';

const MODEL_PATH = '/models/RobotExpressive.glb';

// Preload the local model immediately for instant rendering
try {
  useGLTF.preload(MODEL_PATH);
} catch {
  // Gracefully handle preload failure
}

// Detect WebGL availability
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

// Safe Error Boundary for 3D Context
class Safe3DBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Avatar3D switching to 2D holographic mode:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
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

// 3D Robot Model
const AvatarModel = ({ currentAnim, isScrolling, onClickAvatar }) => {
  const group = useRef();
  const activeAnimRef = useRef('Idle');
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, group);

  // Play and cross-fade animations smoothly
  useEffect(() => {
    if (!actions) return;
    const targetAnim = isScrolling ? 'Walking' : currentAnim;

    if (activeAnimRef.current !== targetAnim && actions[targetAnim]) {
      const prevAction = actions[activeAnimRef.current];
      const nextAction = actions[targetAnim];

      if (prevAction) prevAction.fadeOut(0.25);
      nextAction.reset().fadeIn(0.25).play();
      activeAnimRef.current = targetAnim;
    }
  }, [currentAnim, isScrolling, actions]);

  useFrame((state) => {
    if (!group.current || !scene) return;
    const mouse = state.mouse;
    const time = state.clock.getElapsedTime();
    
    // Head Tracking with safe lookup
    try {
      const head = scene.getObjectByName('Head');
      if (head) {
        head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouse.x * 0.45, 0.08);
        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouse.y * 0.25, 0.08);
      }
    } catch {
      // Safe guard against mesh traversal issues
    }

    // Natural idle body swaying
    group.current.rotation.y = Math.sin(time * 0.5) * 0.1 + mouse.x * 0.12;

    // Floating animation
    const floatOffset = isScrolling ? 0.18 : Math.sin(time * 1.8) * 0.08;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, floatOffset - 2.45, 0.08);
    
    // Subtle breathing scale
    const baseScale = 0.74;
    const breathingScale = baseScale + Math.sin(time * 2.2) * 0.006;
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

// Fallback Holographic 2D Interactive Robot
const HologramCompanion = ({ onClick, activeGesture }) => {
  return (
    <div className="hologram-companion-avatar" onClick={onClick}>
      <div className="hologram-outer-ring"></div>
      <div className="hologram-inner-core">
        <Bot size={32} className={`hologram-bot-icon ${activeGesture !== 'Idle' ? 'active-emote' : ''}`} />
      </div>
      <div className="hologram-pedestal-light"></div>
    </div>
  );
};

const getRouteGesture = (pathname) => {
  switch (pathname) {
    case '/':
      return { anim: 'Wave', msg: "Hi! I'm April 👋" };
    case '/about':
      return { anim: 'ThumbsUp', msg: "About MANish 💡" };
    case '/projects':
      return { anim: 'Dance', msg: "Explore Builds 🚀" };
    case '/skills':
      return { anim: 'Jump', msg: "Tech Stack ⚡" };
    case '/journey':
      return { anim: 'Yes', msg: "Milestones 🎓" };
    case '/contact':
      return { anim: 'Wave', msg: "Say Hello ✉️" };
    default:
      return { anim: 'Idle', msg: "April AI" };
  }
};

const Avatar3D = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [activeGesture, setActiveGesture] = useState('Idle');
  const [customMessage, setCustomMessage] = useState("April AI");
  const [use3DFallback, setUse3DFallback] = useState(!isWebGLAvailable());
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

  // Update gesture and speech bubble on route change
  useEffect(() => {
    const { anim, msg } = getRouteGesture(location.pathname);

    const activateTimer = setTimeout(() => {
      setActiveGesture(anim);
      setCustomMessage(msg);
      setShowBubble(true);
    }, 50);

    const resetTimer = setTimeout(() => {
      if (anim !== 'Idle') setActiveGesture('Idle');
      setShowBubble(false);
    }, 3400);

    return () => {
      clearTimeout(activateTimer);
      clearTimeout(resetTimer);
    };
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
    if (e) {
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
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

      {/* Avatar Container */}
      <div 
        className="compact-canvas-box" 
        onClick={handleAvatarClick} 
        onTouchEnd={handleAvatarClick}
        title="Click April to interact!"
      >
        {use3DFallback ? (
          <HologramCompanion onClick={handleAvatarClick} activeGesture={activeGesture} />
        ) : (
          <Safe3DBoundary 
            onError={() => setUse3DFallback(true)} 
            fallback={<HologramCompanion onClick={handleAvatarClick} activeGesture={activeGesture} />}
          >
            <Canvas 
              shadows 
              dpr={[1, 2]} 
              gl={{ 
                alpha: true, 
                antialias: true, 
                powerPreference: "high-performance",
                preserveDrawingBuffer: false 
              }}
              camera={{ position: [0, 0, 8.2], fov: 35 }}
              aria-label="3D Avatar Companion April"
              onCreated={({ gl }) => {
                gl.domElement.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                  console.warn('WebGL context lost, switching to holographic fallback');
                  setUse3DFallback(true);
                }, false);
              }}
            >
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 10, 7]} intensity={2.0} />
              <pointLight position={[-6, -3, -5]} color="#8b5cf6" intensity={2.6} />
              <pointLight position={[6, -2, 5]} color="#06b6d4" intensity={2.2} />
              
              <Suspense fallback={null}>
                <AvatarModel 
                  currentAnim={activeGesture}
                  isScrolling={isScrolling} 
                  onClickAvatar={handleAvatarClick}
                />
                <ContactShadows opacity={0.35} scale={6} blur={2} far={3.5} />
              </Suspense>
            </Canvas>
          </Safe3DBoundary>
        )}
      </div>
    </div>
  );
};

export default Avatar3D;
