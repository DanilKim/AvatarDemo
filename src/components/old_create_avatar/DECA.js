import React from 'react';
import { useGLTF } from '@react-three/drei'; 

import { observer } from 'mobx-react';

function DECA(props) {
    //props.component = 'Asset';    

    const { nodes } = useGLTF(props.url);
    console.log(nodes)
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
        <group dispose={null} scale={props.scale} rotation={[0,-Math.PI,0]}>
            {meshList}
        </group>
    )
    
}

export default observer(DECA);