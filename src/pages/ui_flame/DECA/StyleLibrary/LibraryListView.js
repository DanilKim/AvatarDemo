import React, { useState } from "react";
import { Box, IconButton, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import useStore from "../../../../store/UseStore";

const LibraryList = observer((props) => {
  const { common_store, data_store } = useStore();
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        sx={{
          overflow: "auto",
          whiteSpace: "nowrap",
          "&::-webkit-scrollbar": { width: 0 },
        }}
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        {Array.from(data_store.style_images).map((object, index) => (
          <Box
            key={props.type[0] + "_" + index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={() => {
                common_store.setStyle(props.type[0]);
                common_store.setLibraryIdx(index);
              }}
              sx={{
                width: "91px",
                height: "91px",
                mt: "6px",
                ml: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#393939",
                backgroundImage: object,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                border: 2,
                borderRadius: "8px",
                borderColor:
                  index === common_store.libraryIdx ? "#e3f853" : "#494949",
              }}
            />
          </Box>
        ))}
      </Grid>
    </>
  );
});

export default LibraryList;
