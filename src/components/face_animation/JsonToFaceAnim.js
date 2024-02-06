import { AnimationClip, NumberKeyframeTrack, QuaternionKeyframeTrack } from 'three';

export default function JsonToFaceAnim(animJson) {
    const headName = 'Character/HipController/Bone/Pelvis/Spine/Spine_Z/Spine_X/Spine_Y/Spine1/Spine2/Neck/IK_Neck/Head.quaternion'
    const morphTargetTrack = new NumberKeyframeTrack('Head_m.morphTargetInfluences', animJson.times, animJson.morphTargetTrack);
    const headTrack = new QuaternionKeyframeTrack(headName, animJson.times, animJson.headTrack)
    const tracks = [morphTargetTrack, headTrack]
    const length = -1
    const myClip = new AnimationClip('head_animation', length, tracks);
    return myClip
}
