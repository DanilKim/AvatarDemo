import { AnimationMixer } from 'three'
import React, { useState } from 'react'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useFrame, useLoader } from '@react-three/fiber'

import CreateFaceAnim from './CreateFaceAnim'


export default function Avatar(props) {
  const fbx = useLoader(FBXLoader, '/static/models/Avatar_Ani_TextureEmbed.fbx')
  const [mixer, ] = useState(new AnimationMixer(fbx))

  useFrame((state, delta) => {
    mixer.update(delta)
  })

  return (
    <>
      <group position={[0, -12, -0.03]} scale={0.08}>
        <primitive object={fbx} dispose={null} />
      </group>
      <CreateFaceAnim mixer={mixer}
        animIndex={props.animIndex} faceAnimData={props.faceAnimData} setFaceAnimData={props.setFaceAnimData}
        animNameList={props.animNameList} setAnimNameList={props.setAnimNameList}
        audioList={props.audioList} setAudioList={props.setAudioList}
        actionList={props.actionList} setActionList={props.setActionList}
      />
    </>
  )
}