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
        <AvatarTempGlb
          faceBlendShape={props.faceBlendShape}
          setFaceBlendShape={props.setFaceBlendShape}
          eyeSize={props.eyeSize}
          setEyeSize={props.setEyeSize}
          eyeShape={props.eyeShape}
          setEyeShape={props.setEyeShape}
          skin={props.skin}
          setSkin={props.setSkin}
        />
      </Suspense>
    </Canvas>
  );
}
