import { Box, AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import "../index.css";
import * as React from "react";
import { observer } from "mobx-react-lite";
import TabPanel from "../components/TabPanelView";
import StylizedFaceView from "./ui_stylized/StylizedFaceView";
import GenerativeDECAFaceView from "./ui_flame/DECA/GenerativeDECAFaceView";
import SmplifyCreate from "./ui_smplify/GenerativeSmplifyView";
import GenerativeEMOTEFaceView from "./ui_flame/EMOTE/GenerativeEMOTEFaceView";

const App = observer(() => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "#2e2e2e",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar
          position="fixed"
          top={0}
          sx={{
            bgcolor: "#fafafa",
            height: "50px",
            width: "100%",
            borderColor: "#eaeaea",
            boxShadow: 0,
            display: "flex",
          }}
        >
          <Toolbar variant="dense">
            <Box
              sx={{
                mr: "30px",
                width: "70px",
                minWidth: "70px",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#7c7c7c", whiteSpace: "nowrap" }}
              >
                TmaxAI
              </Typography>
            </Box>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ flexGrow: 1 }}
            >
              
              <Tab label="얼굴" index="0" />
              <Tab label="바디" index="1" />
              <Tab label="애니메이션" index="2" />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            height: "calc(100vh-50px)",
            overflow: "hidden",
            display: "flex",
            "&::-webkit-scrollbar": { width: 0 },
            mt: "50px",
          }}
        >
          
          <TabPanel value={value} index={0}>
            <GenerativeDECAFaceView />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SmplifyCreate />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <GenerativeEMOTEFaceView />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
});
export default App;


// <Tab label="Stylized Image" index="0" />
// <TabPanel value={value} index={0}>
//   <StylizedFaceView />
// </TabPanel>
