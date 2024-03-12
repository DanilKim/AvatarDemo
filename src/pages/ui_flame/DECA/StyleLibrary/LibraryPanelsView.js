import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import LibraryList from "./LibraryListView";
import useStore from "../../../../store/UseStore";

const LibraryPanel = observer((props) => {
  const { children, value, index, ...other } = props;
  const { data_store } = useStore();

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
      {Array.from(data_store.item_list).map(
        (object, index) => value === index && <LibraryList type={object} />
      )}
    </Box>
  );
});

LibraryPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export default LibraryPanel;
