import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import useStore from "../../store/UseStore";
import axios from "axios";
import Input from "@mui/material/Input";
import RequestHttp from "../../components/RequestHttp";
import CreateFLAMEBtnViewModel from "./CreateFLAMEBtnViewModel";
import LibraryDialog from "./LibraryView";

export default function TmpBtnView({ ...props }) {
  const { open, handleClickOpen, handleClose } = new CreateFLAMEBtnViewModel();
  const { common_store, data_store } = useStore();

  return (
    <Box>
      <Button
        color="inherit"
        sx={{
          width: 1,
          height: 1 / 3,
          mt: 3,
          bgcolor: "#939393",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => {
          data_store.SetList();
          handleClickOpen();
        }}
      >
        <Add sx={{ color: "white", mt: 5 }} />
        <Typography variant="body1" sx={{ color: "white", mb: 5 }}>
          사진으로 아바타 만들기
        </Typography>
      </Button>
      <Dialog
        maxWidth="1080px"
        open={open}
        onClose={() => {
          common_store.changeAsset("");
          common_store.setLibraryIdx(-1);
          handleClose();
        }}
        PaperProps={{
          sx: {
            borderColor: "#1C1C1C",
            borderRadius: "8px",
            border: 0.5,
          },
        }}
      >
        <LibraryDialog onClose={handleClose} />
      </Dialog>
    </Box>
  );
}
