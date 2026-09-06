import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Monolith() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    const { x, y } = state.pointer;
    group.current.position.x += (x * 0.5 - group.current.position.x) * (1 - Math.exp(-2 * delta));
    group.current.position.y +=
      (0.2 + y * 0.25 - group.current.position.y) * (1 - Math.exp(-2 * delta));
  });

  return (
    <group ref={group} scale={0.9} position-y={-0.15}>
      <mesh castShadow>
        <boxGeometry args={[1.5, 3.4, 1.5]} />
        <meshStandardMaterial
          color="#1b2b36"
          metalness={0.9}
          roughness={0.22}
          emissive="#0a3b47"
          emissiveIntensity={0.55}
          envMapIntensity={2.4}
        />
      </mesh>
      <mesh scale={[1.02, 1.005, 1.02]}>
        <boxGeometry args={[1.5, 3.4, 1.5]} />
        <meshBasicMaterial color="#3fd8e8" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh position={[0, -1.72, 0]} rotation-x={-Math.PI / 2}>
        <ringGeometry args={[1.4, 1.75, 64]} />
        <meshBasicMaterial color="#3fd8e8" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Dust({ count = 420 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16 - 3;
    }
    return arr;
  }, [count]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (points.current) points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#8fd8ea" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

function Grid() {
  return (
    <group position={[0, -1.8, 0]}>
      <gridHelper args={[40, 40, "#2b6c7a", "#1a3b45"]} />
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0b1218" metalness={0.7} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.2, 8], fov: 45 }}
    >
      <fog attach="fog" args={["#0b1016", 10, 26]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 9, 5]} intensity={1.1} color="#bfefff" />
      <pointLight position={[-5, 2, 3]} intensity={22} color="#ffb454" distance={18} />
      <Environment resolution={128}>
        <Lightformer intensity={4} position={[0, 5, 2]} scale={[10, 6, 1]} color="#cfefff" />
        <Lightformer
          intensity={2.6}
          color="#ff9a3c"
          position={[-6, 1, -2]}
          rotation-y={Math.PI / 2}
          scale={[20, 2, 1]}
        />
      </Environment>
      <Monolith />
      <Dust />
      <Grid />
    </Canvas>
  );
}
