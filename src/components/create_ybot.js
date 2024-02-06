import { AnimationMixer } from 'three';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from "@react-three/fiber";
// import { useEffect, useState } from 'react';

export default function Model({ index }) {
    const model = useLoader(GLTFLoader, 'static/models/ybot.glb')
    const dancing = useLoader(GLTFLoader, 'static/models/Dancing.glb')
    const punching = useLoader(GLTFLoader, 'static/models/Punching.glb')
    const animation_list = [dancing.animations[0], punching.animations[0]]

    let mixer
    if (index !== undefined) {
        mixer = new AnimationMixer(model.scene)
        const action = mixer.clipAction(animation_list[index])
        action.play()
    }

    useFrame((state, delta) => {
        mixer?.update(delta)
    })

    return (
        <primitive object={model.scene} />
    )
}