import * as React from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Dialog from "@mui/material/Dialog";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import MuiInput from "@mui/material/Input";
import LibraryDialog from "./StyleLibrary/LibraryView";

import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import useStore from "../../../store/UseStore";
import { styled } from "@mui/material/styles";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 150,
  width: 150,
  left: 1,
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

function SelectStyleCard({ ...props }) {
  const { common_store, deca_store, data_store } = useStore();

  const [styPop, setStyPop] = useState(false);

  return (
    <Box sx={{ mt: 2, algnItems: "center", justifyContent: "center" }}>
      <ImageButton
        onClick={() => {
          setStyPop(true);
          data_store.SetList(0);
        }}
      >
        <ImageSrc
          style={{
            backgroundImage:
              'url("/static/images/' +
              deca_store.style +
              "/" +
              deca_store.style_id +
              '.jpg")',
          }}
        />
        <Image>
          <Add sx={{ color: "white", mt: 5 }} />
          <Typography variant="body1" sx={{ color: "white", mb: 5 }}>
            스타일 사진 고르기
          </Typography>
        </Image>
      </ImageButton>

      <Dialog
        maxWidth="1080px"
        open={styPop}
        onClose={() => {
          common_store.changeAsset("");
          common_store.setLibraryIdx(-1);
          setStyPop(false);
        }}
        PaperProps={{
          sx: {
            borderColor: "#1C1C1C",
            borderRadius: "8px",
            border: 0.5,
          },
        }}
      >
        <LibraryDialog
          onClose={() => {
            setStyPop(false);
          }}
        />
      </Dialog>
    </Box>
  );
}

export default observer(SelectStyleCard);
