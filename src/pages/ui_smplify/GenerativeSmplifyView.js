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
    <Box sx={{ height: "94vh", display: "flex" }}>
      <Box
        variant="elevation"
        sx={{
          zIndex: 2,
          width: "16%",
          minWidth: "240px",
          height: "90vh",
          ml: "1.5%",
          bgcolor: "#5f5f5f",
          borderRadius: 5,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          left: "0%",
          position: "absolute",
        }}
      >
        <CreateAvatarBtn />
      </Box>
      <Box sx={{ height: "100%", width: "100vw", zIndex: 1 }}>
        <SmplifyWorld />
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
  );
}
