import AvatarFaceAnimationModel from "../_mocks_/AvatarFaceAnimationModel";

export default function AvatarFaceAnimationViewModel() {
    const faceAnimClips = AvatarFaceAnimationModel()

    const clipsLength = faceAnimClips.length;

    return clipsLength
}