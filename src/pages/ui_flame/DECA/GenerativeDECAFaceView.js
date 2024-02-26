import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import CreateWorld from "../../world_view/createworld";
import {
  Avatar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Slider,
} from "@mui/material";

import UploadFaceImageCard from "./UploadFaceImageCard";
import SelectStyleCard from "./SelectStyleCard";
import SelectHairCard from "./SelectHairCard";
import SWSliderCard from "./SWSliderCard";

import { observer } from "mobx-react";
import useStore from "../../../store/UseStore";
//import { useStores } from '../../../store/Context';

export default observer(function GenerativeFaceView({ ...props }) {
  //변수 설정
  const { deca_store } = useStore();
  //const { DECAStore } = useStores();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", deca_store.inputImage);
    formData.append("style", deca_store.style);
    formData.append("style_id", 0);
    formData.append("hair_id", 0);
    formData.append("sw", 0.4);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    axios({
      method: "post",
      url: "http://localhost:3000/input/images",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(formData);
      })
      .catch((error) => {
        console.log(deca_store.inputImage);
        console.log(deca_store.style);
        console.log(deca_store.style_id);
        console.log(deca_store.hair_id);
        console.log(deca_store.sw);
        console.log(formData);
        console.log(error);
      });
  };

  return (
    <Box sx={{ height: "94vh", display: "flex" }}>
      <Card
        variant="elevation"
        sx={{
          width: "16%",
          height: "97.5%",
          m: "1.25%",
          bgcolor: "#5f5f5f",
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <CardHeader
          title="STYLIZED DECA"
          sx={{ color: "white", textAlign: "center" }}
        />
        <CardContent sx={{ alignItems: "center" }}>
          <UploadFaceImageCard />
          <SelectStyleCard />
          <SelectHairCard />
          <SWSliderCard />
          <Button
            color="inherit"
            sx={{
              width: 1,
              height: 40,
              mt: 3,
              bgcolor: "#939393",
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
            }}
            onClick={handleSubmit}
          >
            <Typography variant="h6" sx={{ color: "white" }}>
              Generate
            </Typography>
          </Button>
        </CardContent>
      </Card>
      <Box sx={{ height: "100%", width: "66.5%" }}>
        <CreateWorld
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

      <Box
        direction="row"
        justifySelf="flex-end"
        sx={{ width: "15vw", bgcolor: "#fafafa", p: 3 }}
      ></Box>
    </Box>
  );
});
