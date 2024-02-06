import {
    Vector3,
    Quaternion,
    AnimationClip,
    NumberKeyframeTrack,
    QuaternionKeyframeTrack,
} from "three";

export default function JsonToBodyAnim(currentModel, data) {
    console.log(currentModel);
    console.log(data);

    var humanExistThreshold = 0.7;
    var butterworthParams = { param: 3 };
    var cameraDistance = 3;
    var centerTall = 0.6;
    var humanTall = 1.8;

    var index2BoneName = {
        0: "nose",
        1: "lEyeInner",
        2: "eye_l",
        3: "lEyeOuter",
        4: "rEyeInner",
        5: "_eye_R",
        6: "rEyeOuter",
        7: "lEar",
        8: "rEar",
        9: "lMouth",
        10: "rMouth",
        11: "LeftArm",
        12: "RightArm",
        13: "LeftForeArm",
        14: "RightForeArm",
        15: "LeftHand",
        16: "RightHand",
        17: "LeftHandPinky1",
        18: "RightHandPinky1",
        19: "LeftHandIndex1",
        20: "RightHandIndex1",
        21: "LeftHandThumb1",
        22: "RightHandThumb1",
        ////////////////////////////
        //       Lower Body       //
        ////////////////////////////
        23: "LeftUpLeg",
        24: "RightUpLeg",
        25: "LeftLeg",
        26: "RightLeg",
        27: "LeftFoot",
        28: "RightFoot",
        29: "lHeel",
        30: "rHeel",
        31: "LeftToeBase",
        32: "RightToeBase",
        ////////////////////////////
        // Calculated coordinates //
        ////////////////////////////
        33: "Pelvis",
        34: "Neck",
        35: "Spine",
        36: "Head",
        ////////////////////////////
        //      Left Hands        //
        ////////////////////////////
        37: "LeftHand",
        38: "LeftHandThumb1",
        39: "LeftHandThumb2",
        40: "LeftHandThumb3",
        41: "LeftHandThumb3_end",
        42: "LeftHandIndex1",
        43: "LeftHandIndex2",
        44: "LeftHandIndex3",
        45: "LeftHandIndex3_end",
        46: "LeftHandMiddle1",
        47: "LeftHandMiddle2",
        48: "LeftHandMiddle3",
        49: "LeftHandMiddle3_end",
        50: "LeftHandRing1",
        51: "LeftHandRing2",
        52: "LeftHandRing3",
        53: "LeftHandRing3_end",
        54: "LeftHandPinky1",
        55: "LeftHandPinky2",
        56: "LeftHandPinky3",
        57: "LeftHandPinky3_end",
        ////////////////////////////
        //      Right Hands       //
        ////////////////////////////
        58: "RightHand",
        59: "RightHandThumb1",
        60: "RightHandThumb2",
        61: "RightHandThumb3",
        62: "RightHandThumb3_end",
        63: "RightHandIndex1",
        64: "RightHandIndex2",
        65: "RightHandIndex3",
        66: "RightHandIndex3_end",
        67: "RightHandMiddle1",
        68: "RightHandMiddle2",
        69: "RightHandMiddle3",
        70: "RightHandMiddle3_end",
        71: "RightHandRing1",
        72: "RightHandRing2",
        73: "RightHandRing3",
        74: "RightHandRing3_end",
        75: "RightHandPinky1",
        76: "RightHandPinky2",
        77: "RightHandPinky3",
        78: "RightHandPinky3_end",
    };
    var boneName2Index = {
        nose: 0,
        lEyeInner: 1,
        eye_l: 2,
        lEyeOuter: 3,
        rEyeInner: 4,
        _eye_R: 5,
        rEyeOuter: 6,
        lEar: 7,
        rEar: 8,
        lMouth: 9,
        rMouth: 10,
        LeftArm: 11,
        RightArm: 12,
        LeftForeArm: 13,
        RightForeArm: 14,
        LeftHand: 15,
        RightHand: 16,
        LeftHandPinky1: 17,
        RightHandPinky1: 18,
        LeftHandIndex1: 19,
        RightHandIndex1: 20,
        LeftHandThumb1: 21,
        RightHandThumb1: 22,
        ////////////////////////////
        //       Lower Body       //
        ////////////////////////////
        LeftUpLeg: 23,
        RightUpLeg: 24,
        LeftLeg: 25,
        RightLeg: 26,
        LeftFoot: 27,
        RightFoot: 28,
        lHeel: 29,
        rHeel: 30,
        LeftToeBase: 31,
        RightToeBase: 32,
        ////////////////////////////
        // Calculated coordinates //
        ////////////////////////////
        Pelvis: 33,
        Neck: 34,
        Spine: 35,
        Head: 36,
        ////////////////////////////
        //      Left Hands        //
        ////////////////////////////
        _LeftHand: 37,
        _LeftHandThumb1: 38,
        LeftHandThumb2: 39,
        LeftHandThumb3: 40,
        LeftHandThumb3_end: 41,
        _LeftHandIndex1: 42,
        LeftHandIndex2: 43,
        LeftHandIndex3: 44,
        LeftHandIndex3_end: 45,
        LeftHandMiddle1: 46,
        LeftHandMiddle2: 47,
        LeftHandMiddle3: 48,
        LeftHandMiddle3_end: 49,
        LeftHandRing1: 50,
        LeftHandRing2: 51,
        LeftHandRing3: 52,
        LeftHandRing3_end: 53,
        _LeftHandPinky1: 54,
        LeftHandPinky2: 55,
        LeftHandPinky3: 56,
        LeftHandPinky3_end: 57,
        ////////////////////////////
        //      Right Hands       //
        ////////////////////////////
        _RightHand: 58,
        _RightHandThumb1: 59,
        RightHandThumb2: 60,
        RightHandThumb3: 61,
        RightHandThumb3_end: 62,
        _RightHandIndex1: 63,
        RightHandIndex2: 64,
        RightHandIndex3: 65,
        RightHandIndex3_end: 66,
        RightHandMiddle1: 67,
        RightHandMiddle2: 68,
        RightHandMiddle3: 69,
        RightHandMiddle3_end: 70,
        RightHandRing1: 71,
        RightHandRing2: 72,
        RightHandRing3: 73,
        RightHandRing3_end: 74,
        _RightHandPinky1: 75,
        RightHandPinky2: 76,
        RightHandPinky3: 77,
        RightHandPinky3_end: 78,
    };

    function findBoneObjects(element) {
        console.log(element);
        if (element.name in boneName2Index) {
            index2Joint[boneName2Index[element.name]] = { object: element };
        }
        element.children.forEach((child) => {
            if (element.name != child.name) findBoneObjects(child);
        });
    }

    function lookRotation(dir, up) {
        dir = dir.clone();
        up = up.clone();
        dir.normalize();
        up.normalize();
        var cross = new Vector3();
        cross.crossVectors(up, dir).normalize();
        up.crossVectors(dir, cross);
        var m00 = cross.x;
        var m01 = cross.y;
        var m02 = cross.z;
        var m10 = up.x;
        var m11 = up.y;
        var m12 = up.z;
        var m20 = dir.x;
        var m21 = dir.y;
        var m22 = dir.z;

        var num8 = m00 + m11 + m22;
        var quaternion = new Quaternion();
        if (num8 > -1) {
            var num = Math.sqrt(num8 + 1);
            quaternion.w = num * 0.5;
            num = 0.5 / num;
            quaternion.x = (m12 - m21) * num;
            quaternion.y = (m20 - m02) * num;
            quaternion.z = (m01 - m10) * num;
            quaternion.normalize();
            return quaternion;
        } else if (m00 >= m11 && m00 >= m22) {
            var num7 = Math.sqrt(1 + m00 - m11 - m22);
            var num4 = 0.5 / num7;
            quaternion.x = 0.5 * num7;
            quaternion.y = (m01 + m10) * num4;
            quaternion.z = (m02 + m20) * num4;
            quaternion.w = (m12 + m21) * num4;
            quaternion.normalize();
            return quaternion;
        } else if (m11 > m22) {
            var num6 = Math.sqrt(1 + m11 - m00 - m22);
            var num3 = 0.5 / num6;
            quaternion.x = (m10 + m01) * num3;
            quaternion.y = 0.5 * num6;
            quaternion.z = (m21 + m12) * num3;
            quaternion.w = (m20 - m02) * num3;
            quaternion.normalize();
            return quaternion;
        } else {
            var num5 = Math.sqrt(1 + m22 - m00 - m11);
            var num2 = 0.5 / num5;
            quaternion.x = (m20 + m02) * num2;
            quaternion.y = (m21 + m12) * num2;
            quaternion.z = 0.5 * num5;
            quaternion.w = (m01 - m10) * num2;
            quaternion.normalize();
            return quaternion;
        }
    }

    function getInverseQuaternion(p1, child, forward) {
        return lookRotation(
            child.object
                .getWorldPosition(new Vector3())
                .sub(p1.object.getWorldPosition(new Vector3())),
            forward
        ).invert();
    }

    function TriangleNormal(a, b, c) {
        var d1 = a.clone().sub(b);
        var d2 = a.clone().sub(c);

        return d2.cross(d1).normalize();
    }

    function sleep(ms) {
        return new Promise((r) => setTimeout(r, ms));
    }

    const radian2angle = 180 / Math.PI;
    const nFrameForCheckFlipped = 20;
    var butterworthValues = [];
    var index2Joint = {};
    var headEndObject = null;
    var leftHandMiddle3EndObject = null;
    var rightHandMiddle3EndObject = null;

    if (
        !("fps" in data) ||
        !("height" in data) ||
        !("width" in data) ||
        !("n_frames" in data) ||
        !("holisticJsonFrames" in data)
    ) {
        console.log("Check json");
        return;
    }

    var firstFrameIndex = -1;
    var firstFrameTime = -1;

    for (var itr = 0; itr < data.n_frames; itr++) {
        if (
            data.holisticJsonFrames[itr].human_detection_score >
            humanExistThreshold
        ) {
            firstFrameIndex = itr;
            firstFrameTime = itr / data.fps;
            break;
        }
    }

    if (firstFrameIndex == -1) return;
    var jointIdx;
    for (var itr = 0; itr < data.n_frames; itr++) {
        for (
            jointIdx = 0;
            jointIdx < data.holisticJsonFrames[itr].body_landmarks.length;
            jointIdx++
        )
            data.holisticJsonFrames[itr].body_landmarks[jointIdx] = new Vector3(
                data.holisticJsonFrames[itr].body_landmarks[jointIdx].x,
                data.holisticJsonFrames[itr].body_landmarks[jointIdx].y,
                -data.holisticJsonFrames[itr].body_landmarks[jointIdx].z
            );
        data.holisticJsonFrames[itr].body_landmarks.push(new Vector3());
        data.holisticJsonFrames[itr].body_landmarks.push(new Vector3());
        data.holisticJsonFrames[itr].body_landmarks.push(new Vector3());
        data.holisticJsonFrames[itr].body_landmarks.push(new Vector3());
        data.holisticJsonFrames[itr].body_scores.push(1.0);
        data.holisticJsonFrames[itr].body_scores.push(1.0);
        data.holisticJsonFrames[itr].body_scores.push(1.0);
        data.holisticJsonFrames[itr].body_scores.push(1.0);
        for (
            jointIdx = 0;
            jointIdx < data.holisticJsonFrames[itr].left_hand_landmarks.length;
            jointIdx++
        ) {
            data.holisticJsonFrames[itr].body_landmarks.push(
                new Vector3(
                    data.holisticJsonFrames[itr].left_hand_landmarks[
                        jointIdx
                    ].x,
                    data.holisticJsonFrames[itr].left_hand_landmarks[
                        jointIdx
                    ].y,
                    -data.holisticJsonFrames[itr].left_hand_landmarks[jointIdx]
                        .z +
                        data.holisticJsonFrames[itr].body_landmarks[
                            boneName2Index.LeftHand
                        ].z
                )
            );
            data.holisticJsonFrames[itr].body_scores.push(
                data.holisticJsonFrames[itr].left_hand_score
            );
        }
        delete data.holisticJsonFrames[itr].left_hand_landmarks;
        delete data.holisticJsonFrames[itr].left_hand_landmarks;
        for (
            jointIdx = 0;
            jointIdx < data.holisticJsonFrames[itr].right_hand_landmarks.length;
            jointIdx++
        ) {
            data.holisticJsonFrames[itr].body_landmarks.push(
                new Vector3(
                    data.holisticJsonFrames[itr].right_hand_landmarks[
                        jointIdx
                    ].x,
                    data.holisticJsonFrames[itr].right_hand_landmarks[
                        jointIdx
                    ].y,
                    -data.holisticJsonFrames[itr].right_hand_landmarks[jointIdx]
                        .z +
                        data.holisticJsonFrames[itr].body_landmarks[
                            boneName2Index.RightHand
                        ].z
                )
            );
            data.holisticJsonFrames[itr].body_scores.push(
                data.holisticJsonFrames[itr].right_hand_score
            );
        }
        delete data.holisticJsonFrames[itr].right_hand_landmarks;
    }

    // index2Joint[itr] = { object: element };
    findBoneObjects(currentModel);
    if (headEndObject == null)
        headEndObject = index2Joint[boneName2Index.Head].object;
    if (leftHandMiddle3EndObject == null)
        leftHandMiddle3EndObject =
            index2Joint[boneName2Index.LeftHandMiddle3].object;
    if (rightHandMiddle3EndObject == null)
        rightHandMiddle3EndObject =
            index2Joint[boneName2Index.RightHandMiddle3].object;
    index2Joint[boneName2Index._LeftHand] =
        index2Joint[boneName2Index.LeftHand];
    index2Joint[boneName2Index._LeftHandThumb1] =
        index2Joint[boneName2Index.LeftHandThumb1];
    index2Joint[boneName2Index._LeftHandIndex1] =
        index2Joint[boneName2Index.LeftHandIndex1];
    index2Joint[boneName2Index._LeftHandPinky1] =
        index2Joint[boneName2Index.LeftHandPinky1];
    index2Joint[boneName2Index._RightHand] =
        index2Joint[boneName2Index.RightHand];
    index2Joint[boneName2Index._RightHandThumb1] =
        index2Joint[boneName2Index.RightHandThumb1];
    index2Joint[boneName2Index._RightHandIndex1] =
        index2Joint[boneName2Index.RightHandIndex1];
    index2Joint[boneName2Index._RightHandPinky1] =
        index2Joint[boneName2Index.RightHandPinky1];

    // if (!(boneName2Index.LeftHandThumb3_end in index2Joint))
    // 	index2Joint[boneName2Index.LeftHandThumb3_end] = {
    // 		object: index2Joint[boneName2Index.LeftHandThumb3_end].object,
    // 	};
    // if (!(boneName2Index.LeftHandIndex3_end in index2Joint))
    // 	index2Joint[boneName2Index.LeftHandIndex3_end] = {
    // 		object: index2Joint[boneName2Index.LeftHandIndex3_end].object,
    // 	};
    // if (!(boneName2Index.LeftHandMiddle3_end in index2Joint))
    // 	index2Joint[boneName2Index.LeftHandMiddle3_end] = {
    // 		object: index2Joint[boneName2Index.LeftHandMiddle3_end].object,
    // 	};
    // if (!(boneName2Index.LeftHandRing3_end in index2Joint))
    // 	index2Joint[boneName2Index.LeftHandRing3_end] = {
    // 		object: index2Joint[boneName2Index.LeftHandRing3_end].object,
    // 	};
    // if (!(boneName2Index.LeftHandPinky3_end in index2Joint))
    // 	index2Joint[boneName2Index.LeftHandPinky3_end] = {
    // 		object: index2Joint[boneName2Index.LeftHandPinky3_end].object,
    // 	};
    // if (!(boneName2Index.RightHandThumb3_end in index2Joint))
    // 	index2Joint[boneName2Index.RightHandThumb3_end] = {
    // 		object: index2Joint[boneName2Index.RightHandThumb3_end].object,
    // 	};
    // if (!(boneName2Index.RightHandIndex3_end in index2Joint))
    // 	index2Joint[boneName2Index.RightHandIndex3_end] = {
    // 		object: index2Joint[boneName2Index.RightHandIndex3_end].object,
    // 	};
    // if (!(boneName2Index.RightHandMiddle3_end in index2Joint))
    // 	index2Joint[boneName2Index.RightHandMiddle3_end] = {
    // 		object: index2Joint[boneName2Index.RightHandMiddle3_end].object,
    // 	};
    // if (!(boneName2Index.RightHandRing3_end in index2Joint))
    // 	index2Joint[boneName2Index.RightHandRing3_end] = {
    // 		object: index2Joint[boneName2Index.RightHandRing3_end].object,
    // 	};
    // if (!(boneName2Index.RightHandPinky3_end in index2Joint))
    // 	index2Joint[boneName2Index.RightHandPinky3_end] = {
    // 		object: index2Joint[boneName2Index.RightHandPinky3_end].object,
    // 	};

    const handControllerDistance = index2Joint[
        boneName2Index.LeftForeArm
    ].object
        .getWorldPosition(new Vector3())
        .distanceTo(leftHandMiddle3EndObject.getWorldPosition(new Vector3()));
    const pelvisSpineLength = index2Joint[boneName2Index.Pelvis].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.Spine].object.getWorldPosition(
                new Vector3()
            )
        );
    const pelvisLeftUpLegLength = index2Joint[boneName2Index.Pelvis].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.LeftUpLeg].object.getWorldPosition(
                new Vector3()
            )
        );
    const pelvisRightUpLegLength = index2Joint[boneName2Index.Pelvis].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.RightUpLeg].object.getWorldPosition(
                new Vector3()
            )
        );

    const pelvisLeftArmLength = index2Joint[boneName2Index.LeftArm].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.LeftUpLeg].object.getWorldPosition(
                new Vector3()
            )
        );
    const pelvisRightArmLength = index2Joint[boneName2Index.RightArm].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.RightUpLeg].object.getWorldPosition(
                new Vector3()
            )
        );

    const handThumbLength = index2Joint[boneName2Index.LeftHand].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.LeftHandThumb1].object.getWorldPosition(
                new Vector3()
            )
        );

    const handIndexLength = index2Joint[boneName2Index.LeftHand].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.LeftHandIndex1].object.getWorldPosition(
                new Vector3()
            )
        );

    const handMiddleLength = index2Joint[boneName2Index.LeftHand].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.LeftHandMiddle1].object.getWorldPosition(
                new Vector3()
            )
        );

    const handRingLength = index2Joint[boneName2Index.LeftHand].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.LeftHandRing1].object.getWorldPosition(
                new Vector3()
            )
        );

    const handPinkyLength = index2Joint[boneName2Index.LeftHand].object
        .getWorldPosition(new Vector3())
        .distanceTo(
            index2Joint[boneName2Index.LeftHandPinky1].object.getWorldPosition(
                new Vector3()
            )
        );

    for (const [jointIdx, element] of Object.entries(index2Joint)) {
        element.initPosition = element.object.getWorldPosition(new Vector3());
        element.initQuaternion = element.object.getWorldQuaternion(
            new Quaternion()
        );
    }

    // for (var itr = 0; itr <= 36; itr++) {
    // 	if (itr in index2Joint) {
    // 		index2Joint[itr].initPosition = index2Joint[itr].object.getWorldPosition(
    // 			new Vector3()
    // 		);
    // 		index2Joint[itr].initQuaternion = index2Joint[
    // 			itr
    // 		].object.getWorldQuaternion(new Quaternion());
    // 	}
    // }
    index2Joint[boneName2Index.LeftArm].child = boneName2Index.LeftForeArm;
    index2Joint[boneName2Index.LeftForeArm].child = boneName2Index.LeftHand;
    index2Joint[boneName2Index.LeftForeArm].parent = boneName2Index.LeftArm;
    index2Joint[boneName2Index.LeftArm].parent = boneName2Index.LeftHand;

    index2Joint[boneName2Index.RightArm].child = boneName2Index.RightForeArm;
    index2Joint[boneName2Index.RightForeArm].child = boneName2Index.RightHand;
    index2Joint[boneName2Index.RightForeArm].parent = boneName2Index.RightArm;
    index2Joint[boneName2Index.RightArm].parent = boneName2Index.RightHand;

    index2Joint[boneName2Index.LeftUpLeg].child = boneName2Index.LeftLeg;
    index2Joint[boneName2Index.LeftLeg].child = boneName2Index.LeftFoot;
    index2Joint[boneName2Index.LeftUpLeg].parent = boneName2Index.LeftFoot;
    index2Joint[boneName2Index.LeftLeg].parent = boneName2Index.LeftUpLeg;

    index2Joint[boneName2Index.RightUpLeg].child = boneName2Index.RightLeg;
    index2Joint[boneName2Index.RightLeg].child = boneName2Index.RightFoot;
    index2Joint[boneName2Index.RightUpLeg].parent = boneName2Index.RightFoot;
    index2Joint[boneName2Index.RightLeg].parent = boneName2Index.RightUpLeg;

    index2Joint[boneName2Index.Spine].child = boneName2Index.Neck;
    index2Joint[boneName2Index.Neck].child = boneName2Index.Head;

    for (var fingerIdx = 0; fingerIdx < 5; fingerIdx++) {
        var nFingerLandmark =
            boneName2Index.LeftHandThumb3_end -
            boneName2Index._LeftHandThumb1 +
            1;
        var hand = boneName2Index._LeftHand;
        var parentIdx = hand;
        for (var idx = 0; idx < nFingerLandmark - 1; idx++) {
            index2Joint[hand + 1 + fingerIdx * nFingerLandmark + idx].child =
                hand + 1 + fingerIdx * nFingerLandmark + idx + 1;
            index2Joint[hand + 1 + fingerIdx * nFingerLandmark + idx].parent =
                parentIdx;
            parentIdx = hand + 1 + fingerIdx * nFingerLandmark + idx;
        }
    }
    for (var fingerIdx = 0; fingerIdx < 5; fingerIdx++) {
        var nFingerLandmark =
            boneName2Index.LeftHandThumb3_end -
            boneName2Index._LeftHandThumb1 +
            1;
        var hand = boneName2Index._RightHand;
        var parentIdx = hand;
        for (var idx = 0; idx < nFingerLandmark - 1; idx++) {
            index2Joint[hand + 1 + fingerIdx * nFingerLandmark + idx].child =
                hand + 1 + fingerIdx * nFingerLandmark + idx + 1;
            index2Joint[hand + 1 + fingerIdx * nFingerLandmark + idx].parent =
                parentIdx;
            parentIdx = hand + 1 + fingerIdx * nFingerLandmark + idx;
        }
    }

    var forward = TriangleNormal(
        index2Joint[boneName2Index.Pelvis].object.getWorldPosition(
            new Vector3()
        ),
        index2Joint[boneName2Index.LeftUpLeg].object.getWorldPosition(
            new Vector3()
        ),
        index2Joint[boneName2Index.RightUpLeg].object.getWorldPosition(
            new Vector3()
        )
    );
    var upward = index2Joint[boneName2Index.Neck].object
        .getWorldPosition(new Vector3())
        .sub(
            index2Joint[boneName2Index.Pelvis].object.getWorldPosition(
                new Vector3()
            )
        )
        .normalize();
    for (jointIdx = 0; jointIdx <= boneName2Index.Head; jointIdx++) {
        if (!(jointIdx in index2Joint)) continue;
        if ("parent" in index2Joint[jointIdx]) {
            index2Joint[jointIdx].inverse = getInverseQuaternion(
                index2Joint[jointIdx],
                index2Joint[index2Joint[jointIdx].child],
                TriangleNormal(
                    index2Joint[
                        index2Joint[jointIdx].parent
                    ].object.getWorldPosition(new Vector3()),
                    index2Joint[jointIdx].object.getWorldPosition(
                        new Vector3()
                    ),
                    index2Joint[
                        index2Joint[jointIdx].child
                    ].object.getWorldPosition(new Vector3())
                )
            );
            index2Joint[jointIdx].inverseRotation = index2Joint[
                jointIdx
            ].inverse
                .clone()
                .multiply(index2Joint[jointIdx].initQuaternion);
            index2Joint[jointIdx].length = index2Joint[jointIdx].object
                .getWorldPosition(new Vector3())
                .distanceTo(
                    index2Joint[
                        index2Joint[jointIdx].child
                    ].object.getWorldPosition(new Vector3())
                );
        } else if ("child" in index2Joint[jointIdx]) {
            index2Joint[jointIdx].inverse = getInverseQuaternion(
                index2Joint[jointIdx],
                index2Joint[index2Joint[jointIdx].child],
                forward
            );
            index2Joint[jointIdx].inverseRotation = index2Joint[
                jointIdx
            ].inverse
                .clone()
                .multiply(index2Joint[jointIdx].initQuaternion);
            index2Joint[jointIdx].length = index2Joint[jointIdx].object
                .getWorldPosition(new Vector3())
                .distanceTo(
                    index2Joint[
                        index2Joint[jointIdx].child
                    ].object.getWorldPosition(new Vector3())
                );
        }
    }

    for (var fingerIdx = 0; fingerIdx < 5; fingerIdx++) {
        var nFingerLandmark =
            boneName2Index.LeftHandThumb3_end -
            boneName2Index._LeftHandThumb1 +
            1;
        var hand = boneName2Index._LeftHand;
        var parentIdx = hand;

        // 첫번째 마디
        jointIdx = hand + 1 + fingerIdx * nFingerLandmark;
        index2Joint[jointIdx].inverse = getInverseQuaternion(
            index2Joint[jointIdx],
            index2Joint[index2Joint[jointIdx].child],
            TriangleNormal(
                index2Joint[
                    index2Joint[jointIdx].parent
                ].object.getWorldPosition(new Vector3()),
                index2Joint[jointIdx].object.getWorldPosition(new Vector3()),
                index2Joint[
                    index2Joint[jointIdx].child
                ].object.getWorldPosition(new Vector3())
            )
        );
        index2Joint[jointIdx].inverseRotation = index2Joint[jointIdx].inverse
            .clone()
            .multiply(index2Joint[jointIdx].initQuaternion);
        index2Joint[jointIdx].length = index2Joint[jointIdx].object
            .getWorldPosition(new Vector3())
            .distanceTo(
                index2Joint[
                    index2Joint[jointIdx].child
                ].object.getWorldPosition(new Vector3())
            );

        // 두번째, 세번째 마디
        jointIdx += 1;
        index2Joint[jointIdx].inverse = getInverseQuaternion(
            index2Joint[jointIdx],
            index2Joint[index2Joint[jointIdx].child],
            TriangleNormal(
                index2Joint[
                    index2Joint[jointIdx].parent
                ].object.getWorldPosition(new Vector3()),
                index2Joint[jointIdx].object.getWorldPosition(new Vector3()),
                index2Joint[
                    index2Joint[jointIdx].child
                ].object.getWorldPosition(new Vector3())
            )
        );
        index2Joint[jointIdx + 1].inverse =
            index2Joint[jointIdx].inverse.clone();
        index2Joint[jointIdx].inverseRotation = index2Joint[jointIdx].inverse
            .clone()
            .multiply(index2Joint[jointIdx].initQuaternion);
        index2Joint[jointIdx + 1].inverseRotation =
            index2Joint[jointIdx].inverseRotation.clone();
        index2Joint[jointIdx].length = index2Joint[jointIdx].object
            .getWorldPosition(new Vector3())
            .distanceTo(
                index2Joint[
                    index2Joint[jointIdx].child
                ].object.getWorldPosition(new Vector3())
            );
        index2Joint[jointIdx + 1].length = index2Joint[jointIdx].length;
    }

    for (var fingerIdx = 0; fingerIdx < 5; fingerIdx++) {
        var nFingerLandmark =
            boneName2Index.LeftHandThumb3_end -
            boneName2Index._LeftHandThumb1 +
            1;
        var hand = boneName2Index._RightHand;
        var parentIdx = hand;

        // 첫번째 마디
        jointIdx = hand + 1 + fingerIdx * nFingerLandmark;
        index2Joint[jointIdx].inverse = getInverseQuaternion(
            index2Joint[jointIdx],
            index2Joint[index2Joint[jointIdx].child],
            TriangleNormal(
                index2Joint[
                    index2Joint[jointIdx].parent
                ].object.getWorldPosition(new Vector3()),
                index2Joint[jointIdx].object.getWorldPosition(new Vector3()),
                index2Joint[
                    index2Joint[jointIdx].child
                ].object.getWorldPosition(new Vector3())
            )
        );
        index2Joint[jointIdx].inverseRotation = index2Joint[jointIdx].inverse
            .clone()
            .multiply(index2Joint[jointIdx].initQuaternion);
        index2Joint[jointIdx].length = index2Joint[jointIdx].object
            .getWorldPosition(new Vector3())
            .distanceTo(
                index2Joint[
                    index2Joint[jointIdx].child
                ].object.getWorldPosition(new Vector3())
            );

        // 두번째, 세번째 마디
        jointIdx += 1;
        index2Joint[jointIdx].inverse = getInverseQuaternion(
            index2Joint[jointIdx],
            index2Joint[index2Joint[jointIdx].child],
            TriangleNormal(
                index2Joint[
                    index2Joint[jointIdx].parent
                ].object.getWorldPosition(new Vector3()),
                index2Joint[jointIdx].object.getWorldPosition(new Vector3()),
                index2Joint[
                    index2Joint[jointIdx].child
                ].object.getWorldPosition(new Vector3())
            )
        );
        index2Joint[jointIdx + 1].inverse =
            index2Joint[jointIdx].inverse.clone();
        index2Joint[jointIdx].inverseRotation = index2Joint[jointIdx].inverse
            .clone()
            .multiply(index2Joint[jointIdx].initQuaternion);
        index2Joint[jointIdx + 1].inverseRotation =
            index2Joint[jointIdx].inverseRotation.clone();
        index2Joint[jointIdx].length = index2Joint[jointIdx].object
            .getWorldPosition(new Vector3())
            .distanceTo(
                index2Joint[
                    index2Joint[jointIdx].child
                ].object.getWorldPosition(new Vector3())
            );
        index2Joint[jointIdx + 1].length = index2Joint[jointIdx].length;
    }

    index2Joint[boneName2Index.Neck].length = index2Joint[
        boneName2Index.Neck
    ].object
        .getWorldPosition(new Vector3())
        .distanceTo(headEndObject.getWorldPosition(new Vector3()));
    index2Joint[boneName2Index.LeftForeArm].length = index2Joint[
        boneName2Index.LeftForeArm
    ].object
        .getWorldPosition(new Vector3())
        .distanceTo(leftHandMiddle3EndObject.getWorldPosition(new Vector3()));
    index2Joint[boneName2Index.RightForeArm].length = index2Joint[
        boneName2Index.RightForeArm
    ].object
        .getWorldPosition(new Vector3())
        .distanceTo(rightHandMiddle3EndObject.getWorldPosition(new Vector3()));

    index2Joint[boneName2Index.Pelvis].inverse = lookRotation(
        forward,
        upward
    ).invert();
    index2Joint[boneName2Index.Pelvis].inverseRotation = index2Joint[
        boneName2Index.Pelvis
    ].inverse
        .clone()
        .multiply(index2Joint[boneName2Index.Pelvis].initQuaternion);

    index2Joint[boneName2Index.Head].inverse = lookRotation(
        forward,
        upward
    ).invert();
    index2Joint[boneName2Index.Head].inverseRotation = index2Joint[
        boneName2Index.Head
    ].inverse
        .clone()
        .multiply(index2Joint[boneName2Index.Head].initQuaternion);

    console.log(
        index2Joint[boneName2Index.LeftHandMiddle1].object
            .getWorldPosition(new Vector3())
            .sub(
                index2Joint[boneName2Index.LeftHand].object.getWorldPosition(
                    new Vector3()
                )
            ),
        index2Joint[boneName2Index.LeftHandIndex1].object
            .getWorldPosition(new Vector3())
            .sub(
                index2Joint[
                    boneName2Index.LeftHandPinky1
                ].object.getWorldPosition(new Vector3())
            )
    );
    index2Joint[boneName2Index.LeftHand].inverse = lookRotation(
        index2Joint[boneName2Index.LeftHandMiddle1].object
            .getWorldPosition(new Vector3())
            .sub(
                index2Joint[boneName2Index.LeftHand].object.getWorldPosition(
                    new Vector3()
                )
            ),
        index2Joint[boneName2Index.LeftHandIndex1].object
            .getWorldPosition(new Vector3())
            .sub(
                index2Joint[
                    boneName2Index.LeftHandPinky1
                ].object.getWorldPosition(new Vector3())
            )
    ).invert();
    index2Joint[boneName2Index.LeftHand].inverseRotation = index2Joint[
        boneName2Index.LeftHand
    ].inverse
        .clone()
        .multiply(index2Joint[boneName2Index.LeftHand].initQuaternion);

    index2Joint[boneName2Index.RightHand].inverse = lookRotation(
        index2Joint[boneName2Index.RightHandMiddle1].object
            .getWorldPosition(new Vector3())
            .sub(
                index2Joint[boneName2Index.RightHand].object.getWorldPosition(
                    new Vector3()
                )
            ),
        index2Joint[boneName2Index.RightHandIndex1].object
            .getWorldPosition(new Vector3())
            .sub(
                index2Joint[
                    boneName2Index.RightHandPinky1
                ].object.getWorldPosition(new Vector3())
            )
    ).invert();
    index2Joint[boneName2Index.RightHand].inverseRotation = index2Joint[
        boneName2Index.RightHand
    ].inverse
        .clone()
        .multiply(index2Joint[boneName2Index.RightHand].initQuaternion);

    for (var itr = firstFrameIndex + 1; itr < data.n_frames; itr++)
        if (
            data.holisticJsonFrames[itr].human_detection_score <
            humanExistThreshold
        )
            data.holisticJsonFrames[itr] = {
                ...data.holisticJsonFrames[itr - 1],
            };

    butterworthParams["WC"] = Math.tan(
        (butterworthParams.param * Math.PI) / data.fps
    );
    butterworthParams["K1"] = Math.sqrt(2) * butterworthParams.WC;
    butterworthParams["K2"] = butterworthParams.WC * butterworthParams.WC;
    butterworthParams["A"] =
        butterworthParams.K2 /
        (1 + butterworthParams.K1 + butterworthParams.K2);
    butterworthParams["B"] = 2 * butterworthParams.A;
    butterworthParams["C"] = butterworthParams.A;
    butterworthParams["K3"] = butterworthParams.B / butterworthParams.K2;
    butterworthParams["D"] = -2 * butterworthParams.A + butterworthParams.K3;
    butterworthParams["E"] = 1 - 2 * butterworthParams.A - butterworthParams.K3;

    jointIdx = boneName2Index.LeftUpLeg;
    var shoulderCenter, prevForward, currentForward, nextForward, jointss;
    shoulderCenter = data.holisticJsonFrames[firstFrameIndex].body_landmarks[
        boneName2Index.LeftArm
    ]
        .clone()
        .add(
            data.holisticJsonFrames[firstFrameIndex].body_landmarks[
                boneName2Index.RightArm
            ]
        )
        .divideScalar(2);
    currentForward = TriangleNormal(
        shoulderCenter,
        data.holisticJsonFrames[firstFrameIndex].body_landmarks[
            boneName2Index.LeftUpLeg
        ],
        data.holisticJsonFrames[firstFrameIndex].body_landmarks[
            boneName2Index.RightUpLeg
        ]
    );
    for (
        frameIdx = firstFrameIndex + 1;
        frameIdx < data.n_frames - 1;
        frameIdx++
    ) {
        prevForward = currentForward;
        shoulderCenter = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.LeftArm
        ]
            .clone()
            .add(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.RightArm
                ]
            )
            .divideScalar(2);
        currentForward = TriangleNormal(
            shoulderCenter,
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.LeftUpLeg
            ],
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.RightUpLeg
            ]
        );
        if (currentForward.angleTo(currentForward) * radian2angle > 30) {
            shoulderCenter = data.holisticJsonFrames[
                frameIdx + 1
            ].body_landmarks[boneName2Index.LeftArm]
                .clone()
                .add(
                    data.holisticJsonFrames[frameIdx + 1].body_landmarks[
                        boneName2Index.RightArm
                    ]
                )
                .divideScalar(2);
            nextForward = TriangleNormal(
                shoulderCenter,
                data.holisticJsonFrames[frameIdx + 1].body_landmarks[
                    boneName2Index.LeftUpLeg
                ],
                data.holisticJsonFrames[frameIdx + 1].body_landmarks[
                    boneName2Index.RightUpLeg
                ]
            );
            if (
                prevForward.angleTo(currentForward) * radian2angle > 100 ||
                prevForward.angleTo(nextForward) * radian2angle > 140
            ) {
                if (prevForward.angleTo(currentForward) * radian2angle <= 100)
                    frameIdx++;
                var newFrameIdx = frameIdx + 1;

                for (
                    ;
                    newFrameIdx < data.n_frames &&
                    newFrameIdx < frameIdx + nFrameForCheckFlipped;
                    newFrameIdx++
                ) {
                    shoulderCenter = data.holisticJsonFrames[
                        newFrameIdx
                    ].body_landmarks[boneName2Index.LeftArm]
                        .clone()
                        .add(
                            data.holisticJsonFrames[newFrameIdx].body_landmarks[
                                boneName2Index.RightArm
                            ]
                        )
                        .divideScalar(2);
                    currentForward = TriangleNormal(
                        shoulderCenter,
                        data.holisticJsonFrames[newFrameIdx].body_landmarks[
                            boneName2Index.LeftUpLeg
                        ],
                        data.holisticJsonFrames[newFrameIdx].body_landmarks[
                            boneName2Index.RightUpLeg
                        ]
                    );
                    if (
                        prevForward.angleTo(currentForward) * radian2angle <
                        60
                    ) {
                        console.log(
                            "flip1",
                            newFrameIdx - frameIdx,
                            frameIdx,
                            newFrameIdx - 1,
                            prevForward.angleTo(currentForward) * radian2angle
                        );
                        var tempVector3;
                        for (
                            var tempIdx = frameIdx;
                            tempIdx < newFrameIdx;
                            tempIdx++
                        ) {
                            for (
                                var tempJointIdx = boneName2Index.lEar;
                                tempJointIdx < boneName2Index.RightToeBase;
                                tempJointIdx += 2
                            ) {
                                tempVector3 =
                                    data.holisticJsonFrames[
                                        tempIdx
                                    ].body_landmarks[tempJointIdx].clone();
                                data.holisticJsonFrames[tempIdx].body_landmarks[
                                    tempJointIdx
                                ].x =
                                    data.holisticJsonFrames[
                                        tempIdx
                                    ].body_landmarks[tempJointIdx + 1].x;
                                data.holisticJsonFrames[tempIdx].body_landmarks[
                                    tempJointIdx
                                ].y =
                                    data.holisticJsonFrames[
                                        tempIdx
                                    ].body_landmarks[tempJointIdx + 1].y;
                                data.holisticJsonFrames[tempIdx].body_landmarks[
                                    tempJointIdx + 1
                                ].x = tempVector3.x;
                                data.holisticJsonFrames[tempIdx].body_landmarks[
                                    tempJointIdx + 1
                                ].y = tempVector3.y;
                            }
                        }
                        break;
                    }
                }
            }
        }
    }

    // var hipDistance = data.holisticJsonFrames[firstFrameIndex].body_landmarks[
    // 	boneName2Index.LeftUpLeg
    // ].distanceTo(
    // 	data.holisticJsonFrames[firstFrameIndex].body_landmarks[
    // 		boneName2Index.RightUpLeg
    // 	]
    // );
    // var previousHipDistance, filteredHipDistance;
    // var lCurrentPos, rCurrentPos, lPreviousPos, rPreviousPos, lNextPos, rNextPos;
    // joints = [13, 15];
    // for (frameIdx = firstFrameIndex + 1; frameIdx < data.n_frames; frameIdx++) {
    // 	var flipJointCount = 0;
    // 	var closeJointCount = 0;

    // 	previousHipDistance = hipDistance;
    // 	hipDistance = data.holisticJsonFrames[frameIdx].body_landmarks[
    // 		boneName2Index.LeftUpLeg
    // 	].distanceTo(
    // 		data.holisticJsonFrames[frameIdx].body_landmarks[
    // 			boneName2Index.RightUpLeg
    // 		]
    // 	);
    // 	filteredHipDistance = hipDistance;

    // 	joints.forEach((jointIdx) => {
    // 		lCurrentPos = data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx];
    // 		rCurrentPos =
    // 			data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx + 1];

    // 		lPreviousPos =
    // 			data.holisticJsonFrames[frameIdx - 1].body_landmarks[jointIdx];
    // 		rPreviousPos =
    // 			data.holisticJsonFrames[frameIdx - 1].body_landmarks[jointIdx + 1];

    // 		if (
    // 			(lCurrentPos.distanceTo(rCurrentPos) < hipDistance / 4 ||
    // 				lPreviousPos.distanceTo(rPreviousPos) < hipDistance / 4) &&
    // 			previousHipDistance > filteredHipDistance / 2
    // 		)
    // 			closeJointCount++;
    // 		else if (
    // 			lCurrentPos.distanceTo(lPreviousPos) +
    // 				rCurrentPos.distanceTo(rPreviousPos) >
    // 				rCurrentPos.distanceTo(lPreviousPos) +
    // 					lCurrentPos.distanceTo(rPreviousPos) &&
    // 			previousHipDistance > filteredHipDistance / 2
    // 		) {
    // 			flipJointCount++
    // 		}
    // 	});

    // 	var flipStart = flipJointCount;
    // 	var flipStartClose = closeJointCount;

    // 	if (flipJointCount > 0 && (flipJointCount + closeJointCount) == 2)
    // 	{

    // 		}
    // }

    var deltaZs = [];
    for (var frameIdx = firstFrameIndex; frameIdx < data.n_frames; frameIdx++) {
        var neckPosition = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.RightArm
        ]
            .clone()
            .add(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.LeftArm
                ]
            )
            .multiplyScalar(1 / 2);
        var lc = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.RightUpLeg
        ]
            .clone()
            .add(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.LeftUpLeg
                ]
            )
            .multiplyScalar(1 / 3);
        var spinePosition = neckPosition
            .clone()
            .multiplyScalar(1 / 3)
            .add(lc);
        var pelvisPosition = spinePosition
            .clone()
            .multiplyScalar(1 / 3)
            .add(lc);

        var cEar = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.rEar
        ]
            .clone()
            .add(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.lEar
                ]
            )
            .multiplyScalar(1 / 2);
        var hv = cEar.clone().sub(neckPosition);
        var nhv = hv.clone().normalize();
        var nv = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.nose
        ]
            .clone()
            .sub(neckPosition);
        var headPosition = neckPosition
            .clone()
            .add(nhv.multiplyScalar(nhv.dot(nv)));

        data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.Pelvis
        ] = pelvisPosition;
        data.holisticJsonFrames[frameIdx].body_landmarks[boneName2Index.Neck] =
            neckPosition;
        data.holisticJsonFrames[frameIdx].body_landmarks[boneName2Index.Spine] =
            spinePosition;
        data.holisticJsonFrames[frameIdx].body_landmarks[boneName2Index.Head] =
            headPosition;

        var t1 = headPosition.distanceTo(neckPosition);
        var t2 = neckPosition.distanceTo(spinePosition);

        var pm = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.RightUpLeg
        ]
            .clone()
            .add(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.LeftUpLeg
                ]
            )
            .multiplyScalar(1 / 2);
        var t3 = spinePosition.distanceTo(spinePosition, pm);
        var t4r = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.RightUpLeg
        ].distanceTo(
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.RightLeg
            ]
        );
        var t4l = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.LeftUpLeg
        ].distanceTo(
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.LeftLeg
            ]
        );
        var t4 = (t4r + t4l) / 2;
        var t5r = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.RightLeg
        ].distanceTo(
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.RightFoot
            ]
        );
        var t5l = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.LeftLeg
        ].distanceTo(
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.LeftFoot
            ]
        );
        var t5 = (t5r + t5l) / 2;
        var t = t1 + t2 + t3 + t4 + t5;

        deltaZs.push(cameraDistance * ((centerTall * data.height) / t - 1));
    }
    butterworthValues.length = 0;
    butterworthValues.push(deltaZs[0]);
    butterworthValues.push(deltaZs[0]);
    butterworthValues.push(deltaZs[0]);

    deltaZs[0] =
        butterworthParams.A * butterworthValues[0] +
        butterworthParams.B * butterworthValues[1] +
        butterworthParams.C * butterworthValues[2] +
        butterworthParams.D * butterworthValues[2] +
        butterworthParams.E * butterworthValues[2];
    for (var idx = 1; idx < butterworthValues.length; idx++)
        butterworthValues[idx] = butterworthValues[idx - 1];
    butterworthValues[0] = deltaZs[1];

    deltaZs[1] =
        butterworthParams.A * butterworthValues[0] +
        butterworthParams.B * butterworthValues[1] +
        butterworthParams.C * butterworthValues[2] +
        butterworthParams.D * deltaZs[0] +
        butterworthParams.E * butterworthValues[2];

    for (frameIdx = 2; frameIdx < deltaZs.length; frameIdx++) {
        for (var idx = 1; idx < butterworthValues.length; idx++)
            butterworthValues[idx] = butterworthValues[idx - 1];
        butterworthValues[0] = deltaZs[frameIdx];

        deltaZs[frameIdx] =
            butterworthParams.A * butterworthValues[0] +
            butterworthParams.B * butterworthValues[1] +
            butterworthParams.C * butterworthValues[2] +
            butterworthParams.D * deltaZs[frameIdx - 1] +
            butterworthParams.E * deltaZs[frameIdx - 2];
    }

    butterworthValues.length = 0;
    butterworthValues.push(deltaZs[deltaZs.length - 1]);
    butterworthValues.push(deltaZs[deltaZs.length - 1]);
    butterworthValues.push(deltaZs[deltaZs.length - 1]);

    deltaZs[deltaZs.length - 1] =
        butterworthParams.A * butterworthValues[0] +
        butterworthParams.B * butterworthValues[1] +
        butterworthParams.C * butterworthValues[2] +
        butterworthParams.D * butterworthValues[2] +
        butterworthParams.E * butterworthValues[2];
    for (var idx = 1; idx < butterworthValues.length; idx++)
        butterworthValues[idx] = butterworthValues[idx - 1];
    butterworthValues[0] = deltaZs[deltaZs.length - 2];

    deltaZs[deltaZs.length - 2] =
        butterworthParams.A * butterworthValues[0] +
        butterworthParams.B * butterworthValues[1] +
        butterworthParams.C * butterworthValues[2] +
        butterworthParams.D * deltaZs[deltaZs.length - 1] +
        butterworthParams.E * butterworthValues[2];

    for (frameIdx = deltaZs.length - 3; frameIdx >= 0; frameIdx--) {
        for (var idx = 1; idx < butterworthValues.length; idx++)
            butterworthValues[idx] = butterworthValues[idx - 1];
        butterworthValues[0] = deltaZs[frameIdx];

        deltaZs[frameIdx] =
            butterworthParams.A * butterworthValues[0] +
            butterworthParams.B * butterworthValues[1] +
            butterworthParams.C * butterworthValues[2] +
            butterworthParams.D * deltaZs[frameIdx + 1] +
            butterworthParams.E * deltaZs[frameIdx + 2];
    }

    var pw = data.width / 2;
    var ph = data.height / 2;
    var dtc = humanTall / (cameraDistance * data.height * centerTall);
    for (var frameIdx = firstFrameIndex; frameIdx < data.n_frames; frameIdx++) {
        var dt = (cameraDistance + deltaZs[frameIdx - firstFrameIndex]) * dtc;
        for (
            var jointIdx = 0;
            jointIdx <= boneName2Index.RightHandPinky3_end;
            jointIdx++
        ) {
            data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx].setX(
                data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx].x -
                    pw
            );
            data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx].setY(
                data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx].y -
                    ph
            );
            data.holisticJsonFrames[frameIdx].body_landmarks[
                jointIdx
            ].multiplyScalar(dt);
            data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx].setZ(
                data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx].z -
                    deltaZs[frameIdx - firstFrameIndex]
            );
            data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx].add(
                index2Joint[boneName2Index.Pelvis].initPosition
            );
        }
    }

    for (
        jointIdx = 0;
        jointIdx <= boneName2Index.RightHandPinky3_end;
        jointIdx++
    ) {
        butterworthValues.length = 0;
        butterworthValues.push(
            data.holisticJsonFrames[firstFrameIndex].body_landmarks[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[firstFrameIndex].body_landmarks[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[firstFrameIndex].body_landmarks[jointIdx]
        );
        data.holisticJsonFrames[firstFrameIndex].body_landmarks[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );

        for (var idx = 1; idx < butterworthValues.length; idx++)
            butterworthValues[idx] = butterworthValues[idx - 1];
        butterworthValues[0] =
            data.holisticJsonFrames[firstFrameIndex + 1].body_landmarks[
                jointIdx
            ];

        data.holisticJsonFrames[firstFrameIndex + 1].body_landmarks[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    data.holisticJsonFrames[firstFrameIndex].body_landmarks[
                        jointIdx
                    ]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );

        for (
            frameIdx = firstFrameIndex + 2;
            frameIdx < data.n_frames;
            frameIdx++
        ) {
            for (var idx = 1; idx < butterworthValues.length; idx++)
                butterworthValues[idx] = butterworthValues[idx - 1];
            butterworthValues[0] =
                data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx];

            data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx] =
                butterworthValues[0]
                    .clone()
                    .multiplyScalar(butterworthParams.A)
                    .add(
                        butterworthValues[1]
                            .clone()
                            .multiplyScalar(butterworthParams.B)
                    )
                    .add(
                        butterworthValues[2]
                            .clone()
                            .multiplyScalar(butterworthParams.C)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx - 1].body_landmarks[
                            jointIdx
                        ]
                            .clone()
                            .multiplyScalar(butterworthParams.D)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx - 2].body_landmarks[
                            jointIdx
                        ]
                            .clone()
                            .multiplyScalar(butterworthParams.E)
                    );
        }

        butterworthValues.length = 0;
        butterworthValues.push(
            data.holisticJsonFrames[data.n_frames - 1].body_landmarks[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[data.n_frames - 1].body_landmarks[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[data.n_frames - 1].body_landmarks[jointIdx]
        );

        data.holisticJsonFrames[data.n_frames - 1].body_landmarks[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );
        for (var idx = 1; idx < butterworthValues.length; idx++)
            butterworthValues[idx] = butterworthValues[idx - 1];
        butterworthValues[0] =
            data.holisticJsonFrames[data.n_frames - 2].body_landmarks[jointIdx];

        data.holisticJsonFrames[data.n_frames - 2].body_landmarks[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    data.holisticJsonFrames[data.n_frames - 1].body_landmarks[
                        jointIdx
                    ]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );

        for (
            frameIdx = data.n_frames - 3;
            frameIdx >= firstFrameIndex;
            frameIdx--
        ) {
            for (var idx = 1; idx < butterworthValues.length; idx++)
                butterworthValues[idx] = butterworthValues[idx - 1];
            butterworthValues[0] =
                data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx];

            data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx] =
                butterworthValues[0]
                    .clone()
                    .multiplyScalar(butterworthParams.A)
                    .add(
                        butterworthValues[1]
                            .clone()
                            .multiplyScalar(butterworthParams.B)
                    )
                    .add(
                        butterworthValues[2]
                            .clone()
                            .multiplyScalar(butterworthParams.C)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx + 1].body_landmarks[
                            jointIdx
                        ]
                            .clone()
                            .multiplyScalar(butterworthParams.D)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx + 2].body_landmarks[
                            jointIdx
                        ]
                            .clone()
                            .multiplyScalar(butterworthParams.E)
                    );
        }
    }

    for (frameIdx = firstFrameIndex; frameIdx < data.n_frames; frameIdx++) {
        for (jointIdx = 0; jointIdx <= boneName2Index.rEar; jointIdx++)
            data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx].sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.Head
                ]
            );
        var tempParentPosition, tempPosition;
        var parentJointPointIdx, jointPointIdx;

        parentJointPointIdx = boneName2Index.Pelvis;
        jointPointIdx = boneName2Index.Spine;

        tempParentPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ];
        tempPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ]
                .clone()
                .add(
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        jointPointIdx
                    ]
                        .clone()
                        .sub(tempParentPosition)
                        .normalize()
                        .multiplyScalar(pelvisSpineLength)
                );
        tempParentPosition = tempPosition;
        parentJointPointIdx = jointPointIdx;
        if ("child" in index2Joint[jointPointIdx])
            jointPointIdx = index2Joint[jointPointIdx].child;
        while (true) {
            tempPosition =
                data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    parentJointPointIdx
                ]
                    .clone()
                    .add(
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            jointPointIdx
                        ]
                            .clone()
                            .sub(tempParentPosition)
                            .normalize()
                            .multiplyScalar(
                                index2Joint[parentJointPointIdx].length
                            )
                    );
            tempParentPosition = tempPosition;
            parentJointPointIdx = jointPointIdx;
            if ("child" in index2Joint[jointPointIdx])
                jointPointIdx = index2Joint[jointPointIdx].child;
            else break;
        }
        for (jointIdx = 0; jointIdx <= boneName2Index.rEar; jointIdx++)
            data.holisticJsonFrames[frameIdx].body_landmarks[jointIdx].add(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.Head
                ]
            );

        parentJointPointIdx = boneName2Index.Pelvis;
        jointPointIdx = boneName2Index.LeftArm;

        tempParentPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ];
        tempPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ]
                .clone()
                .add(
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        jointPointIdx
                    ]
                        .clone()
                        .sub(tempParentPosition)
                        .normalize()
                        .multiplyScalar(pelvisLeftArmLength)
                );
        tempParentPosition = tempPosition;
        parentJointPointIdx = jointPointIdx;
        if ("child" in index2Joint[jointPointIdx])
            jointPointIdx = index2Joint[jointPointIdx].child;
        while (true) {
            tempPosition =
                data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    parentJointPointIdx
                ]
                    .clone()
                    .add(
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            jointPointIdx
                        ]
                            .clone()
                            .sub(tempParentPosition)
                            .normalize()
                            .multiplyScalar(
                                index2Joint[parentJointPointIdx].length
                            )
                    );
            tempParentPosition = tempPosition;
            parentJointPointIdx = jointPointIdx;
            if ("child" in index2Joint[jointPointIdx])
                jointPointIdx = index2Joint[jointPointIdx].child;
            else break;
        }

        parentJointPointIdx = boneName2Index.Pelvis;
        jointPointIdx = boneName2Index.RightArm;

        tempParentPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ];
        tempPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ]
                .clone()
                .add(
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        jointPointIdx
                    ]
                        .clone()
                        .sub(tempParentPosition)
                        .normalize()
                        .multiplyScalar(pelvisRightArmLength)
                );
        tempParentPosition = tempPosition;
        parentJointPointIdx = jointPointIdx;
        if ("child" in index2Joint[jointPointIdx])
            jointPointIdx = index2Joint[jointPointIdx].child;
        while (true) {
            tempPosition =
                data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    parentJointPointIdx
                ]
                    .clone()
                    .add(
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            jointPointIdx
                        ]
                            .clone()
                            .sub(tempParentPosition)
                            .normalize()
                            .multiplyScalar(
                                index2Joint[parentJointPointIdx].length
                            )
                    );
            tempParentPosition = tempPosition;
            parentJointPointIdx = jointPointIdx;
            if ("child" in index2Joint[jointPointIdx])
                jointPointIdx = index2Joint[jointPointIdx].child;
            else break;
        }

        parentJointPointIdx = boneName2Index.Pelvis;
        jointPointIdx = boneName2Index.LeftUpLeg;

        tempParentPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ];
        tempPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ]
                .clone()
                .add(
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        jointPointIdx
                    ]
                        .clone()
                        .sub(tempParentPosition)
                        .normalize()
                        .multiplyScalar(pelvisLeftUpLegLength)
                );
        tempParentPosition = tempPosition;
        parentJointPointIdx = jointPointIdx;
        if ("child" in index2Joint[jointPointIdx])
            jointPointIdx = index2Joint[jointPointIdx].child;
        while (true) {
            tempPosition =
                data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    parentJointPointIdx
                ]
                    .clone()
                    .add(
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            jointPointIdx
                        ]
                            .clone()
                            .sub(tempParentPosition)
                            .normalize()
                            .multiplyScalar(
                                index2Joint[parentJointPointIdx].length
                            )
                    );
            tempParentPosition = tempPosition;
            parentJointPointIdx = jointPointIdx;
            if ("child" in index2Joint[jointPointIdx])
                jointPointIdx = index2Joint[jointPointIdx].child;
            else break;
        }

        parentJointPointIdx = boneName2Index.Pelvis;
        jointPointIdx = boneName2Index.RightUpLeg;

        tempParentPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ];
        tempPosition =
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
            data.holisticJsonFrames[frameIdx].body_landmarks[
                parentJointPointIdx
            ]
                .clone()
                .add(
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        jointPointIdx
                    ]
                        .clone()
                        .sub(tempParentPosition)
                        .normalize()
                        .multiplyScalar(pelvisRightUpLegLength)
                );
        tempParentPosition = tempPosition;
        parentJointPointIdx = jointPointIdx;
        if ("child" in index2Joint[jointPointIdx])
            jointPointIdx = index2Joint[jointPointIdx].child;
        while (true) {
            tempPosition =
                data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
            data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    parentJointPointIdx
                ]
                    .clone()
                    .add(
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            jointPointIdx
                        ]
                            .clone()
                            .sub(tempParentPosition)
                            .normalize()
                            .multiplyScalar(
                                index2Joint[parentJointPointIdx].length
                            )
                    );
            tempParentPosition = tempPosition;
            parentJointPointIdx = jointPointIdx;
            if ("child" in index2Joint[jointPointIdx])
                jointPointIdx = index2Joint[jointPointIdx].child;
            else break;
        }

        // // data.holisticJsonFrames[frameIdx].body_landmarks[boneName2Index._LeftHand] =
        // // 	data.holisticJsonFrames[frameIdx].body_landmarks[boneName2Index.LeftHand];

        // parentJointPointIdx = boneName2Index._LeftHand;
        // jointPointIdx = boneName2Index._LeftHandThumb1;

        // tempParentPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx];
        // tempPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 		.clone()
        // 		.add(
        // 			data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 				.clone()
        // 				.sub(tempParentPosition)
        // 				.normalize()
        // 				.multiplyScalar(handThumbLength)
        // 		);

        // tempParentPosition = tempPosition;
        // parentJointPointIdx = jointPointIdx;
        // if (
        // 	"child" in index2Joint[jointPointIdx] &&
        // 	index2Joint[jointPointIdx].child in
        // 		data.holisticJsonFrames[frameIdx].body_landmarks
        // )
        // 	jointPointIdx = index2Joint[jointPointIdx].child;
        // while (true) {
        // 	if (index2Joint[jointIdx] == undefined) break;
        // 	tempPosition =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 			.clone()
        // 			.add(
        // 				data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 					.clone()
        // 					.sub(tempParentPosition)
        // 					.normalize()
        // 					.multiplyScalar(index2Joint[parentJointPointIdx].length)
        // 			);
        // 	tempParentPosition = tempPosition;
        // 	parentJointPointIdx = jointPointIdx;
        // 	if ("child" in index2Joint[jointPointIdx])
        // 		jointPointIdx = index2Joint[jointPointIdx].child;
        // 	else break;
        // }

        // parentJointPointIdx = boneName2Index._LeftHand;
        // jointPointIdx = boneName2Index._LeftHandIndex1;

        // tempParentPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx];
        // tempPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 		.clone()
        // 		.add(
        // 			data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 				.clone()
        // 				.sub(tempParentPosition)
        // 				.normalize()
        // 				.multiplyScalar(handIndexLength)
        // 		);

        // tempParentPosition = tempPosition;
        // parentJointPointIdx = jointPointIdx;
        // if (
        // 	"child" in index2Joint[jointPointIdx] &&
        // 	index2Joint[jointPointIdx].child in
        // 		data.holisticJsonFrames[frameIdx].body_landmarks
        // )
        // 	jointPointIdx = index2Joint[jointPointIdx].child;
        // while (true) {
        // 	if (index2Joint[jointIdx] == undefined) break;
        // 	tempPosition =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 			.clone()
        // 			.add(
        // 				data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 					.clone()
        // 					.sub(tempParentPosition)
        // 					.normalize()
        // 					.multiplyScalar(index2Joint[parentJointPointIdx].length)
        // 			);
        // 	tempParentPosition = tempPosition;
        // 	parentJointPointIdx = jointPointIdx;
        // 	if ("child" in index2Joint[jointPointIdx])
        // 		jointPointIdx = index2Joint[jointPointIdx].child;
        // 	else break;
        // }

        // parentJointPointIdx = boneName2Index._LeftHand;
        // jointPointIdx = boneName2Index.LeftHandMiddle1;

        // tempParentPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx];
        // tempPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 		.clone()
        // 		.add(
        // 			data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 				.clone()
        // 				.sub(tempParentPosition)
        // 				.normalize()
        // 				.multiplyScalar(handMiddleLength)
        // 		);

        // tempParentPosition = tempPosition;
        // parentJointPointIdx = jointPointIdx;
        // if (
        // 	"child" in index2Joint[jointPointIdx] &&
        // 	index2Joint[jointPointIdx].child in
        // 		data.holisticJsonFrames[frameIdx].body_landmarks
        // )
        // 	jointPointIdx = index2Joint[jointPointIdx].child;
        // while (true) {
        // 	if (index2Joint[jointIdx] == undefined) break;
        // 	tempPosition =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 			.clone()
        // 			.add(
        // 				data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 					.clone()
        // 					.sub(tempParentPosition)
        // 					.normalize()
        // 					.multiplyScalar(index2Joint[parentJointPointIdx].length)
        // 			);
        // 	tempParentPosition = tempPosition;
        // 	parentJointPointIdx = jointPointIdx;
        // 	if ("child" in index2Joint[jointPointIdx])
        // 		jointPointIdx = index2Joint[jointPointIdx].child;
        // 	else break;
        // }

        // parentJointPointIdx = boneName2Index._LeftHand;
        // jointPointIdx = boneName2Index.LeftHandRing1;

        // tempParentPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx];
        // tempPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 		.clone()
        // 		.add(
        // 			data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 				.clone()
        // 				.sub(tempParentPosition)
        // 				.normalize()
        // 				.multiplyScalar(handRingLength)
        // 		);

        // tempParentPosition = tempPosition;
        // parentJointPointIdx = jointPointIdx;
        // if (
        // 	"child" in index2Joint[jointPointIdx] &&
        // 	index2Joint[jointPointIdx].child in
        // 		data.holisticJsonFrames[frameIdx].body_landmarks
        // )
        // 	jointPointIdx = index2Joint[jointPointIdx].child;
        // while (true) {
        // 	if (index2Joint[jointIdx] == undefined) break;
        // 	tempPosition =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 			.clone()
        // 			.add(
        // 				data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 					.clone()
        // 					.sub(tempParentPosition)
        // 					.normalize()
        // 					.multiplyScalar(index2Joint[parentJointPointIdx].length)
        // 			);
        // 	tempParentPosition = tempPosition;
        // 	parentJointPointIdx = jointPointIdx;
        // 	if ("child" in index2Joint[jointPointIdx])
        // 		jointPointIdx = index2Joint[jointPointIdx].child;
        // 	else break;
        // }

        // parentJointPointIdx = boneName2Index._LeftHand;
        // jointPointIdx = boneName2Index._LeftHandPinky1;

        // tempParentPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx];
        // tempPosition =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 		.clone()
        // 		.add(
        // 			data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 				.clone()
        // 				.sub(tempParentPosition)
        // 				.normalize()
        // 				.multiplyScalar(handPinkyLength)
        // 		);

        // tempParentPosition = tempPosition;
        // parentJointPointIdx = jointPointIdx;
        // if (
        // 	"child" in index2Joint[jointPointIdx] &&
        // 	index2Joint[jointPointIdx].child in
        // 		data.holisticJsonFrames[frameIdx].body_landmarks
        // )
        // 	jointPointIdx = index2Joint[jointPointIdx].child;
        // while (true) {
        // 	if (index2Joint[jointIdx] == undefined) break;
        // 	tempPosition =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx];
        // 	data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx] =
        // 		data.holisticJsonFrames[frameIdx].body_landmarks[parentJointPointIdx]
        // 			.clone()
        // 			.add(
        // 				data.holisticJsonFrames[frameIdx].body_landmarks[jointPointIdx]
        // 					.clone()
        // 					.sub(tempParentPosition)
        // 					.normalize()
        // 					.multiplyScalar(index2Joint[parentJointPointIdx].length)
        // 			);
        // 	tempParentPosition = tempPosition;
        // 	parentJointPointIdx = jointPointIdx;
        // 	if ("child" in index2Joint[jointPointIdx])
        // 		jointPointIdx = index2Joint[jointPointIdx].child;
        // 	else break;
        // }
    }

    for (var frameIdx = firstFrameIndex; frameIdx < data.n_frames; frameIdx++) {
        forward = TriangleNormal(
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.Pelvis
            ],
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.LeftUpLeg
            ],
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.RightUpLeg
            ]
        );
        upward = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.Neck
        ]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.Pelvis
                ]
            )
            .normalize();
        data.holisticJsonFrames[frameIdx].jointForwards = {};
        data.holisticJsonFrames[frameIdx].jointForwards[boneName2Index.Pelvis] =
            forward;
        data.holisticJsonFrames[frameIdx].jointUps = {};
        data.holisticJsonFrames[frameIdx].jointUps[boneName2Index.Pelvis] =
            upward;
    }

    for (var frameIdx = firstFrameIndex; frameIdx < data.n_frames; frameIdx++) {
        forward =
            data.holisticJsonFrames[frameIdx].jointForwards[
                boneName2Index.Pelvis
            ];
        upward =
            data.holisticJsonFrames[frameIdx].jointUps[boneName2Index.Pelvis];

        var gaze = TriangleNormal(
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.Neck
            ],
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.rEar
            ],
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.lEar
            ]
        );
        var f = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.Head
        ]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.Neck
                ]
            );
        data.holisticJsonFrames[frameIdx].jointForwards[boneName2Index.Head] =
            gaze;
        data.holisticJsonFrames[frameIdx].jointUps[boneName2Index.Head] = f;

        for (
            var jointIdx = boneName2Index.nose;
            jointIdx <= boneName2Index.RightForeArm;
            jointIdx++
        ) {
            if (index2Joint[jointIdx] == undefined) continue;
            else if ("parent" in index2Joint[jointIdx]) {
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        index2Joint[jointIdx].child
                    ]
                        .clone()
                        .sub(
                            data.holisticJsonFrames[frameIdx].body_landmarks[
                                jointIdx
                            ]
                        )
                        .normalize();
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx] =
                    TriangleNormal(
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            index2Joint[jointIdx].parent
                        ],
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            jointIdx
                        ],
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            index2Joint[jointIdx].child
                        ]
                    );
            } else if ("child" in index2Joint[jointIdx]) {
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        index2Joint[jointIdx].child
                    ]
                        .clone()
                        .sub(
                            data.holisticJsonFrames[frameIdx].body_landmarks[
                                jointIdx
                            ]
                        )
                        .normalize();
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx] = forward;
            }
        }
        for (
            var jointIdx = boneName2Index.Neck;
            jointIdx <= boneName2Index.Spine;
            jointIdx++
        ) {
            if ("parent" in index2Joint[jointIdx]) {
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        index2Joint[jointIdx].child
                    ]
                        .clone()
                        .sub(
                            data.holisticJsonFrames[frameIdx].body_landmarks[
                                jointIdx
                            ]
                        )
                        .normalize();
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx] =
                    TriangleNormal(
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            index2Joint[jointIdx].parent
                        ],
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            jointIdx
                        ],
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            index2Joint[jointIdx].child
                        ]
                    );
            } else if ("child" in index2Joint[jointIdx]) {
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        index2Joint[jointIdx].child
                    ]
                        .clone()
                        .sub(
                            data.holisticJsonFrames[frameIdx].body_landmarks[
                                jointIdx
                            ]
                        )
                        .normalize();
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx] = forward;
            }
        }

        var jointUp, jointForward;

        jointUp = TriangleNormal(
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.RightUpLeg
            ],
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.RightLeg
            ],
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.RightFoot
            ]
        );
        jointForward = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.RightLeg
        ]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.RightUpLeg
                ]
            );
        if (
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.RightUpLeg
            ]
                .clone()
                .sub(
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        boneName2Index.LeftUpLeg
                    ]
                )
                .dot(jointUp) < 0
        ) {
            jointUp.multiplyScalar(-1);
        }
        data.holisticJsonFrames[frameIdx].jointForwards[
            boneName2Index.RightUpLeg
        ] = jointForward.normalize();
        data.holisticJsonFrames[frameIdx].jointUps[boneName2Index.RightUpLeg] =
            jointUp.normalize();

        jointForward = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.RightFoot
        ]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.RightLeg
                ]
            );
        data.holisticJsonFrames[frameIdx].jointForwards[
            boneName2Index.RightLeg
        ] = jointForward.normalize();
        data.holisticJsonFrames[frameIdx].jointUps[boneName2Index.RightLeg] =
            jointUp.normalize();

        jointUp = TriangleNormal(
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.LeftUpLeg
            ],
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.LeftLeg
            ],
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.LeftFoot
            ]
        );
        jointForward = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.LeftLeg
        ]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.LeftUpLeg
                ]
            );
        if (
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.RightUpLeg
            ]
                .clone()
                .sub(
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        boneName2Index.LeftUpLeg
                    ]
                )
                .dot(jointUp) < 0
        ) {
            jointUp.multiplyScalar(-1);
        }
        data.holisticJsonFrames[frameIdx].jointForwards[
            boneName2Index.LeftUpLeg
        ] = jointForward.normalize();
        data.holisticJsonFrames[frameIdx].jointUps[boneName2Index.LeftUpLeg] =
            jointUp.normalize();

        jointForward = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.LeftFoot
        ]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.LeftLeg
                ]
            );
        data.holisticJsonFrames[frameIdx].jointForwards[
            boneName2Index.LeftLeg
        ] = jointForward.normalize();
        data.holisticJsonFrames[frameIdx].jointUps[boneName2Index.LeftLeg] =
            jointUp.normalize();

        // Hand
        jointForward = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.LeftHandMiddle1
        ]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index._LeftHand
                ]
            )
            .normalize();
        jointUp = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.LeftHandIndex1
        ]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.LeftHandPinky1
                ]
            )
            .normalize();
        data.holisticJsonFrames[frameIdx].jointForwards[
            boneName2Index._LeftHand
        ] = jointForward.normalize();
        data.holisticJsonFrames[frameIdx].jointUps[boneName2Index._LeftHand] =
            jointUp.normalize();

        for (
            jointIdx = boneName2Index._LeftHandThumb1;
            jointIdx <= boneName2Index.LeftHandPinky3_end;
            jointIdx++
        ) {
            if (!(jointIdx in index2Joint)) continue;
            if ("parent" in index2Joint[jointIdx]) {
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        index2Joint[jointIdx].child
                    ]
                        .clone()
                        .sub(
                            data.holisticJsonFrames[frameIdx].body_landmarks[
                                jointIdx
                            ]
                        )
                        .normalize();
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx] =
                    TriangleNormal(
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            index2Joint[jointIdx].parent
                        ],
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            jointIdx
                        ],
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            index2Joint[jointIdx].child
                        ]
                    );
            } else if ("child" in index2Joint[jointIdx]) {
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        index2Joint[jointIdx].child
                    ]
                        .clone()
                        .sub(
                            data.holisticJsonFrames[frameIdx].body_landmarks[
                                jointIdx
                            ]
                        )
                        .normalize();
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx] = forward;
            }
        }

        jointForward = data.holisticJsonFrames[frameIdx].body_landmarks[
            boneName2Index.RightHandMiddle1
        ]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index._RightHand
                ]
            )
            .normalize();
        jointUp = data.holisticJsonFrames[
            boneName2Index.RightHandIndex1
        ].body_landmarks[boneName2Index._RightHandIndex1]
            .clone()
            .sub(
                data.holisticJsonFrames[frameIdx].body_landmarks[
                    boneName2Index.RightHandPinky1
                ]
            )
            .normalize();
        data.holisticJsonFrames[frameIdx].jointForwards[
            boneName2Index._RightHand
        ] = jointForward.normalize();
        data.holisticJsonFrames[frameIdx].jointUps[boneName2Index._RightHand] =
            jointUp.normalize();

        for (
            jointIdx = boneName2Index._RightHandThumb1;
            jointIdx <= boneName2Index.RightHandPinky3_end;
            jointIdx++
        ) {
            if (!(jointIdx in index2Joint)) continue;
            if ("parent" in index2Joint[jointIdx]) {
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        index2Joint[jointIdx].child
                    ]
                        .clone()
                        .sub(
                            data.holisticJsonFrames[frameIdx].body_landmarks[
                                jointIdx
                            ]
                        )
                        .normalize();
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx] =
                    TriangleNormal(
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            index2Joint[jointIdx].parent
                        ],
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            jointIdx
                        ],
                        data.holisticJsonFrames[frameIdx].body_landmarks[
                            index2Joint[jointIdx].child
                        ]
                    );
            } else if ("child" in index2Joint[jointIdx]) {
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                    data.holisticJsonFrames[frameIdx].body_landmarks[
                        index2Joint[jointIdx].child
                    ]
                        .clone()
                        .sub(
                            data.holisticJsonFrames[frameIdx].body_landmarks[
                                jointIdx
                            ]
                        )
                        .normalize();
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx] = forward;
            }
        }
    }

    for (
        jointIdx = 0;
        jointIdx <= boneName2Index.RightHandPinky3_end;
        jointIdx++
    ) {
        if (
            !(
                jointIdx in
                data.holisticJsonFrames[firstFrameIndex].jointForwards
            )
        )
            continue;
        butterworthValues.length = 0;
        butterworthValues.push(
            data.holisticJsonFrames[firstFrameIndex].jointForwards[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[firstFrameIndex].jointForwards[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[firstFrameIndex].jointForwards[jointIdx]
        );
        data.holisticJsonFrames[firstFrameIndex].jointForwards[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );

        for (var idx = 1; idx < butterworthValues.length; idx++)
            butterworthValues[idx] = butterworthValues[idx - 1];
        butterworthValues[0] =
            data.holisticJsonFrames[firstFrameIndex + 1].jointForwards[
                jointIdx
            ];

        data.holisticJsonFrames[firstFrameIndex + 1].jointForwards[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    data.holisticJsonFrames[firstFrameIndex].jointForwards[
                        jointIdx
                    ]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );

        for (
            frameIdx = firstFrameIndex + 2;
            frameIdx < data.n_frames;
            frameIdx++
        ) {
            for (var idx = 1; idx < butterworthValues.length; idx++)
                butterworthValues[idx] = butterworthValues[idx - 1];
            butterworthValues[0] =
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx];

            data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                butterworthValues[0]
                    .clone()
                    .multiplyScalar(butterworthParams.A)
                    .add(
                        butterworthValues[1]
                            .clone()
                            .multiplyScalar(butterworthParams.B)
                    )
                    .add(
                        butterworthValues[2]
                            .clone()
                            .multiplyScalar(butterworthParams.C)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx - 1].jointForwards[
                            jointIdx
                        ]
                            .clone()
                            .multiplyScalar(butterworthParams.D)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx - 2].jointForwards[
                            jointIdx
                        ]
                            .clone()
                            .multiplyScalar(butterworthParams.E)
                    );
        }

        butterworthValues.length = 0;
        butterworthValues.push(
            data.holisticJsonFrames[firstFrameIndex].jointUps[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[firstFrameIndex].jointUps[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[firstFrameIndex].jointUps[jointIdx]
        );
        data.holisticJsonFrames[firstFrameIndex].jointUps[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );

        for (var idx = 1; idx < butterworthValues.length; idx++)
            butterworthValues[idx] = butterworthValues[idx - 1];
        butterworthValues[0] =
            data.holisticJsonFrames[firstFrameIndex + 1].jointUps[jointIdx];

        data.holisticJsonFrames[firstFrameIndex + 1].jointUps[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    data.holisticJsonFrames[firstFrameIndex].jointUps[jointIdx]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );

        for (
            frameIdx = firstFrameIndex + 2;
            frameIdx < data.n_frames;
            frameIdx++
        ) {
            for (var idx = 1; idx < butterworthValues.length; idx++)
                butterworthValues[idx] = butterworthValues[idx - 1];
            butterworthValues[0] =
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx];

            data.holisticJsonFrames[frameIdx].jointUps[jointIdx] =
                butterworthValues[0]
                    .clone()
                    .multiplyScalar(butterworthParams.A)
                    .add(
                        butterworthValues[1]
                            .clone()
                            .multiplyScalar(butterworthParams.B)
                    )
                    .add(
                        butterworthValues[2]
                            .clone()
                            .multiplyScalar(butterworthParams.C)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx - 1].jointUps[jointIdx]
                            .clone()
                            .multiplyScalar(butterworthParams.D)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx - 2].jointUps[jointIdx]
                            .clone()
                            .multiplyScalar(butterworthParams.E)
                    );
        }

        butterworthValues.length = 0;
        butterworthValues.push(
            data.holisticJsonFrames[data.n_frames - 1].jointForwards[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[data.n_frames - 1].jointForwards[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[data.n_frames - 1].jointForwards[jointIdx]
        );

        data.holisticJsonFrames[data.n_frames - 1].jointForwards[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );
        for (var idx = 1; idx < butterworthValues.length; idx++)
            butterworthValues[idx] = butterworthValues[idx - 1];
        butterworthValues[0] =
            data.holisticJsonFrames[data.n_frames - 2].jointForwards[jointIdx];

        data.holisticJsonFrames[data.n_frames - 2].jointForwards[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    data.holisticJsonFrames[data.n_frames - 1].jointForwards[
                        jointIdx
                    ]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );

        for (
            frameIdx = data.n_frames - 3;
            frameIdx >= firstFrameIndex;
            frameIdx--
        ) {
            for (var idx = 1; idx < butterworthValues.length; idx++)
                butterworthValues[idx] = butterworthValues[idx - 1];
            butterworthValues[0] =
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx];

            data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] =
                butterworthValues[0]
                    .clone()
                    .multiplyScalar(butterworthParams.A)
                    .add(
                        butterworthValues[1]
                            .clone()
                            .multiplyScalar(butterworthParams.B)
                    )
                    .add(
                        butterworthValues[2]
                            .clone()
                            .multiplyScalar(butterworthParams.C)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx + 1].jointForwards[
                            jointIdx
                        ]
                            .clone()
                            .multiplyScalar(butterworthParams.D)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx + 2].jointForwards[
                            jointIdx
                        ]
                            .clone()
                            .multiplyScalar(butterworthParams.E)
                    );
        }

        butterworthValues.length = 0;
        butterworthValues.push(
            data.holisticJsonFrames[data.n_frames - 1].jointUps[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[data.n_frames - 1].jointUps[jointIdx]
        );
        butterworthValues.push(
            data.holisticJsonFrames[data.n_frames - 1].jointUps[jointIdx]
        );

        data.holisticJsonFrames[data.n_frames - 1].jointUps[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );
        for (var idx = 1; idx < butterworthValues.length; idx++)
            butterworthValues[idx] = butterworthValues[idx - 1];
        butterworthValues[0] =
            data.holisticJsonFrames[data.n_frames - 2].jointUps[jointIdx];

        data.holisticJsonFrames[data.n_frames - 2].jointUps[jointIdx] =
            butterworthValues[0]
                .clone()
                .multiplyScalar(butterworthParams.A)
                .add(
                    butterworthValues[1]
                        .clone()
                        .multiplyScalar(butterworthParams.B)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.C)
                )
                .add(
                    data.holisticJsonFrames[data.n_frames - 1].jointUps[
                        jointIdx
                    ]
                        .clone()
                        .multiplyScalar(butterworthParams.D)
                )
                .add(
                    butterworthValues[2]
                        .clone()
                        .multiplyScalar(butterworthParams.E)
                );

        for (
            frameIdx = data.n_frames - 3;
            frameIdx >= firstFrameIndex;
            frameIdx--
        ) {
            for (var idx = 1; idx < butterworthValues.length; idx++)
                butterworthValues[idx] = butterworthValues[idx - 1];
            butterworthValues[0] =
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx];

            data.holisticJsonFrames[frameIdx].jointUps[jointIdx] =
                butterworthValues[0]
                    .clone()
                    .multiplyScalar(butterworthParams.A)
                    .add(
                        butterworthValues[1]
                            .clone()
                            .multiplyScalar(butterworthParams.B)
                    )
                    .add(
                        butterworthValues[2]
                            .clone()
                            .multiplyScalar(butterworthParams.C)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx + 1].jointUps[jointIdx]
                            .clone()
                            .multiplyScalar(butterworthParams.D)
                    )
                    .add(
                        data.holisticJsonFrames[frameIdx + 2].jointUps[jointIdx]
                            .clone()
                            .multiplyScalar(butterworthParams.E)
                    );
        }
    }
    console.log(data.holisticJsonFrames[194]);
    console.log(data.holisticJsonFrames[194].jointForwards[37]);
    console.log(data.holisticJsonFrames[194].jointUps[37]);
    console.log(data.holisticJsonFrames[194].body_landmarks[15]);
    console.log(data.holisticJsonFrames[194].body_landmarks[37]);
    console.log(data.holisticJsonFrames[194].body_landmarks[46]);
    // console.log(data.holisticJsonFrames[194].body_landmarks[15]);
    // console.log(data.holisticJsonFrames[194].body_landmarks[37]);
    // console.log(data.holisticJsonFrames[194].body_landmarks[38]);
    // console.log(data.holisticJsonFrames[194].body_landmarks[42]);
    // console.log(data.holisticJsonFrames[194].body_landmarks[46]);
    // console.log(data.holisticJsonFrames[194].body_landmarks[50]);
    // console.log(data.holisticJsonFrames[194].body_landmarks[54]);

    for (const [jointIdx, element] of Object.entries(index2Joint)) {
        element.quaternionValues = [];
    }
    var times = [];
    var unitTime = 1 / data.fps;

    function animationLoop(frameIdx) {
        if (frameIdx >= data.n_frames) return;
        times.push(frameIdx - firstFrameIndex);

        var position, quaternion;
        position = index2Joint[boneName2Index.Pelvis].object.worldToLocal(
            data.holisticJsonFrames[frameIdx].body_landmarks[
                boneName2Index.Pelvis
            ]
        );
        // index2Joint[boneName2Index.Pelvis].object.position.x = position.x;
        // index2Joint[boneName2Index.Pelvis].object.position.y = position.y;
        // index2Joint[boneName2Index.Pelvis].object.position.z = position.z;

        quaternion = lookRotation(
            data.holisticJsonFrames[frameIdx].jointForwards[
                boneName2Index.Pelvis
            ],
            data.holisticJsonFrames[frameIdx].jointUps[boneName2Index.Pelvis]
        );
        quaternion.multiply(index2Joint[boneName2Index.Pelvis].inverseRotation);

        var saved = quaternion.clone();
        quaternion = index2Joint[boneName2Index.Pelvis].object.quaternion
            .clone()
            .multiply(
                index2Joint[boneName2Index.Pelvis].object
                    .getWorldQuaternion(new Quaternion())
                    .invert()
            )
            .multiply(quaternion);
        index2Joint[boneName2Index.Pelvis].object.setRotationFromQuaternion(
            quaternion
        );
        index2Joint[boneName2Index.Pelvis].object.updateMatrix();

        for (const [jointIdx, element] of Object.entries(index2Joint)) {
            if (
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx] ==
                undefined
            )
                continue;
            // if (jointIdx == boneName2Index.Spine) continue;

            var quaternion = lookRotation(
                data.holisticJsonFrames[frameIdx].jointForwards[jointIdx],
                data.holisticJsonFrames[frameIdx].jointUps[jointIdx]
            );

            quaternion.multiply(element.inverseRotation);

            quaternion = element.object.quaternion
                .clone()
                .multiply(
                    element.object.getWorldQuaternion(new Quaternion()).invert()
                )
                .multiply(quaternion);

            element.object.setRotationFromQuaternion(quaternion);

            element.quaternionValues.push(quaternion.x);
            element.quaternionValues.push(quaternion.y);
            element.quaternionValues.push(quaternion.z);
            element.quaternionValues.push(quaternion.w);
        }
        return animationLoop(frameIdx + 1);
    }
    animationLoop(firstFrameIndex);
    console.log(unitTime);
    console.log(times);
    var animation = {};
    animation["name"] = "test";
    animation["fps"] = data.fps;
    animation["duration"] = (data.n_frames - firstFrameIndex) * unitTime;
    animation["tracks"] = [];
    animation["uuid"] = "A693A7D4-F7B8-4DA7-8056-C473D4C062BE";
    animation["blendMode"] = 2500;
    for (const [jointIdx, element] of Object.entries(index2Joint)) {
        var track = {};
        track["name"] = element.object.name + ".quaternion";
        track["times"] = times;
        track["values"] = element.quaternionValues;
        track["type"] = "quaternion";
        animation["tracks"].push(track);
    }

    return AnimationClip.parse(animation);
}
