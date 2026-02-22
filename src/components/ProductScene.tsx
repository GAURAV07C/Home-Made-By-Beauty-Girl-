import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows, PresentationControls, RoundedBox, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function SoapBar() {
  const mesh = useRef<THREE.Group>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    if (mesh.current) {
      mesh.current.rotation.y = time.current * 0.15;
      mesh.current.position.y = Math.sin(time.current * 0.5) * 0.1;
    }
  });

  return (
    <group ref={mesh}>
      <RoundedBox args={[2.8, 1.8, 0.7]} radius={0.15} smoothness={8} castShadow receiveShadow>
        <meshPhysicalMaterial 
          color="#e8f5e9"
          roughness={0.15}
          metalness={0.05}
          transmission={0.15}
          thickness={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      
      {/* Inner glow effect */}
      <RoundedBox args={[2.6, 1.6, 0.5]} radius={0.12} smoothness={4}>
        <meshBasicMaterial color="#c8e6c9" transparent opacity={0.3} />
      </RoundedBox>

      {/* Golden shimmer accent */}
      <mesh position={[0, 0, 0.36]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.2, 0.15]} />
        <meshStandardMaterial color="#ffd54f" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingIngredient({ 
  position, 
  color, 
  emissive = "#000",
  size = 0.25, 
  type = 'sphere', 
  speed = 1,
  delay = 0
}: {
  position: [number, number, number];
  color: string;
  emissive?: string;
  size?: number;
  type?: 'sphere' | 'capsule' | 'leaf' | 'drop';
  speed?: number;
  delay?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const time = useRef(delay);
  
  useFrame((state, delta) => {
    time.current += delta * speed;
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(time.current) * 0.15;
      mesh.current.rotation.x = Math.sin(time.current * 0.5) * 0.3;
      mesh.current.rotation.z = Math.cos(time.current * 0.3) * 0.2;
    }
  });

  const geometry = useMemo(() => {
    switch(type) {
      case 'capsule': 
        return new THREE.CapsuleGeometry(size * 0.4, size * 1.2, 8, 16);
      case 'leaf': 
        return new THREE.ConeGeometry(size * 0.8, size * 2, 6);
      case 'drop':
        return new THREE.SphereGeometry(size, 16, 16);
      default: 
        return new THREE.SphereGeometry(size, 24, 24);
    }
  }, [type, size]);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={mesh} 
        position={position} 
        geometry={geometry} 
        castShadow
      >
        <meshPhysicalMaterial 
          color={color}
          emissive={emissive}
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.1}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 2
        ] as [number, number, number],
        size: Math.random() * 0.03 + 0.01,
        speed: Math.random() * 0.5 + 0.5
      });
    }
    return temp;
  }, []);

  return (
    <group>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed} floatIntensity={2}>
          <mesh position={p.position}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial color="#ffd700" transparent opacity={0.4} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#fff5e6" />
      <spotLight 
        position={[5, 8, 5]} 
        angle={0.25} 
        penumbra={1} 
        intensity={1.5} 
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#fffaf0"
      />
      <spotLight 
        position={[-5, 5, -3]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.8}
        color="#e8f5e9"
      />
      <pointLight position={[0, -3, 3]} intensity={0.3} color="#ffd54f" />
      <Environment preset="studio" />
    </>
  );
}

function Scene() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  return (
    <>
      <SceneLighting />

      <PresentationControls
        global
        zoom={isMobile ? 0.7 : 0.9}
        rotation={[0.1, 0, 0]}
        polar={[-Math.PI / 8, Math.PI / 8]}
        azimuth={[-Math.PI / 6, Math.PI / 6]}
        config={{ mass: 2, tension: 300 }}
        snap={{ mass: 4, tension: 300 }}
      >
        <group position={[0, 0, 0]} scale={isMobile ? 0.85 : 1}>
          <SoapBar />

          {/* Aloe Vera - Fresh Green */}
          <FloatingIngredient 
            position={[-2.2, 1.2, -0.5]} 
            color="#4caf50" 
            emissive="#2e7d32"
            type="leaf" 
            size={0.35}
            delay={0}
          />
          <FloatingIngredient 
            position={[2.4, -0.8, 0.3]} 
            color="#66bb6a" 
            type="leaf" 
            size={0.25}
            delay={1.5}
          />
          
          {/* Turmeric - Golden Yellow */}
          <FloatingIngredient 
            position={[1.8, 1.8, -1]} 
            color="#ffa000" 
            emissive="#ff8f00"
            size={0.22}
            delay={0.5}
          />
          <FloatingIngredient 
            position={[-1.5, -1.5, 0]} 
            color="#ffb300" 
            size={0.18}
            delay={2}
          />

          {/* Vitamin E - Golden Capsules */}
          <FloatingIngredient 
            position={[0.5, 2, 0.5]} 
            color="#ffd700" 
            emissive="#ffb300"
            type="capsule" 
            size={0.18}
            speed={1.2}
            delay={0.8}
          />
          <FloatingIngredient 
            position={[-0.8, -2, -0.5]} 
            color="#ffca28" 
            type="capsule" 
            size={0.15}
            speed={0.8}
            delay={1.2}
          />
          
          {/* Neem - Dark Green Leaves */}
          <FloatingIngredient 
            position={[-2.8, -0.3, 0.8]} 
            color="#2e7d32" 
            emissive="#1b5e20"
            type="leaf" 
            size={0.4}
            delay={0.3}
          />
          <FloatingIngredient 
            position={[2.8, 0.5, -0.8]} 
            color="#388e3c" 
            type="leaf" 
            size={0.3}
            delay={1.8}
          />

          {/* Besan - Creamy Spheres */}
          <FloatingIngredient 
            position={[2.5, -1.8, -1]} 
            color="#fff9c4" 
            size={0.12}
            delay={0.7}
          />
          <FloatingIngredient 
            position={[-2.3, 1.8, 0.5]} 
            color="#fff8e1" 
            size={0.1}
            delay={1}
          />
          <FloatingIngredient 
            position={[0, -2.2, 0.3]} 
            color="#ffecb3" 
            size={0.08}
            delay={2.2}
          />
        </group>
      </PresentationControls>

      <ParticleField />

      <ContactShadows 
        position={[0, -2.2, 0]} 
        opacity={0.35} 
        scale={12} 
        blur={2.5} 
        far={4}
        color="#1a3c34"
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
    </div>
  );
}

export function ProductScene() {
  return (
    <div className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas 
          shadows 
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ touchAction: 'pan-y' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-accent/15 rounded-full blur-[80px] pointer-events-none -z-10" />
    </div>
  );
}
