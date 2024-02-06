import React, { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import GUI from 'lil-gui'

import { stopAnim, blendshapeAnim } from './prepare_animations'


export default function CreateFaceAnim(props) {
  // add default animations
  useEffect(() => {
    props.setActionList([props.mixer.clipAction(stopAnim).setLoop(1, 1), props.mixer.clipAction(blendshapeAnim).setLoop(1, 1)])
    props.setAnimNameList(['Base', 'All Blendshape'])
    props.setAudioList([null, null])
  }, [])

  // add new animations
  useEffect(() => {
    if (props.faceAnimData !== undefined){
      props.setActionList([...props.actionList, props.mixer.clipAction(props.faceAnimData).setLoop(1, 1)])
      console.log("new animation added")
    }
  }, [props.faceAnimData])

  // GUI
  // useEffect(() => {
  //   const influences = fbx.children[7].morphTargetInfluences
  //   const gui = new GUI()

  //   for ( const [ key, value ] of Object.entries( fbx.children[7].morphTargetDictionary ) ) {
  //     gui.add( influences, value, 0, 1, 0.01 )
  //       .name( key )
  //       .listen( influences );
  //   }
  //   return () => gui.destroy()
  // })

  return (
      <></>
  )
}