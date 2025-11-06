'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Box } from '@react-three/drei';
import * as THREE from 'three';

// Computer Desk Component
function ComputerDesk() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={[0, -1, 0]}>
      {/* Desk Surface */}
      <Box args={[4, 0.1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Monitor */}
      <Box args={[1.5, 0.9, 0.1]} position={[0, 0.5, -0.7]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      
      {/* Monitor Screen with glow */}
      <Box args={[1.3, 0.7, 0.02]} position={[0, 0.5, -0.64]}>
        <meshStandardMaterial 
          color="#0066cc" 
          emissive="#001133"
          emissiveIntensity={0.5}
        />
      </Box>

      {/* Keyboard */}
      <Box args={[0.8, 0.05, 0.3]} position={[0, 0.08, -0.2]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>

      {/* Mouse */}
      <Box args={[0.1, 0.03, 0.15]} position={[0.5, 0.08, -0.1]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>

      {/* Coffee Cup */}
      <Box args={[0.12, 0.15, 0.12]} position={[-1.2, 0.15, 0.3]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
    </group>
  );
}

// Floating Code Symbols using predefined positions
function CodeSymbols() {
  const symbols = useMemo(() => [
    { pos: [-2, 1, 0] as [number, number, number] },
    { pos: [-1.5, 1.5, 1] as [number, number, number] },
    { pos: [-1, 0.5, -1] as [number, number, number] },
    { pos: [2, 2, 0] as [number, number, number] },
    { pos: [2.5, 1, 1] as [number, number, number] },
    { pos: [1.5, 2.5, -1] as [number, number, number] }
  ], []);

  return (
    <group>
      {symbols.map((symbol, index) => (
        <Float
          key={index}
          speed={1 + index * 0.2}
          rotationIntensity={0.3}
          floatIntensity={0.4}
        >
          <Box args={[0.2, 0.2, 0.1]} position={symbol.pos}>
            <meshStandardMaterial 
              color="#6366f1" 
              emissive="#1e1b4b"
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </Box>
        </Float>
      ))}
    </group>
  );
}

// Particles with predefined positions
function Particles() {
  const mesh = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    // Use a deterministic pattern instead of Math.random
    const particleCount = 50;
    const pos = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Create a pseudo-random but deterministic pattern using index
      const seed = i * 0.1;
      pos[i * 3] = (Math.sin(seed) * Math.cos(seed * 2)) * 4;
      pos[i * 3 + 1] = (Math.sin(seed * 1.5) * Math.cos(seed)) * 3;
      pos[i * 3 + 2] = (Math.cos(seed) * Math.sin(seed * 0.8)) * 3;
    }
    
    return pos;
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#6366f1" transparent opacity={0.8} />
    </points>
  );
}

// Loading Component
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-xs text-muted-foreground">Loading 3D Scene...</p>
      </div>
    </div>
  );
}

// Main 3D Scene Component
export default function ThreeDScene() {
  return (
    <div className="hidden lg:block absolute right-4 top-4 w-80 h-64 rounded-lg overflow-hidden opacity-70 hover:opacity-90 transition-opacity duration-300">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [4, 2, 4], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1}
          />
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#6366f1" />
          
          {/* Environment */}
          <Environment preset="city" background={false} />
          
          {/* 3D Objects */}
          <ComputerDesk />
          <CodeSymbols />
          <Particles />
          
          {/* Controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 4}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}