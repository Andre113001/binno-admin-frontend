import React from "react";
import LabTabs from "./OptionButton";
import { Fragment } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

function MainFAQPage() {
  return (
    <>
      <Fragment>
        <Sidebar />
        <div className="flex m-10 w-full">
          <LabTabs />
        </div>
      </Fragment>
    </>
  );
}

export default MainFAQPage;
