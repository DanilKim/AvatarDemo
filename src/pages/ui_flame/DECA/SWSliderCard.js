import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"
import MuiInput from "@mui/material/Input";

import { observer } from 'mobx-react';
import { useStores } from '../../../store/Context';
import { styled } from "@mui/material/styles";


const Input = styled(MuiInput)`
  width: 40px;
`;


function SWSliderCard({ ...props }) {
  const { DECAStore } = useStores();

  const handleSliderChange = (e, newValue) => {
    DECAStore.setSw(Number(newValue));
  }

  const handleInputChange = (e) => {
    DECAStore.setSw(Number(e.target.value));
  }

  const handleBlur = () => {
    if (DECAStore.sw < 0) {
      DECAStore.setSw(0);
    } else if (DECAStore.sw > 100) {
      DECAStore.setSw(100);
    }
  };

  return (
    <Box sx={{algnItems: "center", justifyContent: "center"}}>

      <Typography id="input-slider" align='center' gutterBottom variant='h6' sx={{color:'#ffffb0', mt:5}}>
        Structure Weight
      </Typography>
      <Grid container spacing={2} alignItems="center" sx={{width:"90%", ml:1, mt:0.5}}>
        <Grid item xs>
          <Slider
            value={DECAStore.sw}
            onBlur={handleBlur}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={DECAStore.sw}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>

    </Box>
  );
}

export default observer(SWSliderCard)
