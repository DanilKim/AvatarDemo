import { AnimationClip, NumberKeyframeTrack, QuaternionKeyframeTrack } from 'three'

import stopAnimJSON from './animations/face_stop_anim'
import blendshapeAnimJSON from './animations/face_blendshape_anim'
import holisticAnimJSON from './animations/holistic_anim'
import headAnimJSON from './animations/head_pose_result_threejs.json'
import JsonToFaceAnim from './JsonToFaceAnim'


const stopAnim = AnimationClip.parse(stopAnimJSON)
const blendshapeAnim = AnimationClip.parse(blendshapeAnimJSON)
const holisticAnim = AnimationClip.parse(holisticAnimJSON)
// console.log(holisticAnim.tracks[211])
const headAnim = JsonToFaceAnim(headAnimJSON)

export {stopAnim, blendshapeAnim, holisticAnim, headAnim}
