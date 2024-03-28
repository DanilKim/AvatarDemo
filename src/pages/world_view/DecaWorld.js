import React, { useEffect, Suspense, useState } from "react";
import useStore from "../../store/UseStore";
import { observer } from "mobx-react";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";

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
      <TransformControls mode={mode} object={deca_store.selected && scene.getObjectByName("my_deca", true)} />
  )
}


function DecaWorld({ ...props }) {
  const { deca_store } = useStore();

  return (
    <>
      <Canvas
        onCreated={({ scene }) => deca_store.setScene( scene )}
      >
        <OrbitControls makeDefault attach="orbitControls"/>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 1, 3]} intensity={2} />
        <directionalLight position={[0, 1, -3]} intensity={2} />
        <Suspense fallback={null}>
          {deca_store.model_url != null && (
            <DECA 
              id={0}
              name={"my_deca"}
              url={deca_store.model_url} 
              scale={[10.0, 10.0, 10.0]} 
            />
          )}
          {deca_store.selected && <Transformable/>}
        </Suspense>
      </Canvas>
      {deca_store.loading && <Loading />}
    </>
  );
}

export default observer(DecaWorld);