import { AnimationMixer } from 'three';
import { useFrame } from "@react-three/fiber";
import React from 'react'
import AvatarModel from './avatar_model';
import { formControlClasses } from '@mui/material';
import AvatarModelTivine from './avatar_model_tivine';
// import { useEffect, useState } from 'react';


export default function AvatarViewModel(props) {
    var model;
    if (props.currentModel != 0) model = props.currentModel;
    else if (props.human != 2) {
        model = AvatarModel(props.human);
    } else {
        model = AvatarModelTivine(props.currentModel);
    }
    // const model = AvatarModel(props.human)
    const actions = {};

    var anim_num=10;
    
    let mixer
    const testobject = new Object();
    
    mixer = new AnimationMixer()

    for( var i =0 ;i<model.animations.length;i++)
    // for( var i =0 ;i<5;i++)
    {
        actions[model.animations[i].name] = mixer.clipAction(model.animations[i],model)
    }
 
    if(props.anim_index != null)
    {
        anim_num = Number(props.anim_index.toString());   
    }

    //Animation Tracking
    
    if(anim_num < model.animations.length)
    // if(anim_num===0||anim_num ===1 || anim_num ===2 || anim_num===3||anim_num===4)
    {
        actions[model.animations[anim_num].name].play();
        props.clipLength(model.animations[anim_num].duration);
        //mixer.setTime(props.animTime);
        
        var jsonObject = model.animations[anim_num].toJSON(); 
        var temp_value=jsonObject['tracks'][0]['times'][jsonObject['tracks'][0]['times'].length-1];
        var frame_index=0;

        

        for(var i=0; i< jsonObject['tracks'].length;i++)
		{
            
                var stringb = jsonObject['tracks'][i]['name'];
                var stringname = stringb.split('.');
                testobject[stringname[0]]= model.getObjectByName(stringname[0]);

                for( var j=0;j<jsonObject['tracks'][i]['times'].length;j++)
                {
                    if(temp_value > Math.abs(props.animTime-jsonObject['tracks'][i]['times'][j]))
                    {
                        frame_index =j;
                        temp_value = Math.abs(props.animTime-jsonObject['tracks'][i]['times'][j]);
                    }

                }
                if(stringname[0]!=='eye_L'&&stringname[0]!=='eye_R'
                &&stringname[0]!=='eyelid_L_bot'&&stringname[0]!=='eyelid_L_top'&&
                stringname[0]!=='eyelid_R_bot'&&stringname[0]!=='eyelid_R_top'&&
                stringname[0]!=='Lip_center'&&stringname[0]!=='Lip_L'&&
                stringname[0]!=='Lip_R'&&stringname[0]!=='Jaw'&&
                stringname[0]!=='Jaw_tip'&&stringname[0]!=='eyes_Ctrl'&&
                stringname[0]!=='eye_R_Target'&&stringname[0]!=='eye_L_Target'&&
                stringname[0]!=='RightHand_IK'&&stringname[0]!=='LeftHand_IK'&&
                stringname[0]!=='LeftLeg_IK'&&stringname[0]!=='LeftKnee_Target'&&
                stringname[0]!=='RightKnee_Target'&&stringname[0]!=='RightLeg_IK')
                {
                    if(jsonObject['tracks'][i]['type']==='quaternion')
                    {
                        testobject[stringname[0]].quaternion.x = jsonObject['tracks'][i]['values'][frame_index*4+0];
                        testobject[stringname[0]].quaternion.y = jsonObject['tracks'][i]['values'][frame_index*4+1];
                        testobject[stringname[0]].quaternion.z = jsonObject['tracks'][i]['values'][frame_index*4+2];
                        testobject[stringname[0]].quaternion.w = jsonObject['tracks'][i]['values'][frame_index*4+3];
                        
                    }
                    if(jsonObject['tracks'][i]['type']==='vector')
                    {
                        testobject[stringname[0]].position.x = jsonObject['tracks'][i]['values'][frame_index*3+0];
                        testobject[stringname[0]].position.y = jsonObject['tracks'][i]['values'][frame_index*3+1];
                        testobject[stringname[0]].position.z = jsonObject['tracks'][i]['values'][frame_index*3+2];
                        
                    }
                }

                
                frame_index=0;
                temp_value=jsonObject['tracks'][i]['times'][jsonObject['tracks'][i]['times'].length-1];

		}
        

    }

    ( function addObjects( objects, pad ) {

        for ( let i = 0, l = objects.length; i < l; i ++ ) {

            const object = objects[ i ];

            if (object.isBone === true){
                if ( props.nodeStates.has( object.name ) === false ) {

                    props.nodeStates.set( object.name, object );
                    props.depthState.set(object.name, pad);

                }

                if ( props.nodeStates.get( object.name ) === object ) {

                    addObjects( object.children, pad + 1 );
                    

                }
            }

        }

    } )( model.children, 0 );
    
    props.setCurrentModel(model);

    //console.log(props.depthState);


    
/*
    if(jsonObject['tracks'][0]['type']==='quaternion')
    {
        
        props.setQuaternion([frame_index,frame_index,frame_index,frame_index]);
        
    }
    if(jsonObject['tracks'][0]['type']==='vector')
    {
        props.setPosition([frame_index,frame_index,frame_index]);

    }
*/
    
    /*
    useFrame((state, delta) => {
        mixer?.update(delta)
    })*/

    
    return (
        
        <primitive object={model} />
    )
}