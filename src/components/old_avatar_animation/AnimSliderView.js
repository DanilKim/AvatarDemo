import React from 'react';
import { 
  Box,
  Slider,
  TextField,
  ToggleButton
} from '@mui/material';
import AnimSliderViewModel from './AnimSliderViewModel';

  function valuetext(value) {
    return `${value}`;
  }
  
  export default function AnimSliderView(props) {
    const { isPlaying, playChange} = AnimSliderViewModel()
    const [value, setValue] = React.useState([0]);


    const handleFrameChange = (event) => {
      if (event.target.value>props.clipLength){
        setValue(props.clipLength);
        props.setAnimTime(props.clipLength)
      }
      else{
        setValue(event.target.value);
        props.setAnimTime(event.target.value)
      }
    };
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
      props.setAnimTime(newValue)
    };

    return (
      <Box>
        <Slider
            value={value}
            max={props.clipLength}
            step={0.01}
            onChange={handleChange}
            defaultValue={0}
            aria-label="Small"
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            marks={props.marks}
        />
        <TextField
            id="outlined-multiline-flexible"
            label="Frame"
            multiline
            value={value}
            onChange={handleFrameChange}
        />
        <ToggleButton color="primary" value="web" selected={isPlaying} onChange={playChange}>
                            Play
                            
        </ToggleButton>  
      </Box>
    );
  }