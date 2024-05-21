import * as React from "react";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";

export default function StylizedFaceView({ ...props }) {
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
          width: "45%",
          ml: 2,
          mr: 1,
          bgcolor: "#5f5f5f",
          borderRadius: 5,
        }}
      ></Card>
      <Card
        variant="elevation"
        sx={{
          width: "45%",
          ml: 1,
          mr: 2,
          bgcolor: "#5f5f5f",
          borderRadius: 5,
        }}
      ></Card>
    </Box>
  );
}
