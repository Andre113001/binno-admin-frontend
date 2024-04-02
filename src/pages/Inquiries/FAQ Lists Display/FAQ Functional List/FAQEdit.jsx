import React from "react";
import Inquiries from "../FAQ_data";
import { IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Fragment } from "react";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";

function FAQEdit() {
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
        </div>
      </Fragment>
    </>
  );
}

export default FAQEdit;
