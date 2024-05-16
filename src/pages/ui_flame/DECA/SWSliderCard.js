import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MuiInput from "@mui/material/Input";

import { observer } from "mobx-react";
import useStore from "../../../store/UseStore";
import { styled } from "@mui/material/styles";

const Input = styled(MuiInput)`
  width: 40px;
`;

function SWSliderCard({ ...props }) {
  const { deca_store } = useStore();

  const handleSliderChange = (e, newValue) => {
    deca_store.setSw(Number(newValue));
  };

  const handleInputChange = (e) => {
    deca_store.setSw(Number(e.target.value));
  };

  const handleBlur = () => {
    if (deca_store.sw < 0) {
      deca_store.setSw(0);
    } else if (deca_store.sw > 100) {
      deca_store.setSw(100);
    }
  };

  return (
    <Box sx={{ algnItems: "center", justifyContent: "center" }}>
      <Typography
        id="input-slider"
        align="center"
        gutterBottom
        variant="h6"
        sx={{ color: "#ffffb0", mt: 2.5 }}
      >
        Structure Weight
      </Typography>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ width: "90%", ml: 1, mt: -1 }}
      >
        <Grid item xs>
          <Slider
            value={deca_store.sw}
            onBlur={handleBlur}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={deca_store.sw}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default observer(SWSliderCard);
