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
import CreateBodyAnimBtnViewModel from "./CreateBodyAnimBtnViewModel";
import axios from "axios";
import JsonToBodyAnim from "./JsonToBodyAnim";

export default function CreateBodyAnimBtnView({ ...props }) {
    const { open, handleClickOpen, handleClose } =
        new CreateBodyAnimBtnViewModel();

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
                    영상으로 몸 애니메이션 만들기
                </Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>영상 업로드</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        영상으로부터 움직임을 감지하여, 아바타 몸 애니메이션을
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
                                for (
                                    let i = 0;
                                    i < e.target.files.length;
                                    i++
                                ) {
                                    if (e.target.files[i]) {
                                        let form = new FormData();
                                        form.append(
                                            "user_id",
                                            "React_CYH_Client"
                                        );
                                        form.append(
                                            "videofile",
                                            e.target.files[i],
                                            "videofile.mp4"
                                        );
                                        axios
                                            .post("/local/bodyanimation", form)
                                            .then((response) => {
                                                console.log(
                                                    "response : ",
                                                    JSON.stringify(
                                                        response,
                                                        null,
                                                        2
                                                    )
                                                );
                                                // props.setFaceAnimData(animClip);
                                                const animClip = JsonToBodyAnim(
                                                    props.currentModel,
                                                    response.data.data
                                                );
                                                animClip.name = "Generated";
                                                props.currentModel.animations.push(
                                                    animClip
                                                );
                                                handleClose();
                                            })
                                            .catch((error) => {
                                                console.log("failed", error);
                                                handleClose();
                                                // return (error);
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
