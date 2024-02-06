import { AnimationMixer } from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useFrame } from "@react-three/fiber";
import React from "react";
// import { useEffect, useState } from 'react';

export default function AvatarModelTivine(currentModel) {
    const anim_name = {};
    const model = useLoader(
        FBXLoader,
        "/static/models/Avatar_Ani_TextureEmbed.fbx"
    );

    model.scale.set(0.03, 0.03, 0.03);
    model.position.set(0, -1, -3);
    model.animations.pop();
    if (currentModel != 0) {
        console.log(
            currentModel,
            currentModel.animations,
            currentModel.animations.length
        );
        model.animations = currentModel.animations;
    }
    return model;
    //return (

    //    <primitive object={model} />
    // )
}
