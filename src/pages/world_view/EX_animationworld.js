import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AnimModel from "../../components/set_model/AnimModel";

export default function AnimationWorld({ ...props }) {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 5, -2]} intensity={1} />
      <directionalLight position={[1, 5, 4]} intensity={1} />
      <Suspense fallback={null}>
        <AnimModel />
      </Suspense>
    </Canvas>
  );
}
