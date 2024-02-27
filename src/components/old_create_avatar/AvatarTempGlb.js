/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { AnimationMixer } from 'three';
import { useLoader } from '@react-three/fiber'
import GUI from 'lil-gui'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Mesh } from "three";
import * as THREE from 'three';
import { PropaneSharp } from '@mui/icons-material';
import { useTexture } from '@react-three/drei';
import useStore from "../../store/UseStore";


export default function Model({ ...props }) {
  const { smplify_store } = useStore();

  const model = useLoader(GLTFLoader, smplify_store.obj_path).scene;

  return (
    <primitive object={model}></primitive>
  )
}
