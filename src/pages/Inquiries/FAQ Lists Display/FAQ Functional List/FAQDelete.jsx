import React, { useState } from "react";
import Inquiries from "../FAQ_data";
import { IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function FAQDelete() {
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
            <div className="flex flex-col grow">
              <h1 className="font-bold">{item.title}</h1>
              <p>{item.inquiry}</p>
            </div>
            <IconButton
              aria-label="Edit"
              size="large"
              style={{
                backgroundColor: "#EB5858",
                color: "#fff",
                margin: "24px",
                borderRadius: "15px",
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </>
  );
}

export default FAQDelete;
