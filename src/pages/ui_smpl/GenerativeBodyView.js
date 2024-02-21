import * as React from "react";
import Box from "@mui/material/Box";
import CreateWorld from "../world_view/createworld";
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
import CategoryButton from "../../components/old_create_avatar/CategoryButtonList";
import CreateAvatarBtn from "../../components/CreateAvatarBtnView";
import {
  TabPanelBody,
  TabPanelHead,
  TabPanelItem,
  a11yProps,
} from "../../components/old_create_avatar/TabPanelList";

export default function GenerativeBodyView({ ...props }) {
  //변수 설정
  const [value, setValue] = React.useState(0);

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
        <Typography variant="body1" sx={{ mr: 2, color: "#555555" }}>
          Design Assets
        </Typography>
        <TabPanelItem value={value} index={0}>
          <CategoryButton categoryName="face" imagesName={faceImagesName} />
        </TabPanelItem>
        <TabPanelItem value={value} index={1}>
          <CategoryButton categoryName="hair" imagesName={hairImagesName} />
        </TabPanelItem>
        <TabPanelItem value={value} index={2}>
          <CategoryButton
            categoryName="eyebrow"
            imagesName={eyebrowImagesName}
          />
        </TabPanelItem>
        <TabPanelItem value={value} index={3}>
          <CategoryButton categoryName="eye" imagesName={eyeImagesName} />
        </TabPanelItem>
        <TabPanelItem value={value} index={4}>
          <CategoryButton
            categoryName="glasses"
            imagesName={glassesImagesName}
          />
        </TabPanelItem>
        <TabPanelItem value={value} index={5}>
          <CategoryButton categoryName="nose" imagesName={noseImagesName} />
        </TabPanelItem>
        <TabPanelItem value={value} index={6}>
          <CategoryButton categoryName="hat" imagesName={hatImagesName} />
        </TabPanelItem>
        <TabPanelItem value={value} index={7}>
          <CategoryButton categoryName="shirts" imagesName={topImagesName} />
        </TabPanelItem>
        <TabPanelItem value={value} index={8}>
          <CategoryButton categoryName="pants" imagesName={bottomImagesName} />
        </TabPanelItem>
        <TabPanelItem value={value} index={9}>
          <CategoryButton categoryName="dress" imagesName={dressImagesName} />
        </TabPanelItem>
        <TabPanelItem value={value} index={10}>
          <CategoryButton categoryName="suit" imagesName={suitsImagesName} />
        </TabPanelItem>
        <TabPanelItem value={value} index={11}>
          <CategoryButton categoryName="shoes" imagesName={shoesImagesName} />
        </TabPanelItem>
      </Box>
    </Box>
  );
}
