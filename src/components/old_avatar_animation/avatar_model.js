import { useLoader } from '@react-three/fiber'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {FileLoader} from 'three';
import {AnimationClip} from 'three';

export default function AvatarModel( human ) {
    
    
    const anim_name ={};
    const model_name={};

    model_name[0]  = 'static/models/Avatar_Ani_TextureEmbed.fbx'
    anim_name[0]=  'static/models/ReactAnim/'+'Angry.json'
    anim_name[1]=  'static/models/ReactAnim/'+'Clapping.json'
    anim_name[2]=  'static/models/ReactAnim/'+'Defeat.json'
    anim_name[3]=  'static/models/ReactAnim/'+'Gangnam Style.json'
    anim_name[4]=  'static/models/ReactAnim/'+'Idle.json'
    
    const model = useLoader(FBXLoader, model_name[0])
    const angry = useLoader(FileLoader, anim_name[0])
    const clapping = useLoader(FileLoader, anim_name[1])
    const defeat = useLoader(FileLoader, anim_name[2])
    const gangnamstyle = useLoader(FileLoader, anim_name[3])
    const idle = useLoader(FileLoader, anim_name[4])
    
    if(human ==0)
    {
        model.scale.set(0.02,0.02,0.02);
    }
    if(human ==1)
    {
        model.scale.set(0.03,0.03,0.03);
    }
    model.position.set(0,-1,-3);
    
    model.animations[0] = AnimationClip.parse(JSON.parse(angry));
    model.animations[0].name ="angry";
    model.animations[1] = AnimationClip.parse(JSON.parse(clapping));
    model.animations[1].name = "clapping";
    model.animations[2] = AnimationClip.parse(JSON.parse(defeat));
    model.animations[2].name = "defeat";
    model.animations[3] = AnimationClip.parse(JSON.parse(gangnamstyle));
    model.animations[3].name = "gangnamstyle";
    model.animations[4] = AnimationClip.parse(JSON.parse(idle));
    model.animations[4].name = "idle";


    return model;

    function download(filename, text) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);
	  
		element.style.display = 'none';
		document.body.appendChild(element);
	  
		element.click();
	  
		document.body.removeChild(element);
	  }
    
}


