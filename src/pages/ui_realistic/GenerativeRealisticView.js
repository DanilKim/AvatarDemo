import * as React from "react";
import Box from "@mui/material/Box";
// import RealWorld from "../world_view/RealWorld";
//import RealWorld from "../world_view/realworld";
import { Card, Button, Typography } from "@mui/material";
import { useState } from "react";
import useStore from "../../store/UseStore";
import { common_store } from "../../store/Common_Store";

export default function GenerativeRealisticView({ ...props }) {
  //변수 설정
  const [animationAction, setAnimationAction] = useState(null);

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
        >
          <Typography variant="body1" sx={{ color: "black" }}>
            모델 생성
          </Typography>
        </Button>
      </Card>
      <Box sx={{ height: "100%", width: "60%" }}></Box>

      <Box
        direction="row"
        justifySelf="flex-end"
        sx={{ width: "15vw", bgcolor: "#fafafa", p: 3 }}
      ></Box>
    </Box>
  );
}
