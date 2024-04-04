import React from "react";
import Inquiries from "../FAQ_data";
import TextField from "@mui/material/TextField";
import SearchBar from "../../../../components/Search Bar/Searchbar";
import { Fragment } from "react";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FAQAdd() {
  const navigate = useNavigate();

  function cancelBtn() {
    navigate(-1);
  }

  return (
    <>
      <Fragment>
        <Sidebar />
        {/* parent div */}
        <div className="flex flex-col items-center w-[100%] container m-10 bg-darkWhite">
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
          <div className="flex flex-col items-center w-full">
            {/* card container */}
            <div className="flex flex-row w-[80%]">
              {/* parent add container */}
              <div className="flex flex-col my-4 w-[100%]">
                {/* title container */}
                <div className="flex flex-row items-center mb-2">
                  <h1 className="font-bold text-2xl mr-5">Title: </h1>
                  <input
                    type="text"
                    id="title"
                    className=" font-bold text-2xl w-full outline-none"
                  />
                </div>
                {/* content container */}
                <div className="flex flex-row">
                  {/* <h1 className=" font-bold text-xl mr-5">Content: </h1> */}
                  <h1 className="font-bold text-2xl mr-5">Content: </h1>
                  <textarea
                    className="outline-none items-center text-xl w-[95%]"
                    id="FAQContent"
                    rows="6"
                  />
                </div>
                <div className="flex flex-row my-5">
                  <button
                    onClick={cancelBtn}
                    className="p-2 mx-2 w-[50%] border border-secondary font-bold text-secondary rounded-full "
                  >
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
      </Fragment>
    </>
  );
}
export default FAQAdd;
