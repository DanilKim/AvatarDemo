import * as React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";

import DecaWorld from "../../world_view/DecaWorld";
import UploadFaceImageCard from "./UploadFaceImageCard";
import SelectStyleCard from "./SelectStyleCard";
import SelectHairCard from "./Hair/SelectHairCard";
import SWSliderCard from "./SWSliderCard";
import Sidebar from "./Sidebar";

import { observer } from "mobx-react";
import useStore from "../../../store/UseStore";

export default observer(function GenerativeFaceView({ ...props }) {
  //변수 설정
  const { deca_store, data_store } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    deca_store.setLoading('3D 얼굴 생성중...');

    const formData = new FormData();
    formData.append("image", deca_store.inputImage);
    formData.append("style", deca_store.style);
    formData.append("style_id", deca_store.style_id);
    formData.append("hair_id", deca_store.hair_id);
    formData.append("sw", deca_store.sw);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    try {
      const res = await axios({
        method: "post",
        url: "http://222.122.67.140:11872/style_deca",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });
      console.log(res);
      const model = new Blob([res.data]);
      console.log(model);
      deca_store.setModelURL(URL.createObjectURL(model));
      deca_store.flushAnim();
      deca_store.setLoading('');
    } catch (error) {
      console.log(error);
      deca_store.setLoading('');
    }
  };

  const handleHairSubmit = async (e) => {
    e.preventDefault();
    deca_store.setLoading('맞춤 헤어 적용중...');
    
    var data = new FormData();
    data.append("hair", 
      data_store.mint_hair_list[deca_store.hair_id] + '_textured_' +
      data_store.hair_color_list[deca_store.hair_color_id] + '.glb'
    );

    var model = await fetch(deca_store.model_url);
    var model_blob = await model.blob();
    console.log(model_blob);
    var model_name = "my_deca" //item.name;
    var model_file = new File([model_blob], model_name + '.glb' );
    data.append("face", model_file);
 
    for (var value of data.values()) {
      console.log(value);
    }

    model = null;
    model_blob = null;
    model_name = '';
    model_file = null;

    try {
      const res = await axios({
        method: "post",
        url: "http://222.122.67.140:11872/head_hair_align",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });
      
      const model = new Blob([res.data]);
      data = null;
      deca_store.setHairURL(URL.createObjectURL(model));
      deca_store.setLoading('');
    } catch (error) {
      console.log(error);
      data = null;
      deca_store.setLoading('');
    }

  };

  const hair_fitting = [];
  if (deca_store.model_url && !deca_store.hair_url && deca_store.hair_id !==0) {
    hair_fitting.push(
      <Button
        color="inherit"
        sx={{
          width: 1,
          height: 40,
          mt: 2,
          bgcolor: "#939393",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
        }}
        onClick={handleHairSubmit}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          헤어 적용
        </Typography>
      </Button>
    );
  }

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
          title="3D 얼굴 캐릭터"
          sx={{ color: "white", textAlign: "center", mb: -2 }}
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
              3D 캐릭터 생성
            </Typography>
          </Button>
          {hair_fitting}
        </CardContent>
      </Card>
      <Box sx={{ height: "100%", width: "63.5%" }}>
        <DecaWorld />
      </Box>

      <Box
        direction="row"
        justifySelf="flex-end"
        sx={{ width: "18vw", bgcolor: "#fafafa", p: 3 }}
      >
        <Sidebar/>
      </Box>
    </Box>
  );
});
