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
  const { deca_store } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    deca_store.setLoading(true);

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
      deca_store.setLoading(false);
    } catch (error) {
      console.log(error);
      deca_store.setLoading(false);
    }
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
