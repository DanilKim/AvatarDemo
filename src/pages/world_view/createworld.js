import React, { useEffect, Suspense } from "react";
import useStore from '../../store/UseStore';
import { observer } from 'mobx-react';

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import AvatarTemp from "../../components/old_create_avatar/AvatarTemp";
import DECA from "../../components/old_create_avatar/DECA";
import Loading from "../ui_flame/DECA/Loading";

function CreateWorld({ ...props }) {
  const { deca_store } = useStore();

  useEffect(() =>{
    console.log(deca_store)
  })

  return (<>
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 3]} intensity={2} />
      <directionalLight position={[0, 1, -3]} intensity={2} />
      <Suspense fallback={null}>
        {deca_store.model_url != null &&
          <DECA url={deca_store.model_url} scale={[10.0,10.0,10.0]}/>
        }
        {/*<AvatarTemp
          faceBlendShape={props.faceBlendShape}
          setFaceBlendShape={props.setFaceBlendShape}
          eyeSize={props.eyeSize}
          setEyeSize={props.setEyeSize}
          eyeShape={props.eyeShape}
          setEyeShape={props.setEyeShape}
          skin={props.skin}
          setSkin={props.setSkin}
        />*/}
      </Suspense>
    </Canvas>
    {deca_store.loading && <Loading/>}
    </>
  );
}

export default observer(CreateWorld)