import React from "react";
import { Box, IconButton, Typography, Tabs, Tab } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import useStore from "../../../store/UseStore";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // replace with your desired primary color
    },
  },
});


const HairLibraryList = observer((props) => {
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
          {Array.from(data_store.hair_list).map((name, index) => (
            <Box
              key={'hair_' + name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              
                <IconButton
                  onClick={() => {
                    common_store.setHairIdx(index);
                    console.log(common_store.hairIdx);
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
                    backgroundImage: "url(/static/hair_preview/"  + name + ".png)",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    border: 1,
                    borderRadius: "8px",
                    borderColor:
                      index === common_store.hairIdx ? "#e3f853" : "#494949",
                    fontFamily: "SourceHanSansKR",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#fff",
                  }}
                />
            
            </Box>
          ))}
        </Grid>
      </>
    );
  });


const LibraryDialog = observer((props) => {
  const { common_store, deca_store } = useStore();

  return (
    <>
      <Box
        sx={{
          id: props.index,
          width: "1080px",
          height: "682px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          backgroundColor: "#282828",
        }}
      >
        <Box
          sx={{
            height: "44px",
            display: "flex",
            alignItems: "center",
            ml: "22px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#fff",
            }}
          >
            헤어 선택
          </Typography>
        </Box>
        <Box
          sx={{
            height: "40px",
            display: "flex",
            backgroundColor: "#222222",
            flexDirection: "row",
            alignItems: "center",
            pl: "22px",
          }}
        >
          <ThemeProvider theme={theme}/>
            
        </Box>
        <Box>
          <HairLibraryList/>
        </Box>
        <Box
          sx={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "#222222",
            px: "22px",
          }}
        >
          <IconButton
            onClick={() => {
              common_store.setHairIdx(-1);
              props.onClose();
            }}
            sx={{
              width: "125px",
              height: "35px",
              mr: "12px",
              backgroundColor: "#00FFFF",
              borderRadius: 0,
            }}
          >
            <Typography variant="body1" sx={{ color: "black" }}>
              뒤로가기
            </Typography>
          </IconButton>
          <IconButton
            onClick={async () => {
              if (common_store.hairIdx !== -1) {
                props.onClose();
                deca_store.setHairId(common_store.hairIdx);
                common_store.setHairIdx(-1);
              }
            }}
            sx={{
              width: "124px",
              height: "34px",
              backgroundColor: "#FFFF00",
              borderRadius: 0,
            }}
          >
            <Typography variant="body1" sx={{ color: "black" }}>
              불러오기
            </Typography>
          </IconButton>
        </Box>
      </Box>
    </>
  );
});

export default LibraryDialog;
