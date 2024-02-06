import React from 'react';
import { 
    List,
    ListItemButton,
    IconButton,
    ListItemText,
    Typography,
    Button,
    TextField
} from '@mui/material';
import * as THREE from "three"

function combine_top_bot_anim(model, top_index,bot_index,anim_name,anim_index)
	{
		//const bot_bone = ['mixamorigLeftUpLeg','mixamorigLeftLeg', 'mixamorigLeftFoot','mixamorigLeftToeBase',
		//'mixamorigRightUpLeg','mixamorigRightLeg','mixamorigRightFoot','mixamorigRightToeBase','mixamorigHips'];

		const bot_bone = ['LeftUpLeg','LeftLeg', 'LeftFoot','LeftToeBase','RightUpLeg','RightLeg','RightFoot','RightToeBase','Pelvis'];  //Mint

		var jsonObject_top =model.animations[top_index].toJSON();   ///top animation index
		var jsonObject_bot =model.animations[bot_index].toJSON();	 ///bot animation index
		var jsonObject_combine = jsonObject_top;
		if(jsonObject_top['duration']< jsonObject_bot['duration'])
		{
			jsonObject_combine['duration']= jsonObject_bot['duration'];
		}

		for(var i=0;i<jsonObject_top['tracks'].length;i++)
		{
			var stringb = jsonObject_top['tracks'][i]['name'];
			var stringname = stringb.split('.');

			for(var t=0;t<bot_bone.length;t++)
			{
				if(stringname[0] === bot_bone[t])
				{
					
					jsonObject_combine['tracks'][i]['times']= jsonObject_bot['tracks'][i]['times'];
					jsonObject_combine['tracks'][i]['values']= jsonObject_bot['tracks'][i]['values'];
				}
			}
		}

		const KF_combine =[];
		const ARR_combine =[];

		for(var i=0;i<jsonObject_combine['tracks'].length;i++)
		{
			
			if(jsonObject_combine['tracks'][i]['type']=== 'vector')
			{
				KF_combine[i] = new THREE.VectorKeyframeTrack(jsonObject_combine['tracks'][i]['name'],jsonObject_combine['tracks'][i]['times'],jsonObject_combine['tracks'][i]['values']);
			}
			if(jsonObject_combine['tracks'][i]['type']==='quaternion')
			{
				KF_combine[i] = new THREE.QuaternionKeyframeTrack(jsonObject_combine['tracks'][i]['name'],jsonObject_combine['tracks'][i]['times'],jsonObject_combine['tracks'][i]['values']);	
			}
			
		}

		for(var i=0;i<KF_combine.length;i++)
		{
			ARR_combine[i] = KF_combine[i]
		}
		
		const testclip_combine = new THREE.AnimationClip(anim_name,jsonObject_combine['tracks'][0]['times'][jsonObject_combine['tracks'][0]['times'].length-1], ARR_combine);
		
		var jsonObject_com = testclip_combine.toJSON();
		var jsonString_com = JSON.stringify( jsonObject_com );
		//download(anim_name+'.json,jsonString_mod);
		var testclip_comload=  THREE.AnimationClip.parse(jsonObject_com);	
		model.animations[anim_index] = testclip_comload;
		model.animations[anim_index].name = anim_name;
	}

export default function AnimUpLowBody(props) {

    const [selectedTopAnim, setSelectedTopAnim] = React.useState(0);
    const [selectedBottomAnim, setSelectedBottomAnim] = React.useState(0);
    const [newAnimName, setNewAnimName] = React.useState("");


    const handleTopAnimClick = (event, value)=>{
        setSelectedTopAnim(value);
        var new_anim_index = props.animNum[props.animNum.length-1] +1;
        combine_top_bot_anim(props.nodeStates.get("Pelvis").parent,
        value,
        selectedBottomAnim,
        ``,
        new_anim_index
        )
        props.setAnimIndex(new_anim_index);
    }

    const handleBottomAnimClick = (event, value)=>{
        setSelectedBottomAnim(value);
        var new_anim_index = props.animNum[props.animNum.length-1] +1;
        combine_top_bot_anim(props.nodeStates.get("Pelvis").parent,
        selectedTopAnim,
        value,
        ``,
        new_anim_index
        )
        props.setAnimIndex(new_anim_index);
    }

    const makeButtonClick = (event)=>{
        var new_anim_index = props.animNum[props.animNum.length-1] +1;
        combine_top_bot_anim(props.nodeStates.get("Pelvis").parent,
        selectedTopAnim,
        selectedBottomAnim,
        newAnimName,
        new_anim_index
        )
        props.appendAnimNum(new_anim_index);
        props.setAnimIndex(new_anim_index);
    }

    const handleAnimNameChange = (event)=>{
        setNewAnimName(event.target.value);
    }



    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#939393' }}>
            <Typography variant="UpperBody" sx={{ ml: 2, flexGrow: 1, color: 'white' }}>
                상체 Animation
            </Typography>
            {props.animNum.map((value) => (
            <ListItemButton
            key={value}
            onClick={(event) => handleTopAnimClick(event, value)}
            selected={value===selectedTopAnim}
            secondaryAction={
                <IconButton>
                </IconButton>
            }
            >
            <ListItemText primary={`Animation ${props.animNum[value]}`} sx={{ ml: 2, flexGrow: 1, color: 'white' }} />
            </ListItemButton>
            
        ))}
            <Typography variant="UpperBody" sx={{ ml: 2, flexGrow: 1, color: 'white' }}>
                하체 Animation
            </Typography>
            {props.animNum.map((value) => (
                <ListItemButton
                key={value}
                onClick={(event) => handleBottomAnimClick(event, value)}
                selected={value===selectedBottomAnim}
                secondaryAction={
                    <IconButton>
                    </IconButton>
                }
                >
                <ListItemText primary={`Animation ${props.animNum[value]}`} sx={{ ml: 2, flexGrow: 1, color: 'white' }} />
                </ListItemButton>
                
            ))}

            <TextField
            id="outlined-multiline-flexible"
            label="New Anim Name"
            multiline
            value={newAnimName}
            onChange={handleAnimNameChange}
            />
            
            <Button variant="contained"
                    onClick={(event) => makeButtonClick(event)}
            >합치기</Button>

            

        </List>     
    )

}