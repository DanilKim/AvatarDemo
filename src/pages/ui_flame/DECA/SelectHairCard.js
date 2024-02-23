import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"
import axios from "axios";
import MuiInput from "@mui/material/Input";
import RequestHttp from "../../../components/RequestHttp";

import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import { useStores } from '../../../store/Context';
import { styled } from "@mui/material/styles";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 150,
  width: "40%",
  left: 20
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "relative",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const Input = styled(MuiInput)`
  width: 40px;
`;


function SelectHairCard({ ...props }) {
  const { DECAStore } = useStores();

  const [hairPop, setHairPop] = useState(false);

  const initHairImg = "/static/images/face/Custom_FaceTemplate_00.png";


  return (
    <Box sx={{mt: 2, algnItems: "center", justifyContent: "center"}}>

      <ImageButton onClick={()=>{setHairPop(true)}}>
        <ImageSrc style={{ backgroundImage: 'url("' + initHairImg +'")'}} />
        <Image>
          <Add sx={{ color: "white", mt: 5 }} />
          <Typography variant="body1" sx={{ color: "white", mb: 5 }}>
            헤어 고르기
          </Typography>
        </Image>
      </ImageButton>

      <Dialog open={hairPop} onClose={()=>{setHairPop(false)}}>
        <DialogTitle>스타일 선택</DialogTitle>
        
      </Dialog>

    </Box>
  );
}

export default observer(SelectHairCard)