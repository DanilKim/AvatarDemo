import React, { useEffect, Suspense, useState, useRef } from "react";
import useStore from "../../store/UseStore";
import { observer } from "mobx-react";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";

import { useFBX, useTexture, useGLTF } from '@react-three/drei';

import DECA from "../../components/set_model/DECA";
import Loading from "../ui_flame/DECA/Loading";


const Transformable = () => {
  const { deca_store } = useStore();
  const { scene } = useThree();
  const [ mode, setMode ] = useState('translate');
  const keyBoardEvent = () => {
      switch(window.event.code) {
          case 'KeyT':
              setMode('translate');
              break;
          case 'KeyR':
              setMode('rotate');
              break;
          case 'KeyS':
              setMode('scale');
              break;
          default:
              break;
      }
  }

  useEffect(() => {
      window.addEventListener('keydown', keyBoardEvent);
      return () => window.removeEventListener('keydown', keyBoardEvent);
  })

  return (
      <TransformControls mode={mode} object={deca_store.selected && scene.getObjectByName("my_face", true)} />
  )
}

function MintHair(props) {
  const obj = useFBX('/static/mint_hair/Hair_Female_003.fbx');
  const tex = useTexture('/static/mint_hair/Hair_Female_003_C.png');
  const mintRef = useRef();

  useEffect(() => {
    obj.children[0].material.color.r = 0.2;
    obj.children[0].material.color.g = 0.05;
    obj.children[0].material.color.b = 0.01;
    obj.children[0].material.shininess = 50;
  }, [obj])
  console.log(obj);
  console.log(obj.children[0].material);
  
  //obj.children[0].material.map = tex;
  //console.log(tex);

  return <mesh ref={mintRef}>
      <primitive object={obj} scale={[0.068,0.07,0.072]} position={[0,-11.03,-0.48]} />
      <meshStandardMaterial map={tex}/>
  </mesh>
}


function MintHairMesh(props) {
  const obj = useFBX('/static/mint_hair/Hair_Female_003.fbx');
  const tex = useTexture('/static/mint_hair/Hair_Female_003_C.png');
  var value = obj.children[0];
  value.material.map = tex;
  console.log(value);
  const mintRef = useRef();
  console.log(mintRef.current);

  return <mesh 
      ref={mintRef}
      key={"hair"}
      geometry={value.geometry}
      material={value.material}
      rotation={value.rotation}
      scale={[value.scale.x*0.068, value.scale.y*0.07, value.scale.z*0.072]}
      position={[value.position.x, value.position.y-11.03, value.position.z-0.47]}
  >
  </mesh>
}



function DecaWorld({ ...props }) {
  const { deca_store } = useStore();

  return (
    <>
      <Canvas
        onCreated={({ scene }) => deca_store.setScene( scene )}
      >
        <OrbitControls makeDefault attach="orbitControls"/>
        
        <directionalLight position={[0, 1, 3]} intensity={4} />
        <directionalLight position={[0, 1, -3]} intensity={3} />
        <directionalLight position={[3, 1, 0]} intensity={0.7} />
        <directionalLight position={[-3, 1, 0]} intensity={0.7} />
        <Suspense fallback={null}>
          {deca_store.model_url != null && (<>
            <DECA 
              id={0}
              name={"my_face"}
              url={deca_store.model_url} 
              scale={[10.0, 10.0, 10.0]} 
            />
            
            </>
          )}
          {deca_store.selected && <Transformable/>}
        </Suspense>
      </Canvas>
      {deca_store.loading !== '' && <Loading text={deca_store.loading}/>}
    </>
  );
}

export default observer(DecaWorld);
//<MintHair/>