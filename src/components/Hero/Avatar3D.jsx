import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei';
import { useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import * as THREE from 'three';

const MODEL_PATH = '/models/RobotExpressive.glb';

// Preload the local model immediately for instant rendering
try {
  useGLTF.preload(MODEL_PATH);
} catch {
  // Gracefully handle preload
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
    <group position={[0, -2.4, 0]}>
      {/* Outer Rotating Energy Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.05, 1.25, 32]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.4} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      
      {/* Inner Glowing Disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <circleGeometry args={[0.95, 32]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          transparent 
          opacity={0.2} 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  );
};

// 3D Robot Model Component
const AvatarModel = ({ currentAnim, onClickAvatar }) => {
  const group = useRef();
  const activeAnimRef = useRef('Idle');
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, group);

  // Play and cross-fade animations smoothly
  useEffect(() => {
    if (!actions) return;
    const targetAnim = currentAnim || 'Idle';

    if (actions[targetAnim]) {
      const prevAction = actions[activeAnimRef.current];
      const nextAction = actions[targetAnim];

      if (prevAction && activeAnimRef.current !== targetAnim) {
        prevAction.fadeOut(0.25);
      }
      nextAction.reset().fadeIn(0.25).play();
      activeAnimRef.current = targetAnim;
    }
  }, [currentAnim, actions]);

  useFrame((state) => {
    if (!group.current || !scene) return;
    const mouse = state.mouse;
    const time = state.clock.getElapsedTime();
    
    // Head Tracking with safe lookup
    try {
      const head = scene.getObjectByName('Head');
      if (head) {
        // Look towards mouse on desktop, or natural ambient movement on mobile
        const targetHeadY = (mouse && mouse.x !== 0) ? mouse.x * 0.45 : Math.sin(time * 0.8) * 0.15;
        const targetHeadX = (mouse && mouse.y !== 0) ? -mouse.y * 0.2 : Math.cos(time * 1.1) * 0.08;
        head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetHeadY, 0.08);
        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetHeadX, 0.08);
      }
    } catch {
      // Safe guard
    }

    // Natural idle body swaying
    group.current.rotation.y = Math.sin(time * 0.6) * 0.12 + (mouse ? mouse.x * 0.08 : 0);

    // Smooth floating physics
    const floatOffset = Math.sin(time * 1.8) * 0.08;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, floatOffset - 2.38, 0.08);
    
    // Subtle breathing scale
    const baseScale = 0.76;
    const breathingScale = baseScale + Math.sin(time * 2.2) * 0.006;
    group.current.scale.set(breathingScale, breathingScale, breathingScale);
  });

  return (
    <group 
      ref={group} 
      position={[0, -2.38, 0]}
      onClick={onClickAvatar}
    >
      <primitive object={scene} />
      <HolographicPedestal />
    </group>
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
  const [showBubble, setShowBubble] = useState(false);
  const [activeGesture, setActiveGesture] = useState('Idle');
  const [customMessage, setCustomMessage] = useState("April AI");
  const location = useLocation();

  // Update gesture and speech bubble on route change
  useEffect(() => {
    const { anim, msg } = getRouteGesture(location.pathname);

    const activateTimer = setTimeout(() => {
      setActiveGesture(anim);
      setCustomMessage(msg);
      setShowBubble(true);
    }, 100);

    const resetTimer = setTimeout(() => {
      setActiveGesture('Idle');
      setShowBubble(false);
    }, 3500);

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
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }
    const randomGestures = [
      { anim: 'Wave', msg: "Hey there! 👋" },
      { anim: 'Dance', msg: "Clean code! 💃" },
      { anim: 'Jump', msg: "High energy! ⚡" },
      { anim: 'ThumbsUp', msg: "Top tier! 👍" },
      { anim: 'Yes', msg: "Let's build! 🚀" }
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

      {/* 3D Avatar Canvas Container */}
      <div 
        className="compact-canvas-box" 
        onClick={handleAvatarClick} 
        onTouchEnd={handleAvatarClick}
        title="Click April to interact!"
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
            // Prevent WebGL context loss on mobile scroll
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
            }, false);
          }}
        >
          <ambientLight intensity={1.6} />
          <directionalLight position={[5, 10, 7]} intensity={2.2} />
          <pointLight position={[-6, -3, -5]} color="#8b5cf6" intensity={2.8} />
          <pointLight position={[6, -2, 5]} color="#06b6d4" intensity={2.4} />
          
          <Suspense fallback={null}>
            <AvatarModel 
              currentAnim={activeGesture}
              onClickAvatar={handleAvatarClick}
            />
            <ContactShadows opacity={0.35} scale={6} blur={2} far={3.5} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default Avatar3D;
