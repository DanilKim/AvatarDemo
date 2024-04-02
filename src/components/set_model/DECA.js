import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'; 

import useStore from "../../store/UseStore";
import { observer } from 'mobx-react';
import * as THREE from "three";
import { Vector3 } from "three";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


function AnimHead(props) {
    const { deca_store } = useStore();
    const headRef = useRef();

    // const { nodes } = useGLTF(props.url);
    const nodes = useLoader(GLTFLoader, props.url);
    console.log(nodes);
    useEffect(() => {
      const head = nodes.scene.getObjectByName("talking_head");
      head.rotation.setFromVector3(new Vector3(Math.PI/2, 0, Math.PI));

      if (nodes.animations.length) {
        headRef.current = new THREE.AnimationMixer(nodes.scene);
        const action = headRef.current.clipAction(nodes.animations[0]);
        deca_store.anim_on(action);
      } else {
        deca_store.anim_off();
      }
    }, [nodes]);

    useFrame( (_, delta) => {
        headRef.current?.update(delta);
    })

    return <primitive object={nodes.scene} ></primitive>;
    
}


function Head({value}) {
    return <mesh
        key={"head"}
        geometry={value.geometry}
        material={value.material}
        rotation={[
            value.rotation.x,
            value.rotation.y - Math.PI,
            value.rotation.z
        ]}
        position={value.position}
        scale={value.scale}
    />;  
}

function Hair({value}) {
    return <mesh
        key={"hair"}
        geometry={value.geometry}
        material={value.material}
        rotation={value.rotation}
        position={value.position}
        scale={value.scale}
    />;   
}


function DECA(props) {
    const [animationAction, setAnimationAction] = useState(null);
    const { deca_store } = useStore();
    const decaRef = useRef();

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

    console.log(nodes);    

    useFrame( (_, delta) => {
        if (deca_store.selected) {
            deca_store.update3D(
                decaRef.current.position,
                decaRef.current.rotation,
                decaRef.current.scale,
            )
        }
    })


    const hair = [];
    for (const [key, value] of Object.entries(nodes)) {
        if (key.startsWith('mesh_')) {
            hair.push(
                <Hair value={value}/>
            )
        }
        // if (key === 'output_beforeobj' && deca_store.anim.url) {
        //     if (deca_store.anim.url) {
        //         meshList.push(
        //             <AnimHead url={deca_store.anim.url}/>
        //         )
        //     } else {
        //         meshList.push(
        //             <Head value={value}/>
        //         )
        //     }
        // } else {
        //     meshList.push(
        //         <Hair value={value}/>
        //     )
        // }
    }
    

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
            
            
            {deca_store.anim.url !== '' ?
                <AnimHead url={deca_store.anim.url}/>
                : 
                <Head value={nodes.output_beforeobj}/>
            }
            {hair}
            
        </group>
    );
    
}

export default observer(DECA);

// {deca_store.anim.url !== '' ?
//     <AnimHead url={deca_store.anim.url}/>
//     :
//     <Head value={nodes.output_beforeobj}/>
// }

// const meshList = Object.entries(nodes).map(([key,value]) => (
//     value.type === 'Mesh' ?
//     <mesh
//         ref={value.name === 'outputobj'? headRef: null}
//         key={value.name}
//         geometry={value.geometry}
//         material={value.material}
//         rotation={value.rotation}
//         position={value.position}
//         scale={value.scale}
//     />
//     :
//     <primitive object={value}/>))