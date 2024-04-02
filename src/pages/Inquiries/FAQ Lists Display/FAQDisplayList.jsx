import React, { Fragment } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import FAQList from "./FAQList";

function FAQDisplayList() {
  return (
    <>
      <Fragment>
        <Sidebar />
        {/* page container */}
        <div className="container flex-col m-10 bg-darkWhite">
          {/* title and search container */}
          <div className="flex w-full">
            <FAQList />
          </div>
        </div>
      </Fragment>
    </>
  );
}

export default FAQDisplayList;
