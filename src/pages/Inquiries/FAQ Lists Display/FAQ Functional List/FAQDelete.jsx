import React, { useState } from "react";
import Inquiries from "../FAQ_data";
import { IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Fragment } from "react";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";

function FAQDelete() {
  return (
    <>
      <Fragment>
        <Sidebar />
        <div className="flex flex-col items-center container m-10 bg-darkWhite">
          <div className="flex items-end justify-end w-full">
            <div className="flex items-center justify-end mx-12 mb-8">
              <Link to="/inquiries">
                <button className="bg-primary rounded-lg text-white px-4 py-1">
                  Done
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center text-5xl font-bold text-primary justify-center w-full">
            Frequently Asked Question
            <SearchBar />
          </div>
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
        </div>
      </Fragment>
    </>
  );
}

export default FAQDelete;
