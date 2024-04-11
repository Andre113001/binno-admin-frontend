import React, { Fragment, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import FAQList from "./FAQList";
import CustomTabPanel from "../../../pages/Inquiries/OptionButton";

function FAQDisplayList() {
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);

  return (
    <>
      {/* page container */}
      <div className=" flex container flex-col m-10 w-full bg-darkWhite">
        {/* title and search container */}
        <div className="flex w-full">
          <FAQList />
        </div>
      </div>
    </>
  );
}

export default FAQDisplayList;
