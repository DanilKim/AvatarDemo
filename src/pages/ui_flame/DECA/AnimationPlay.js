import React, { useEffect, useState } from 'react';
import './css/AudioUploader.css';

import {
    Typography,
    Box,
    Button,
    Card,
    CardHeader,
    CardContent,
} from "@mui/material";

import axios from "axios";
import { observer } from "mobx-react";
import useStore from "../../../store/UseStore";


const AnimationPlay = (props) => {
    const playAnimation = () => {
        props.action?.reset().play();
    };

    const stopAnimation = () => {
        props.action?.stop();
    };

    //console.log(isPlaying);
    return (
      <Box>
        <Button
          color="inherit"
          sx={{
            width: 1,
            height: 1 / 16,
            mt: 1,
            bgcolor: "#22aa22",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
          onClick={playAnimation}
        >
          <Typography variant="body1" sx={{ color: "black" }}>
            애니메이션 재생
          </Typography>
        </Button>
        <Button
          color="inherit"
          sx={{
            width: 1,
            height: 1 / 16,
            mt: 1,
            bgcolor: "#aaaa22",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
          onClick={stopAnimation}
        >
          <Typography variant="body1" sx={{ color: "black" }}>
            애니메이션 멈춤
          </Typography>
        </Button>
      
      </Box>
    );
};

export default AnimationPlay;