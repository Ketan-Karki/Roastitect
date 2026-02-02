import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

const CoffeeBean = ({
  position,
  rotation,
  scale,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}) => {
  const beanRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!beanRef.current) return;
    beanRef.current.position.y +=
      Math.sin(state.clock.getElapsedTime() + position[0]) * 0.002;
    beanRef.current.rotation.x += 0.005;
    beanRef.current.rotation.z += 0.005;
  });

  return (
    <group ref={beanRef} position={position} rotation={rotation} scale={scale}>
      {/* Left Half */}
      <mesh position={[-0.04, 0, 0]} scale={[0.6, 1, 0.7]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#2a1a0f" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Right Half */}
      <mesh position={[0.04, 0, 0]} scale={[0.6, 1, 0.7]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#2a1a0f" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Central Groove/Crease */}
      <mesh scale={[0.02, 0.9, 0.65]}>
        <boxGeometry args={[1, 0.2, 0.1]} />
        <meshStandardMaterial color="#1a0f08" roughness={1} />
      </mesh>
    </group>
  );
};

const CupModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;

    const x = (state.mouse.x * state.viewport.width) / 6;
    const y = (state.mouse.y * state.viewport.height) / 6;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * 0.4,
      0.1
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -y * 0.2 + 0.3,
      0.1
    );

    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={groupRef}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
        scale={clicked ? 1.2 : 1}
      >
        {/* Cup Body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1, 0.8, 1.5, 32]} />
          <meshStandardMaterial
            color="#0c0a09"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Cup Handle - Using a full torus partially submerged for a strong C-shape */}
        <mesh position={[1.1, 0, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.5, 0.08, 16, 48]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
        </mesh>

        {/* Coffee Liquid */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.1, 32]} />
          <meshStandardMaterial color="#1a1412" roughness={0.1} />
        </mesh>

        {/* Gold Top Rim */}
        <mesh position={[0, 0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.05, 16, 64]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.1} />
        </mesh>

        {/* Gold Base Rim */}
        <mesh position={[0, -0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.03, 16, 64]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

export const CoffeeScene = () => {
  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] relative overflow-visible">
      <Canvas shadows dpr={[1, 2]} className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />

        <ambientLight intensity={0.4} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#d4af37" />

        <CupModel />

        {/* Environmental Beans */}
        <CoffeeBean position={[3, 2, -2]} rotation={[1, 2, 3]} scale={1.5} />
        <CoffeeBean position={[-3, -1, 1]} rotation={[4, 1, 2]} scale={1.2} />
        <CoffeeBean position={[2, -2, -1]} rotation={[2, 4, 1]} scale={1.8} />
        <CoffeeBean position={[-2, 1, -3]} rotation={[1, 1, 1]} scale={1.4} />

        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={4}
        />

        <Environment preset="night" />
      </Canvas>

      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 pointer-events-none bg-gradient-to-t from-coffee-950 via-coffee-950/80 to-transparent" />
    </div>
  );
};
