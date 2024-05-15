import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useFBX, useTexture } from '@react-three/drei'; 

import useStore from "../../store/UseStore";
import { observer } from 'mobx-react';
import * as THREE from "three";
import { Vector3 } from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const fragmentShader = `
varying vec2 vUv;
uniform float opacity;

#ifdef USE_MAP
    uniform sampler2D map;
#endif


void main() {
    vec3 color = vec3(1.0,0.0,0.0) * opacity;
    #ifdef USE_MAP
        vec4 mapTexel = texture2D( map, vUv.xy );
        gl_FragColor = mapTexel;
    #endif
gl_FragColor = vec4(blue*phong(), 1.0);
}`

const vertexShader = `
varying vec2 vUv;

void main() {
vUv = uv;
vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
gl_Position = projectionMatrix * mvPosition;
}
`

const new_hair_list = [
    'Hair_Male_001',   'Hair_Male_002',   'Hair_Male_003',   
    'Hair_Male_004',   'Hair_Male_005',   'Hair_Male_006',   
    'Hair_Female_001',   'Hair_Female_002',   'Hair_Female_003',   
    'Hair_Female_004',   'Hair_Female_005',   'Hair_Female_006',   
]

const hair_color_list = [
    'black', 'brown', 'red', 'blue',
    'green', 'purple', 'yellow', 'sky'
]


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
    //value.geometry.deleteAttribute('normal')
    //value.geometry = BufferGeometryUtils.mergeVertices(value.geometry);
    //value.geometry.computeVertexNormals();
    //value.material.roughness = 0.8;
    console.log(value);
    return <mesh
        key={"head"}
        geometry={value.geometry}
        material={value.material}
        rotation={[
            value.rotation.x,
            value.rotation.y, //+ Math.PI,
            value.rotation.z 
        ]}
        position={value.position}
        scale={value.scale}
    />;  
}


function Hair({value}) {
    //value.material.roughness = 0.7;
    return <mesh
        key={"hair"}
        geometry={value.geometry}
        material={value.material}
        rotation={value.rotation}
        position={value.position}
        scale={value.scale}
    />;   
}


function MintHairGLB(props) {
    //const { deca_store } = useStore();
    //console.log(deca_store.hair_id-1);
    //const { nodes, materials } = useGLTF('/static/mint_hair/glb/'+new_hair_list[deca_store.hair_id-1]+'.glb');
    const { nodes, materials } = useGLTF(
        '/static/mint_hair/glb/'+ 
        new_hair_list[props.hair_id-1]+'/'+
        new_hair_list[props.hair_id-1]+'_textured_'+
        hair_color_list[props.color_id]+'.glb'
    );
    const value = nodes[new_hair_list[props.hair_id-1]];
    console.log(value.position);
    console.log(materials);
  
    return <mesh>
      <primitive 
        object={value}
      />
    </mesh>  
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
    //for (const [key, value] of Object.entries(nodes)) {
    //    if (key.startsWith('mesh_')) {
    //        hair.push(
    //            <Hair value={value}/>
    //        )
    //    }
    //}
    if (deca_store.hair_id !== 0) {
        hair.push(
            <MintHairGLB 
                hair_id={deca_store.hair_id} 
                color_id={deca_store.hair_color_id}
            />
        )
    }
    console.log(decaRef.current);

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
//<MintHairGLB/>
//{deca_store.hair_id !== 0 &&
//    <MintHairGLB id={deca_store.hair_id}/>
//}