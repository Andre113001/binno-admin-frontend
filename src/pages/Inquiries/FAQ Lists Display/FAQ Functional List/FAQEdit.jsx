import React, { useState } from 'react';
import Inquiries from "../FAQ_data";
import { IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Fragment } from "react";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";

function FAQEdit() {
  // State to manage the edit mode and button visibility for each row
  const [rowsState, setRowsState] = useState(Inquiries.map(() => ({ readOnly: true, showButtons: false })));

  // Function to toggle the edit mode and button visibility for a specific row
  const handleEditClick = (index) => {
    setRowsState(prevState => {
      const newState = [...prevState];
      newState[index] = {
        readOnly: false,
        showButtons: true
      };
      return newState;
    });
  };

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
          <div className="flex flex-col w-full items-center w-full">
            {Inquiries.map((item, index) => (
              <div
                className="flex w-full flex-col items-center my-7 rounded bg-darkWhite "
                key={item.id}
              >
                <div className="flex flex-row w-[80%] grow">
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg mr-5">Title: </h1>
                    <h1 className=" font-bold text-lg mr-5">Content: </h1>
                  </div>
                  <div className="flex flex-col w-full">
                    <h1 className="font-bold">{item.title}</h1>
                    <textarea
                      readOnly={rowsState[index].readOnly}
                      rows="6"
                      style={{
                        resize: 'none', // Disable textarea resizing
                        overflow: 'hidden', // Hide scrollbar
                      }}
                      className="mr-2 mt-2 w-full">{item.inquiry}</textarea>
                  </div>
                  <IconButton
                    onClick={() => handleEditClick(index)}
                    aria-label="Edit"
                    size="large"
                    style={{
                      backgroundColor: "#5c9fef",
                      color: "#fff",
                      margin: "24px",
                      borderRadius: "15px",
                      width: "45px",
                      height: "45px ",
                      alignSelf: "center"
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </div>
                {rowsState[index].showButtons && (
                  <div className="flex flex-row w-[80%] my-5">
                    <button
                      className="p-2 mx-2 w-[50%] border border-secondary font-bold text-secondary rounded-full"
                    >
                      Cancel
                    </button>
                    <button className="p-2 mx-2 w-[50%] border font-bold rounded-full text-white bg-secondary">
                      Add FAQ
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default FAQEdit;
