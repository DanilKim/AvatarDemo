import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AvatarTempGlb from "../../components/old_create_avatar/AvatarTempGlb";


export default function CreateWorld({ ...props }) {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        <AvatarTempGlb/>
      </Suspense>
    </Canvas>
  );
}
