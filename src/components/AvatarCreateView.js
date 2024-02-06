import * as React from "react";
import Box from "@mui/material/Box";
import CreateWorld from "../pages/createworld";
import BlendshapeSlider from "./create_avatar/Blendshapes";
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
import CategoryButton from "./create_avatar/CategoryButtonList";
import CreateAvatarBtn from "./CreateAvatarBtnView";
import {
  TabPanelBody,
  TabPanelHead,
  TabPanelItem,
  a11yProps,
} from "./create_avatar/TabPanelList";

export default function AvatarCreateView({ ...props }) {
  //변수 설정
  const [value, setValue] = React.useState(0);

  const faceImagesName = [
    "/static/images/face/Custom_FaceTemplate_00.png",
    "/static/images/face/Custom_FaceTemplate_01.png",
    "/static/images/face/Custom_FaceTemplate_02.png",
    "/static/images/face/Custom_FaceTemplate_03.png",
    "/static/images/face/Custom_FaceTemplate_04.png",
    "/static/images/face/Custom_FaceTemplate_05.png",
    "/static/images/face/Custom_FaceTemplate_06.png",
  ];
  const hairImagesName = [
    "/static/images/hair/hair_01.png",
    "/static/images/hair/hair_02.png",
    "/static/images/hair/hair_03.png",
    "/static/images/hair/hair_04.png",
    "/static/images/hair/hair_05.png",
    "/static/images/hair/hair_06.png",
  ];
  const eyebrowImagesName = [
    "/static/images/eyebrow/eb_01.png",
    "/static/images/eyebrow/eb_02.png",
    "/static/images/eyebrow/eb_03.png",
    "/static/images/eyebrow/eb_04.png",
  ];
  const eyeImagesName = [
    "/static/images/eye/eye_template_00.png",
    "/static/images/eye/eye_template_01.png",
    "/static/images/eye/eye_template_02.png",
    "/static/images/eye/eye_template_03.png",
    "/static/images/eye/eye_template_04.png",
    "/static/images/eye/eye_template_05.png",
    "/static/images/eye/eye_template_06.png",
    "/static/images/eye/eye_template_07.png",
    "/static/images/eye/eye_template_08.png",
    "/static/images/eye/eye_template_09.png",
    "/static/images/eye/eye_template_10.png",
    "/static/images/eye/eye_template_11.png",
  ];
  const glassesImagesName = [
    "/static/images/glasses/acc_glasses_001.png",
    "/static/images/glasses/acc_glasses_002.png",
    "/static/images/glasses/acc_glasses_003.png",
  ];
  const noseImagesName = [
    "/static/images/nose/custom_nose_template_00.png",
    "/static/images/nose/custom_nose_template_01.png",
    "/static/images/nose/custom_nose_template_02.png",
    "/static/images/nose/custom_nose_template_03.png",
    "/static/images/nose/custom_nose_template_04.png",
    "/static/images/nose/custom_nose_template_05.png",
    "/static/images/nose/custom_nose_template_06.png",
    "/static/images/nose/custom_nose_template_07.png",
  ];
  const hatImagesName = [
    "/static/images/hat/acc_hat_001.png",
    "/static/images/hat/acc_hat_002.png",
    "/static/images/hat/acc_hat_003.png",
  ];
  const topImagesName = [
    "/static/images/top/cloth_top_001.png",
    "/static/images/top/cloth_top_002.png",
    "/static/images/top/cloth_top_003.png",
    "/static/images/top/cloth_top_004.png",
    "/static/images/top/cloth_top_005.png",
  ];
  const bottomImagesName = [
    "/static/images/bottom/cloth_bottom_001.png",
    "/static/images/bottom/cloth_bottom_002.png",
    "/static/images/bottom/cloth_bottom_003.png",
    "/static/images/bottom/cloth_bottom_004.png",
    "/static/images/bottom/cloth_bottom_005.png",
    "/static/images/bottom/cloth_bottom_006.png",
  ];
  const dressImagesName = [
    "/static/images/dress/cloth_one_001.png",
    "/static/images/dress/cloth_one_002.png",
    "/static/images/dress/cloth_one_003.png",
    "/static/images/dress/cloth_one_004.png",
    "/static/images/dress/cloth_one_005.png",
  ];
  const suitsImagesName = [
    "/static/images/suits/suits_001.png",
    "/static/images/suits/suits_002.png",
  ];
  const shoesImagesName = [
    "/static/images/shoes/shoes_share_001.png",
    "/static/images/shoes/shoes_share_002.png",
    "/static/images/shoes/shoes_share_003.png",
    "/static/images/shoes/shoes_share_004.png",
    "/static/images/shoes/shoes_share_005.png",
    "/static/images/shoes/shoes_share_006.png",
  ];

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
        <CardHeader title="Blendshapes" sx={{ color: "white" }} />
        <CardContent>
          <TabPanelHead value={value} index={6}>
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
              <CardMedia
                component="img"
                height="194"
                image="/static/images/avatar_face.png"
              />
            </Card>
          </TabPanelHead>
          <TabPanelBody value={value} index={7}>
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
              <CardMedia
                component="img"
                height="194"
                image="/static/images/avatar_body.png"
              />
            </Card>
          </TabPanelBody>
        </CardContent>
        <CreateAvatarBtn
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
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{
          height: "94%",
          width: "5%",
          borderRight: 1,
          borderColor: "divider",
          mt: "3%",
        }}
        indicatorColor="secondary"
        centered
      >
        <Tab
          icon={<Avatar src="/static/images/btn_category_face_p.png" />}
          {...a11yProps(0)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_hair_p.png" />}
          {...a11yProps(1)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_eyebrow_p.png" />}
          {...a11yProps(2)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_eye_p.png" />}
          {...a11yProps(3)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_glasses_p.png" />}
          {...a11yProps(4)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_nose_p.png" />}
          {...a11yProps(5)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_hat_p.png" />}
          {...a11yProps(6)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_shirts_p.png" />}
          {...a11yProps(7)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_pants_p.png" />}
          {...a11yProps(8)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_dress_p.png" />}
          {...a11yProps(9)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_set_p.png" />}
          {...a11yProps(10)}
        />
        <Tab
          icon={<Avatar src="/static/images/btn_category_shoes_p.png" />}
          {...a11yProps(11)}
        />
      </Tabs>
      <Box
        direction="row"
        justifySelf="flex-end"
        sx={{ width: "15vw", bgcolor: "#fafafa", p: 3 }}
      >
        {/*
          <Typography variant="body1" sx={{ mr: 2, color: '#555555' }}>
            Design Assets
          </Typography>
          <TabPanelItem value={value} index={0}>
            <CategoryButton categoryName="face" imagesName={faceImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={1}>
            <CategoryButton categoryName="hair" imagesName={hairImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={2}>
            <CategoryButton categoryName="eyebrow" imagesName={eyebrowImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={3}>
            <CategoryButton categoryName="eye" imagesName={eyeImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={4}>
            <CategoryButton categoryName="glasses" imagesName={glassesImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={5}>
            <CategoryButton categoryName="nose" imagesName={noseImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={6}>
            <CategoryButton categoryName="hat" imagesName={hatImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={7}>
            <CategoryButton categoryName="shirts" imagesName={topImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={8}>
            <CategoryButton categoryName="pants" imagesName={bottomImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={9}>
            <CategoryButton categoryName="dress" imagesName={dressImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={10}>
            <CategoryButton categoryName="suit" imagesName={suitsImagesName}/>
          </TabPanelItem>
          <TabPanelItem value={value} index={11}>
            <CategoryButton categoryName="shoes" imagesName={shoesImagesName}/>
          </TabPanelItem>
    */}
      </Box>
    </Box>
  );
}
