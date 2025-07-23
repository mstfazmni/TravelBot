import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function RobotModel() {
  const { scene } = useGLTF('/models/robot.glb');
  const robotRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!robotRef.current) return;

    if (hovered) {
      robotRef.current.rotation.y += 0.03;
      robotRef.current.position.y = Math.sin(Date.now() * 0.005) * 0.2;
    } else {
      robotRef.current.position.y = 0;
    }
  });

  return (
    <primitive
      ref={robotRef}
      object={scene}
      scale={6}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

const Robot3D = () => {
  return (
    <Canvas style={{ height: '300px', width: '100%', cursor: 'pointer' }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={25} />
      <pointLight position={[-5, -5, -5]} intensity={1.5} />
      <OrbitControls enableZoom={false} />
      <RobotModel />
    </Canvas>
  );
};

export default Robot3D;
