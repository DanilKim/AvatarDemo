import React, { Suspense, useState } from "react";

import { applyProps, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import AvatarTemp from "../../components/old_create_avatar/AvatarTemp";
import AvatarViewModel from "../../components/old_avatar_animation/avatar_viewmodel";
import Box from "@mui/material/Box";

export default function MyBodyAnimWorld(props) {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        <AvatarTemp
          animTime={props.animTime}
          clipLength={props.clipLength}
          anim_index={props.animIndex}
          isPlaying={props.isPlaying}
          human={0}
          nodeStates={props.nodeStates}
          setCurrentModel={props.setCurrentModel}
          currentModel={props.currentModel}
          depthState={props.depthState}
        />
      </Suspense>
    </Canvas>
  );
}
