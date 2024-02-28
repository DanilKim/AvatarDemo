import React from "react";
import { Box, IconButton, Typography, Tabs, Tab } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import LibraryPanel from "./LibraryPanelsView";
import useStore from "../../store/UseStore";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", // replace with your desired primary color
    },
  },
});

const LibraryDialog = observer((props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    common_store.setStyleIdx(newValue);
    common_store.setLibraryIdx(-1);
    data_store.SetList(newValue);
    setValue(newValue);
  };
  const { common_store, data_store } = useStore();

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
            스타일 선택
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
          <ThemeProvider theme={theme}>
            <Tabs
              sx={{
                width: "100%",
                minHeight: "100%",
                height: "100%",
                alignItems: "flex-end",
                "& .MuiTab-root": {
                  mt: -1,
                  color: "#959595",
                  minHeight: "100%",
                  fontSize: "12px",
                  fontWeight: 500,
                },
                "& .Mui-selected": { color: "#fff" },
              }}
              value={value}
              onChange={handleChange}
            >
              {Array.from(data_store.item_list).map((object, index) => (
                <Tab
                  key={index}
                  sx={{
                    minWidth: String(12 * object[0].length) + "px",
                    width: String(12 * object[0].length) + "px",
                  }}
                  label={object[0]}
                />
              ))}
            </Tabs>
          </ThemeProvider>
        </Box>
        <Box>
          {Array.from(data_store.item_list).map((object, index) => (
            <LibraryPanel key={index} value={value} index={index} />
          ))}
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
              common_store.setLibraryIdx(-1);
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
              if (common_store.libraryIdx !== -1) {
                props.onClose();
                common_store.setLibraryIdx(-1);
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
