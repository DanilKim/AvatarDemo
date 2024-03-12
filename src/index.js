import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";

ReactDOM.render(
  // <Provider faceanimation={}>
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
  //</Provider>
  document.getElementById("root")
);
