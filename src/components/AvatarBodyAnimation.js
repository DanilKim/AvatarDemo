import Box from "@mui/material/Box";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItemButton,
  IconButton,
  ListItemText,
} from "@mui/material";
import TabPanel from "./TabPanelView";
import { useState } from "react";
import MyBodyAnimWorld from "../pages/bodyworld";
import AvatarFaceAnimationViewModel from "./AvatarFaceAnimationViewModel";
import AvatarViewModel from "./avatar_animation/avatar_viewmodel";
import AnimSliderView from "./avatar_animation/AnimSliderView";
import AvatarModel from "./avatar_animation/avatar_model";
import ModelBodyRig from "./avatar_animation/ModelBodyRig";
import RigTransform from "./avatar_animation/RigTransform";
import AnimEditMode from "./avatar_animation/AnimEditMode";
import JsonToBodyAnim from "./avatar_animation/JsonToBodyAnim";
import axios from "axios";
import CreateBodyAnimBtn from "./avatar_animation/CreateBodyAnimBtnView";
import AnimUpLowBody from "./avatar_animation/AnimUpLowBody";

export default function AvatarBodyAnimation() {
  const [animclipLength, setAnimClipLength] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);
  const [animSliderValue, setanimSliderValue] = useState(0);
  const [currentModel, setCurrentModel] = useState(0);
  const [animTime, setanimTime] = useState(0);

  const [boneName, setBoneName] = useState("Pelvis");
  const [animEditMode, setAnimEditMode] = useState(0);

  const [nodeStates, setNodeStates] = useState(new Map());

  const [depthState, setDepthState] = useState(new Map());

  const [animNum, setAnimNum] = useState([0, 1, 2, 3, 4]);

  const current_rig = [];

  const appendAnimNum = (newIndex) => {
    setAnimNum((animNum) => [...animNum, newIndex]);
  };
  const deleteAnimNum = (deleteIndex) => {};

  const setAnimTimeFunction = (time) => {
    setanimTime(time);
  };

  const setClipLengthFunction = (length) => {
    setAnimClipLength(length);
  };

  const handleListItemClick = (event, index) => {
    setAnimIndex(index);
  };

  const handleModeListItemClick = (event, index) => {
    setAnimEditMode(index);
  };

  const testClick = (event, index) => {
    return <input />;
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
        <CardHeader title="Body Animation" sx={{ color: "white" }} />
        <CardContent>
          <Card
            variant="elevation"
            sx={{
              bgcolor: "#939393",
              borderRadius: 5,
              display: "flex",
              flexDirection: "row",
              boxShadow: 0,
              mt: -2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ ml: 2, flexGrow: 1, color: "white" }}
            >
              업로드 영상
            </Typography>
          </Card>
          <AnimEditMode
            animEditMode={animEditMode}
            handleModeListItemClick={handleModeListItemClick}
          ></AnimEditMode>
          <CreateBodyAnimBtn currentModel={currentModel} />
        </CardContent>
      </Card>
      <Box sx={{ height: "100%", width: "65%", display: "flex" }}>
        <Box sx={{ height: "100%", width: "100%", display: "flex" }}>
          <MyBodyAnimWorld
            animTime={animTime}
            clipLength={setClipLengthFunction}
            animIndex={animIndex}
            setCurrentModel={setCurrentModel}
            currentModel={currentModel}
            nodeStates={nodeStates}
            depthState={depthState}
          />
        </Box>
      </Box>

      <Box
        direction="row"
        justifySelf="flex-end"
        sx={{ width: "15vw", bgcolor: "#fafafa", p: 3, overflowY: "scroll" }}
      >
        <AnimSliderView
          setAnimTime={setAnimTimeFunction}
          clipLength={animclipLength}
        ></AnimSliderView>

        <TabPanel value={animEditMode} index={0}>
          <List sx={{ width: "100%", bgcolor: "#939393" }}>
            {animNum.map((value) => (
              <ListItemButton
                key={value}
                selected={animIndex === value}
                onClick={(event) => handleListItemClick(event, value)}
                secondaryAction={<IconButton></IconButton>}
              >
                <ListItemText
                  primary={`Animation ${animNum[value]}`}
                  sx={{ ml: 2, flexGrow: 1, color: "white" }}
                />
              </ListItemButton>
            ))}
          </List>
        </TabPanel>
        <TabPanel value={animEditMode} index={1}>
          <AnimUpLowBody
            nodeStates={nodeStates}
            animNum={animNum}
            appendAnimNum={appendAnimNum}
            setAnimIndex={setAnimIndex}
          ></AnimUpLowBody>
        </TabPanel>
        <TabPanel value={animEditMode} index={2}>
          <Card
            variant="elevation"
            sx={{ width: "100%", height: "97.5%", bgcolor: "#5f5f5f" }}
          >
            <Card variant="elevation" sx={{ bgcolor: "#939393", boxShadow: 0 }}>
              <Typography
                variant="body1"
                sx={{ ml: 2, flexGrow: 1, color: "white" }}
              >
                모델이름
              </Typography>
            </Card>
            <ModelBodyRig
              boneName={boneName}
              setBoneName={setBoneName}
              nodeStates={nodeStates}
              depthState={depthState}
            ></ModelBodyRig>
            <RigTransform
              nodeStates={nodeStates}
              boneName={boneName}
            ></RigTransform>
          </Card>
        </TabPanel>
      </Box>
    </Box>
  );
}
