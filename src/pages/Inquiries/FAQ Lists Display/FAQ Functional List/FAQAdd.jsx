import React from "react";
import Inquiries from "../FAQ_data";
import TextField from "@mui/material/TextField";

function FAQAdd() {
  return (
    <>
      {/* parent div */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          {/* card container */}
          <div className="flex flex-row w-[80%]">
            {/* parent add container */}
            <div className="flex flex-col my-4 w-[100%]">
              {/* title container */}
              <div className="flex flex-row items-center mb-5">
                <h1 className="font-bold text-2xl mr-5">Title: </h1>
                <input
                  type="text"
                  id="title"
                  className=" font-bold text-2xl w-full outline-none"
                />
              </div>
              {/* content container */}
              <div className="flex flex-row items-center">
                {/* <h1 className=" font-bold text-xl mr-5">Content: </h1> */}
                <TextField
                  id="outlined-textarea"
                  label="Content"
                  sx={{ width: "100%" }}
                  multiline
                  minRows={4}
                />
              </div>
              <div className="flex flex-row my-5">
                <button className="p-2 mx-2 w-[50%] border border-secondary font-bold text-secondary rounded-full ">
                  Cancel
                </button>
                <button className="p-2 mx-2 w-[50%] border font-bold rounded-full text-white bg-secondary">
                  Add FAQ
                </button>
              </div>
            </div>
          </div>
          {/* list cards */}
          {Inquiries.map((item) => (
            // card design
            <div
              className="flex w-[80%] flex-col my-7 rounded bg-darkWhite"
              key={item.id}
            >
              <h1 className="font-bold">{item.title}</h1>
              <p>{item.inquiry}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default FAQAdd;
