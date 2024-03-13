import React, { Fragment } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import StyledToggleButton from "../../components/ToggleButton/StyledToggleButton";

function Inquiries() {
  return (
    <>
      <Fragment>
        <Sidebar />
        <div className="container">{/* <StyledToggleButton /> */}</div>
      </Fragment>
    </>
  );
}

export default Inquiries;
