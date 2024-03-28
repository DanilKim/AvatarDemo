import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'; 

import useStore from "../../store/UseStore";
import { observer } from 'mobx-react';
import * as THREE from "three";

function DECAAnimHead(props) {
    const [animationAction, setAnimationAction] = useState(null);
    const { deca_store } = useStore();
    const decaRef = useRef();
    const headRef = useRef();

    const [active, setActive] = useState(false);

    const { nodes } = useGLTF(props.url);

    const handleClick = (event) => {
        event.stopPropagation();

        deca_store.select(
            decaRef.current.userData.id,
            decaRef.current.name,
            decaRef.current.position,
            decaRef.current.rotation,
            decaRef.current.scale,
            decaRef.current.userData.modelUrl,
            decaRef.current.userData.audio
        )

        // SidebarStore.setcampos(assetRef.current.position.x, assetRef.current.position.y, assetRef.current.position.z)

    }

    useEffect(() => {
      if (nodes.outputobj.animations.length) {
        headRef.current = new THREE.AnimationMixer(nodes.outputobj.scene);
        const action = decaRef.current.clipAction(nodes.outputobj.animations[0]);
        setAnimationAction(action);
        deca_store.anim_on(action);
      } else {
        deca_store.anim_off();
      }
    }, [nodes]);

    useFrame( (_, delta) => {
        if (deca_store.selected) {
            deca_store.update3D(
                decaRef.current.position,
                decaRef.current.rotation,
                decaRef.current.scale,
            )
        }
        decaRef.current?.update(delta);
    })

    const meshList = Object.entries(nodes).map(([key,value]) => (
        value.type === 'Mesh' ?
        <mesh
            ref={value.name === 'outputobj'? headRef: null}
            key={value.name}
            geometry={value.geometry}
            material={value.material}
            rotation={value.rotation}
            position={value.position}
            scale={value.scale}
        />
        :
        <primitive object={value}/>))

    return (
        <group
            ref={decaRef}
            userData={{
                id:props.id, 
                modelUrl:props.url,
                audio:{file:null, url:'', name:''}
            }}
            name={props.name}
            dispose={null} 
            scale={props.scale} 
            rotation={[0,-Math.PI,0]}

            onPointerOver={(event) => {
                event.stopPropagation();
                //setActive(true);
            }}
            onPointerOut={(event) => {
                event.stopPropagation();
                //setActive(false);
            }}
            onPointerMissed={(event) => {
                event.stopPropagation();
                deca_store.unselect();
            }}

            onClick={handleClick}
        >
            {meshList}
        </group>
    )
    
}

export default observer(DECAAnimHead);