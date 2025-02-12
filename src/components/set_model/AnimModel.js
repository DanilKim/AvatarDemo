/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import useStore from "../../store/UseStore";
import { observer } from "mobx-react";
import * as THREE from "three";

function AnimModel({ setAnimationAction }) {
  const { common_store } = useStore();
  const gltf = useLoader(GLTFLoader, common_store.obj_path);
  const mixerRef = useRef();

  useEffect(() => {
    if (gltf.animations.length) {
      mixerRef.current = new THREE.AnimationMixer(gltf.scene);
      const action = mixerRef.current.clipAction(gltf.animations[0]);
      setAnimationAction(action);
    }
  }, [gltf, setAnimationAction]);

  useFrame((state, delta) => mixerRef.current?.update(delta));

  return <primitive object={gltf.scene}></primitive>;
}

export default observer(AnimModel);
