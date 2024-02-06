import { NumberKeyframeTrack } from "three";
import { AnimationClip } from "three";
// import vowel_map from './vowel_map.json'
import { vowel_map } from "./create_map_json";


export default function scheduleToAnimation(schedule) {
    var times = []
    var values = []

    var step;
    for (step = 0; step < schedule.length; step++) {
        var value_time = schedule[step]
        values = values.concat(vowel_map[value_time[0]])
        times.push(value_time[1] / 85.0)
    }

    const myKF = new NumberKeyframeTrack('Head_m.morphTargetInfluences', times, values);
    const tracks = [myKF]
    const length = -1
    const myClip = new AnimationClip('text', length, tracks)
    return myClip
}
