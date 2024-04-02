import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="warning"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton sx={{ padding: "15px" }} value="FAQDisplay">
        <StorageRoundedIcon />
        <span className="ml-2">FAQ Display</span>
      </ToggleButton>
      <ToggleButton sx={{ padding: "15px" }} value="UserInquiries">
        <CommentRoundedIcon /> <span className="ml-2">User Inquiries</span>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
