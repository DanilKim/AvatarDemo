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
import MuiInput from "@mui/material/Input";
import useStore from "../../../store/UseStore";

import { observer } from "mobx-react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 150,
  width: 150,
  left: 12,
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

function UploadFaceImageCard({ ...props }) {
  //const { DECAStore } = useStores();
  const { deca_store } = useStore();

  const [imgPop, setImgPop] = useState(false);

  const [imageSrc, setImageSrc] = useState(null);
  const initInputImg = "/input/images/face.jpg";

  return (
    <Box>
      <ImageButton
        onClick={() => {
          setImgPop(true);
        }}
        sx={{ mr: 3 }}
      >
        {imageSrc ? (
          <ImageSrc style={{ backgroundImage: 'url("' + imageSrc + '")' }} />
        ) : (
          <ImageSrc
            style={{ backgroundImage: 'url("' + initInputImg + '")' }}
          />
        )}
        <Image>
          <Add sx={{ color: "white", mt: 5 }} />
          <Typography variant="body1" sx={{ color: "white", mb: 5 }}>
            얼굴 사진 업로드
          </Typography>
        </Image>
      </ImageButton>

      <Dialog
        open={imgPop}
        onClose={() => {
          setImgPop(false);
        }}
      >
        <DialogTitle>영상 업로드</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이미지로부터 얼굴 특징을 획득하여, 아바타를 생성합니다.
          </DialogContentText>
          <DialogContentText sx={{ mt: 2 }}></DialogContentText>
          <DialogContentText>* 주의 사항 *</DialogContentText>
          <DialogContentText>1. 정면 얼굴 사진이어야 해요.</DialogContentText>
          <DialogContentText>
            2. 앞머리가 눈코입, 눈썹 가리지 않게 해주세요.
          </DialogContentText>
          <DialogContentText>
            3. 안경 등 얼굴을 가리는 악세사리를 벗고 찍어주세요.
          </DialogContentText>
          <DialogContentText>
            4. 가급적이면 입을 다물고 무표정을 유지해주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button component="label">
            얼굴 생성
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/gif"
              onChange={(e) => {
                //for (let i = 0; i < e.target.files.length; i++) {
                if (e.target.files[0]) {
                  const file = e.target.files[0];

                  deca_store.setInputImage(file);
                  setImageSrc(URL.createObjectURL(file));

                  let form = new FormData();
                  // 여기에 유저 아이디 넣을것
                  const user_id = "React_JS";
                  form.append("user_id", user_id);
                  form.append("imgfile", file, "face1.jpg");

                  setImgPop(false);
                }
              }}
              hidden
            />
          </Button>
          <Button
            onClick={() => {
              setImgPop(false);
            }}
          >
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default observer(UploadFaceImageCard);
