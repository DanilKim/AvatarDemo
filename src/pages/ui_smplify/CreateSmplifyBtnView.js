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
import axios from "axios";
import Input from "@mui/material/Input";
import RequestHttp from "../../components/RequestHttp";
import CreateAvatarBtnViewModel from "./CreateSmplifyBtnViewModel";
import Uploader from "./uploader"

export default function CreateAvatarBtnView({ ...props }) {
  const { open, handleClickOpen, handleClose } = new CreateAvatarBtnViewModel();

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
        onClick={handleClickOpen}
      >
        <Add sx={{ color: "white", mt: 5 }} />
        <Typography variant="body1" sx={{ color: "white", mb: 5 }}>
          전면, 후면 사진으로 아바타 만들기
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>영상 업로드</DialogTitle>
        <DialogContent>
          <Uploader/>
          <DialogContentText>
            이미지로부터 얼굴 특징을 획득하여, 아바타를 생성합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
