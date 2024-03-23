import { Box, AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";

import * as React from "react";
import TabPanel from "../components/TabPanelView";
import GenerativeAnimationView from "./ui_realistic/GenerativeRealisticView";
import GenerativeDECAFaceView from "./ui_flame/DECA/GenerativeDECAFaceView";
import SmplifyCreate from "./ui_smplify/GenerativeSmplifyView";
import GenerativeEMOTEFaceView from "./ui_flame/EMOTE/GenerativeEMOTEFaceView";

function App() {
  const [value, setValue] = React.useState(0);

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
            <Tab label="Realistic Avatar" index="1" />
            <Tab label="Smplify" index="2" />
            <Tab label="Animation" index="3" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "100%", pt: "4.5vh" }}>
        <TabPanel value={value} index={0}>
          <GenerativeDECAFaceView />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <GenerativeAnimationView />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SmplifyCreate />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <GenerativeEMOTEFaceView />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default App;
