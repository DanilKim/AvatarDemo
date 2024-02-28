import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import LibraryList from "./LibraryListView";
const LibraryPanel = observer((props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      sx={{
        width: "100%",
        height: "538px",
        backgroundColor: "#282828",
        overflow: "auto",
        whiteSpace: "nowrap",
        "&::-webkit-scrollbar": { width: 0 },
      }}
      hidden={value !== index}
      {...other}
    >
      {value === 0 && <LibraryList type={"anime"} />}
      {value === 1 && <LibraryList type={"arcane"} />}
      {value === 2 && <LibraryList type={"caricature"} />}
      {value === 3 && <LibraryList type={"cartoon"} />}
      {value === 4 && <LibraryList type={"comic"} />}
      {value === 5 && <LibraryList type={"fantasy"} />}
      {value === 6 && <LibraryList type={"illustration"} />}
      {value === 7 && <LibraryList type={"impasto"} />}
      {value === 8 && <LibraryList type={"pixar"} />}
      {value === 9 && <LibraryList type={"slamdunk"} />}
    </Box>
  );
});

LibraryPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export default LibraryPanel;
