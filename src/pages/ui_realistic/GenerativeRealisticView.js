import * as React from "react";
import Box from "@mui/material/Box";
import CreateWorldCustom from "../world_view/SmplifyWorld";
import { Card } from "@mui/material";
import CreateAvatarBtn from "./CreateRealisticBtnView";

export default function GenerativeFaceView({ ...props }) {
  //변수 설정
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
        <CreateAvatarBtn />
      </Card>
      <Box sx={{ height: "100%", width: "60%" }}>
        <CreateWorldCustom />
      </Box>

      <Box
        direction="row"
        justifySelf="flex-end"
        sx={{ width: "15vw", bgcolor: "#fafafa", p: 3 }}
      ></Box>
    </Box>
  );
}
