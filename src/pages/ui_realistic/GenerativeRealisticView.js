import * as React from "react";
import Box from "@mui/material/Box";
import AnimationWorld from "../world_view/EX_animationworld";
import { Card, Button, Typography } from "@mui/material";
import { useState } from "react";
import useStore from "../../store/UseStore";
import { common_store } from "../../store/Common_Store";

export default function GenerativeAnimationView({ ...props }) {
  //변수 설정
  const [animationAction, setAnimationAction] = useState(null);

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
