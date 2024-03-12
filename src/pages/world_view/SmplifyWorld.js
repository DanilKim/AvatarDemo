import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Smplify from "../../components/set_model/Smplify";

export default function SmplifyWorld({ ...props }) {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 5, -2]} intensity={1} />
      <directionalLight position={[1, 5, 4]} intensity={1} />
      <Suspense fallback={null}>
        <Smplify />
      </Suspense>
    </Canvas>
  );
}
