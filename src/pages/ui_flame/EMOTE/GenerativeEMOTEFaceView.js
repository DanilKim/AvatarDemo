import * as React from "react";
import Box from "@mui/material/Box";
import AnimationWorld from "../../world_view/EmoteWorld";
// import AnimationWorld from "../../world_view/EX_animationworld";
import { Card, Button, Typography } from "@mui/material";
import { useState } from "react";
import useStore from "../../../store/UseStore";
import { emote_store } from "../../../store/EMOTEStore";
// import { common_store } from "../../../store/Common_Store";
import axios from "axios";

export default function GenerativeAnimationView({ ...props }) {
  //변수 설정
  const [animationAction, setAnimationAction] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    emote_store.setIsLoading(true);

    const formData = new FormData();
    formData.append("audio", emote_store.inputAudio);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    try {
      const res = await axios({
        method: "post",
        url: "http://222.122.67.140:11885/emote",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const model = new Blob([res.data]);
      emote_store.setObj(URL.createObjectURL(model));
      emote_store.setIsLoading(false);
    } catch (error) {
      console.log(error);
      emote_store.setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: "94vh", display: "flex" }}>
      <Card
        variant="elevation"
        sx={{
          width: "20%",
          height: "97.5%",
          m: "1.25%",
          bgcolor: "#5f5f5f",
          borderRadius: 5,
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
      </Card>
      <Box sx={{ height: "100%", width: "60%" }}>
        <AnimationWorld setAnimationAction={setAnimationAction} />
      </Box>

      <Box
        direction="row"
        justifySelf="flex-end"
        sx={{ width: "15vw", bgcolor: "#fafafa", p: 3 }}
      ></Box>
    </Box>
  );
}
