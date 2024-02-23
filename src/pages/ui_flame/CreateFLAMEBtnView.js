import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
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
import CreateAvatarBtnViewModel from "./CreateFLAMEBtnViewModel";

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
          사진으로 아바타 만들기
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>영상 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이미지로부터 얼굴 특징을 획득하여, 아바타를 생성합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button component="label">
            얼굴 생성
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => {
                for (let i = 0; i < e.target.files.length; i++) {
                  if (e.target.files[i]) {
                    let form = new FormData();
                    // 여기에 유저 아이디 넣을것
                    const user_id = "React_JS";
                    form.append("user_id", user_id);
                    form.append("imgfile", e.target.files[i], "imgfile.jpg");
                    axios
                      .post("/local/checkfrontface", form)
                      .then((response) => {
                        console.log(
                          "response checkfront: ",
                          JSON.stringify(response, null, 2)
                        );

                        axios
                          .get("/local/getfaceshapekey/" + user_id)
                          .then((response) => {
                            console.log(
                              "response getfaceshapekey: ",
                              JSON.stringify(response, null, 2)
                            );
                            props.setFaceBlendShape(response.data.BlendShape);
                          })
                          .catch((error) => {
                            console.log(
                              "get face shape key face failed",
                              error
                            );
                            handleClose();
                          });

                        axios
                          .get("/local/geteye/" + user_id)
                          .then((response) => {
                            console.log(
                              "response geteye: ",
                              JSON.stringify(response, null, 2)
                            );
                            props.setEyeSize(response.data.size);
                            props.setEyeShape(response.data.shape);
                          })
                          .catch((error) => {
                            console.log(
                              "get face shape key face failed",
                              error
                            );
                            handleClose();
                          });

                        axios
                          .get("/local/getskintone/" + user_id)
                          .then((response) => {
                            console.log(
                              "response getskin: ",
                              JSON.stringify(response, null, 2)
                            );
                            props.setSkin(response.data.SkineTone);
                          })
                          .catch((error) => {
                            console.log(
                              "get face shape key face failed",
                              error
                            );
                            handleClose();
                          });
                      })
                      .catch((error) => {
                        console.log("check front face failed", error);
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
