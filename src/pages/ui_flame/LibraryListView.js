import React, { useState } from "react";
import { Box, IconButton, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import useStore from "../../store/UseStore";
import LibraryViewModel from "./LibraryViewModel";
const LibraryList = observer((props) => {
  const { image_list, theme_list, index_list } = LibraryViewModel();
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
        {Array.from(image_list).map((object, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {theme_list[index] === props.type && (
              <IconButton
                onClick={() => {
                  common_store.setLibraryIdx(index_list[index]);
                  console.log(common_store.libraryIdx);
                  console.log(common_store.styleIdx);
                }}
                sx={{
                  width: "122px",
                  height: "122px",
                  mt: "11px",
                  ml: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#393939",
                  backgroundImage: object,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  border: 1,
                  borderRadius: "8px",
                  borderColor:
                    index === common_store.libraryIdx ? "#e3f853" : "#494949",
                  fontFamily: "SourceHanSansKR",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#fff",
                }}
              />
            )}
          </Box>
        ))}
      </Grid>
    </>
  );
});

export default LibraryList;
