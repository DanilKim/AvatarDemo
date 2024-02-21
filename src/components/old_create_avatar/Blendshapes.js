import React from 'react';
import { 
  Box,
  Slider,
} from '@mui/material';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import { useLoader } from '@react-three/fiber'

  
  export default function BlendshapeSlider(props) {
    const [value, setValue] = React.useState([0]);
    const model = useLoader(FBXLoader, 'static/models/Avatar_Ani_TextureEmbed.fbx');
    const head = model.getObjectByName( 'Head_m' );
    const list = []

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    for (const [key, value] of Object.entries( head.morphTargetDictionary )) {
      list.push(<Slider
        value={head.morphTargetInfluences[value]}
        max={1}
        step={0.01}
        onChange={handleChange}
        defaultValue={0}
        aria-label="Small"
        valueLabelDisplay="auto"
    />)
  }

    

    return (
      <div>
        {list}
      </div>
    )
  }