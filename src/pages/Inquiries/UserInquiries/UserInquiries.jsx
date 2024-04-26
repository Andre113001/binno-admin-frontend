import React, { Fragment } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import UserInquiriesData from "./UserInquiries_data.jsx";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

function UserInquiries() {
  const navigate = useNavigate();

  function cancelBtn() {
    navigate(-1);
  }
  return (
    <>
      <Fragment>
        <Sidebar />
        <div className="flex container w-full justify-center flex-col bg-darkWhite">
          <div className="flex flex-col my-5 text-5xl font-bold text-primary justify-center">
            Frequently Asked Question
          </div>
          {UserInquiriesData.map((item) => (
            <div className="flex flex-col items-center justify-center border">
              <div
                className="flex w-[95%] flex-row my-7 rounded justify-center bg-darkWhite"
                key={item.id}
              >
                <div className="flex grow flex-col justify-center">
                  <h1>{item.email}</h1>
                  <h1 className="font-bold">{item.title}</h1>
                </div>
                <div className="flex items-center m-2">
                  <IconButton
                    aria-label="Email"
                    size="medium"
                    sx={{
                      color: "white",
                      backgroundColor: "#5C9FEF",
                      "&:hover": {
                        backgroundColor: "#3F8AE0", // Change background color on hover
                        cursor: "pointer", // Change cursor to pointer on hover
                      },
                      borderRadius: "15px",
                    }}
                  >

<a href={`mailto:${item.email}`}>
                    <EmailRoundedIcon fontSize="medium" />
                    </a>
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    </>
  );
}

export default UserInquiries;
