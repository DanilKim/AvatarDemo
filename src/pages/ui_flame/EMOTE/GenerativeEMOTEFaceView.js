import * as React from "react";
import Box from "@mui/material/Box";
import AnimationWorld from "../../world_view/EmoteWorld";
import { observer } from "mobx-react-lite";
import { Card, Button, Typography } from "@mui/material";
import { useState } from "react";
import useStore from "../../../store/UseStore";
import axios from "axios";

const GenerativeEMOTEFaceView = observer(() => {
  //변수 설정
  const { emote_store } = useStore();
  const [animationAction, setAnimationAction] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const [textSrc, setTextSrc] = useState(null);

  const playAnimation = () => {
    animationAction?.reset().play();
  };

  const stopAnimation = () => {
    animationAction?.stop();
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAudioSubmit = async (e) => {
    e.preventDefault();
    // emote_store.setIsLoading(true);

    const formData = new FormData();
    formData.append("text", emote_store.inputText);
    // formData.append("text", textSrc);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    try {
      const res = await axios({
        method: "post",
        //url: "http://222.122.67.140:11885/text2wav",
        url: "http://192.168.153.123:11885/text2wav",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const file = new Blob([res.data]);
      emote_store.setInputAudio(file);
      setAudioSrc(URL.createObjectURL(file));
      // emote_store.setIsLoading(false);
    } catch (error) {
      console.log(error);
      // emote_store.setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // emote_store.setIsLoading(true);

    const formData = new FormData();
    formData.append("audio", emote_store.inputAudio);
    // formData.append("text", textSrc);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    try {
      const res = await axios({
        method: "post",
        //url: "http://222.122.67.140:11885/emote",
        url: "http://192.168.153.123:11885/emote",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const model = new Blob([res.data]);
      emote_store.setObj(URL.createObjectURL(model));
      // emote_store.setIsLoading(false);
    } catch (error) {
      console.log(error);
      // emote_store.setIsLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ height: "94vh", display: "flex" }}>
        <Box
          sx={{
            zIndex: 2,
            width: "16%",
            minWidth: "240px",
            height: "90vh",
            ml: "1.5%",
            pt: "10px",
            bgcolor: "#5f5f5f",
            borderRadius: 5,
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            left: "0%",
            position: "absolute",
          }}
        >
          <Button
            color="inherit"
            sx={{
              width: 1,
              height: 1 / 8,
              mt: 3,
              bgcolor: "#22aa22",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="file"
              accept="audio/wav"
              onChange={(e) => {
                if (e.target.files[0]) {
                  const file = e.target.files[0];

                  emote_store.setInputAudio(file);
                  setAudioSrc(URL.createObjectURL(file));

                  let form = new FormData();
                  // 여기에 유저 아이디 넣을것
                  const user_id = "React_JS";
                  form.append("user_id", user_id);
                  form.append("audiofile", file, "audio.wav");
                }
              }}
            />
            <Typography variant="body1" sx={{ color: "black" }}>
              오디오 첨부
            </Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              width: 1,
              height: 1 / 8,
              mt: 3,
              bgcolor: "#22aa22",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              placeholder="원하는 문장을 입력하세요."
              type="text"
              value={textSrc}
              onChange={(e) => {
                if (e) {
                  const text_value = e.target.value;
                  emote_store.setInputText(text_value);
                  setTextSrc(text_value);

                  let form = new FormData();
                  // 여기에 유저 아이디 넣을것
                  const user_id = "React_JS";
                  form.append("user_id", user_id);
                  form.append("textfile", text_value, "text.txt");
                }
              }}
            />
            <Typography variant="body1" sx={{ color: "black" }}>
              텍스트 첨부
            </Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              width: 1,
              height: 40,
              mt: 3,
              bgcolor: "#939393",
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
            }}
            onClick={handleAudioSubmit}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              Audio Generate
            </Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              width: 1,
              height: 40,
              mt: 3,
              bgcolor: "#939393",
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
            }}
            onClick={handleSubmit}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              Generate
            </Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              width: 1,
              height: 1 / 8,
              mt: 3,
              bgcolor: "#22aa22",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
            }}
            onClick={playAnimation}
          >
            <Typography variant="body1" sx={{ color: "black" }}>
              애니메이션 재생
            </Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              width: 1,
              height: 1 / 8,
              mt: 3,
              bgcolor: "#aaaa22",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
            }}
            onClick={stopAnimation}
          >
            <Typography variant="body1" sx={{ color: "black" }}>
              애니메이션 멈춤
            </Typography>
          </Button>
        </Box>
        <Box sx={{ height: "100%", width: "100vw", zIndex: 1 }}>
          <AnimationWorld setAnimationAction={setAnimationAction} />
        </Box>

        <Box
          direction="row"
          sx={{
            zIndex: 2,
            width: "18%",
            minWidth: "270px",
            height: "90vh",
            display: "flex",
            flexDirection: "row",
            right: "0%",
            position: "absolute",
            alignItems: "flex-start",
            bgcolor: "#fafafa",
            p: 3,
            mr: "1.5%",
          }}
        ></Box>
      </Box>
    </>
  );
});
export default GenerativeEMOTEFaceView;
