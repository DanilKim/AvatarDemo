import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slider from "@mui/material/Slider";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from "axios";
import MuiInput from "@mui/material/Input";
import RequestHttp from "../../../components/RequestHttp";

import { observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import { styled } from "@mui/material/styles";

import useStore from "../../../store/UseStore";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 150,
  width: 150,
  left: 50,
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
  const { deca_store } = useStore();

  const [hairPop, setHairPop] = useState(false);

  const initHairImg = "/static/images/anime/0.jpg";

  return (
    <Box sx={{mt: 2, algnItems: "center", justifyContent: "center"}}>

      <ImageButton onClick={()=>{deca_store.setHairId((deca_store.hair_id+1)%15)}}>
        <ImageSrc style={{ backgroundImage: 'url("/static/images/hair_preview/' 
          + deca_store.hair_id
          + '.png")'}} />
        <Image>
          <Add sx={{ color: "white", mt: 5 }} />
          <Typography variant="body1" sx={{ color: "white", mb: 5 }}>
            헤어 고르기
          </Typography>
        </Image>
      </ImageButton>

      <Dialog
        open={hairPop}
        onClose={() => {
          setHairPop(false);
        }}
      >
        <DialogTitle>스타일 선택</DialogTitle>
      </Dialog>
    </Box>
  );
}

export default observer(SelectHairCard);
