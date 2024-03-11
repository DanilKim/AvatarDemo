import Box from "@mui/material/Box";
import { List, ListItemButton, IconButton, ListItemText } from "@mui/material";
import { useState } from "react";
import MyBodyAnimWorld from "../../pages/world_view/EX_animationworld";
import AnimSliderView from "./AnimSliderView";

export default function EX_AvatarBodyAnimation() {
  const [animclipLength, setAnimClipLength] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);
  const [currentModel, setCurrentModel] = useState(0);
  const [animTime, setanimTime] = useState(0);
  const [animEditMode, setAnimEditMode] = useState(0);
  const [nodeStates, setNodeStates] = useState(new Map());
  const [depthState, setDepthState] = useState(new Map());
  const [animNum, setAnimNum] = useState([0, 1, 2, 3, 4]);

  const setAnimTimeFunction = (time) => {
    setanimTime(time);
  };

  const setClipLengthFunction = (length) => {
    setAnimClipLength(length);
  };

  const handleListItemClick = (event, index) => {
    setAnimIndex(index);
  };

  return (
    <Box sx={{ height: "94vh", display: "flex" }}>
      <Box sx={{ height: "100%", width: "85%", display: "flex" }}>
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
      </Box>
    </Box>
  );
}
