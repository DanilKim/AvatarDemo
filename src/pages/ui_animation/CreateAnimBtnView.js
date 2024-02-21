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
import Input from "@mui/material/Input";
import RequestHttp from "../../components/RequestHttp";
import CreateAnimBtnViewModel from "./CreateAnimBtnViewModel";
import axios from "axios";
import input from "../../components/jsoncomponents/input.json";
import JsonToFaceAnim from "../../components/face_animation/JsonToFaceAnim";

export default function CreateAnimBtnView({ ...props }) {
  const { open, handleClickOpen, handleClose } = new CreateAnimBtnViewModel();

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
          영상으로 얼굴 애니메이션 만들기
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>영상 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            영상으로부터 표정 변화를 감지하여, 아바타 얼굴 애니메이션을
            생성합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button component="label">
            애니메이션 생성
            <input
              type="file"
              accept=".mp4, .mov"
              onChange={(e) => {
                for (let i = 0; i < e.target.files.length; i++) {
                  if (e.target.files[i]) {
                    let form = new FormData();
                    form.append("user_id", "React_CYH_Client");
                    form.append(
                      "videofile",
                      e.target.files[i],
                      "videofile.mp4"
                    );
                    console.log(input);
                    form.append(
                      "inputjsonfile",
                      new Blob([JSON.stringify(input)], {
                        type: "application/json",
                      })
                    );
                    axios
                      .post("/local/animation", form)
                      .then((response) => {
                        // console.log('response : ', JSON.stringify(response, null, 2));
                        const animClip = JsonToFaceAnim(response.data.data);

                        props.setFaceAnimData(animClip);
                        props.setAnimNameList([
                          ...props.animNameList,
                          e.target.files[i].name.split(".")[0],
                        ]);
                        props.setAudioList([...props.audioList, null]);
                        handleClose();
                      })
                      .catch((error) => {
                        console.log("failed", error);
                        // return (error);
                        handleClose();
                      });
                  }
                }
              }}
              hidden
            />
          </Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
