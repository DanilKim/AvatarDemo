import React from "react";
import { List, ListItemButton, IconButton, ListItemText } from "@mui/material";

export default function AnimEditMode(props) {
  //const barName=['전체 애니메이션 적용', '상/하체 애니메이션 적용', '키프레임 편집'];
  const barName = ["전체 애니메이션 적용", "상/하체 애니메이션 적용"];

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "#939393", borderRadius: 5 }}
    >
      {[0, 1].map((value) => (
        <ListItemButton
          key={value}
          selected={props.animEditMode === value}
          onClick={(event) => props.handleModeListItemClick(event, value)}
          secondaryAction={<IconButton></IconButton>}
        >
          <ListItemText
            primary={`${barName[value]}`}
            sx={{ ml: 2, flexGrow: 1, color: "white" }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
