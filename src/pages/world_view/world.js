import React, { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Avatar from "../../components/face_animation/Avatar";

export default function MyWorld({ ...props }) {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        <Avatar
          animIndex={props.animIndex}
          faceAnimData={props.faceAnimData}
          setFaceAnimData={props.setFaceAnimData}
          animNameList={props.animNameList}
          setAnimNameList={props.setAnimNameList}
          audioList={props.audioList}
          setAudioList={props.setAudioList}
          actionList={props.actionList}
          setActionList={props.setActionList}
        />
      </Suspense>
    </Canvas>
  );
}
