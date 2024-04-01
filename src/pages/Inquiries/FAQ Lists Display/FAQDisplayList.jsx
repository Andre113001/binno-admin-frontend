import React, { Fragment } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import StyledToggleButton from "../../../components/ToggleButton/StyledToggleButton";
import FAQList from "./FAQList";
import SearchBar from "../../../components/Search Bar/Searchbar";

function FAQDisplayList() {
  return (
    <>
      <Fragment>
        <Sidebar />
        {/* page container */}
        <div className="container flex-col m-10 bg-darkWhite">
          {/* <StyledToggleButton /> */}
          {/* title and search container */}
          <div className="flex flex-col items-center text-5xl font-bold text-primary justify-center w-full">
            Frequently Asked Question
            <SearchBar />
          </div>
          <div className="flex">
            <div className="flex"></div>
            <FAQList />
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default FAQDisplayList;
