import { QuaternionKeyframeTrack } from 'three';
import { AnimationClip, NumberKeyframeTrack } from 'three';
import { holisticAnim } from './prepare_animations';

export function useHeadAnimation() {
    const speed = 5;
    let times = [0];
    let values = [0, 0, 0.7071068, 0.7071068]
    const myKF = new QuaternionKeyframeTrack('Character/HipController/Bone/Pelvis/Spine/Spine_Z/Spine_X/Spine_Y/Spine1/Spine2/Neck/IK_Neck/Head.quaternion', 
    times, values);

    // const times = holisticAnim.tracks[217].times
    // const values = holisticAnim.tracks[217].values
    // const name = holisticAnim.tracks[217].name
    // const myKF = new QuaternionKeyframeTrack(name, times, values)

    // console.log(holisticAnim.tracks[214].values)
    // console.log(holisticAnim.tracks[211].values)


    // const tracks = [
    //     new QuaternionKeyframeTrack(holisticAnim.tracks[214].name, holisticAnim.tracks[214].times, holisticAnim.tracks[214].values), 
    //     new QuaternionKeyframeTrack(holisticAnim.tracks[211].name, holisticAnim.tracks[211].times, holisticAnim.tracks[211].values),
    //     new QuaternionKeyframeTrack(holisticAnim.tracks[217].name, holisticAnim.tracks[217].times, holisticAnim.tracks[217].values),
    // ]
    const tracks = [myKF]
    const length = -1
    const myClip = new AnimationClip('head_animation', length, tracks)

    return myClip
}


export function useBlendshapeAnimation() {
    let times = [0];
    const speed = 5;

    const values0 = new Array(108).fill(0);
    const values_tmp = values0.slice()
    let values = values0.slice()

    let index;
    for (index = 0; index < 108; index++) {
        values_tmp[index] = 1
        values = values.concat(values_tmp.slice(), values0)
        times = times.concat([(2*index + 1)/speed, (2*index + 2)/speed])
        values_tmp[index] = 0
    }

    const myKF = new NumberKeyframeTrack('Head_m_1.morphTargetInfluences', times, values);
    const tracks = [myKF]
    const length = -1
    const myClip = new AnimationClip('blendshape_animation', length, tracks)

    return myClip
}


export function useStopAnimation() {
    const times = [0];

    const values = new Array(108).fill(0);

    const myKF = new NumberKeyframeTrack('Head_m_1.morphTargetInfluences', times, values);
    const tracks = [myKF]
    const length = -1
    const myClip = new AnimationClip('stop', length, tracks)

    return myClip
}