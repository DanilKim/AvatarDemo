import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AnimModel from "../../components/set_model/EMOTE";
// import AnimModel from "../../components/set_model/AnimModel";
import useStore from "../../store/UseStore";

export default function RealWorld({ setAnimationAction }) {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 5, -2]} intensity={1} />
      <directionalLight position={[1, 5, 4]} intensity={1} />
      <Suspense fallback={null}>
        {/* Replace to Realistic Model */}
        <AnimModel setAnimationAction={setAnimationAction} />
      </Suspense>
    </Canvas>
  );
}
