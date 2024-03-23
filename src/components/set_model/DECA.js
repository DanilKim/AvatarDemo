import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'; 

import useStore from "../../store/UseStore";
import { observer } from 'mobx-react';

function DECA(props) {
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
            decaRef.current.userData.audioUrl
        )

        // SidebarStore.setcampos(assetRef.current.position.x, assetRef.current.position.y, assetRef.current.position.z)

    }

    useFrame( (_, delta) => {
        if (deca_store.selected) {
            deca_store.update3D(
                decaRef.current.position,
                decaRef.current.rotation,
                decaRef.current.scale,
            )
        }
    })

    const meshList = Object.entries(nodes).map(([key,value]) => (
        value.type === 'Mesh' ?
        <mesh
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
                audioUrl:''
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

export default observer(DECA);