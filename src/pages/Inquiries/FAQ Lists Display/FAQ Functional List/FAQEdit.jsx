import React from "react";
import Inquiries from "../FAQ_data";
import { IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

function FAQEdit() {
  return (
    <>
      <div className="flex flex-col items-center">
        {Inquiries.map((item) => (
          // card design
          <div
            className="flex w-[80%] flex-row items-center my-7 rounded bg-darkWhite "
            key={item.id}
          >
            {/* content layout */}
            <div className="flex flex-row grow">
              {/* title container */}
              <div className="flex flex-col">
                <h1 className="font-bold text-lg mr-5">Title: </h1>
                <h1 className=" font-bold text-lg mr-5">Content: </h1>
              </div>
              {/* content container */}
              <div className="flex flex-col">
                <h1 className="font-bold">{item.title}</h1>
                <p className="mr-2 mt-2">{item.inquiry}</p>
              </div>
            </div>
            <IconButton
              // onClick={}
              aria-label="Edit"
              size="large"
              style={{
                backgroundColor: "#5c9fef",
                color: "#fff",
                margin: "24px",
                borderRadius: "15px",
              }}
            >
              <EditRoundedIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </>
  );
}

export default FAQEdit;
