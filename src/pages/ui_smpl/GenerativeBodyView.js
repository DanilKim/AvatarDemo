import * as React from "react";
import Box from "@mui/material/Box";
import MyBodyAnimWorld from "../world_view/bodyworld";
import {
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Slider,
} from "@mui/material";

import PropTypes from "prop-types";
import CreateSMPLBtn from "./CreateSMPLBtnView";

export default function GenerativeBodyView({ ...props }) {
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
        <CreateSMPLBtn
          faceBlendShape={props.faceBlendShape}
          setFaceBlendShape={props.setFaceBlendShape}
          eyeSize={props.eyeSize}
          setEyeSize={props.setEyeSize}
          eyeShape={props.eyeShape}
          setEyeShape={props.setEyeShape}
          skin={props.skin}
          setSkin={props.setSkin}
        />
      </Card>
      <Box sx={{ height: "100%", width: "60%" }}>
        <MyBodyAnimWorld
          faceBlendShape={props.faceBlendShape}
          setFaceBlendShape={props.setFaceBlendShape}
          eyeSize={props.eyeSize}
          setEyeSize={props.setEyeSize}
          eyeShape={props.eyeShape}
          setEyeShape={props.setEyeShape}
          skin={props.skin}
          setSkin={props.setSkin}
        />
      </Box>
    </Box>
  );
}
