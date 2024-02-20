import Box from "@mui/material/Box";
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  ListItemButton,
  ListItemText,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import CreateAnimBtn from "./CreateAnimBtnView";
import MyWorld from "../pages/world";
import AvatarFaceAnimationViewModel from "./AvatarFaceAnimationViewModel";
import AnimListBtn from "../../components/face_animation/AnimListBtn";
import CreateTextAnimation from "../../components/face_animation/text_driven_animation/CreateTextAnimation";

export default function AvatarFacaAnimationView({ ...props }) {
  const clipsLength = AvatarFaceAnimationViewModel();

  const [animNameList, setAnimNameList] = useState([]);
  const [actionList, setActionList] = useState([]);
  const [audioList, setAudioList] = useState([]);

  const [animIndex, setAnimIndex] = useState(0);
  const [textInput, setTextInput] = useState("");

  return (
    <Box sx={{ height: "94.5vh", display: "flex" }}>
      <Card
        variant="elevation"
        sx={{
          width: "15%",
          height: "98%",
          ml: "1%",
          mt: "1%",
          bgcolor: "#5f5f5f",
          borderRadius: 5,
        }}
      >
        <CardHeader title="Face Animation" sx={{ color: "white" }} />
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
            <Typography variant="body1" sx={{ mr: 2, color: "white" }}>
              {animNameList.length}/10
            </Typography>
          </Card>
          <CreateAnimBtn
            faceAnimData={props.faceAnimData}
            setFaceAnimData={props.setFaceAnimData}
            animNameList={animNameList}
            setAnimNameList={setAnimNameList}
            audioList={audioList}
            setAudioList={setAudioList}
          />
          <CreateTextAnimation
            textInput={textInput}
            setTextInput={setTextInput}
            faceAnimData={props.faceAnimData}
            setFaceAnimData={props.setFaceAnimData}
            animNameList={animNameList}
            setAnimNameList={setAnimNameList}
            audioList={audioList}
            setAudioList={setAudioList}
          />
          <AnimListBtn
            animIndex={animIndex}
            setAnimIndex={setAnimIndex}
            animNameList={animNameList}
            setAnimNameList={setAnimNameList}
            actionList={actionList}
            setActionList={setActionList}
            audioList={audioList}
            setAudioList={setAudioList}
          />
        </CardContent>
      </Card>
      <Box sx={{ height: "100%", width: "85%" }}>
        <MyWorld
          animIndex={animIndex}
          faceAnimData={props.faceAnimData}
          setFaceAnimData={props.setFaceAnimData}
          animNameList={animNameList}
          setAnimNameList={setAnimNameList}
          audioList={audioList}
          setAudioList={setAudioList}
          actionList={actionList}
          setActionList={setActionList}
        />
      </Box>
      <Box
        direction="row"
        justifySelf="flex-end"
        sx={{ width: "15vw", bgcolor: "#fafafa", p: 3 }}
      >
        <Typography variant="body1" sx={{ mr: 2, color: "#555555" }}>
          Design Assets
        </Typography>
      </Box>
    </Box>
  );
}
