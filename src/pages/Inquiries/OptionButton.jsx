import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserInquiries from "./UserInquiries/UserInquiries";
import FAQDisplayList from "./FAQ Lists Display/FAQDisplayList";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box
          sx={{
            width: "20%",
            marginLeft: "18%",
            borderBottom: 1,
            textColor: "secondary",
            indicatorColor: "secondary",
            borderColor: "#FF7A00",
          }}
        >
          <TabList onChange={handleChange}>
            {/* aria-label="lab API tabs example" */}
            <Tab textColor="#FF7A00" label="FAQ Display List" value="1" />
            <Tab textColor="#FF7A00" label="User Inquiries" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <FAQDisplayList />
        </TabPanel>
        <TabPanel value="2">
          <UserInquiries />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
