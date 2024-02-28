import * as React from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Dialog from "@mui/material/Dialog";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import MuiInput from "@mui/material/Input";
import HairDialog from "./HairView";

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



function SelectHairCard({ ...props }) {
  const { common_store, deca_store, data_store } = useStore();

  const [hairPop, setHairPop] = useState(false);


  return (
    <Box sx={{mt: 2, algnItems: "center", justifyContent: "center"}}>

      <ImageButton 
        onClick={() => {setHairPop(true);}}
      >
        <ImageSrc style={{ backgroundImage: 'url("/static/hair_preview/' 
          + data_store.hair_list[deca_store.hair_id]
          + '.png")'}} />
        <Image>
          <Add sx={{ color: "white", mt: 5 }} />
          <Typography variant="body1" sx={{ color: "white", mb: 5 }}>
            헤어 고르기
          </Typography>
        </Image>
      </ImageButton>

      <Dialog
        maxWidth="1080px"
        open={hairPop}
        onClose={() => {
          common_store.setHairIdx(-1);
          setHairPop(false);
        }}
        PaperProps={{
          sx: {
            borderColor: "#1C1C1C",
            borderRadius: "8px",
            border: 0.5,
          },
        }}
      >
        <HairDialog onClose={()=>{setHairPop(false)}} />
      </Dialog>
    </Box>
  );
}

export default observer(SelectHairCard);
