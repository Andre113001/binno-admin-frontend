import React from "react";
import { Link } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

function Back(props) {
  return (
    <div>
      <div className="flex items-center space-x-4 mb-5 mt-10">
        <Link to={props.link}>
          <div className="icon cursor-pointer flex row-auto justify-center items-center bg-primary py-2 px-4 rounded-xl text-white">
            <ArrowBackIcon />
            <span>Back</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Back;
