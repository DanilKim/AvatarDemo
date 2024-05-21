import * as React from "react";
import Box from "@mui/material/Box";
import SmplifyWorld from "../world_view/SmplifyWorld";
import { Card } from "@mui/material";

import CreateAvatarBtn from "./CreateSmplifyBtnView";

export default function SmplifyCreate({ ...props }) {
  //변수 설정
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ height: "100%", display: "flex" }}>
      <Card
        variant="elevation"
        sx={{
          width: "16%",
          minWidth: "240px",
          height: "90vh",
          ml: "1.5%",
          bgcolor: "#5f5f5f",
          borderRadius: 5,
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <CreateAvatarBtn />
      </Card>
      <Box sx={{ height: "100%", width: "100%" }}>
        <SmplifyWorld />
      </Box>

      <Box
        direction="row"
        sx={{
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
  );
}
