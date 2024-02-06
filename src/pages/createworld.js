import React, { Suspense } from "react";
 
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import AvatarTemp from "../components/create_avatar/AvatarTemp";


export default function CreateWorld({...props}) {
    return (
        <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <Suspense fallback={null}>
                <AvatarTemp faceBlendShape={props.faceBlendShape} setFaceBlendShape={props.setFaceBlendShape} eyeSize={props.eyeSize} setEyeSize={props.setEyeSize} 
                    eyeShape={props.eyeShape} setEyeShape={props.setEyeShape} skin={props.skin} setSkin={props.setSkin} />
            </Suspense>
        </Canvas>
    )
} 