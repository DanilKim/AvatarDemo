import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

import * as React from "react";
import TabPanel from "../components/TabPanelView";
import AvatarCreate from "./ui_flame/GenerativeFaceView";

import { useState } from "react";

function App() {
  const [value, setValue] = React.useState(0);

  //const [faceBlendShape, setFaceBlendShape] = React.useState([new Object()]);
  //const [bodyAnimation, setBodyAnimation] = React.useState([new Object()]);

  const [faceBlendShape, setFaceBlendShape] = useState(0);
  const [eyeSize, setEyeSize] = useState(0);
  const [eyeShape, setEyeShape] = useState(0);
  const [skin, setSkin] = useState(0);
  //const [faceAnimData, setFaceAnimData] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "#2e2e2e", width: "100vw", height: "100vh" }}>
      <AppBar
        position="absolute"
        sx={{ bgcolor: "#fafafa", borderBottom: 1, borderColor: "#eaeaea" }}
      >
        <Toolbar variant="dense">
          <Typography variant="h5" sx={{ mr: 5, color: "#7c7c7c" }}>
            AI 2-2
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ flexGrow: 1 }}
          >
            <Tab label="Animated Face" index="0" />
            <Tab label="Animated Body" index="1" />
            <Tab label="Realistic Avatar" index="2" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "100%", pt: "4.5vh" }}>
        <TabPanel value={value} index={0}>
          <AvatarCreate
            faceBlendShape={faceBlendShape}
            setFaceBlendShape={setFaceBlendShape}
            eyeSize={eyeSize}
            setEyeSize={setEyeSize}
            eyeShape={eyeShape}
            setEyeShape={setEyeShape}
            skin={skin}
            setSkin={setSkin}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AvatarCreate
            faceBlendShape={faceBlendShape}
            setFaceBlendShape={setFaceBlendShape}
            eyeSize={eyeSize}
            setEyeSize={setEyeSize}
            eyeShape={eyeShape}
            setEyeShape={setEyeShape}
            skin={skin}
            setSkin={setSkin}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AvatarCreate
            faceBlendShape={faceBlendShape}
            setFaceBlendShape={setFaceBlendShape}
            eyeSize={eyeSize}
            setEyeSize={setEyeSize}
            eyeShape={eyeShape}
            setEyeShape={setEyeShape}
            skin={skin}
            setSkin={setSkin}
          />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default App;
